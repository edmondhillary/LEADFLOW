/**
 * Envío de link de pago Stripe a un lead por WhatsApp.
 *
 * Decisión de canal:
 *   - Si el lead está dentro de la ventana de 24h (lastInboundAt < 24h) → texto libre
 *   - Si está fuera o nunca escribió → template `pago_link` (debe estar aprobado en Meta)
 *
 * Respeta WHATSAPP_DRY_RUN (igual que el resto del módulo).
 * Guarda el outbound en WhatsAppMessage con relatedStripePaymentLinkId para trazabilidad.
 */

import { Lead, WhatsAppMessage } from './mongodb';
import { sendTemplate, sendText, cleanPhone } from './whatsapp';
import { createPaymentLink } from '../../skills/payments/index';

export interface SendStripeOpts {
  leadId: string;
  services?: string[];     // array de service keys (webBasic, seoMonthly, ...)
  amountCents?: number;    // override opcional (si no, createPaymentLink calcula por services)
  templateName?: string;   // default 'pago_link'
  templateLang?: string;   // default 'es'
}

export interface SendStripeResult {
  ok: boolean;
  paymentLinkUrl?: string;
  channel?: 'free-text' | 'template';
  messageId?: string;
  error?: string;
  reason?: 'no-lead' | 'no-phone' | 'stripe-failed' | 'template-failed' | 'freetext-failed';
}

const WINDOW_24H_MS = 24 * 60 * 60 * 1000;

export async function sendStripeLinkToLead(opts: SendStripeOpts): Promise<SendStripeResult> {
  const templateName = opts.templateName || 'pago_link';
  const templateLang = opts.templateLang || 'es';

  const lead = await Lead.findById(opts.leadId);
  if (!lead) return { ok: false, reason: 'no-lead', error: `Lead ${opts.leadId} no encontrado` };
  if (!lead.phone) return { ok: false, reason: 'no-phone', error: `Lead sin teléfono` };

  // 1 — crear el payment link
  const paymentLinkUrl = await createPaymentLink({
    leadId: opts.leadId,
    amountCents: opts.amountCents,
    services: opts.services,
  });
  if (!paymentLinkUrl) {
    return { ok: false, reason: 'stripe-failed', error: 'createPaymentLink devolvió null' };
  }

  // 2 — decidir canal
  const isDryRun = process.env.WHATSAPP_DRY_RUN !== 'false';
  const dryRunNumber = process.env.WHATSAPP_DRY_RUN_NUMBER || '+34617680026';
  const targetPhone = isDryRun ? dryRunNumber : lead.phone;

  const inWindow = !!(lead.lastInboundAt &&
    (Date.now() - new Date(lead.lastInboundAt).getTime()) < WINDOW_24H_MS);

  // 3 — enviar + log
  const monthlyEur = (opts.amountCents ?? (lead.monthlyTotal ? lead.monthlyTotal * 100 : 2500)) / 100;

  if (inWindow) {
    const message =
      `Hola ${lead.businessName}, soy Edu de Nexify. Te dejo el link de pago seguro por Stripe:\n\n` +
      `${paymentLinkUrl}\n\n` +
      `Importe: ${monthlyEur}€/mes. Podés cancelar cuando quieras desde el mismo link. Cualquier duda acá estoy.`;

    const result = await sendText({ to: targetPhone, message });
    if (!result.success) {
      return { ok: false, paymentLinkUrl, channel: 'free-text', reason: 'freetext-failed', error: result.error };
    }

    await persistOutbound({
      leadId: opts.leadId,
      wamid: result.messageId,
      phone: cleanPhone(targetPhone),
      text: message,
      paymentLinkId: lead.stripePaymentLinkId,
    });

    return {
      ok: true,
      paymentLinkUrl,
      channel: 'free-text',
      messageId: result.messageId,
    };
  }

  // Template path — necesita que `pago_link` esté aprobado en Meta.
  const params = [lead.businessName, String(monthlyEur), paymentLinkUrl];
  const result = await sendTemplate({
    to: targetPhone,
    templateName,
    languageCode: templateLang,
    params,
  });
  if (!result.success) {
    return { ok: false, paymentLinkUrl, channel: 'template', reason: 'template-failed', error: result.error };
  }

  await persistOutbound({
    leadId: opts.leadId,
    wamid: result.messageId,
    phone: cleanPhone(targetPhone),
    template: templateName,
    params,
    paymentLinkId: lead.stripePaymentLinkId,
  });

  return {
    ok: true,
    paymentLinkUrl,
    channel: 'template',
    messageId: result.messageId,
  };
}

async function persistOutbound(opts: {
  leadId: string;
  wamid?: string;
  phone: string;
  text?: string;
  template?: string;
  params?: string[];
  paymentLinkId?: string;
}): Promise<void> {
  try {
    await WhatsAppMessage.create({
      leadId: opts.leadId,
      wamid: opts.wamid,
      phone: opts.phone,
      direction: 'outbound',
      type: 'text',
      text: opts.text,
      template: opts.template,
      params: opts.params,
      status: 'sent',
      relatedStripePaymentLinkId: opts.paymentLinkId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[wa-stripe] no pude guardar outbound: ${msg}`);
  }
}
