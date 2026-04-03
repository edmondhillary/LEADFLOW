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

type PipelineNotifyPayload = {
  status: 'ok' | 'partial' | 'failed';
  sector: string;
  city: string;
  country: string;
  limit: number;
  ecoMode: boolean;
  strictCityFilter: boolean;
  apifyRuns: number;
  totalScraped: number;
  skippedByGeo: number;
  candidateLeads: number;
  generatedWebs: number;
  failedWebs: number;
  estimatedCostUsd: number;
  estimatedCostPerWebUsd: number;
  durationMs: number;
  notes?: string[];
  error?: string;
};

function statusEmoji(status: PipelineNotifyPayload['status']): string {
  if (status === 'ok') return '✅';
  if (status === 'partial') return '⚠️';
  return '❌';
}

function fmtUsd(value: number): string {
  return `$${(value || 0).toFixed(4)}`;
}

export async function notifyPipelineRun(payload: PipelineNotifyPayload) {
  const enabled = process.env.TELEGRAM_NOTIFY_PIPELINE_METRICS !== '0';
  if (!enabled) return;

  const lines = [
    `📈 PIPELINE ${statusEmoji(payload.status)} ${payload.status.toUpperCase()}`,
    '',
    `🧭 ${payload.sector} · ${payload.city}, ${payload.country} · límite ${payload.limit}`,
    `⚙️ ECO ${payload.ecoMode ? 'ON' : 'OFF'} | Filtro ciudad ${payload.strictCityFilter ? 'ON' : 'OFF'}`,
    `⏱️ Duración: ${Math.round((payload.durationMs || 0) / 1000)}s`,
    '',
    `💸 Coste est.: ${fmtUsd(payload.estimatedCostUsd)} | Coste/web: ${fmtUsd(payload.estimatedCostPerWebUsd)}`,
    `🔁 Apify runs: ${payload.apifyRuns} | Scraped: ${payload.totalScraped} | Filtrados geo: ${payload.skippedByGeo}`,
    `🎯 Candidatos: ${payload.candidateLeads} | 🌐 Webs: ${payload.generatedWebs} | ❌ Errores: ${payload.failedWebs}`,
  ];

  if (payload.notes?.length) {
    lines.push(`📝 Notes: ${payload.notes.slice(0, 5).join(', ')}`);
  }
  if (payload.error) {
    lines.push(`🚨 Error: ${String(payload.error).slice(0, 240)}`);
  }

  await sendTelegramMessage({
    chat_id: CHAT_ID || '',
    text: lines.join('\n'),
    disable_web_page_preview: true,
  });

  const alertThreshold = Number(process.env.TELEGRAM_COST_PER_WEB_ALERT_USD || 0.5);
  if (payload.generatedWebs > 0 && payload.estimatedCostPerWebUsd >= alertThreshold) {
    await sendTelegramMessage({
      chat_id: CHAT_ID || '',
      text:
        `🚨 ALERTA COSTE/WEB\n\n` +
        `${payload.sector} · ${payload.city}, ${payload.country}\n` +
        `Coste/web: ${fmtUsd(payload.estimatedCostPerWebUsd)} (umbral ${fmtUsd(alertThreshold)})\n` +
        `Revisa filtros/ciudad/cache para bajar gasto.`,
      disable_web_page_preview: true,
    });
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
