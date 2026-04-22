/**
 * BOT DE TELEGRAM — Centro de Control LeadFlow v3
 *
 * Cambios v3:
 * - 22 sectores disponibles (todos los templates)
 * - Sin paso "modo" ni "WhatsApp test/prod" (simplificado)
 * - Info completa mejorada con copywriter + JSON crudo
 * - /stripe genera link dinámico con selección de servicios
 * - Health alerts para Vercel y MongoDB
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import TelegramBot from 'node-telegram-bot-api';
import { connectDB, Lead, PipelineRun, WebsiteContent, BroadcastRun } from '../lib/mongodb';
import { runPipeline, processSingleLead } from '../../skills/generate';
import { createPaymentLink } from '../../skills/payments/index';
import { runCleanup } from '../../skills/cleanup/index';
import { sendFreeTextToLead } from '../lib/whatsapp';
import {
  runBroadcast,
  countTargets,
  previewTargets,
  webListaParams,
  type BroadcastProgress,
} from '../lib/whatsapp-broadcast';
import { describeFilter, type BroadcastFilterSpec } from '../lib/broadcast-filters';
import { sendStripeLinkToLead } from '../lib/whatsapp-stripe';
import { getSectorKeyboard, slugFromLabel } from '../config/sectors';
import cron from 'node-cron';
import { runAutoPipeline, formatAutoReport, formatDailyReport } from './auto-pipeline';
import { getDailyStats, canRun, resetDailyCounters } from '../lib/scrape-scheduler';

const TOKEN    = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID  = process.env.TELEGRAM_CHAT_ID!;
const BASE_URL = process.env.NGROK_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';

if (!TOKEN || !CHAT_ID) {
  console.error('TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID son obligatorios en .env.local');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// ─── Sectores: leídos de src/config/sectors.ts (fuente única de verdad) ──────
// Para añadir un sector nuevo: solo editar src/config/sectors.json

// Precios de servicios (en céntimos para Stripe)
const SERVICE_PRICES: Record<string, number> = {
  webBasic:         2500,   // 25€
  seoMonthly:       1500,   // 15€
  blogContent:       500,   // 5€
  reviewManagement: 5000,   // 50€
  socialMedia:     10000,   // 100€
  webMaintenance:   1000,   // 10€
  emailMarketing:   2000,   // 20€
  adsManagement:   15000,   // 150€
  whatsappBot:      3000,   // 30€
};

const SERVICE_LABELS: Record<string, string> = {
  webBasic:         '🌐 Web básica — 25€/mes',
  seoMonthly:       '🔍 SEO mensual — +15€/mes',
  blogContent:      '📝 Blog/contenido — +5€/mes',
  reviewManagement: '⭐ Reseñas + Google Maps — +50€/mes',
  socialMedia:      '📱 Redes sociales — +100€/mes',
  webMaintenance:   '🔧 Mantenimiento web — +10€/mes',
  emailMarketing:   '📧 Email marketing — +20€/mes',
  adsManagement:    '📣 Gestión Ads — +150€/mes',
  whatsappBot:      '💬 Bot WhatsApp — +30€/mes',
};

// ─── Estado de sesión ────────────────────────────────────────────────────────

interface Session {
  step: 'idle' | 'sector' | 'country' | 'city' | 'limit' | 'confirm' | 'running'
      | 'stripe_lead' | 'stripe_services'
      | 'broadcast_confirm' | 'broadcast_running';
  sector?: string;
  city?: string;
  country?: string;
  limit?: number;
  // stripe flow
  stripeLead?: any;
  stripeServices?: string[];
  // broadcast flow
  broadcastFilter?: BroadcastFilterSpec;
  broadcastTemplate?: string;
}

const session: Session = { step: 'idle' };

// ─── Estado global de broadcast (1 a la vez) ─────────────────────────────────

let currentBroadcastRunId: string | null = null;
let broadcastCancelFlag = false;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAuthorized(chatId: number): boolean {
  return chatId.toString() === CHAT_ID;
}

async function sendMsg(text: string, opts?: TelegramBot.SendMessageOptions) {
  return bot.sendMessage(CHAT_ID, text, { parse_mode: 'Markdown', ...opts });
}

async function sendMsgPlain(text: string, opts?: TelegramBot.SendMessageOptions) {
  return bot.sendMessage(CHAT_ID, text, opts);
}

function escapeHtml(text: string = ''): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendMsgHtml(html: string, opts?: TelegramBot.SendMessageOptions) {
  return bot.sendMessage(CHAT_ID, html, { parse_mode: 'HTML', ...opts });
}

function extractImageUrls(html: string, baseUrl: string): string[] {
  const urls: string[] = [];
  const seen = new Set<string>();
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const raw = (m[1] || '').trim();
    if (!raw || raw.startsWith('data:') || raw.startsWith('blob:')) continue;
    if (raw.startsWith('/api/track/')) continue;
    const decoded = raw
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    let abs = decoded;
    if (raw.startsWith('/')) abs = `${baseUrl}${raw}`;
    if (!/^https?:\/\//i.test(abs)) continue;
    if (!seen.has(abs)) {
      seen.add(abs);
      urls.push(abs);
    }
  }
  return urls;
}

async function urlIsReachable(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    let res = await fetch(url, { method: 'HEAD', signal: controller.signal, redirect: 'follow' });
    if (res.status === 405 || res.status === 403) {
      res = await fetch(url, { method: 'GET', signal: controller.signal, redirect: 'follow' });
    }
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function verifyLeadImageHealth(lead: any): Promise<{ ok: boolean; fixed: boolean; broken: number; degraded?: boolean }> {
  const pageUrl = `${BASE_URL}/${lead.slug}`;
  try {
    const res = await fetch(pageUrl, { redirect: 'follow' });
    if (!res.ok) return { ok: false, fixed: false, broken: 1 };
    const html = await res.text();
    const images = extractImageUrls(html, BASE_URL).slice(0, 25);
    if (images.length === 0) return { ok: true, fixed: false, broken: 0 };

    const checks = await Promise.all(images.map((u) => urlIsReachable(u)));
    const brokenCount = checks.filter((ok) => !ok).length;
    if (brokenCount === 0) return { ok: true, fixed: false, broken: 0 };

    const brokenUrls = images.filter((_, i) => !checks[i]);
    let didFix = false;

    // Fix 1: si la imagen del dueño (scrape) está caída, desactivamos imageUrl para forzar fallback del template.
    const rawImage = lead?.rawScrapeData?.imageUrl || lead?.rawScrapeData?.normalized?.imageUrl;
    if (rawImage) {
      await Lead.findByIdAndUpdate(lead._id, {
        $set: {
          'rawScrapeData.imageUrl': null,
          'rawScrapeData.normalized.imageUrl': null,
        },
      });
      didFix = true;
    }

    // Fix 2: reemplazar imágenes Unsplash caídas en WebsiteContent HTML con fallbacks del sector.
    const unsplashBroken = brokenUrls.filter((u) => u.includes('images.unsplash.com'));
    if (unsplashBroken.length > 0 && lead.contentRef) {
      const { getSectorImages } = await import('../lib/images');
      const sectorImgs = getSectorImages(lead.sector);
      const fallbacks = [sectorImgs.hero, sectorImgs.about, sectorImgs.blog];

      const wc = await WebsiteContent.findById(lead.contentRef);
      if (wc) {
        let patchedHtml = wc.html || '';
        let patchedCount = 0;
        for (const broken of unsplashBroken) {
          if (patchedHtml.includes(broken)) {
            const fallback = fallbacks[patchedCount % fallbacks.length];
            patchedHtml = patchedHtml.split(broken).join(fallback);
            patchedCount++;
          }
        }
        if (patchedCount > 0) {
          await WebsiteContent.findByIdAndUpdate(lead.contentRef, { $set: { html: patchedHtml } });
          didFix = true;
        }
      }
    }

    // Re-check después de los fixes
    if (didFix) {
      const retry = await fetch(pageUrl, { redirect: 'follow' });
      if (retry.ok) {
        const retryHtml = await retry.text();
        const retryImages = extractImageUrls(retryHtml, BASE_URL).slice(0, 25);
        const retryChecks = await Promise.all(retryImages.map((u) => urlIsReachable(u)));
        const retryBroken = retryChecks.filter((ok) => !ok).length;
        if (retryBroken === 0) return { ok: true, fixed: true, broken: 0 };
        // Si quedan rotas pero el layout tiene client-side fallback → degraded, no bloquear
        return { ok: true, fixed: true, broken: retryBroken, degraded: true };
      }
    }

    // Fix 3: si no pudimos arreglar server-side pero el layout tiene installImageFallback()
    // el usuario final verá las imágenes correctas → dejamos pasar como degraded.
    return { ok: true, fixed: false, broken: brokenCount, degraded: true };
  } catch {
    return { ok: false, fixed: false, broken: 1 };
  }
}

async function getStats() {
  await connectDB();
  const stats = await Lead.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const labels: Record<string, string> = {
    scraped:    '🔍 Scrapeados',
    analyzing:  '🔬 Analizando',
    generating: '⚙️ Generando',
    web_live:   '🌐 Web en vivo',
    email_sent: '📧 Email enviado',
    visited:    '👁️ Han visitado',
    contacted:  '💬 Contactados',
    client:     '✅ Clientes',
    expired:    '❌ Expirados',
  };

  let total = 0;
  let text = '*📊 Pipeline LeadFlow v3*\n\n';
  for (const s of stats) {
    const label = labels[s._id] || s._id;
    text += `${label}: *${s.count}*\n`;
    total += s.count;
  }
  text += `\nTotal: *${total}* leads`;

  const clients = stats.find((s: any) => s._id === 'client')?.count || 0;
  const mrr = clients * 25;
  text += `\n💰 MRR estimado: *${mrr}€/mes*`;

  return text;
}

function fmtUsd(value: number): string {
  return `$${(value || 0).toFixed(4)}`;
}

async function getPipelineMetricsSummary() {
  await connectDB();

  const runs = await PipelineRun.find({})
    .sort({ createdAt: -1 })
    .limit(8)
    .select('status sector city country apifyRuns candidateLeads generatedWebs failedWebs estimatedCostUsd estimatedCostPerWebUsd notes createdAt')
    .lean();

  if (!runs.length) {
    return '📭 No hay métricas de pipeline aún.';
  }

  let out = '📈 *Pipeline metrics (últimas ejecuciones)*\n\n';
  let totalCost = 0;
  let totalWebs = 0;

  for (const run of runs as any[]) {
    const st = run.status === 'ok' ? '✅' : run.status === 'partial' ? '⚠️' : '❌';
    totalCost += Number(run.estimatedCostUsd || 0);
    totalWebs += Number(run.generatedWebs || 0);

    out += `${st} *${run.sector}/${run.city}/${run.country}*\n`;
    out += `   apify:${run.apifyRuns || 0} · cand:${run.candidateLeads || 0} · webs:${run.generatedWebs || 0} · err:${run.failedWebs || 0}\n`;
    out += `   coste:${fmtUsd(Number(run.estimatedCostUsd || 0))} · coste/web:${fmtUsd(Number(run.estimatedCostPerWebUsd || 0))}\n`;
    if (run.notes?.length) {
      out += `   notes: ${run.notes.slice(0, 3).join(', ')}\n`;
    }
    out += '\n';
  }

  const avgCostWeb = totalWebs > 0 ? totalCost / totalWebs : 0;
  out += `💰 Total coste (últimas ${runs.length}): *${fmtUsd(totalCost)}*\n`;
  out += `📉 Coste medio/web: *${fmtUsd(avgCostWeb)}*`;

  return out;
}

// ─── Health check para Vercel y MongoDB ──────────────────────────────────────

async function checkHealth(): Promise<string> {
  let report = '*🏥 Health Check*\n\n';

  // MongoDB
  try {
    await connectDB();
    const count = await Lead.countDocuments();
    report += `✅ MongoDB — OK (${count} leads)\n`;
  } catch (e: any) {
    report += `❌ MongoDB — CAÍDO: ${e.message}\n`;
  }

  // Vercel (ping a la propia URL)
  try {
    const res = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      report += `✅ Vercel — OK (${res.status})\n`;
    } else {
      report += `⚠️ Vercel — Status ${res.status}\n`;
    }
  } catch (e: any) {
    report += `❌ Vercel — CAÍDO o sin respuesta\n`;
  }

  return report;
}

// ─── Teclados ─────────────────────────────────────────────────────────────────

const MAIN_KEYBOARD: TelegramBot.SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: '🚀 Generar webs' }, { text: '📊 Estadísticas' }],
      [{ text: '⚡ Run ahora' }, { text: '🔄 Reset diario' }],
      [{ text: '🔁 Rehacer web' }, { text: '👁️ Leads activos' }],
      [{ text: '✅ Clientes' }, { text: '💳 /stripe' }],
      [{ text: '📣 Broadcast web_lista' }, { text: '📋 Estado broadcast' }],
      [{ text: '🏥 Health check' }, { text: '🧹 Cleanup' }],
      [{ text: '📈 Coste pipeline' }, { text: '❓ Ayuda' }],
    ],
    resize_keyboard: true,
  },
};

const CANCEL_KB: TelegramBot.SendMessageOptions = {
  reply_markup: {
    keyboard: [[{ text: 'Cancelar' }]],
    resize_keyboard: true,
  },
};

// Teclado de sectores — generado dinámicamente desde sectors.json
function sectorKeyboard(): TelegramBot.SendMessageOptions {
  const rows = getSectorKeyboard(); // filas de 2 con icono + display name
  rows.push([{ text: 'Cancelar' }]);
  return { reply_markup: { keyboard: rows, resize_keyboard: true } };
}

// ─── /start ───────────────────────────────────────────────────────────────────

bot.onText(/\/start/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  session.step = 'idle';
  await sendMsg(
    `*LeadFlow Bot v3* 🚀\n\n` +
    `Centro de control desde el móvil.\n` +
    `22 sectores · España · Argentina · Uruguay\n\n` +
    `¿Qué hacemos?`,
    MAIN_KEYBOARD
  );
});

bot.onText(/\/stripe/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await startStripeFlow();
});

bot.onText(/\/health/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const report = await checkHealth();
  await sendMsg(report, MAIN_KEYBOARD);
});

bot.onText(/\/metrics/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const report = await getPipelineMetricsSummary();
  await sendMsg(report, MAIN_KEYBOARD);
});

bot.onText(/\/auto/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const report = await formatDailyReport();
  await sendMsg(
    report + '\n\n' +
    `Auto-Pipeline: *${autoPipelineActive ? 'ACTIVO ✅' : 'PAUSADO ⏸️'}*\n` +
    `Crons: 10:00 AM + 4:00 PM (Costa Rica, Lun-Sáb)\n` +
    `Target: ${TARGET_WEBS_PER_RUN} webs/run | Máx combos: ${MAX_COMBOS_PER_RUN}\n\n` +
    `Comandos:\n` +
    `/start-auto — activar crons\n` +
    `/stop-auto — pausar crons\n` +
    `/run-now — ejecutar ahora (funciona incluso en domingo)`,
    MAIN_KEYBOARD
  );
});

bot.onText(/\/start-auto/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  autoPipelineActive = true;
  await sendMsg('✅ *Auto-Pipeline ACTIVADO*\n\nLos crons de las 10:00 AM y 4:00 PM van a ejecutarse.', MAIN_KEYBOARD);
});

bot.onText(/\/stop-auto/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  autoPipelineActive = false;
  await sendMsg('⏸️ *Auto-Pipeline PAUSADO*\n\nLos crons no ejecutarán hasta que hagas /start-auto.\nEl pipeline manual desde /start sigue funcionando.', MAIN_KEYBOARD);
});

bot.onText(/\/run-now/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const dayName = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][new Date().getDay()];
  const sundayNote = new Date().getDay() === 0 ? ' (bypass domingo ✅)' : '';
  await sendMsg(`🚀 *Ejecutando Auto-Pipeline manualmente...*\n📅 ${dayName}${sundayNote}`);
  await executeAutoPipeline('MANUAL', true);
});

bot.onText(/\/reset-daily/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const prev = await resetDailyCounters();
  await sendMsg(
    `🔄 *Contadores diarios reseteados*\n\n` +
    `Anterior:\n` +
    `   💸 Gasto: $${prev.previousSpend.toFixed(2)}\n` +
    `   🔍 Leads: ${prev.previousLeads}\n` +
    `   🔁 Runs: ${prev.previousRuns}\n\n` +
    `✅ Todo en 0. Podés hacer /run-now para lanzar otro auto-run.`
  );
});

// ─── /redo — Regenerar web de un lead existente ────────────────────────────

let redoState: { step: 'idle' | 'sector' | 'pick'; sector?: string; leads?: any[] } = { step: 'idle' };

bot.onText(/\/redo/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await connectDB();

  // Mostrar sectores que tienen leads con web
  const sectors = await Lead.distinct('sector', { status: { $in: ['web_live', 'email_sent'] } });
  if (sectors.length === 0) {
    await sendMsg('⚠️ No hay leads con web generada para rehacer.');
    return;
  }

  redoState = { step: 'sector' };
  const buttons = sectors.sort().map((s: string) => [{ text: s }]);
  await sendMsg(
    `🔄 *REHACER WEB*\n\nElegí el sector del lead que querés regenerar:`,
    { reply_markup: { keyboard: buttons, resize_keyboard: true, one_time_keyboard: true } }
  );
});

bot.onText(/\/redo-lead (.+)/, async (msg, match) => {
  if (!isAuthorized(msg.chat.id)) return;
  const leadId = match![1].trim();
  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) {
    await sendMsg(`❌ Lead no encontrado: ${leadId}`);
    return;
  }

  await sendMsg(
    `🔄 Regenerando web para *${lead.businessName}*...\n` +
    `📍 ${lead.city} | ${lead.sector}\n\n⏳ Esto tarda 10-30 segundos...`
  );

  try {
    const result = await processSingleLead(leadId);
    if (result.error) {
      await sendMsg(`❌ Error: ${result.error}`);
    } else {
      await sendMsg(
        `✅ *Web regenerada*\n\n` +
        `🏢 ${result.businessName}\n` +
        `🌐 ${result.webUrl}\n\n` +
        `La web ya está actualizada con el template más reciente.`,
        MAIN_KEYBOARD
      );
    }
  } catch (err: any) {
    await sendMsg(`❌ Error regenerando: ${err.message}`);
  }
  redoState = { step: 'idle' };
});

// ─── /reply <leadId> <texto> — responder por WhatsApp al lead ────────────────
// Uso: /reply 69e8f7944e48a4a006b5e317 Hola, gracias por escribir. Te cuento...
// Requiere que el lead haya escrito en las últimas 24h (ventana de Meta).

bot.onText(/^\/reply\s+(\S+)\s+([\s\S]+)$/, async (msg, match) => {
  if (!isAuthorized(msg.chat.id)) return;
  if (!match) return;

  const leadId = match[1].trim();
  const text = match[2].trim();

  if (text.length === 0) {
    await sendMsg('❌ Uso: `/reply <leadId> <mensaje>`');
    return;
  }
  if (text.length > 4000) {
    await sendMsg('❌ El mensaje es demasiado largo (máx 4000 caracteres).');
    return;
  }

  await connectDB();
  const result = await sendFreeTextToLead(leadId, text);

  if (result.sent) {
    const lead = await Lead.findById(leadId).select('businessName phone');
    await sendMsg(
      `✅ *Respuesta enviada*\n\n` +
      `Para: *${lead?.businessName || leadId}* (${lead?.phone || '—'})\n` +
      `msgId: \`${result.messageId}\`\n\n` +
      `_"${text.slice(0, 300)}${text.length > 300 ? '…' : ''}"_`
    );
  } else {
    const reasonLabels: Record<string, string> = {
      'no-lead': '❌ Lead no encontrado',
      'no-phone': '❌ El lead no tiene teléfono',
      'no-inbound': '❌ El lead nunca escribió — no se puede mandar texto libre. Usá un template.',
      'out-of-window': '⏰ Ventana de 24h cerrada. Usá un template aprobado.',
      'api-error': '❌ Error de Meta API',
    };
    const title = reasonLabels[result.reason || 'api-error'] || '❌ Error';
    await sendMsg(`${title}\n\n_${result.error || 'sin detalles'}_`);
  }
});

// ─── /broadcast_web_lista — envío masivo del template web_lista ──────────────

function parseInlineFilterArgs(rest: string): BroadcastFilterSpec {
  const spec: BroadcastFilterSpec = {};
  const tokens = rest.trim().split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    const eq = tok.indexOf('=');
    if (eq <= 0) continue;
    const key = tok.slice(0, eq).toLowerCase();
    const val = tok.slice(eq + 1);
    if (!val) continue;
    switch (key) {
      case 'sector': spec.sector = val.toLowerCase(); break;
      case 'city': spec.city = val; break;
      case 'country':
        if (['ES', 'AR', 'UY', 'US'].includes(val.toUpperCase())) {
          spec.country = val.toUpperCase() as BroadcastFilterSpec['country'];
        }
        break;
      case 'status': spec.status = val; break;
      case 'limit': {
        const n = parseInt(val, 10);
        if (!isNaN(n) && n > 0) spec.limit = n;
        break;
      }
      case 'onlyunsent':
      case 'only_unsent':
        spec.onlyUnsent = val !== 'false' && val !== '0';
        break;
    }
  }
  return spec;
}

async function startBroadcastWebLista(inlineArgs: string) {
  if (currentBroadcastRunId) {
    await sendMsg(`⏳ Ya hay un broadcast en curso (\`${currentBroadcastRunId}\`). Usá /broadcast_status o /broadcast_cancel.`);
    return;
  }

  await connectDB();

  const filter: BroadcastFilterSpec = {
    status: 'web_live',
    requirePhone: true,
    requireSlug: true,
    onlyUnsent: true,
    ...parseInlineFilterArgs(inlineArgs),
  };

  const count = await countTargets(filter);
  if (count === 0) {
    await sendMsgHtml(
      `⚠️ <b>Broadcast</b> <code>web_lista</code> — 0 leads coinciden.\n\n` +
      `Filtro: <code>${escapeHtml(describeFilter(filter))}</code>\n\n` +
      `Probá: <code>/broadcast_web_lista</code> sin filtros, o <code>/broadcast_web_lista sector=yoga</code>.`,
      MAIN_KEYBOARD
    );
    return;
  }

  const preview = await previewTargets(filter, 5);
  const previewLines = preview
    .map((p, i) => `${i + 1}. ${escapeHtml(p.businessName || '')} — ${escapeHtml(p.city || '')} (${escapeHtml(p.sector || '')})`)
    .join('\n');

  const isDryRun = process.env.WHATSAPP_DRY_RUN !== 'false';
  const dryRunNumber = process.env.WHATSAPP_DRY_RUN_NUMBER || '+34617680026';
  const dryRunTag = isDryRun
    ? `🧪 <b>DRY-RUN activo</b> — todos los envíos se redirigen a <code>${escapeHtml(dryRunNumber)}</code>.\nEn dry-run NO se marca <code>whatsappSentAt</code> — los mismos leads podrán ir en el broadcast real después.`
    : `🚨 <b>PRODUCCIÓN</b> — los mensajes van al teléfono real de cada lead.`;

  session.step = 'broadcast_confirm';
  session.broadcastFilter = filter;
  session.broadcastTemplate = 'web_lista';

  await sendMsgHtml(
    `📣 <b>Broadcast</b> <code>web_lista</code>\n\n` +
    `Filtro: <code>${escapeHtml(describeFilter(filter))}</code>\n` +
    `Leads que coinciden: <b>${count}</b>\n` +
    `Rate: 80 msg/min · ETA ~${Math.ceil((count * 60) / 80)}s\n\n` +
    `Ejemplos (primeros ${preview.length}):\n${previewLines}\n\n` +
    `${dryRunTag}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '✅ Lanzar broadcast', callback_data: 'broadcast_confirm' }],
          [{ text: '❌ Cancelar', callback_data: 'broadcast_abort' }],
        ],
      },
    }
  );
}

bot.onText(/^\/broadcast_web_lista(?:\s+(.+))?$/, async (msg, match) => {
  if (!isAuthorized(msg.chat.id)) return;
  await startBroadcastWebLista(match?.[1] || '');
});

bot.onText(/^\/broadcast$/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  // Por ahora /broadcast es alias de /broadcast_web_lista. Futuro: builder interactivo de filtros.
  await startBroadcastWebLista('');
});

bot.onText(/^\/broadcast_status$/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await connectDB();

  if (currentBroadcastRunId) {
    const run = await BroadcastRun.findById(currentBroadcastRunId).lean() as {
      template?: string; status?: string; totalTargets?: number; sent?: number; skipped?: number; failed?: number; dryRun?: boolean;
    } | null;
    if (run) {
      await sendMsgHtml(
        `📊 <b>Broadcast en curso</b>\n\n` +
        `ID: <code>${escapeHtml(currentBroadcastRunId)}</code>\n` +
        `Template: <code>${escapeHtml(run.template || '')}</code>\n` +
        `Status: <b>${escapeHtml(run.status || '')}</b>\n` +
        `Progreso: <b>${(run.sent || 0) + (run.skipped || 0) + (run.failed || 0)}/${run.totalTargets || 0}</b>\n` +
        `✓ sent: ${run.sent || 0} · ⏭️ skip: ${run.skipped || 0} · ❌ fail: ${run.failed || 0}\n` +
        `Dry-run: ${run.dryRun ? 'sí' : 'no'}\n\n` +
        `Frenarlo: /broadcast_cancel`
      );
      return;
    }
  }

  const last = await BroadcastRun.find({}).sort({ createdAt: -1 }).limit(3).lean() as Array<{
    _id: unknown; template?: string; status?: string; totalTargets?: number; sent?: number; skipped?: number; failed?: number; createdAt?: Date;
  }>;
  if (!last.length) {
    await sendMsg(`📭 No hay broadcasts previos ni en curso.`);
    return;
  }

  const lines = last.map((r) =>
    `• <code>${String(r._id)}</code> · ${escapeHtml(r.template || '')} · ${escapeHtml(r.status || '')} · ` +
    `${r.sent || 0}/${r.totalTargets || 0} (fail ${r.failed || 0})`
  ).join('\n');
  await sendMsgHtml(`📋 <b>Últimos broadcasts:</b>\n\n${lines}\n\n<i>Ninguno en curso.</i>`);
});

bot.onText(/^\/broadcast_cancel$/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;

  if (!currentBroadcastRunId) {
    await sendMsg(`No hay ningún broadcast en curso que cancelar.`);
    return;
  }

  broadcastCancelFlag = true;
  await connectDB();
  await BroadcastRun.findByIdAndUpdate(currentBroadcastRunId, {
    cancelRequestedAt: new Date(),
  }).catch(() => { /* non-fatal */ });

  await sendMsg(`🛑 Cancel solicitado — el broadcast va a parar entre un envío y el siguiente.`);
});

bot.onText(/\/cancel/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  if (autoPipelineCancelled) {
    await sendMsg('⚠️ Ya se pidió cancelar. Esperando que termine el combo actual...');
    return;
  }
  autoPipelineCancelled = true;
  await sendMsg('🛑 *Cancelando Auto-Pipeline...*\nTermina el combo actual y para. Los leads ya guardados se mantienen.');
});

bot.onText(/\/summary/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await sendMsgPlain(
    `📖 COMANDOS LEADFLOW\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `🚀 PIPELINE MANUAL\n` +
    `/start — Menú principal. Elegís sector → país → ciudad → cantidad → genera webs al momento.\n\n` +
    `🤖 AUTO-PIPELINE (crons)\n` +
    `/auto — Ver estado: leads hoy, gasto, budget, próximo combo.\n` +
    `/start-auto — Activar crons (10, 13, 16, 19h Costa Rica, Lun-Sáb).\n` +
    `/stop-auto — Pausar crons. El pipeline manual sigue funcionando.\n` +
    `/run-now — Ejecutar ahora sin esperar al cron. Funciona incluso domingos.\n` +
    `/cancel — Frenar un run en curso. Termina el combo actual y para.\n` +
    `/reset-daily — Resetear contadores de gasto/leads del día. Para relanzar.\n` +
    `/redo — Regenerar la web de un lead existente (elige sector → lead).\n\n` +
    `📊 INFORMACIÓN\n` +
    `/health — Chequear MongoDB + servidor.\n` +
    `/metrics — Historial de pipeline runs con costos.\n` +
    `/leads-status — Leads activos por estado (scraped, web_live, client, etc).\n\n` +
    `💰 VENTAS\n` +
    `/stripe — Generar link de pago para un lead. Al final tenés botón para enviar por WhatsApp.\n\n` +
    `📣 BROADCAST WHATSAPP\n` +
    `/broadcast_web_lista [sector=X city=Y limit=N] — Enviar template web_lista masivo. Respeta DRY_RUN.\n` +
    `/broadcast_status — Ver broadcast en curso o últimos 3.\n` +
    `/broadcast_cancel — Frenar el broadcast en curso.\n\n` +
    `🧹 MANTENIMIENTO\n` +
    `/cleanup — Expirar leads viejos (+48h sin actividad, +30 días scraped).\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `/summary — Este mensaje.`,
    MAIN_KEYBOARD
  );
});

// ─── Handler principal ────────────────────────────────────────────────────────

bot.on('message', async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const text = msg.text?.trim() || '';

  // ── Menú principal ───────────────────────────────────────────────────────

  if (text === '📊 Estadísticas' || text === 'Estadisticas') {
    const stats = await getStats();
    await sendMsg(stats, {
      reply_markup: {
        inline_keyboard: [[{ text: '🔄 Actualizar', callback_data: 'stats' }]],
      },
    });
    return;
  }

  if (text === '🏥 Health check' || text === 'Health check') {
    await sendMsg('_Verificando servicios..._');
    const report = await checkHealth();
    await sendMsg(report, MAIN_KEYBOARD);
    return;
  }

  if (text === '🧹 Cleanup' || text === 'Cleanup') {
    await sendMsg('Ejecutando cleanup...');
    const { expired, cleaned } = await runCleanup();
    await sendMsg(
      `*Cleanup completado*\n\nExpirados: *${expired}*\nLimpiados: *${cleaned}*`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === '📈 Coste pipeline' || text === 'Coste pipeline' || text === '/metrics') {
    const report = await getPipelineMetricsSummary();
    await sendMsg(report, MAIN_KEYBOARD);
    return;
  }

  if (text === '⚡ Run ahora' || text === 'Run ahora') {
    await sendMsg('🚀 *Ejecutando Auto-Pipeline manualmente...*');
    await executeAutoPipeline('MANUAL', true);
    return;
  }

  if (text === '🔄 Reset diario' || text === 'Reset diario') {
    const prev = await resetDailyCounters();
    await sendMsg(
      `🔄 *Contadores diarios reseteados*\n\n` +
      `Anterior:\n` +
      `   💸 Gasto: $${prev.previousSpend.toFixed(2)}\n` +
      `   🔍 Leads: ${prev.previousLeads}\n` +
      `   🔁 Runs: ${prev.previousRuns}\n\n` +
      `✅ Todo en 0. Podés hacer ⚡ Run ahora para lanzar.`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === '🔁 Rehacer web' || text === 'Rehacer web') {
    await connectDB();
    const sectors = await Lead.distinct('sector', { status: { $in: ['web_live', 'email_sent'] } });
    if (sectors.length === 0) {
      await sendMsg('⚠️ No hay leads con web generada para rehacer.', MAIN_KEYBOARD);
      return;
    }
    redoState = { step: 'sector' };
    const buttons = sectors.sort().map((s: string) => [{ text: s }]);
    buttons.push([{ text: 'Cancelar' }]);
    await sendMsg(
      `🔁 *REHACER WEB*\n\nElegí el sector del lead que querés regenerar:`,
      { reply_markup: { keyboard: buttons, resize_keyboard: true, one_time_keyboard: true } }
    );
    return;
  }

  if (text === '❓ Ayuda' || text === 'Ayuda') {
    await sendMsg(
      `*LeadFlow v3 — Comandos*\n\n` +
      `*🚀 Generar webs* — Pipeline completo manual\n` +
      `*⚡ Run ahora* — Auto-pipeline inmediato\n` +
      `*🔄 Reset diario* — Resetear gasto/leads del día\n` +
      `*🔁 Rehacer web* — Regenerar web de un lead\n` +
      `*📊 Estadísticas* — Estado de todos los leads\n` +
      `*👁️ Leads activos* — Leads que visitaron su web\n` +
      `*✅ Clientes* — Clientes que pagan\n` +
      `*🏥 Health check* — Estado de Vercel y MongoDB\n` +
      `*🧹 Cleanup* — Expirar leads de +48h\n` +
      `*📈 Coste pipeline* — Coste por ejecución\n` +
      `*💳 /stripe* — Link de pago personalizado\n\n` +
      `*Crons:* 10:00, 13:00, 16:00, 19:00 (Lun-Sáb)`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === '👁️ Leads activos' || text === 'Leads activos') {
    await connectDB();
    const leads = await Lead.find({
      status: { $in: ['visited', 'email_sent', 'web_live', 'contacted'] },
    }).sort({ lastVisit: -1 }).limit(10);

    if (leads.length === 0) {
      await sendMsg('No hay leads activos ahora mismo.', MAIN_KEYBOARD);
      return;
    }

    for (const lead of leads) {
      await sendLeadCard(lead);
    }
    return;
  }

  if (text === '✅ Clientes' || text === 'Clientes') {
    await connectDB();
    const clients = await Lead.find({ status: 'client' }).sort({ paidAt: -1 }).limit(15);

    if (clients.length === 0) {
      await sendMsg('Aún no hay clientes. ¡Sigue generando webs!', MAIN_KEYBOARD);
      return;
    }

    let msgText = `*✅ Clientes activos (${clients.length})*\n\n`;
    for (const c of clients) {
      const price = c.currency === 'EUR' ? `${c.monthlyTotal || 25}€` : `$${c.monthlyTotal || 25}`;
      msgText += `· *${c.businessName}* — ${price}/mes (${c.city})\n`;
    }
    const total = clients.reduce((sum: number, c: any) => sum + (c.monthlyTotal || 25), 0);
    msgText += `\n💰 MRR total: *${total}€/mes*`;
    await sendMsg(msgText, MAIN_KEYBOARD);
    return;
  }

  if (text === '💳 /stripe' || text === '/stripe') {
    await startStripeFlow();
    return;
  }

  if (text === '📣 Broadcast web_lista' || text === 'Broadcast web_lista') {
    await startBroadcastWebLista('');
    return;
  }

  if (text === '📋 Estado broadcast' || text === 'Estado broadcast') {
    await connectDB();
    if (currentBroadcastRunId) {
      await sendMsgHtml(`📊 Broadcast en curso: <code>${escapeHtml(currentBroadcastRunId)}</code>\n\nDetalle completo: /broadcast_status`);
    } else {
      const last = await BroadcastRun.find({}).sort({ createdAt: -1 }).limit(3).lean() as Array<{
        _id: unknown; template?: string; status?: string; sent?: number; totalTargets?: number; failed?: number;
      }>;
      if (!last.length) {
        await sendMsgPlain('📭 No hay broadcasts aún. Probá con 📣 Broadcast web_lista.', MAIN_KEYBOARD);
      } else {
        const lines = last.map((r) =>
          `• <code>${String(r._id).slice(-8)}</code> · ${escapeHtml(r.template || '')} · ${escapeHtml(r.status || '')} · ${r.sent || 0}/${r.totalTargets || 0}`
        ).join('\n');
        await sendMsgHtml(`📋 <b>Últimos broadcasts:</b>\n\n${lines}\n\n<i>Detalle: /broadcast_status</i>`, MAIN_KEYBOARD);
      }
    }
    return;
  }

  if (text === 'Cancelar') {
    session.step = 'idle';
    await sendMsg('Cancelado.', MAIN_KEYBOARD);
    return;
  }

  // ── Flujo /redo — selección de sector y lead ────────────────────────────

  if (redoState.step === 'sector') {
    const sector = text.trim().toLowerCase();
    await connectDB();
    const leads = await Lead.find({
      sector,
      status: { $in: ['web_live', 'email_sent', 'visited', 'contacted'] },
    })
      .sort({ webLiveAt: -1 })
      .limit(20)
      .lean();

    if (leads.length === 0) {
      await sendMsg(`⚠️ No hay leads con web en sector "${sector}".`, MAIN_KEYBOARD);
      redoState = { step: 'idle' };
      return;
    }

    redoState = { step: 'pick', sector, leads };
    const lines = leads.map((l: any, i: number) =>
      `${i + 1}. *${l.businessName}* — ${l.city}\n   /redo-lead ${l._id}`
    );
    await sendMsg(
      `🔄 *Leads en ${sector}* (${leads.length}):\n\n${lines.join('\n\n')}\n\n` +
      `Tocá el comando /redo-lead del que querés regenerar.`,
      MAIN_KEYBOARD
    );
    redoState = { step: 'idle' };
    return;
  }

  // ── Flujo Generar webs ────────────────────────────────────────────────────

  if (text === '🚀 Generar webs' || text === 'Generar webs') {
    session.step = 'sector';
    await sendMsg('¿Qué sector quieres atacar?\n\n_22 sectores disponibles:_', sectorKeyboard());
    return;
  }

  if (session.step === 'sector') {
    const sector = slugFromLabel(text);
    if (!sector) { await sendMsg('Elige un sector del menú.'); return; }
    session.sector = sector;
    session.step = 'country';
    await sendMsg(`Sector: *${text}*\n\n¿En qué país?`, {
      reply_markup: {
        keyboard: [
          [{ text: '🇪🇸 España' }, { text: '🇦🇷 Argentina' }],
          [{ text: '🇺🇾 Uruguay' }, { text: 'Cancelar' }],
        ],
        resize_keyboard: true,
      },
    });
    return;
  }

  if (session.step === 'country') {
    const countryMap: Record<string, string> = {
      '🇪🇸 España': 'ES', 'España': 'ES',
      '🇦🇷 Argentina': 'AR', 'Argentina': 'AR',
      '🇺🇾 Uruguay': 'UY', 'Uruguay': 'UY',
    };
    const country = countryMap[text];
    if (!country) { await sendMsg('Elige un país del menú.'); return; }
    session.country = country;
    session.step = 'city';

    // Top 10 ciudades por país + opción de escribir otra
    const cityOptions: Record<string, string[]> = {
      ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao', 'Alicante'],
      AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Tucumán', 'Salta', 'Santa Fe', 'San Juan'],
      UY: ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo', 'Mercedes', 'Artigas'],
    };
    const cities = cityOptions[country] || [];
    const cityRows: { text: string }[][] = [];
    for (let i = 0; i < cities.length; i += 2) {
      const row = [{ text: cities[i] }];
      if (cities[i + 1]) row.push({ text: cities[i + 1] });
      cityRows.push(row);
    }
    cityRows.push([{ text: '✏️ Otra ciudad...' }, { text: 'Cancelar' }]);

    await sendMsg(`País: *${text}*\n\n¿En qué ciudad?`, {
      reply_markup: { keyboard: cityRows, resize_keyboard: true },
    });
    return;
  }

  if (session.step === 'city') {
    const rawCity = text === '✏️ Otra ciudad...' ? '' : text;
    if (rawCity.length < 2) {
      await sendMsg('Escribe el nombre de la ciudad:', CANCEL_KB);
      return;
    }
    session.city = rawCity;
    session.step = 'limit';
    await sendMsg(`Ciudad: *${text}*\n\n¿Cuántas webs generar?`, {
      reply_markup: {
        keyboard: [
          [{ text: '3' }, { text: '5' }, { text: '10' }],
          [{ text: '20' }, { text: '50' }],
          [{ text: 'Cancelar' }],
        ],
        resize_keyboard: true,
      },
    });
    return;
  }

  if (session.step === 'limit') {
    const limit = parseInt(text);
    if (isNaN(limit) || limit < 1 || limit > 100) {
      await sendMsg('Elige un número entre 1 y 100.'); return;
    }
    session.limit = limit;
    session.step = 'confirm';
    await sendMsg(
      `*Resumen del pipeline:*\n\n` +
      `🏷️ Sector: *${session.sector}*\n` +
      `🌍 País: *${session.country}*\n` +
      `📍 Ciudad: *${session.city}*\n` +
      `📊 Webs a generar: *${limit}*\n\n` +
      `*Proceso:* Scraping → Filtrar sin web + WhatsApp → Template → Publicar → Notificar\n\n` +
      `¿Lanzamos?`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '✅ Confirmar y lanzar' }],
            [{ text: 'Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  if (session.step === 'confirm') {
    if (text !== '✅ Confirmar y lanzar') {
      await sendMsg('Elige una opción del menú.'); return;
    }

    session.step = 'running';
    await sendMsg(
      `*🚀 Pipeline lanzado*\n\n` +
      `Sector: *${session.sector}* · País: *${session.country}* · Ciudad: *${session.city}*\n` +
      `Webs: *${session.limit}*\n\n` +
      `Te aviso cuando cada web esté lista. Puede tardar varios minutos.`,
      MAIN_KEYBOARD
    );

    // Ping de progreso cada 60s
    const pingMsgs = [
      '🔍 Buscando negocios sin web en Google Maps...',
      '📱 Validando números WhatsApp...',
      '🎨 Inyectando datos en templates sectoriales...',
      '🚀 Publicando webs en Vercel...',
      '📤 Preparando notificaciones...',
    ];
    let pingCount = 0;
    const pingInterval = setInterval(async () => {
      if (session.step !== 'running') { clearInterval(pingInterval); return; }
      await sendMsg(`_${pingMsgs[pingCount % pingMsgs.length]}_`).catch(() => {});
      pingCount++;
    }, 60_000);

    runPipeline({
      sector:            session.sector!,
      city:              session.city!,
      country:           session.country! as 'ES' | 'AR' | 'UY' | 'US',
      limit:             session.limit!,
      skipDesignScraper: true,   // v3: usamos templates directos
      skipWhatsApp:      true,   // v3: WhatsApp manual desde el bot
    })
      .then(async (results) => {
        clearInterval(pingInterval);
        session.step = 'idle';

        const ok     = results.filter((r: any) => !r.error);
        const errors = results.filter((r: any) => r.error);

        await sendMsg(
          `*Pipeline completado ✅*\n\n` +
          `Webs generadas: *${ok.length}/${results.length}*\n` +
          `Errores: *${errors.length}*`
        );

        const templatesCount: Record<string, number> = {};
        for (const r of ok as any[]) {
          await connectDB();
          const lead = await Lead.findById(r.leadId).select('templateUsed');
          const key = lead?.templateUsed || 'sin-template';
          templatesCount[key] = (templatesCount[key] || 0) + 1;
        }
        const templateLines = Object.entries(templatesCount)
          .sort((a, b) => b[1] - a[1])
          .map(([name, qty]) => `• ${name}: ${qty}`)
          .join('\n');
        if (templateLines) {
          await sendMsg(`*🧩 Templates usados*\n\n${templateLines}`);
        }

        // Card por cada web
        for (const r of ok.slice(0, 15) as any[]) {
          await connectDB();
          let lead = await Lead.findById(r.leadId);
          if (!lead) continue;

          const health = await verifyLeadImageHealth(lead);
          if (!health.ok) {
            await sendMsg(
              `⚠️ *Preflight bloqueado*\n\n` +
              `La web de *${lead.businessName}* tiene imágenes caídas (${health.broken}).\n` +
              `No se pudo arreglar automáticamente.`
            );
            continue;
          }

          if (health.fixed && !health.degraded) {
            lead = await Lead.findById(r.leadId);
            await sendMsg(`🛠️ Assets corregidos automáticamente en *${lead?.businessName}* (fallback de template activado).`);
          } else if (health.degraded) {
            lead = await Lead.findById(r.leadId);
            await sendMsg(
              `🛠️ *${lead?.businessName}*: ${health.broken} imagen(es) reemplazada(s) con fallback del sector.` +
              (health.fixed ? ' HTML actualizado en DB.' : ' Fallback client-side activo.')
            );
          }

          if (lead) await sendLeadCard(lead);
        }
        if (ok.length > 15) {
          await sendMsg(`_...y ${ok.length - 15} webs más. Usa "Leads activos" para verlas todas._`);
        }

        if (errors.length > 0) {
          const errList = (errors as any[]).slice(0, 5).map((r) => `• ${r.businessName}: ${r.error}`).join('\n');
          await sendMsg(`*Errores:*\n\n${errList}`);
        }
      })
      .catch(async (err: any) => {
        clearInterval(pingInterval);
        session.step = 'idle';
        await sendMsg(`❌ *Error en el pipeline:* ${err.message}`, MAIN_KEYBOARD);
      });

    return;
  }

  // ── Flujo /stripe ──────────────────────────────────────────────────────────

  if (session.step === 'stripe_lead') {
    // User typed lead name or part of it
    await connectDB();
    const leads = await Lead.find({
      businessName: { $regex: text, $options: 'i' },
      status: { $nin: ['expired'] },
    }).limit(5);

    if (leads.length === 0) {
      await sendMsg(`No encontré ningún lead con "${text}". Prueba con otro nombre.`);
      return;
    }
    if (leads.length === 1) {
      session.stripeLead = leads[0];
      await askStripeServices();
      return;
    }

    // Multiple results — show inline keyboard to pick
    await sendMsg(
      `Encontré ${leads.length} leads. ¿Cuál es?`,
      {
        reply_markup: {
          inline_keyboard: leads.map((l: any) => [{
            text: `${l.businessName} — ${l.city}`,
            callback_data: `stripe_pick_${l._id}`,
          }]),
        },
      }
    );
    return;
  }

  if (session.step === 'stripe_services') {
    // User typing custom amount override
    const amount = parseInt(text);
    if (!isNaN(amount) && amount > 0) {
      const url = await createPaymentLink({
        leadId: session.stripeLead._id.toString(),
        amountCents: amount * 100,
        services: session.stripeServices,
      });
      if (url) {
        const businessName = escapeHtml(session.stripeLead.businessName || 'Negocio');
        const safeUrl = escapeHtml(url);
        await sendMsgHtml(
          `💳 <b>Payment link generado</b>\n\n` +
          `<b>${businessName}</b>\n` +
          `Importe: <b>${amount}€/mes</b>\n\n` +
          `<a href="${safeUrl}">Abrir payment link</a>\n\n` +
          `Envíalo por WhatsApp al cliente.`,
          MAIN_KEYBOARD
        );
      }
      session.step = 'idle';
    }
    return;
  }
});

// ─── Lead card helper ─────────────────────────────────────────────────────────

async function sendLeadCard(lead: any) {
  const waNumber = lead.phone?.replace(/\D/g, '');
  const waMsg    = encodeURIComponent(
    `Hola ${lead.businessName.split(' ')[0]}, somos LeadFlow. Nos hemos tomado el atrevimiento de crear una página web profesional para ${lead.businessName}. Puede verla aquí: ${BASE_URL}/${lead.slug}\n\nEl servicio completo tiene un coste de 25€/mes (hosting aparte ~3,50€/mes). ¿Le interesa?`
  );
  const templateUsed = lead.templateUsed || 'Sin template';

  const reviewInfo = lead.reviewCount > 0
    ? `⭐ ${lead.reviewRating}/5 (${lead.reviewCount} reseñas)`
    : `⭐ Sin reseñas en Google`;

  const waLabel   = lead.hasWhatsApp ? '📱 WhatsApp ✅' : '📱 Sin WhatsApp';

  const statusEmoji: Record<string, string> = {
    web_live: '🌐', visited: '👁️', contacted: '💬', client: '✅', scraped: '🔍',
  };

  await sendMsg(
    `${statusEmoji[lead.status] || '📋'} *${lead.businessName}*\n` +
    `📍 ${lead.city}, ${lead.country === 'ES' ? 'España' : lead.country === 'AR' ? 'Argentina' : 'Uruguay'}\n` +
    `🏷️ ${lead.sector} · ${reviewInfo}\n` +
    `🧩 Template: *${templateUsed}*\n` +
    `${waLabel} · ${lead.phone || 'Sin teléfono'}\n` +
    `👁️ Visitas: *${lead.visitCount || 0}*`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🌐 Ver web', url: `${BASE_URL}/${lead.slug}` },
            ...(lead.templateUsed ? [{ text: '🎨 Ver template', url: `${BASE_URL}/${lead.templateUsed}` }] : []),
          ],
          [
            { text: '📊 Info completa', callback_data: `info_${lead._id}` },
          ],
          [
            ...(waNumber ? [{ text: '📲 Abrir WhatsApp', url: `https://wa.me/${waNumber}?text=${waMsg}` }] : []),
            { text: '💳 Cobrar', callback_data: `pay_${lead._id}` },
          ],
          [
            { text: '✅ Marcar contactado', callback_data: `contact_${lead._id}` },
          ],
        ],
      },
    }
  );
}

// ─── Flujo Stripe ─────────────────────────────────────────────────────────────

async function startStripeFlow() {
  session.step = 'stripe_lead';
  session.stripeServices = ['webBasic'];
  await sendMsg(
    `*💳 Generar link de pago*\n\n` +
    `¿Para qué negocio? Escribe el nombre (o parte de él):`,
    CANCEL_KB
  );
}

async function askStripeServices() {
  session.step = 'stripe_services';
  const lead = session.stripeLead;

  const serviceKeys = Object.keys(SERVICE_LABELS);
  const rows = serviceKeys.map(svc => {
    const selected = session.stripeServices?.includes(svc);
    const label    = `${selected ? '✅' : '⬜'} ${SERVICE_LABELS[svc]}`;
    return [{ text: label, callback_data: `svc_${svc}` }];
  });
  rows.push([{ text: '💳 Generar link de pago', callback_data: 'stripe_confirm' }]);
  rows.push([{ text: '❌ Cancelar', callback_data: 'stripe_cancel' }]);

  const total = (session.stripeServices || ['webBasic'])
    .reduce((sum, svc) => sum + (SERVICE_PRICES[svc] || 0), 0) / 100;

  await sendMsg(
    `*Lead:* ${lead.businessName} — ${lead.city}\n\n` +
    `Selecciona los servicios contratados:\n` +
    `_(toca para marcar/desmarcar)_\n\n` +
    `💰 *Total: ${total}€/mes*`,
    { reply_markup: { inline_keyboard: rows } }
  );
}

// ─── Callback buttons ─────────────────────────────────────────────────────────

bot.on('callback_query', async (query) => {
  if (!isAuthorized(query.message!.chat.id)) return;
  const data = query.data || '';
  await bot.answerCallbackQuery(query.id);

  if (data === 'stats') {
    const stats = await getStats();
    await sendMsg(stats);
    return;
  }

  // ── broadcast_confirm / broadcast_abort ───────────────────────────────────
  if (data === 'broadcast_abort') {
    session.step = 'idle';
    session.broadcastFilter = undefined;
    session.broadcastTemplate = undefined;
    await sendMsg('❌ Broadcast cancelado antes de lanzar.', MAIN_KEYBOARD);
    return;
  }

  if (data === 'broadcast_confirm') {
    console.log(`[broadcast] confirm click — session.step=${session.step} hasFilter=${!!session.broadcastFilter} currentRun=${currentBroadcastRunId}`);

    if (currentBroadcastRunId) {
      await sendMsgPlain('⏳ Ya hay otro broadcast en curso. Frenalo con /broadcast_cancel antes de lanzar uno nuevo.');
      return;
    }

    // Fallback: si por cualquier motivo (restart del bot, race, etc.) perdimos el filter,
    // aplicamos el default web_lista como si el usuario hubiera tipeado /broadcast_web_lista sin args.
    const filter = session.broadcastFilter || {
      status: 'web_live' as const,
      requirePhone: true,
      requireSlug: true,
      onlyUnsent: true,
    };
    if (!session.broadcastFilter) {
      console.warn('[broadcast] confirm sin filter en session — usando default');
    }

    session.step = 'broadcast_running';
    broadcastCancelFlag = false;

    await sendMsg(`🚀 *Broadcast lanzado*\n\nProgreso cada 5 envíos. Frenar: /broadcast_cancel`);

    runBroadcast({
      filter,
      template: session.broadcastTemplate || 'web_lista',
      templateLang: 'es',
      buildParams: webListaParams,
      onProgress: async (p: BroadcastProgress) => {
        if (!currentBroadcastRunId) return;
        await sendMsg(
          `⏳ ${p.processed}/${p.totalTargets} · ✓${p.sent} · ⏭️${p.skipped} · ❌${p.failed}` +
          (p.etaSeconds !== undefined ? ` · ETA ~${p.etaSeconds}s` : '')
        ).catch(() => { /* rate-limited o red */ });
      },
      progressEvery: 5,
      isCancelled: () => broadcastCancelFlag,
    })
      .then(async (result) => {
        currentBroadcastRunId = null;
        broadcastCancelFlag = false;
        session.step = 'idle';

        const tag = result.dryRun ? '[DRY-RUN] ' : '';
        const statusEmoji = result.status === 'done' ? '✅' : result.status === 'cancelled' ? '🛑' : '❌';
        const errorsPreview = result.errors.length > 0
          ? '\n\n<b>Errores (primeros 5):</b>\n' + result.errors.slice(0, 5).map((e) => `• ${escapeHtml(e.businessName)}: ${escapeHtml(e.reason)}`).join('\n')
          : '';
        await sendMsgHtml(
          `${statusEmoji} ${tag}<b>Broadcast ${result.status}</b>\n\n` +
          `Run: <code>${escapeHtml(result.runId)}</code>\n` +
          `Enviados: <b>${result.sent}/${result.totalTargets}</b>\n` +
          `Skipped: ${result.skipped} · Failed: ${result.failed}\n` +
          `Duración: ${(result.durationMs / 1000).toFixed(1)}s` +
          errorsPreview,
          MAIN_KEYBOARD
        );
      })
      .catch(async (err: unknown) => {
        currentBroadcastRunId = null;
        broadcastCancelFlag = false;
        session.step = 'idle';
        const msg = err instanceof Error ? err.message : String(err);
        await sendMsg(`❌ *Broadcast falló:* ${msg}`, MAIN_KEYBOARD);
      });

    // Capturamos el runId apenas se crea el registro (el engine lo crea al inicio)
    // Sondeamos Mongo un instante después para obtenerlo — o el engine podría emitirlo.
    setTimeout(async () => {
      try {
        const running = await BroadcastRun.findOne({ status: 'running' }).sort({ createdAt: -1 }).lean() as { _id: unknown } | null;
        if (running) currentBroadcastRunId = String(running._id);
      } catch { /* non-fatal */ }
    }, 800);

    return;
  }

  // ── stripe_wasend_<leadId> — enviar payment link por WhatsApp ─────────────
  if (data.startsWith('stripe_wasend_')) {
    const leadId = data.replace('stripe_wasend_', '');
    await sendMsgPlain('Enviando link por WhatsApp…');
    try {
      const result = await sendStripeLinkToLead({
        leadId,
        services: session.stripeServices,
      });
      if (result.ok) {
        const channelLabel = result.channel === 'free-text' ? 'texto libre (ventana 24h)' : 'template pago_link';
        await sendMsgHtml(
          `✅ <b>Link enviado por WhatsApp</b>\n\n` +
          `Canal: ${escapeHtml(channelLabel)}\n` +
          `msgId: <code>${escapeHtml(result.messageId || '')}</code>\n` +
          `Payment URL: ${escapeHtml(result.paymentLinkUrl || '')}`,
          MAIN_KEYBOARD
        );
      } else {
        const reasonLabels: Record<string, string> = {
          'no-lead': '❌ Lead no encontrado',
          'no-phone': '❌ Lead sin teléfono',
          'stripe-failed': '❌ Falló al crear payment link en Stripe',
          'template-failed': '❌ Meta rechazó el template pago_link. ¿Lo aprobaron ya en Business Manager?',
          'freetext-failed': '❌ Meta rechazó el texto libre (posiblemente ventana 24h cerrada del lado de Meta)',
        };
        const title = reasonLabels[result.reason || ''] || '❌ Error';
        await sendMsgPlain(`${title}\n\n${result.error || 'sin detalles'}`, MAIN_KEYBOARD);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      await sendMsgPlain(`❌ Error inesperado: ${msg}`, MAIN_KEYBOARD);
    }
    return;
  }

  // ── pay_<leadId> ──────────────────────────────────────────────────────────
  if (data.startsWith('pay_')) {
    const leadId = data.replace('pay_', '');
    await connectDB();
    const lead = await Lead.findById(leadId);
    if (!lead) return;
    session.stripeLead = lead;
    session.stripeServices = ['webBasic'];
    await askStripeServices();
    return;
  }

  // ── stripe_pick_<leadId> ──────────────────────────────────────────────────
  if (data.startsWith('stripe_pick_')) {
    const leadId = data.replace('stripe_pick_', '');
    await connectDB();
    const lead = await Lead.findById(leadId);
    if (!lead) return;
    session.stripeLead = lead;
    await askStripeServices();
    return;
  }

  // ── svc_<service> — toggle service ───────────────────────────────────────
  if (data.startsWith('svc_')) {
    const svc = data.replace('svc_', '');
    if (!session.stripeServices) session.stripeServices = ['webBasic'];

    if (svc === 'webBasic') {
      // webBasic is always included, can't deselect
      await bot.answerCallbackQuery(query.id, { text: 'La web básica siempre está incluida.' });
      return;
    }

    const idx = session.stripeServices.indexOf(svc);
    if (idx > -1) {
      session.stripeServices.splice(idx, 1);
    } else {
      session.stripeServices.push(svc);
    }
    await askStripeServices();
    return;
  }

  // ── stripe_confirm ────────────────────────────────────────────────────────
  if (data === 'stripe_confirm') {
    const lead = session.stripeLead;
    if (!lead) return;

    const services = session.stripeServices || ['webBasic'];
    const totalCents = services.reduce((sum, svc) => sum + (SERVICE_PRICES[svc] || 0), 0);

    await sendMsg('_Generando link de Stripe..._');
    try {
      const url = await createPaymentLink({
        leadId: lead._id.toString(),
        amountCents: totalCents,
        services,
      });
      if (url) {
        const totalEur = totalCents / 100;
        const serviceNames = services.map(s => SERVICE_LABELS[s]?.split(' — ')[0] || s).join(', ');
        const businessName = escapeHtml(lead.businessName || 'Negocio');
        const city = escapeHtml(lead.city || '');
        const safeServices = escapeHtml(serviceNames);
        const safeUrl = escapeHtml(url);

        await sendMsgHtml(
          `💳 <b>Link de pago generado</b>\n\n` +
          `<b>${businessName}</b>\n` +
          `📍 ${city}\n` +
          `📦 Servicios: ${safeServices}\n` +
          `💰 Total: <b>${totalEur}€/mes</b>\n` +
          `🔗 Hosting: ~3,50€/mes adicional · Dominio: ~15€/año\n\n` +
          `<a href="${safeUrl}">Abrir payment link</a>\n\n` +
          `Envíalo manualmente por WhatsApp, o tocá el botón de abajo para que el bot lo envíe automáticamente.`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: '📲 Enviar link por WhatsApp', callback_data: `stripe_wasend_${lead._id}` }],
              ],
            },
          }
        );
      }
    } catch (e: any) {
      await sendMsgPlain(`❌ Error al generar el link: ${e.message}`, MAIN_KEYBOARD);
    }
    session.step = 'idle';
    return;
  }

  if (data === 'stripe_cancel') {
    session.step = 'idle';
    await sendMsg('Cancelado.', MAIN_KEYBOARD);
    return;
  }

  // ── contact_<leadId> ──────────────────────────────────────────────────────
  if (data.startsWith('contact_')) {
    const leadId = data.replace('contact_', '');
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(leadId, {
      status: 'contacted',
      contacted: true,
      contactedAt: new Date(),
    }, { new: true });
    await sendMsg(`✅ *${lead?.businessName}* marcado como contactado.`);
    return;
  }

  // ── info_<leadId> ─────────────────────────────────────────────────────────
  if (data.startsWith('info_')) {
    const leadId = data.replace('info_', '');
    await connectDB();
    const lead = await Lead.findById(leadId);
    if (!lead) return;

    const price = lead.currency === 'EUR' ? `${lead.monthlyTotal || 25}€` : `$${lead.monthlyTotal || 25}`;
    const raw   = lead.rawScrapeData;

    // Construir info completa con datos del scraping
    let infoText =
      `*🏢 ${lead.businessName}*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 ${lead.address || lead.city}, ${lead.city}, ${lead.country === 'ES' ? 'España' : lead.country === 'AR' ? 'Argentina' : 'Uruguay'}\n` +
      `🏷️ Sector: ${lead.sector}\n` +
      `📱 Teléfono: ${lead.phone || 'No disponible'}\n` +
      `📧 Email: ${lead.email || 'No disponible'}\n` +
      `💬 WhatsApp: ${lead.hasWhatsApp ? '✅ Confirmado' : '❌ No verificado'}\n` +
      `⭐ Reseñas: ${lead.reviewCount > 0 ? `${lead.reviewRating}/5 (${lead.reviewCount} reseñas)` : 'No disponible'}\n` +
      `\n*📊 Estado del pipeline*\n` +
      `Estado: *${lead.status}*\n` +
      `Visitas: *${lead.visitCount || 0}*\n` +
      `Primera visita: ${lead.firstVisit ? new Date(lead.firstVisit).toLocaleString('es-ES') : 'Nunca'}\n` +
      `Última visita: ${lead.lastVisit ? new Date(lead.lastVisit).toLocaleString('es-ES') : 'Nunca'}\n` +
      `\n*💰 Comercial*\n` +
      `Precio: *${price}/mes*\n` +
      `Hosting: *~3,50€/mes* (aparte)\n` +
      `Dominio: *~15€/año* (aparte)\n` +
      `Template: ${lead.templateUsed || 'Genérico'}\n` +
      `Web: ${BASE_URL}/${lead.slug}\n`;

    if (raw) {
      infoText += `\n*📋 Datos del scraping*\n`;
      if (raw.categories) infoText += `Categorías: ${Array.isArray(raw.categories) ? raw.categories.join(', ') : raw.categories}\n`;
      if (raw.hours) infoText += `Horario: ${raw.hours}\n`;
      if (raw.website === false || raw.website === null) infoText += `🚫 Sin web: Confirmado\n`;
      if (raw.googleMapsUrl) infoText += `Google Maps: ${raw.googleMapsUrl}\n`;
      if (raw.description) infoText += `\n_"${raw.description.slice(0, 200)}..."_\n`;
    }

    await sendMsg(infoText, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🌐 Ver web', url: `${BASE_URL}/${lead.slug}` },
            { text: '💳 Cobrar', callback_data: `pay_${lead._id}` },
          ],
          ...(lead.phone ? [[{ text: '📲 WhatsApp', url: `https://wa.me/${lead.phone.replace(/\D/g, '')}` }]] : []),
        ],
      },
    });
    return;
  }
});

// ─── Notificaciones externas (para usar desde API routes) ────────────────────

export async function notifyVisit(leadId: string, visitCount: number, isHot: boolean) {
  await connectDB();
  const lead = await Lead.findById(leadId);
  if (!lead) return;

  const waNumber = lead.phone?.replace(/\D/g, '');
  const waMsg    = encodeURIComponent(
    `Hola ${lead.businessName.split(' ')[0]}, somos LeadFlow. Nos hemos tomado el atrevimiento de crear una página web profesional para ${lead.businessName}. Puede verla aquí: ${BASE_URL}/${lead.slug}\n\nEl servicio completo tiene un coste de 25€/mes (hosting aparte ~3,50€/mes). ¿Le interesa?`
  );

  const emoji = isHot ? '🔥' : visitCount === 1 ? '👁️' : '🔄';
  const title = isHot ? 'LEAD CALIENTE' : visitCount === 1 ? 'PRIMERA VISITA' : `Visita #${visitCount}`;

  await bot.sendMessage(CHAT_ID,
    `${emoji} *${title} — ${lead.businessName}*\n` +
    `📍 ${lead.city} · ${lead.sector}\n` +
    `📱 ${lead.phone || 'Sin teléfono'}\n` +
    `👁️ Total visitas: *${visitCount}*`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🌐 Ver web', url: `${BASE_URL}/${lead.slug}` },
            ...(waNumber ? [{ text: '📲 WhatsApp', url: `https://wa.me/${waNumber}?text=${waMsg}` }] : []),
          ],
          [
            { text: '💳 Cobrar', callback_data: `pay_${lead._id}` },
            { text: '📊 Info completa', callback_data: `info_${lead._id}` },
          ],
        ],
      },
    }
  );
}

export async function notifyNewClient(leadId: string, monthlyTotal: number) {
  await connectDB();
  const lead = await Lead.findById(leadId);
  if (!lead) return;

  await bot.sendMessage(CHAT_ID,
    `🎉 *NUEVO CLIENTE*\n\n` +
    `*${lead.businessName}*\n` +
    `📍 ${lead.city}, ${lead.country}\n` +
    `🏷️ ${lead.sector}\n` +
    `💰 *${monthlyTotal}€/mes*\n` +
    `(+ hosting ~3,50€/mes · dominio ~15€/año)\n\n` +
    `Web: ${BASE_URL}/${lead.slug}`,
    { parse_mode: 'Markdown' }
  );
}

export async function notifyServiceAlert(service: 'vercel' | 'mongodb', error: string) {
  await bot.sendMessage(CHAT_ID,
    `🚨 *ALERTA DE SERVICIO*\n\n` +
    `Servicio: *${service === 'vercel' ? 'Vercel' : 'MongoDB'}*\n` +
    `Error: ${error}\n\n` +
    `_Revisar urgentemente._`,
    { parse_mode: 'Markdown' }
  );
}

// ─── Manejo global de errores ────────────────────────────────────────────────

// Error de polling de Telegram (red, timeout, etc.) — reconecta solo
bot.on('polling_error', (err) => {
  console.error('[polling_error]', err.message);
  // node-telegram-bot-api reintenta automáticamente; solo logueamos
});

// Promesa rechazada sin catch — logueamos pero no matamos el proceso
process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
});

// Excepción no capturada — logueamos y el proceso sobrevive
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err.message);
});

// ─── CRON: Auto-Pipeline (control dinámico desde Telegram) ──────────────────
// Hora Costa Rica (UTC-6): 10:00 AM = 16:00 UTC, 4:00 PM = 22:00 UTC

let autoPipelineActive = process.env.AUTO_PIPELINE_ENABLED !== '0';
let autoPipelineCancelled = false;
const TARGET_WEBS_PER_RUN = parseInt(process.env.AUTO_PIPELINE_TARGET_WEBS || '50', 10);
const MAX_COMBOS_PER_RUN = parseInt(process.env.AUTO_PIPELINE_MAX_COMBOS || '10', 10);

async function executeAutoPipeline(label: string, forceSunday = false) {
  try {
    if (!autoPipelineActive && !forceSunday) {
      console.log(`[cron] Auto-Pipeline ${label} omitido — desactivado`);
      return;
    }

    const check = await canRun(forceSunday);
    if (!check.allowed) {
      await sendMsg(`⏸️ Auto-Pipeline ${label} omitido: ${check.reason}`);
      return;
    }

    autoPipelineCancelled = false;
    await sendMsg(`🚀 *Auto-Pipeline ${label} iniciando...*\nTarget: ${TARGET_WEBS_PER_RUN} webs | Máx combos: ${MAX_COMBOS_PER_RUN}\n_Podés cancelar con /cancel_`);

    const result = await runAutoPipeline(TARGET_WEBS_PER_RUN, MAX_COMBOS_PER_RUN, () => autoPipelineCancelled, forceSunday);
    const report = formatAutoReport(result);
    await sendMsg(report);

    // Enviar cards de las TOP 15 webs (por rating/reviews), el resto a /leads-status
    if (result.success && result.websGenerated > 0) {
      await connectDB();
      const MAX_CARDS = 15;
      const allNewLeads = await Lead.find({
        status: 'web_live',
        updatedAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) }, // últimos 30 min
      })
        .sort({ reviewRating: -1, reviewCount: -1 })
        .limit(MAX_CARDS)
        .lean();

      if (allNewLeads.length > 0) {
        await sendMsg(`🏆 *Top ${allNewLeads.length} webs generadas* (por rating):`);
        for (const lead of allNewLeads) {
          await sendLeadCard(lead);
        }
      }

      const remaining = result.websGenerated - allNewLeads.length;
      if (remaining > 0) {
        await sendMsg(`_...y ${remaining} webs más. Usá /leads-status para ver todas._`);
      }
    }

    // Reporte diario al final
    const dailyReport = await formatDailyReport();
    await sendMsg(dailyReport);
  } catch (err: any) {
    await sendMsg(`❌ *Error Auto-Pipeline ${label}:* ${err.message}`);
    console.error(`[auto-pipeline:${label}]`, err);
  }
}

// Crons siempre registrados, pero solo ejecutan si autoPipelineActive === true
// 4 crons/día para maximizar cobertura (Costa Rica UTC-6)

// 10:00 AM Costa Rica = 16:00 UTC
cron.schedule('0 16 * * 1-6', () => {
  console.log('[cron] Auto-Pipeline 10:00 disparado');
  executeAutoPipeline('10:00');
}, { timezone: 'UTC' });

// 1:00 PM Costa Rica = 19:00 UTC
cron.schedule('0 19 * * 1-6', () => {
  console.log('[cron] Auto-Pipeline 13:00 disparado');
  executeAutoPipeline('13:00');
}, { timezone: 'UTC' });

// 4:00 PM Costa Rica = 22:00 UTC
cron.schedule('0 22 * * 1-6', () => {
  console.log('[cron] Auto-Pipeline 16:00 disparado');
  executeAutoPipeline('16:00');
}, { timezone: 'UTC' });

// 7:00 PM Costa Rica = 01:00 UTC (+1 día)
cron.schedule('0 1 * * 2-7', () => {
  console.log('[cron] Auto-Pipeline 19:00 disparado');
  executeAutoPipeline('19:00');
}, { timezone: 'UTC' });

console.log(`⏰ Crons registrados (10:00, 13:00, 16:00, 19:00 Costa Rica, Lun-Sáb)`);
console.log(`🤖 Auto-Pipeline: ${autoPipelineActive ? 'ACTIVO ✅' : 'PAUSADO ⏸️'}`);
console.log('🤖 LeadFlow Bot v3 arrancado. Esperando comandos...');
