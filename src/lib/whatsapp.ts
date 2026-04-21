/**
 * WhatsApp Business Cloud API — Módulo reutilizable
 *
 * Envía mensajes vía Meta Cloud API (graph.facebook.com).
 * DRY_RUN seguro por defecto: solo manda al número real cuando
 * WHATSAPP_DRY_RUN es explícitamente "false".
 *
 * Nunca tira excepciones — loguea y devuelve resultado.
 */

import { Lead } from './mongodb';

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
 */
export async function notifyLeadViaWhatsApp(lead: any): Promise<void> {
  const config = getConfig();
  const now = new Date().toISOString();
  const leadId = lead._id?.toString() || 'unknown';
  const leadName = lead.businessName || 'Sin nombre';
  const leadPhone = lead.phone;

  // Sin teléfono → no se puede notificar
  if (!leadPhone) {
    console.log(`[whatsapp] ${now} | leadId=${leadId} | ${leadName} | SIN TELÉFONO — omitido`);
    return;
  }

  // DRY-RUN: redirigir al número de test
  let targetPhone = leadPhone;
  if (config.isDryRun) {
    targetPhone = config.dryRunNumber;
    console.log(`[whatsapp] [DRY-RUN para ${leadName}] Redirigiendo a ${config.dryRunNumber} (real: ${leadPhone})`);
  }

  // Preparar params para cuando la template "web_lista" esté aprobada
  // Por ahora con hello_world no se usan, pero queda listo
  const webUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.es'}/${lead.slug}`;
  const params = config.templateName === 'hello_world'
    ? undefined
    : [leadName, lead.businessName, webUrl];

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
}
