/**
 * API Route: /api/whatsapp/webhook
 * Webhook de Meta Cloud API para recibir mensajes entrantes y statuses.
 *
 * - GET  → handshake de verificación (una sola vez al configurar en Meta Dashboard)
 * - POST → recibe mensajes/statuses. Valida firma HMAC-SHA256 con WHATSAPP_APP_SECRET.
 *
 * Flujo al recibir un mensaje:
 *   1. Validar firma
 *   2. Parsear payload, extraer mensaje o status
 *   3. Buscar lead por teléfono
 *   4. Guardar en WhatsAppMessage (dedupe por wamid)
 *   5. Actualizar lead.lastInboundAt / inboundCount
 *   6. Reenviar a Telegram
 *
 * Responde SIEMPRE 200 a Meta (excepto 401 firma / 403 verify) para evitar retries
 * innecesarios. Los errores internos se logean pero no bloquean el ack.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB, Lead, WhatsAppMessage } from '@/lib/mongodb';
import { forwardInboundToTelegram } from '@/lib/whatsapp-notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── GET: handshake de Meta ──────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!expected) {
    console.error('[wa-webhook] WHATSAPP_VERIFY_TOKEN no configurado');
    return new NextResponse('Server misconfigured', { status: 500 });
  }

  if (mode === 'subscribe' && token === expected && challenge) {
    console.log('[wa-webhook] handshake OK');
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  console.warn(`[wa-webhook] handshake rechazado (mode=${mode}, token match=${token === expected})`);
  return new NextResponse('Forbidden', { status: 403 });
}

// ─── POST: eventos de Meta ───────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Leer body crudo para validar HMAC (no usar request.json() antes)
  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256') || '';

  if (!verifySignature(rawBody, signature)) {
    console.warn('[wa-webhook] firma inválida — rechazando');
    return new NextResponse('Invalid signature', { status: 401 });
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    console.warn('[wa-webhook] body no es JSON válido');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // Procesar en background para devolver 200 rápido (Meta reintenta si tardamos >15s)
  processPayload(payload).catch((err) => {
    console.error('[wa-webhook] processPayload error:', err?.message || err);
  });

  return NextResponse.json({ received: true }, { status: 200 });
}

// ─── Validación HMAC ─────────────────────────────────────────────────────────

function verifySignature(rawBody: string, signatureHeader: string): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.error('[wa-webhook] WHATSAPP_APP_SECRET no configurado');
    return false;
  }
  if (!signatureHeader.startsWith('sha256=')) return false;

  const received = signatureHeader.slice('sha256='.length);
  const expected = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody, 'utf8')
    .digest('hex');

  // timing-safe compare
  const a = Buffer.from(received, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// ─── Procesamiento de eventos ────────────────────────────────────────────────

interface MetaTextMessage { body: string }
interface MetaMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: MetaTextMessage;
  image?: { caption?: string; mime_type?: string; sha256?: string; id?: string };
  audio?: { mime_type?: string; sha256?: string; id?: string; voice?: boolean };
  video?: { caption?: string; mime_type?: string; sha256?: string; id?: string };
  document?: { caption?: string; filename?: string; mime_type?: string; id?: string };
  button?: { text?: string; payload?: string };
  interactive?: { button_reply?: { id: string; title: string }; list_reply?: { id: string; title: string } };
  reaction?: { message_id: string; emoji: string };
  location?: { latitude: number; longitude: number; name?: string };
  contacts?: unknown;
  sticker?: { id: string };
}
interface MetaStatus {
  id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id: string;
  errors?: Array<{ code: number; title: string; message?: string }>;
}
interface MetaChange {
  value: {
    messaging_product?: string;
    metadata?: { display_phone_number?: string; phone_number_id?: string };
    contacts?: Array<{ profile?: { name?: string }; wa_id: string }>;
    messages?: MetaMessage[];
    statuses?: MetaStatus[];
  };
  field: string;
}
interface MetaWebhookPayload {
  object?: string;
  entry?: Array<{ id: string; changes: MetaChange[] }>;
}

async function processPayload(payload: MetaWebhookPayload) {
  if (payload.object !== 'whatsapp_business_account') return;

  for (const entry of payload.entry || []) {
    for (const change of entry.changes || []) {
      if (change.field !== 'messages') continue;
      const { messages, statuses } = change.value;

      if (messages?.length) {
        for (const msg of messages) {
          await handleInboundMessage(msg).catch((err) =>
            console.error('[wa-webhook] handleInboundMessage error:', err?.message || err)
          );
        }
      }
      if (statuses?.length) {
        for (const st of statuses) {
          await handleStatus(st).catch((err) =>
            console.error('[wa-webhook] handleStatus error:', err?.message || err)
          );
        }
      }
    }
  }
}

function extractText(msg: MetaMessage): string {
  switch (msg.type) {
    case 'text': return msg.text?.body || '';
    case 'image': return msg.image?.caption || '';
    case 'video': return msg.video?.caption || '';
    case 'document': return msg.document?.caption || msg.document?.filename || '';
    case 'button': return msg.button?.text || msg.button?.payload || '';
    case 'interactive':
      return msg.interactive?.button_reply?.title
        || msg.interactive?.list_reply?.title
        || '';
    case 'reaction': return `[reacción: ${msg.reaction?.emoji || ''}]`;
    case 'location':
      return msg.location?.name
        ? `[ubicación: ${msg.location.name}]`
        : `[ubicación: ${msg.location?.latitude}, ${msg.location?.longitude}]`;
    default: return '';
  }
}

function normalizeMessageType(rawType: string): string {
  const allowed = ['text', 'image', 'audio', 'video', 'document', 'button', 'interactive', 'reaction', 'sticker', 'location', 'contacts'];
  return allowed.includes(rawType) ? rawType : 'unknown';
}

async function handleInboundMessage(msg: MetaMessage) {
  await connectDB();

  const fromPhone = msg.from;
  const wamid = msg.id;
  const messageText = extractText(msg);
  const messageType = normalizeMessageType(msg.type);

  // Dedupe por wamid: si ya lo procesamos, skip
  const existing = await WhatsAppMessage.findOne({ wamid }).lean();
  if (existing) {
    console.log(`[wa-webhook] wamid ${wamid} ya procesado — skip`);
    return;
  }

  // Buscar lead por teléfono (con o sin +)
  const phoneRegex = new RegExp(`^\\+?${escapeRegex(fromPhone)}$`);
  const lead = await Lead.findOne({ phone: phoneRegex });
  const leadId = lead?._id;

  // Guardar mensaje
  try {
    await WhatsAppMessage.create({
      leadId: leadId || undefined,
      wamid,
      phone: fromPhone,
      direction: 'inbound',
      type: messageType,
      text: messageText,
      raw: msg,
    });
  } catch (err: unknown) {
    // Si es error de duplicado (race condition), ignoramos
    const code = (err as { code?: number } | null)?.code;
    if (code !== 11000) throw err;
    console.log(`[wa-webhook] race-condition wamid ${wamid} — skip`);
    return;
  }

  let isNewInbound = false;
  // Actualizar lead si existe
  if (lead) {
    isNewInbound = !lead.lastInboundAt;
    await Lead.findByIdAndUpdate(leadId, {
      lastInboundAt: new Date(),
      $inc: { inboundCount: 1 },
    });
  }

  // Reenviar a Telegram (fire-and-forget dentro del handler)
  await forwardInboundToTelegram({
    lead: lead ? {
      _id: lead._id,
      businessName: lead.businessName,
      phone: lead.phone,
      city: lead.city,
      sector: lead.sector,
      slug: lead.slug,
    } : null,
    fromPhone,
    messageType,
    messageText,
    isNewInbound,
  });

  console.log(`[wa-webhook] inbound ${messageType} de +${fromPhone} ${lead ? `(lead ${leadId})` : '(sin lead)'} → Telegram`);
}

async function handleStatus(st: MetaStatus) {
  await connectDB();

  const update: Record<string, unknown> = { status: st.status };
  const ts = new Date(parseInt(st.timestamp, 10) * 1000);
  const tsField = `statusTimestamps.${st.status}At`;
  update[tsField] = ts;

  if (st.status === 'failed' && st.errors?.length) {
    update.errorMessage = st.errors.map((e) => `${e.code}: ${e.title}`).join(' | ');
  }

  await WhatsAppMessage.findOneAndUpdate({ wamid: st.id }, update);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
