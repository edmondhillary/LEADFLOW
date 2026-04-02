/**
 * Telegram notifications (NO polling).
 *
 * This module is safe to import from Next.js route handlers.
 * Do NOT start a long-polling bot here.
 */

import { connectDB, Lead } from '@/lib/mongodb';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BASE_URL = process.env.NGROK_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';

type SendMessagePayload = {
  chat_id: string;
  text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  disable_web_page_preview?: boolean;
};

async function sendTelegramMessage(payload: SendMessagePayload): Promise<void> {
  if (!TOKEN || !CHAT_ID) {
    console.warn('[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID; skipping notify.');
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, chat_id: CHAT_ID }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.error('[telegram] sendMessage failed:', res.status, txt);
    }
  } catch (err: any) {
    console.error('[telegram] sendMessage error:', err?.message || String(err));
  }
}

export async function notifyServiceAlert(service: 'vercel' | 'mongodb', error: string) {
  await sendTelegramMessage({
    chat_id: CHAT_ID || '',
    text:
      `ALERTA DE SERVICIO\n\n` +
      `Servicio: ${service === 'vercel' ? 'Vercel' : 'MongoDB'}\n` +
      `Error: ${error}\n\n` +
      `Revisar urgentemente.`,
    disable_web_page_preview: true,
  });
}

export async function notifyVisit(leadId: string, visitCount: number, isHot: boolean) {
  try {
    await connectDB();
    const lead = await Lead.findById(leadId).lean() as any;
    if (!lead) return;

    const waNumber = (lead.phone || '').replace(/\D/g, '');
    const waMsg = encodeURIComponent(
      `Hola, he visto la web que han creado para ${lead.businessName} y me interesa. ¿Pueden darme más información?`,
    );

    await sendTelegramMessage({
      chat_id: CHAT_ID || '',
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      text:
        `VISITA${isHot ? ' (LEAD CALIENTE)' : ''}\n\n` +
        `*${lead.businessName}*\n` +
        `${lead.city}, ${lead.country}\n` +
        `${lead.sector}\n` +
        `Visitas: *${visitCount}*\n\n` +
        `Web: ${BASE_URL}/${lead.slug}` +
        (waNumber ? `\nWhatsApp: https://wa.me/${waNumber}?text=${waMsg}` : ''),
    });
  } catch (err: any) {
    console.error('[telegram] notifyVisit error:', err?.message || String(err));
  }
}

export async function notifyNewClient(leadId: string, monthlyTotal: number) {
  try {
    await connectDB();
    const lead = await Lead.findById(leadId).lean() as any;
    if (!lead) return;

    await sendTelegramMessage({
      chat_id: CHAT_ID || '',
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
      text:
        `NUEVO CLIENTE\n\n` +
        `*${lead.businessName}*\n` +
        `${lead.city}, ${lead.country}\n` +
        `${lead.sector}\n` +
        `MRR: *${monthlyTotal}€/mes*\n\n` +
        `Web: ${BASE_URL}/${lead.slug}`,
    });
  } catch (err: any) {
    console.error('[telegram] notifyNewClient error:', err?.message || String(err));
  }
}
