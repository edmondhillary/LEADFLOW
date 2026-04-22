/**
 * Helpers para notificar a Telegram desde entornos serverless (Vercel),
 * donde no hay instancia persistente de node-telegram-bot-api.
 *
 * Usa la Bot API HTTP directa: https://core.telegram.org/bots/api
 */

const TELEGRAM_API = 'https://api.telegram.org';

interface TelegramSendOpts {
  text: string;
  parseMode?: 'Markdown' | 'HTML';
  replyMarkup?: unknown;
  disableWebPagePreview?: boolean;
}

export async function sendTelegramMessage(opts: TelegramSendOpts): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no configurados — omitiendo notificación');
    return false;
  }

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: opts.text,
    parse_mode: opts.parseMode || 'Markdown',
  };
  if (opts.replyMarkup) body.reply_markup = opts.replyMarkup;
  if (opts.disableWebPagePreview) body.disable_web_page_preview = true;

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error(`[telegram] sendMessage ${res.status}: ${errText.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[telegram] sendMessage excepción: ${msg}`);
    return false;
  }
}

function escapeMarkdown(text: string): string {
  // Escapa solo los caracteres problemáticos de Markdown legacy
  return text.replace(/([_*`\[])/g, '\\$1');
}

interface InboundForwardOpts {
  lead: {
    _id: { toString(): string } | string;
    businessName?: string;
    phone?: string;
    city?: string;
    sector?: string;
    slug?: string;
  } | null;
  fromPhone: string;
  messageType: string;
  messageText: string;
  isNewInbound: boolean;
}

/**
 * Reenvía un mensaje entrante de WhatsApp al chat de Telegram configurado.
 * Formato ordenado: cabecera con contexto del lead, cuerpo del mensaje,
 * y un footer con el comando /reply listo para copiar.
 */
export async function forwardInboundToTelegram(opts: InboundForwardOpts): Promise<boolean> {
  const { lead, fromPhone, messageType, messageText, isNewInbound } = opts;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.es';

  const header = lead
    ? `📩 *Respuesta de ${escapeMarkdown(lead.businessName || 'Lead sin nombre')}*`
    : `📩 *Mensaje de número desconocido*`;

  const contextLine = lead
    ? `\`+${fromPhone}\` · ${escapeMarkdown(lead.city || '—')} · ${escapeMarkdown(lead.sector || '—')}`
    : `\`+${fromPhone}\` · no está en nuestra base`;

  const typeBadge = messageType === 'text' ? '' : ` _[${messageType}]_`;

  const body = messageText
    ? `\n\n💬${typeBadge}\n"${escapeMarkdown(messageText.slice(0, 800))}"${messageText.length > 800 ? ' …' : ''}`
    : `\n\n_[mensaje ${messageType} sin texto]_`;

  let footer = '';
  if (lead) {
    const leadId = typeof lead._id === 'string' ? lead._id : lead._id.toString();
    const webLine = lead.slug ? `🌐 ${baseUrl}/${lead.slug}\n` : '';
    const newBadge = isNewInbound ? ' 🆕' : '';
    footer =
      `\n\n${webLine}🆔 \`${leadId}\`${newBadge}\n\n` +
      `_Responder:_ \`/reply ${leadId} tu mensaje\``;
  }

  return sendTelegramMessage({
    text: header + '\n' + contextLine + body + footer,
    parseMode: 'Markdown',
    disableWebPagePreview: true,
  });
}
