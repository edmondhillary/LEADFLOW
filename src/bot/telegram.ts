/**
 * BOT DE TELEGRAM — Centro de Control LeadFlow
 *
 * Controla todo el sistema desde el móvil:
 * - Lanzar pipeline (sector + ciudad + país + cantidad)
 * - Ver estadísticas del pipeline
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
  console.error('❌ Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en .env.local');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// ========================
// ESTADO DE SESIÓN
// ========================
interface Session {
  step: string;
  sector?: string;
  city?: string;
  country?: string;
  limit?: number;
}

const session: Session = { step: 'idle' };

// ========================
// HELPERS
// ========================

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

  const emojis: Record<string, string> = {
    scraped: '📋', analyzing: '🔍', generating: '🤖',
    web_live: '🌐', email_sent: '📧', visited: '👀',
    contacted: '📞', client: '🎉', expired: '⏰',
  };

  let total = 0;
  let text = '📊 *Pipeline LeadFlow*\n\n';
  for (const s of stats) {
    const emoji = emojis[s._id] || '❓';
    text += `${emoji} ${s._id}: *${s.count}*\n`;
    total += s.count;
  }
  text += `\n📈 Total: *${total}* leads`;

  // Clientes activos (los que pagan)
  const clients = stats.find(s => s._id === 'client')?.count || 0;
  const mrr = clients * 25;
  text += `\n💰 MRR estimado: *${mrr}€/mes*`;

  return text;
}

// ========================
// MENÚ PRINCIPAL
// ========================

const MAIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: '🚀 Generar webs' }, { text: '📊 Estadísticas' }],
      [{ text: '👀 Leads activos' }, { text: '🎉 Clientes' }],
      [{ text: '🧹 Cleanup' }, { text: '❓ Ayuda' }],
    ],
    resize_keyboard: true,
    persistent: true,
  },
};

// ========================
// COMANDOS
// ========================

bot.onText(/\/start/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  session.step = 'idle';
  await sendMsg(
    `🚀 *LeadFlow Bot* activo\n\n` +
    `Soy tu centro de control. Desde aquí puedes:\n` +
    `• Lanzar el pipeline de generación de webs\n` +
    `• Ver estadísticas en tiempo real\n` +
    `• Gestionar tus leads y clientes\n\n` +
    `¿Qué hacemos?`,
    MAIN_KEYBOARD
  );
});

// ========================
// HANDLER DE MENSAJES
// ========================

bot.on('message', async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const text = msg.text?.trim() || '';

  // ── MENÚ PRINCIPAL ──────────────────────────────

  if (text === '📊 Estadísticas') {
    const stats = await getStats();
    await sendMsg(stats, {
      reply_markup: {
        inline_keyboard: [[
          { text: '🔄 Actualizar', callback_data: 'stats' },
        ]],
      },
    });
    return;
  }

  if (text === '🧹 Cleanup') {
    await sendMsg('🧹 Ejecutando cleanup...');
    const { expired, cleaned } = await runCleanup();
    await sendMsg(
      `✅ *Cleanup completado*\n\n` +
      `⏰ Leads expirados: *${expired}*\n` +
      `🗑️ Leads limpiados: *${cleaned}*`
    );
    return;
  }

  if (text === '❓ Ayuda') {
    await sendMsg(
      `*LeadFlow — Comandos*\n\n` +
      `🚀 *Generar webs* — Lanza el pipeline completo\n` +
      `📊 *Estadísticas* — Ver estado del pipeline\n` +
      `👀 *Leads activos* — Ver leads visitados sin convertir\n` +
      `🎉 *Clientes* — Ver clientes que pagan\n` +
      `🧹 *Cleanup* — Expirar leads de +48h\n\n` +
      `*Comandos adicionales:*\n` +
      `/stats — Estadísticas rápidas\n` +
      `/leads — Lista de leads activos\n` +
      `/cleanup — Limpieza manual`,
      MAIN_KEYBOARD
    );
    return;
  }

  if (text === '👀 Leads activos') {
    await connectDB();
    const leads = await Lead.find({
      status: { $in: ['visited', 'email_sent'] },
    }).sort({ lastVisit: -1 }).limit(10);

    if (leads.length === 0) {
      await sendMsg('No hay leads activos en este momento.');
      return;
    }

    for (const lead of leads) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
      const visits = lead.visitCount > 0 ? `👁 ${lead.visitCount} visita${lead.visitCount > 1 ? 's' : ''}` : '📧 email enviado';
      const phone = lead.phone ? `📞 ${lead.phone}` : 'Sin teléfono';

      await sendMsg(
        `🏢 *${lead.businessName}*\n` +
        `📍 ${lead.city} (${lead.country}) — ${lead.sector}\n` +
        `${visits}\n${phone}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🌐 Ver web', url: `${baseUrl}/${lead.slug}` },
                { text: '💳 Enviar cobro', callback_data: `pay_${lead._id}` },
              ],
              [
                { text: '✅ Marcar contactado', callback_data: `contact_${lead._id}` },
                { text: '📋 Info completa', callback_data: `info_${lead._id}` },
              ],
            ],
          },
        }
      );
    }
    return;
  }

  if (text === '🎉 Clientes') {
    await connectDB();
    const clients = await Lead.find({ status: 'client' }).sort({ paidAt: -1 }).limit(10);

    if (clients.length === 0) {
      await sendMsg('Aún no tienes clientes. ¡Sigue generando webs! 💪');
      return;
    }

    let msg_text = `🎉 *Tus clientes (${clients.length})*\n\n`;
    for (const c of clients) {
      const price = c.currency === 'EUR' ? `${c.price}€` : `$${c.price}`;
      msg_text += `• *${c.businessName}* — ${price}/mes (${c.city})\n`;
    }
    const total = clients.reduce((sum, c) => sum + c.price, 0);
    msg_text += `\n💰 MRR: *${total}€/mes*`;
    await sendMsg(msg_text);
    return;
  }

  // ── FLUJO: GENERAR WEBS ──────────────────────────

  if (text === '🚀 Generar webs') {
    session.step = 'sector';
    await sendMsg(
      '¿Qué sector quieres atacar?',
      {
        reply_markup: {
          keyboard: [
            [{ text: '🔧 Fontanero' }, { text: '⚡ Electricista' }],
            [{ text: '✂️ Peluquería' }, { text: '🦷 Dentista' }],
            [{ text: '🍽️ Restaurante' }, { text: '💪 Gimnasio' }],
            [{ text: '🚗 Taller' }, { text: '❌ Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  if (text === '❌ Cancelar') {
    session.step = 'idle';
    await sendMsg('Cancelado.', MAIN_KEYBOARD);
    return;
  }

  // Paso 1: Sector
  if (session.step === 'sector') {
    const sectorMap: Record<string, string> = {
      '🔧 Fontanero': 'fontanero',
      '⚡ Electricista': 'electricista',
      '✂️ Peluquería': 'peluqueria',
      '🦷 Dentista': 'dentista',
      '🍽️ Restaurante': 'restaurante',
      '💪 Gimnasio': 'gimnasio',
      '🚗 Taller': 'taller',
    };
    const sector = sectorMap[text];
    if (!sector) {
      await sendMsg('Elige un sector del menú 👆');
      return;
    }
    session.sector = sector;
    session.step = 'country';
    await sendMsg(
      `Sector: *${sector}* ✅\n\n¿En qué país?`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '🇪🇸 España' }, { text: '🇦🇷 Argentina' }],
            [{ text: '🇺🇾 Uruguay' }, { text: '❌ Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // Paso 2: País
  if (session.step === 'country') {
    const countryMap: Record<string, string> = {
      '🇪🇸 España': 'ES',
      '🇦🇷 Argentina': 'AR',
      '🇺🇾 Uruguay': 'UY',
    };
    const country = countryMap[text];
    if (!country) {
      await sendMsg('Elige un país del menú 👆');
      return;
    }
    session.country = country;
    session.step = 'city';
    await sendMsg(
      `País: *${text}* ✅\n\n¿En qué ciudad? (escribe el nombre)`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '❌ Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // Paso 3: Ciudad
  if (session.step === 'city') {
    session.city = text;
    session.step = 'limit';
    await sendMsg(
      `Ciudad: *${text}* ✅\n\n¿Cuántas webs generar? (1-50)`,
      {
        reply_markup: {
          keyboard: [
            [{ text: '5' }, { text: '10' }, { text: '20' }],
            [{ text: '30' }, { text: '50' }],
            [{ text: '❌ Cancelar' }],
          ],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // Paso 4: Cantidad → LANZAR PIPELINE
  if (session.step === 'limit') {
    const limit = parseInt(text);
    if (isNaN(limit) || limit < 1 || limit > 50) {
      await sendMsg('Elige un número entre 1 y 50 👆');
      return;
    }
    session.limit = limit;
    session.step = 'running';

    await sendMsg(
      `🚀 *Lanzando pipeline...*\n\n` +
      `Sector: *${session.sector}*\n` +
      `País: *${session.country}*\n` +
      `Ciudad: *${session.city}*\n` +
      `Webs: *${limit}*\n\n` +
      `⏳ Esto puede tardar varios minutos...`,
      MAIN_KEYBOARD
    );

    // Ejecutar pipeline en background
    runPipeline({
      sector: session.sector!,
      city: session.city!,
      country: session.country! as 'ES' | 'AR' | 'UY',
      limit,
      skipEmail: false,
    })
      .then(async (results) => {
        const ok = results.filter(r => !r.error);
        const errors = results.filter(r => r.error);
        const withEmail = results.filter(r => r.emailSent);

        await sendMsg(
          `✅ *Pipeline completado*\n\n` +
          `🌐 Webs generadas: *${ok.length}/${results.length}*\n` +
          `📧 Emails enviados: *${withEmail.length}*\n` +
          `❌ Errores: *${errors.length}*\n\n` +
          (ok.length > 0 ? `*Webs creadas:*\n${ok.slice(0, 5).map(r => `• ${r.businessName}`).join('\n')}` : '')
        );

        session.step = 'idle';
      })
      .catch(async (err) => {
        await sendMsg(`❌ *Error en el pipeline:* ${err.message}`);
        session.step = 'idle';
      });

    return;
  }
});

// ========================
// CALLBACK BUTTONS
// ========================

bot.on('callback_query', async (query) => {
  if (!isAuthorized(query.message!.chat.id)) return;
  const data = query.data || '';

  await bot.answerCallbackQuery(query.id);

  // Estadísticas
  if (data === 'stats') {
    const stats = await getStats();
    await sendMsg(stats);
    return;
  }

  // Enviar payment link
  if (data.startsWith('pay_')) {
    const leadId = data.replace('pay_', '');
    await sendMsg('⏳ Creando payment link...');
    const url = await createPaymentLink({ leadId });
    if (url) {
      const lead = await Lead.findById(leadId);
      await sendMsg(
        `💳 *Payment link generado*\n\n` +
        `🏢 ${lead?.businessName}\n\n` +
        `👉 ${url}\n\n` +
        `_Envíaselo por WhatsApp o email_`
      );
    } else {
      await sendMsg('❌ Error creando payment link');
    }
    return;
  }

  // Marcar como contactado
  if (data.startsWith('contact_')) {
    const leadId = data.replace('contact_', '');
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(leadId, {
      status: 'contacted',
      contacted: true,
      contactedAt: new Date(),
    }, { new: true });
    await sendMsg(`✅ *${lead?.businessName}* marcado como contactado`);
    return;
  }

  // Info completa del lead
  if (data.startsWith('info_')) {
    const leadId = data.replace('info_', '');
    await connectDB();
    const lead = await Lead.findById(leadId);
    if (!lead) return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
    const price = lead.currency === 'EUR' ? `${lead.price}€` : `$${lead.price}`;

    await sendMsg(
      `📋 *${lead.businessName}*\n\n` +
      `📍 ${lead.city}, ${lead.country}\n` +
      `🏭 Sector: ${lead.sector}\n` +
      `📞 Tel: ${lead.phone || 'N/A'}\n` +
      `📧 Email: ${lead.email || 'N/A'}\n` +
      `🌐 Web: ${baseUrl}/${lead.slug}\n` +
      `💰 Precio: ${price}/mes\n` +
      `📊 Estado: ${lead.status}\n` +
      `👁 Visitas: ${lead.visitCount}\n` +
      `📅 Primera visita: ${lead.firstVisit ? lead.firstVisit.toLocaleDateString('es-ES') : 'N/A'}`
    );
    return;
  }

  // Botones del tracking (visita detectada)
  if (data.startsWith('web_')) {
    const leadId = data.replace('web_', '');
    const lead = await Lead.findById(leadId);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
    if (lead) {
      await bot.sendMessage(CHAT_ID, `Abriendo: ${baseUrl}/${lead.slug}`);
    }
  }
});

// ========================
// COMANDOS RÁPIDOS
// ========================

bot.onText(/\/stats/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  const stats = await getStats();
  await sendMsg(stats);
});

bot.onText(/\/cleanup/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await sendMsg('🧹 Ejecutando cleanup...');
  const { expired, cleaned } = await runCleanup();
  await sendMsg(`✅ Expirados: *${expired}* | Limpiados: *${cleaned}*`);
});

bot.onText(/\/leads/, async (msg) => {
  if (!isAuthorized(msg.chat.id)) return;
  await connectDB();
  const leads = await Lead.find({
    status: { $in: ['visited', 'email_sent', 'web_live'] },
  }).sort({ createdAt: -1 }).limit(5);

  if (leads.length === 0) {
    await sendMsg('No hay leads activos.');
    return;
  }

  let text = `👀 *Leads activos (${leads.length})*\n\n`;
  for (const l of leads) {
    text += `• *${l.businessName}* — ${l.status} (${l.city})\n`;
  }
  await sendMsg(text);
});

// ========================
// ARRANQUE
// ========================

console.log('🤖 LeadFlow Bot iniciado...');
connectDB().then(() => {
  console.log('✅ MongoDB conectado');
  sendMsg(
    `🤖 *LeadFlow Bot online*\n\nListo para generar clientes. Usa el menú 👇`,
    MAIN_KEYBOARD
  );
});

bot.on('polling_error', (err) => {
  console.error('❌ Polling error:', err.message);
});
