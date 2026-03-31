/**
 * Script: preview-leads.ts
 * Pregunta el sector → manda TELEGRAM + WhatsApp directo con todas las webs
 * Uso: npm run preview
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as readline from 'readline';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../src/lib/mongodb';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID        = process.env.TELEGRAM_CHAT_ID!;
const TWILIO_SID     = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN   = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_FROM    = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
const MY_NUMBER      = process.env.TWILIO_TEST_NUMBER!;   // tu número personal
const BASE_URL       = process.env.NGROK_URL
  || (process.env.NEXT_PUBLIC_BASE_URL?.startsWith('http://localhost') ? null : process.env.NEXT_PUBLIC_BASE_URL)
  || null;

// ─── Telegram ───────────────────────────────────────────────────────────────
async function sendTelegram(message: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML', disable_web_page_preview: false }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram: ${data.description}`);
}

// ─── WhatsApp (a TU número) ──────────────────────────────────────────────────
async function sendWA(message: string): Promise<void> {
  if (!TWILIO_SID || !TWILIO_TOKEN || !MY_NUMBER) return; // silencioso si no está configurado

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: TWILIO_FROM, To: `whatsapp:${MY_NUMBER}`, Body: message }).toString(),
    }
  );
  const data = await res.json();
  if (!res.ok) console.warn(`⚠️  WhatsApp error: ${data.message || JSON.stringify(data)}`);
}

// ─── Input ───────────────────────────────────────────────────────────────────
function ask(q: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(q, a => { rl.close(); resolve(a.trim()); }));
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    console.error('❌ Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en .env.local');
    process.exit(1);
  }

  await connectDB();

  const sectoresDB: string[] = await Lead.distinct('sector');
  if (sectoresDB.length === 0) {
    console.log('📭 No hay leads en la base de datos todavía.');
    process.exit(0);
  }

  console.log('\n📋 Sectores disponibles:');
  sectoresDB.forEach((s, i) => console.log(`   ${i + 1}. ${s}`));
  console.log('   0. Todos\n');

  const input = await ask('¿Qué sector? (nombre o número): ');
  let sectorFilter: string | null = null;
  if (input !== '0' && input.toLowerCase() !== 'todos') {
    sectorFilter = !isNaN(Number(input))
      ? (sectoresDB[Number(input) - 1] || null)
      : input.toLowerCase();
  }

  const query: any = {};
  if (sectorFilter) query.sector = sectorFilter;
  const leads = await Lead.find(query).sort({ createdAt: -1 }).lean() as any[];

  if (leads.length === 0) {
    console.log(`\n📭 No hay leads${sectorFilter ? ` de "${sectorFilter}"` : ''}.`);
    process.exit(0);
  }

  const effectiveBase = BASE_URL || 'http://localhost:4242';
  const esLocal = !BASE_URL;

  if (esLocal) {
    console.log('\n⚠️  URLs en localhost — clicables solo desde tu Mac.');
    console.log('   Para verlas en móvil: ngrok http 4242 → NGROK_URL=https://xxx.ngrok.io\n');
  }

  const conWeb = leads.filter(l => l.contentRef || ['web_live','email_sent','visited','contacted','client'].includes(l.status));
  const sinWeb = leads.filter(l => !conWeb.includes(l));

  const titulo = sectorFilter ? `📊 Leads: ${sectorFilter.toUpperCase()}` : `📊 Todos los Leads`;

  // ── Construir mensaje Telegram (HTML, links clicables) ──────────────────────
  let tgMsg = `${titulo}\nTotal: ${leads.length} | Con web: ${conWeb.length} | Sin web: ${sinWeb.length}\n`;
  if (esLocal) tgMsg += `⚠️ URLs localhost — abre en el Mac\n`;
  tgMsg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (conWeb.length > 0) {
    tgMsg += `✅ <b>WEBS GENERADAS (${conWeb.length})</b>\n\n`;
    for (const l of conWeb) {
      const url = `${effectiveBase}/${l.slug}`;
      const e: Record<string,string> = { web_live:'🟢', email_sent:'📤', visited:'👁️', contacted:'💬', client:'💰' };
      tgMsg += `${e[l.status]||'🟡'} <b>${l.businessName}</b>\n📍 ${l.city} | 📞 ${l.phone||'sin tel'}\n🌐 <a href="${url}">${url}</a>\n\n`;
    }
  }
  if (sinWeb.length > 0) {
    tgMsg += `⏳ <b>SIN WEB (${sinWeb.length})</b>\n`;
    for (const l of sinWeb) tgMsg += `• ${l.businessName} (${l.city}) — ${l.status}\n`;
  }

  // ── Construir mensaje WhatsApp (sin HTML, texto plano) ─────────────────────
  let waMsg = `${titulo}\nTotal: ${leads.length} | Con web: ${conWeb.length}\n`;
  if (esLocal) waMsg += `⚠️ URLs solo desde el Mac\n`;
  waMsg += `────────────────────\n\n`;

  if (conWeb.length > 0) {
    for (const l of conWeb) {
      const url = `${effectiveBase}/${l.slug}`;
      waMsg += `🏢 *${l.businessName}*\n📍 ${l.city} | 📞 ${l.phone||'sin tel'}\n🌐 ${url}\n\n`;
    }
  }

  // ── Enviar Telegram (dividir si >4000 chars) ────────────────────────────────
  const MAX = 4000;
  const tgChunks: string[] = [];
  if (tgMsg.length <= MAX) {
    tgChunks.push(tgMsg);
  } else {
    let cur = '';
    for (const line of tgMsg.split('\n')) {
      if ((cur + line + '\n').length > MAX) { tgChunks.push(cur); cur = ''; }
      cur += line + '\n';
    }
    if (cur.trim()) tgChunks.push(cur);
  }

  console.log(`\n📨 Enviando a Telegram (${tgChunks.length} mensaje${tgChunks.length>1?'s':''})...`);
  for (const chunk of tgChunks) {
    await sendTelegram(chunk);
    if (tgChunks.length > 1) await new Promise(r => setTimeout(r, 500));
  }
  console.log('✅ Telegram OK');

  // ── Enviar WhatsApp (dividir si >1600 chars — límite WA) ───────────────────
  if (TWILIO_SID && MY_NUMBER) {
    const WA_MAX = 1500;
    const waChunks: string[] = [];
    if (waMsg.length <= WA_MAX) {
      waChunks.push(waMsg);
    } else {
      let cur = '';
      for (const line of waMsg.split('\n')) {
        if ((cur + line + '\n').length > WA_MAX) { waChunks.push(cur); cur = ''; }
        cur += line + '\n';
      }
      if (cur.trim()) waChunks.push(cur);
    }

    console.log(`📱 Enviando a WhatsApp (${waChunks.length} mensaje${waChunks.length>1?'s':''})...`);
    for (const chunk of waChunks) {
      await sendWA(chunk);
      await new Promise(r => setTimeout(r, 800));
    }
    console.log(`✅ WhatsApp OK → ${MY_NUMBER}`);
  } else {
    console.log('⏭️  WhatsApp saltado (TWILIO_TEST_NUMBER no configurado)');
  }

  console.log(`\n🎉 Listo. ${conWeb.length} webs enviadas.`);
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
