/**
 * BOT DE TELEGRAM — Centro de Control LeadFlow v2
 *
 * Controla todo el sistema desde el movil:
 * - Lanzar pipeline v2 (sector + ciudad + pais + cantidad + modo)
 * - Ver estadisticas del pipeline
 * - Ver leads activos y su estado
 * - Enviar payment link a un lead
 * - Marcar como contactado
 * - Recibir notificaciones en tiempo real (visitas, pagos)
 *
 * Uso: npx tsx src/bot/telegram.ts
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import TelegramBot from 'node-telegram-bot-api';
import { connectDB, Lead } from '../lib/mongodb';
import { runPipeline } from '../../skills/generate';
import { createPaymentLink } from '../../skills/payments/index';
import { runCleanup } from '../../skills/cleanup/index';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

if (!TOKEN || !CHAT_ID) {
  console.error('TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID son obligatorios en .env.local');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// ─── Estado de sesion ────────────────────────────────────────────────────────

interface Session {
  step:
    | 'idle'
    | 'sector'
    | 'country'
    | 'city'
    | 'limit'
    | 'mode'
    | 'confirm'
    | 'running';
  sector?: string;
  city?: string;
  country?: string;
  limit?: number;
  skipDesign?: boolean;
  prodWhatsApp?: boolean;
}

const session: Session = { step: 'idle' };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isAuthorized(chatId: number): boolean {
  return chatId.toString() === CHAT_ID;
}

async function sendMsg(text: string, opts?: TelegramBot.SendMessageOptions) {
  return bot.sendMessage(CHAT_ID, text, { parse_mode: 'Markdown', ...opts });
}

function buildBaseUrl(): string {
  return process.env.NGROK_URL
    || process.env.NEXT_PUBLIC_BASE_URL
    || 'https://leadflow.vercel.app';
}

async function getStats() {
  await connectDB();
  const stats = await Lead.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const labels: Record<string, string> = {
    scraped:    'Scrapeados',
    analyzing:  'Analizando',
    generating: 'Generando',
    web_live:   'Web en vivo',
    email_sent: 'Email enviado',
    visited:    'Han visitado',
    contacted:  'Contactados',
    client:     'Clientes',
    expired:    'Expirados',
  };

  let total = 0;
  let text = '*Pipeline LeadFlow v2*\n\n';
  for (const s of stats) {
    const label = labels[s._id] || s._id;
    text += `${label}: *${s.count}*\n`;
    total += s.count;
  }
  text += `\nTotal: *${total}* leads`;

  const clients = stats.find((s: any) => s._id === 'client')?.count || 0;
  const mrr = clients * 25;
  text += `\nMRR estimado: *${mrr}€/mes*`;

  return text;
}

// ─── Teclados ─────────────────────────────────────────────────────────────────

const MAIN_KEYBOARD: TelegramBot.SendMessageOptions = {
  reply_markup: {
    keyboard: [
      [{ text: 'Generar webs' }, { text: 'Estadisticas' }],
      [{ text: 'Leads activos' }, { text: 'Clientes' }],
      [{ text: 'Cleanup' }, { text: 'Ayuda' }],
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

// ─── /start ───────────────────────────────────────────────────────────────────

bot.onText(/\/start/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  session.step = 'idle';
  await sendMsg(
    `*LeadFlow Bot v2* activo\n\n` +
    `Centro de control desde el movil.\n` +
    `Genera webs para negocios sin presencia online,\n` +
    `recibe alertas cuando visitan y cobra 25/mes.\n\n` +
    `Que hacemos?`,
    MAIN_KEYBOARD
  );
});

// ─── Handler principal ────────────────────────────────────────────────────────

bot.on('message', async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const text = msg.text?.trim() || '';

  // ── Menu principal ───────────────────────────────────────────────────────

  if (text === 'Estadisticas') {
    const stats = await getStats();
    await sendMsg(stats, {
      reply_markup: {
        inline_keyboard: [[{ text: 'Actualizar', callback_data: 'stats' }]],
      },
    });
    return;
  }

  if (text === 'Cleanup') {
    await sendMsg('Ejecutando cleanup...');
    const { expired, cleaned } = await runCleanup();
    await sendMsg(
      `*Cleanup completado*\n\nExpirados: *${expired}*\nLimpiados: *${cleaned}*`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === 'Ayuda') {
    await sendMsg(
      `*LeadFlow v2 - Comandos*\n\n` +
      `*Generar webs* - Pipeline completo (6 pasos)\n` +
      `*Estadisticas* - Estado de todos los leads\n` +
      `*Leads activos* - Leads que visitaron su web\n` +
      `*Clientes* - Clientes que pagan\n` +
      `*Cleanup* - Expirar leads de +48h\n\n` +
      `*Comandos rapidos:*\n` +
      `/stats - Estadisticas rapidas\n` +
      `/leads - Lista leads activos\n` +
      `/cleanup - Limpieza manual\n` +
      `/pipeline - Estado del pipeline`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === 'Leads activos') {
    await connectDB();
    const leads = await Lead.find({
      status: { $in: ['visited', 'email_sent', 'web_live'] },
    }).sort({ lastVisit: -1 }).limit(10);

    if (leads.length === 0) {
      await sendMsg('No hay leads activos ahora mismo.', MAIN_KEYBOARD);
      return;
    }

    const baseUrl = buildBaseUrl();
    for (const lead of leads) {
      const visits = lead.visitCount > 0 ? `Visitas: ${lead.visitCount}` : 'Sin visitas';
      await sendMsg(
        `*${lead.businessName}*\n${lead.city} - ${lead.sector}\nTel: ${lead.phone || 'N/A'}\n${visits}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Ver web', url: `${baseUrl}/${lead.slug}` },
                { text: 'Enviar cobro', callback_data: `pay_${lead._id}` },
              ],
              [
                { text: 'Contactado', callback_data: `contact_${lead._id}` },
                { text: 'Info completa', callback_data: `info_${lead._id}` },
              ],
            ],
          },
        }
      );
    }
    return;
  }

  if (text === 'Clientes') {
    await connectDB();
    const clients = await Lead.find({ status: 'client' }).sort({ paidAt: -1 }).limit(15);

    if (clients.length === 0) {
      await sendMsg('Aun no hay clientes. Sigue generando webs!', MAIN_KEYBOARD);
      return;
    }

    let msgText = `*Clientes activos (${clients.length})*\n\n`;
    for (const c of clients) {
      const price = c.currency === 'EUR' ? `${c.price}€` : `$${c.price}`;
      msgText += `- *${c.businessName}* - ${price}/mes (${c.city})\n`;
    }
    const total = clients.reduce((sum: number, c: any) => sum + (c.price || 25), 0);
    msgText += `\nMRR: *${total} euros/mes*`;
    await sendMsg(msgText, MAIN_KEYBOARD);
    return;
  }

  // ── Flujo: Generar webs ────────────────────────────────────────────────────

  if (text === 'Generar webs') {
    session.step = 'sector';
    await sendMsg('Que sector quieres atacar?', {
      reply_markup: {
        keyboard: [
          [{ text: 'Fontanero' }, { text: 'Electricista' }],
          [{ text: 'Peluqueria' }, { text: 'Dentista' }],
          [{ text: 'Restaurante' }, { text: 'Gimnasio' }],
          [{ text: 'Taller' }, { text: 'Cancelar' }],
        ],
        resize_keyboard: true,
      },
    });
    return;
  }

  if (text === 'Cancelar') {
    session.step = 'idle';
    await sendMsg('Cancelado.', MAIN_KEYBOARD);
    return;
  }

  // ── Paso 1: Sector ────────────────────────────────────────────────────────

  if (session.step === 'sector') {
    const sectorMap: Record<string, string> = {
      'Fontanero': 'fontanero',
      'Electricista': 'electricista',
      'Peluqueria': 'peluqueria',
      'Dentista': 'dentista',
      'Restaurante': 'restaurante',
      'Gimnasio': 'gimnasio',
      'Taller': 'taller',
    };
    const sector = sectorMap[text];
    if (!sector) { await sendMsg('Elige un sector del menu'); return; }
    session.sector = sector;
    session.step = 'country';
    await sendMsg(`Sector: *${sector}*\n\nEn que pais?`, {
      reply_markup: {
        keyboard: [
          [{ text: 'Espana' }, { text: 'Argentina' }],
          [{ text: 'Uruguay' }, { text: 'Cancelar' }],
        ],
        resize_keyboard: true,
      },
    });
    return;
  }

  // ── Paso 2: Pais ──────────────────────────────────────────────────────────

  if (session.step === 'country') {
    const countryMap: Record<string, string> = {
      'Espana': 'ES', 'Argentina': 'AR', 'Uruguay': 'UY',
    };
    const country = countryMap[text];
    if (!country) { await sendMsg('Elige un pais del menu'); return; }
    session.country = country;
    session.step = 'city';
    await sendMsg(`Pais: *${text}*\n\nEn que ciudad? (escribe el nombre)`, CANCEL_KB);
    return;
  }

  // ── Paso 3: Ciudad ────────────────────────────────────────────────────────

  if (session.step === 'city') {
    if (text.length < 2) { await sendMsg('Escribe el nombre de la ciudad'); return; }
    session.city = text;
    session.step = 'limit';
    await sendMsg(`Ciudad: *${text}*\n\nCuantas webs generar?`, {
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

  // ── Paso 4: Cantidad ──────────────────────────────────────────────────────

  if (session.step === 'limit') {
    const limit = parseInt(text);
    if (isNaN(limit) || limit < 1 || limit > 100) {
      await sendMsg('Elige un numero entre 1 y 100'); return;
    }
    session.limit = limit;
    session.step = 'mode';
    await sendMsg(
      `Cantidad: *${limit} webs*\n\n` +
      `Que modo quieres?\n\n` +
      `*Completo* - Scraping de competidores + brand guidelines por IA.\n` +
      `Mejor resultado, tarda 3-5 min extra.\n\n` +
      `*Rapido* - Sin scraping de diseno, usa defaults del sector.\n` +
      `Tarda ~1 min.`,
      {
        reply_markup: {
          keyboard: [
            [{ text: 'Completo (recomendado)' }, { text: 'Rapido' }],
            [{ text: 'Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // ── Paso 5: Modo ──────────────────────────────────────────────────────────

  if (session.step === 'mode') {
    if (text === 'Completo (recomendado)') {
      session.skipDesign = false;
    } else if (text === 'Rapido') {
      session.skipDesign = true;
    } else {
      await sendMsg('Elige un modo del menu'); return;
    }
    session.step = 'confirm';
    await sendMsg(
      `A quien envias el WhatsApp de preview?\n\n` +
      `*A mi (test)* - Lo ves tu primero antes de mandar a los leads.\n\n` +
      `*A los leads (prod)* - Se envia directo al telefono del negocio.\n` +
      `Usa solo con Vercel + Twilio configurados.`,
      {
        reply_markup: {
          keyboard: [
            [{ text: 'Enviar a mi (test)' }, { text: 'Enviar a leads (prod)' }],
            [{ text: 'Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // ── Paso 6: Confirmacion + LANZAR ─────────────────────────────────────────

  if (session.step === 'confirm') {
    if (text === 'Enviar a mi (test)') {
      session.prodWhatsApp = false;
    } else if (text === 'Enviar a leads (prod)') {
      session.prodWhatsApp = true;
    } else {
      await sendMsg('Elige una opcion del menu'); return;
    }

    session.step = 'running';
    const modeLabel = session.skipDesign ? 'Rapido' : 'Completo con brand AI';
    const waLabel   = session.prodWhatsApp ? 'PROD - a los leads' : 'TEST - a ti';

    await sendMsg(
      `*Lanzando pipeline v2...*\n\n` +
      `Sector: *${session.sector}*\n` +
      `Pais: *${session.country}*\n` +
      `Ciudad: *${session.city}*\n` +
      `Webs: *${session.limit}*\n` +
      `Modo: *${modeLabel}*\n` +
      `WhatsApp: *${waLabel}*\n\n` +
      `Te aviso cuando termine. Puede tardar varios minutos.`,
      MAIN_KEYBOARD
    );

    // Ping de progreso cada 60s
    const pingMessages = [
      'Buscando negocios sin web en Google Maps...',
      'Scrapeando disenos de competidores con Playwright...',
      'Generando brand guidelines con IA...',
      'Generando contenido web con Claude Haiku...',
      'Creando payment links en Stripe...',
      'Enviando WhatsApp de preview...',
      'Ultimando detalles...',
    ];
    let pingCount = 0;
    const pingInterval = setInterval(async () => {
      if (session.step !== 'running') { clearInterval(pingInterval); return; }
      const pingMsg = pingMessages[pingCount % pingMessages.length];
      await sendMsg(`_${pingMsg}_`).catch(() => {});
      pingCount++;
    }, 60_000);

    runPipeline({
      sector:            session.sector!,
      city:              session.city!,
      country:           session.country! as 'ES' | 'AR' | 'UY',
      limit:             session.limit!,
      testWhatsApp:      !session.prodWhatsApp,
      skipDesignScraper: session.skipDesign ?? false,
    })
      .then(async (results) => {
        clearInterval(pingInterval);
        session.step = 'idle';

        const ok     = results.filter((r: any) => !r.error);
        const errors = results.filter((r: any) => r.error);
        const withWA = results.filter((r: any) => r.whatsappSent);

        await sendMsg(
          `*Pipeline completado*\n\n` +
          `Webs generadas: *${ok.length}/${results.length}*\n` +
          `WhatsApp enviados: *${withWA.length}*\n` +
          `Errores: *${errors.length}*`
        );

        // Una card por web con boton de abrir + enviar cobro
        if (ok.length > 0) {
          await sendMsg(`*Webs creadas:*`);
          for (const r of ok.slice(0, 10) as any[]) {
            await sendMsg(`*${r.businessName}*\n${r.webUrl}`, {
              reply_markup: {
                inline_keyboard: [[
                  { text: 'Abrir web', url: r.webUrl },
                  { text: 'Enviar cobro', callback_data: `pay_${r.leadId}` },
                ]],
              },
            });
          }
          if (ok.length > 10) {
            await sendMsg(`_...y ${ok.length - 10} webs mas. Usa "Leads activos" para verlas todas._`);
          }
        }

        if (errors.length > 0) {
          const errList = (errors as any[]).slice(0, 5).map((r) => `- ${r.businessName}: ${r.error}`).join('\n');
          await sendMsg(`*Errores:*\n\n${errList}`);
        }
      })
      .catch(async (err: any) => {
        clearInterval(pingInterval);
        session.step = 'idle';
        await sendMsg(`*Error en el pipeline:* ${err.message}`);
      });

    return;
  }
});

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

  if (data.startsWith('pay_')) {
    const leadId = data.replace('pay_', '');
    await sendMsg('Creando payment link...');
    try {
      const url = await createPaymentLink({ leadId });
      if (url) {
        const lead = await Lead.findById(leadId);
        await sendMsg(`*Payment link generado*\n\n${lead?.businessName}\n\n${url}\n\n_Enviaselo por WhatsApp o email_`);
      } else {
        await sendMsg('Error: URL de pago vacia');
      }
    } catch (e: any) {
      await sendMsg(`Error: ${e.message}`);
    }
    return;
  }

  if (data.startsWith('contact_')) {
    const leadId = data.replace('contact_', '');
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(leadId, {
      status: 'contacted',
      contacted: true,
      contactedAt: new Date(),
    }, { new: true });
    await sendMsg(`*${lead?.businessName}* marcado como contactado`);
    return;
  }

  if (data.startsWith('info_')) {
    const leadId = data.replace('info_', '');
    await connectDB();
    const lead = await Lead.findById(leadId);
    if (!lead) return;
    const baseUrl = buildBaseUrl();
    const price = lead.currency === 'EUR' ? `${lead.price || 25} euros` : `${lead.price || 25} USD`;
    await sendMsg(
      `*${lead.businessName}*\n\n` +
      `Ciudad: ${lead.city}, ${lead.country}\n` +
      `Sector: ${lead.sector}\n` +
      `Tel: ${lead.phone || 'N/A'}\n` +
      `Email: ${lead.email || 'N/A'}\n` +
      `Web: ${baseUrl}/${lead.slug}\n` +
      `Precio: ${price}/mes\n` +
      `Estado: ${lead.status}\n` +
      `Visitas: ${lead.visitCount || 0}`
    );
    return;
  }
});

// ─── Comandos rapidos ─────────────────────────────────────────────────────────

bot.onText(/\/stats/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await sendMsg(await getStats());
});

bot.onText(/\/cleanup/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await sendMsg('Ejecutando cleanup...');
  const { expired, cleaned } = await runCleanup();
  await sendMsg(`Expirados: *${expired}* | Limpiados: *${cleaned}*`);
});

bot.onText(/\/leads/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await connectDB();
  const leads = await Lead.find({
    status: { $in: ['visited', 'email_sent', 'web_live'] },
  }).sort({ createdAt: -1 }).limit(5);

  if (leads.length === 0) { await sendMsg('No hay leads activos.'); return; }

  const baseUrl = buildBaseUrl();
  let txt = `*Leads activos (${leads.length})*\n\n`;
  for (const l of leads) {
    txt += `- *${l.businessName}* - ${l.status} - ${baseUrl}/${l.slug}\n`;
  }
  await sendMsg(txt);
});

bot.onText(/\/pipeline/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await sendMsg(await getStats());
});

// ─── Arranque ─────────────────────────────────────────────────────────────────

console.log('LeadFlow Bot v2 iniciando...');
connectDB().then(async () => {
  console.log('MongoDB conectado');
  await sendMsg(
    `*LeadFlow Bot v2 online*\n\nPipeline completo activo: scraper + design AI + brand builder + content gen.`,
    MAIN_KEYBOARD
  );
});

bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});
