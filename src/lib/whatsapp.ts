/**
 * WhatsApp Business Cloud API — Módulo reutilizable
 *
 * Envía mensajes vía Meta Cloud API (graph.facebook.com).
 * DRY_RUN seguro por defecto: solo manda al número real cuando
 * WHATSAPP_DRY_RUN es explícitamente "false".
 *
 * Nunca tira excepciones — loguea y devuelve resultado.
 */

import { Lead, WhatsAppMessage } from './mongodb';

// ─── Config ──────────────────────────────────────────────────────────────────

const GRAPH_API_VERSION = 'v21.0';

function getConfig() {
  return {
    token: process.env.WHATSAPP_TOKEN || '',
    phoneId: process.env.WHATSAPP_PHONE_ID || '',
    isDryRun: process.env.WHATSAPP_DRY_RUN !== 'false', // safe by default
    dryRunNumber: process.env.WHATSAPP_DRY_RUN_NUMBER || '+34617680026',
    templateName: process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world',
    templateLang: process.env.WHATSAPP_TEMPLATE_LANG || 'en_US',
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface NotifyResult {
  sent: boolean;
  skipped?: boolean;
  reason?: string;
  messageId?: string;
}

interface SendTemplateOpts {
  to: string;
  templateName?: string;
  languageCode?: string;
  params?: string[];
}

interface SendTextOpts {
  to: string;
  message: string;
}

// ─── Utils ───────────────────────────────────────────────────────────────────

/** Limpia un número de teléfono: quita +, espacios, guiones, paréntesis */
export function cleanPhone(raw: string): string {
  return raw.replace(/[\s+\-()]/g, '');
}

// ─── Core: enviar template ───────────────────────────────────────────────────

export async function sendTemplate(opts: SendTemplateOpts): Promise<WhatsAppResult> {
  const config = getConfig();

  if (!config.token || !config.phoneId) {
    const msg = '[whatsapp] WHATSAPP_TOKEN o WHATSAPP_PHONE_ID no configurados — omitiendo envío';
    console.warn(msg);
    return { success: false, error: msg };
  }

  const phone = cleanPhone(opts.to);
  if (!phone || phone.length < 8) {
    const msg = `[whatsapp] Número inválido: "${opts.to}" → "${phone}"`;
    console.warn(msg);
    return { success: false, error: msg };
  }

  const templateName = opts.templateName || config.templateName;
  const languageCode = opts.languageCode || config.templateLang;

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${config.phoneId}/messages`;

  // Body base del template
  const body: any = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
    },
  };

  // Agregar parámetros si hay (para templates con variables como web_lista)
  if (opts.params && opts.params.length > 0) {
    body.template.components = [
      {
        type: 'body',
        parameters: opts.params.map(val => ({ type: 'text', text: val })),
      },
    ];
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      console.error(`[whatsapp] Error API (${response.status}): ${errorMsg}`);
      return { success: false, error: errorMsg };
    }

    const messageId = data?.messages?.[0]?.id || '';
    console.log(`[whatsapp] Template "${templateName}" enviado a ${phone} → msgId: ${messageId}`);
    return { success: true, messageId };
  } catch (err: any) {
    console.error(`[whatsapp] Excepción al enviar: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// ─── Core: enviar texto libre (futuro) ───────────────────────────────────────

export async function sendText(opts: SendTextOpts): Promise<WhatsAppResult> {
  const config = getConfig();

  if (!config.token || !config.phoneId) {
    const msg = '[whatsapp] WHATSAPP_TOKEN o WHATSAPP_PHONE_ID no configurados — omitiendo envío';
    console.warn(msg);
    return { success: false, error: msg };
  }

  const phone = cleanPhone(opts.to);
  if (!phone || phone.length < 8) {
    const msg = `[whatsapp] Número inválido: "${opts.to}" → "${phone}"`;
    console.warn(msg);
    return { success: false, error: msg };
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${config.phoneId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: opts.message },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      console.error(`[whatsapp] Error API texto (${response.status}): ${errorMsg}`);
      return { success: false, error: errorMsg };
    }

    const messageId = data?.messages?.[0]?.id || '';
    console.log(`[whatsapp] Texto enviado a ${phone} → msgId: ${messageId}`);
    return { success: true, messageId };
  } catch (err: any) {
    console.error(`[whatsapp] Excepción al enviar texto: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// ─── Helper: notificar a un lead cuando su web está live ─────────────────────

/**
 * Envía WhatsApp template al lead (o al número dry-run).
 * NON-BLOCKING: se llama con fire-and-forget desde el pipeline.
 * Actualiza whatsappMessageId y whatsappSentAt en el lead si tiene éxito.
 *
 * Para templates con variables (web_lista), valida que el lead tenga
 * los datos obligatorios. Si faltan → skip (no se envía basura).
 */
export async function notifyLeadViaWhatsApp(lead: any): Promise<NotifyResult> {
  const config = getConfig();
  const now = new Date().toISOString();
  const leadId = lead._id?.toString() || 'unknown';
  const leadName = lead.businessName || '';
  const leadPhone = lead.phone;

  // Sin teléfono → skip
  if (!leadPhone) {
    console.log(`[whatsapp] ${now} | leadId=${leadId} | skipped: sin teléfono`);
    return { sent: false, skipped: true, reason: 'sin teléfono' };
  }

  // Para templates con variables, validar datos obligatorios
  const isParameterized = config.templateName !== 'hello_world';
  if (isParameterized) {
    if (!lead.businessName) {
      console.log(`[whatsapp] ${now} | leadId=${leadId} | skipped: lead incompleto (sin businessName)`);
      return { sent: false, skipped: true, reason: 'sin businessName' };
    }
    if (!lead.slug) {
      console.log(`[whatsapp] ${now} | leadId=${leadId} | ${leadName} | skipped: lead incompleto (sin slug/webUrl)`);
      return { sent: false, skipped: true, reason: 'sin slug (no hay web generada)' };
    }
  }

  // DRY-RUN: redirigir al número de test
  let targetPhone = leadPhone;
  if (config.isDryRun) {
    targetPhone = config.dryRunNumber;
    console.log(`[whatsapp] [DRY-RUN para ${leadName}] Redirigiendo a ${config.dryRunNumber} (real: ${leadPhone})`);
  }

  // Preparar params según template
  const webUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.es'}/${lead.slug}`;
  let params: string[] | undefined;

  if (!isParameterized) {
    params = undefined;
  } else {
    // web_lista: {{1}} nombre_contacto, {{2}} nombre_negocio, {{3}} url_web
    // {{1}} = "👋" (genérico, evita "Hola Cerrajería 24h Rosario" que queda mal)
    params = ['👋', lead.businessName, webUrl];
  }

  if (params) {
    console.log(`[whatsapp] Params para "${config.templateName}": ${JSON.stringify(params)}`);
  }

  const result = await sendTemplate({
    to: targetPhone,
    templateName: config.templateName,
    languageCode: config.templateLang,
    params,
  });

  // Log estructurado
  console.log(
    `[whatsapp] ${now} | leadId=${leadId} | phone=${cleanPhone(targetPhone)} | ` +
    `template=${config.templateName} | dryRun=${config.isDryRun} | ` +
    `success=${result.success}${result.error ? ` | error=${result.error}` : ''}`
  );

  // Actualizar lead en Mongo (si tiene éxito)
  if (result.success && result.messageId) {
    try {
      await Lead.findByIdAndUpdate(leadId, {
        whatsappMessageId: result.messageId,
        whatsappSentAt: new Date(),
      });
    } catch (err: any) {
      console.error(`[whatsapp] Error actualizando lead ${leadId} en Mongo: ${err.message}`);
    }
  }

  return { sent: result.success, messageId: result.messageId };
}

// ─── Helper: enviar texto libre a un lead (ventana 24h) ──────────────────────

export interface ReplyResult {
  sent: boolean;
  messageId?: string;
  error?: string;
  reason?: 'no-lead' | 'no-phone' | 'no-inbound' | 'out-of-window' | 'api-error';
}

const WINDOW_24H_MS = 24 * 60 * 60 * 1000;

/**
 * Envía un mensaje de texto libre a un lead por WhatsApp.
 * Requiere que el lead haya escrito al número de negocio en las últimas 24h
 * (regla de Meta para mensajes no-template).
 *
 * Respeta WHATSAPP_DRY_RUN (si está activo, redirige al número de test).
 * Guarda el outbound en WhatsAppMessage.
 */
export async function sendFreeTextToLead(leadId: string, text: string): Promise<ReplyResult> {
  const lead = await Lead.findById(leadId);
  if (!lead) {
    return { sent: false, reason: 'no-lead', error: `Lead ${leadId} no encontrado` };
  }
  if (!lead.phone) {
    return { sent: false, reason: 'no-phone', error: `Lead ${leadId} sin teléfono` };
  }

  // Ventana de 24h: Meta solo permite texto libre si el lead escribió en ese rango
  if (!lead.lastInboundAt) {
    return {
      sent: false,
      reason: 'no-inbound',
      error: 'El lead aún no escribió al número. Usá un template aprobado en su lugar.',
    };
  }
  const msSinceInbound = Date.now() - new Date(lead.lastInboundAt).getTime();
  if (msSinceInbound > WINDOW_24H_MS) {
    const hours = Math.round(msSinceInbound / 3_600_000);
    return {
      sent: false,
      reason: 'out-of-window',
      error: `Ventana de 24h cerrada (último inbound hace ~${hours}h). Usá un template.`,
    };
  }

  const config = getConfig();
  let targetPhone = lead.phone;
  if (config.isDryRun) {
    targetPhone = config.dryRunNumber;
    console.log(`[whatsapp] [DRY-RUN reply para ${lead.businessName}] Redirigiendo a ${config.dryRunNumber} (real: ${lead.phone})`);
  }

  const result = await sendText({ to: targetPhone, message: text });

  if (result.success && result.messageId) {
    try {
      await WhatsAppMessage.create({
        leadId: lead._id,
        wamid: result.messageId,
        phone: cleanPhone(targetPhone),
        direction: 'outbound',
        type: 'text',
        text,
        status: 'sent',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[whatsapp] Error guardando outbound en WhatsAppMessage: ${msg}`);
      // No bloqueamos el resultado al caller si el guardado falla
    }
    return { sent: true, messageId: result.messageId };
  }

  return { sent: false, reason: 'api-error', error: result.error };
}
