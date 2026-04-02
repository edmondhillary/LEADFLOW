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
import { connectDB, Lead } from '../lib/mongodb';
import { runPipeline } from '../../skills/generate';
import { createPaymentLink } from '../../skills/payments/index';
import { runCleanup } from '../../skills/cleanup/index';
import { getSectorKeyboard, slugFromLabel } from '../config/sectors';

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
      | 'stripe_lead' | 'stripe_services';
  sector?: string;
  city?: string;
  country?: string;
  limit?: number;
  // stripe flow
  stripeLead?: any;
  stripeServices?: string[];
}

const session: Session = { step: 'idle' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isAuthorized(chatId: number): boolean {
  return chatId.toString() === CHAT_ID;
}

async function sendMsg(text: string, opts?: TelegramBot.SendMessageOptions) {
  return bot.sendMessage(CHAT_ID, text, { parse_mode: 'Markdown', ...opts });
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
      [{ text: '👁️ Leads activos' }, { text: '✅ Clientes' }],
      [{ text: '🏥 Health check' }, { text: '🧹 Cleanup' }],
      [{ text: '💳 /stripe' }, { text: '❓ Ayuda' }],
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

  if (text === '❓ Ayuda' || text === 'Ayuda') {
    await sendMsg(
      `*LeadFlow v3 — Comandos*\n\n` +
      `*🚀 Generar webs* — Pipeline completo (scraping → web → notificación)\n` +
      `*📊 Estadísticas* — Estado de todos los leads\n` +
      `*👁️ Leads activos* — Leads que visitaron su web\n` +
      `*✅ Clientes* — Clientes que pagan\n` +
      `*🏥 Health check* — Estado de Vercel y MongoDB\n` +
      `*🧹 Cleanup* — Expirar leads de +48h\n` +
      `*💳 /stripe* — Generar link de pago personalizado\n\n` +
      `*Nota:* El WhatsApp lo envías tú manualmente desde los botones de cada lead.`,
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

  if (text === 'Cancelar') {
    session.step = 'idle';
    await sendMsg('Cancelado.', MAIN_KEYBOARD);
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
      country:           session.country! as 'ES' | 'AR' | 'UY',
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
          const lead = await Lead.findById(r.leadId);
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
        await sendMsg(
          `*💳 Payment link generado*\n\n` +
          `*${session.stripeLead.businessName}*\n` +
          `Importe: *${amount}€/mes*\n\n` +
          `${url}\n\n` +
          `_Envíalo por WhatsApp al cliente._`,
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
        await sendMsg(
          `*💳 Link de pago generado*\n\n` +
          `*${lead.businessName}*\n` +
          `📍 ${lead.city}\n` +
          `📦 Servicios: ${serviceNames}\n` +
          `💰 Total: *${totalEur}€/mes*\n` +
          `🔗 Hosting: ~3,50€/mes adicional · Dominio: ~15€/año\n\n` +
          `${url}\n\n` +
          `_Envíalo por WhatsApp al cliente._`,
          MAIN_KEYBOARD
        );
      }
    } catch (e: any) {
      await sendMsg(`❌ Error al generar el link: ${e.message}`, MAIN_KEYBOARD);
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

console.log('🤖 LeadFlow Bot v3 arrancado. Esperando comandos...');
