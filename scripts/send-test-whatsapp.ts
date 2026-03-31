/**
 * Script: send-test-whatsapp.ts
 * Envía por WhatsApp a TU NÚMERO los links de todas las webs generadas
 * Uso: npm run send-test-wa [--sector electricista] [--all]
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../src/lib/mongodb';

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
const TEST_NUMBER = process.env.TWILIO_TEST_NUMBER;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4242';

async function sendWA(to: string, message: string): Promise<boolean> {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const body = new URLSearchParams({
    From: TWILIO_FROM,
    To: `whatsapp:${to}`,
    Body: message,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('❌ Twilio error:', JSON.stringify(data));
    return false;
  }
  console.log(`✅ WA enviado → SID: ${data.sid}`);
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const sectorFilter = getArg('sector'); // ej: --sector electricista
  const sendAll = args.includes('--all');

  if (!TWILIO_SID || !TWILIO_TOKEN) {
    console.error('❌ Faltan TWILIO_ACCOUNT_SID y TWILIO_AUTH_TOKEN en .env.local');
    process.exit(1);
  }

  if (!TEST_NUMBER) {
    console.error('❌ Falta TWILIO_TEST_NUMBER en .env.local (tu número: +34XXXXXXXXX)');
    process.exit(1);
  }

  await connectDB();

  // Buscamos leads con web generada (contentRef existe o status >= web_live)
  const query: any = {
    contentRef: { $exists: true },
  };
  if (sectorFilter) query.sector = sectorFilter;
  if (!sendAll) {
    // Solo los que aún no se han enviado
    query.emailSent = { $ne: true };
  }

  const leads = await Lead.find(query).lean();

  if (leads.length === 0) {
    console.log('📭 No hay leads con web generada' + (sectorFilter ? ` del sector "${sectorFilter}"` : '') + '.');
    console.log('💡 Prueba con --all para incluir los ya enviados.');

    // Mostrar todos de ese sector aunque no tengan contentRef
    const allLeads = await Lead.find(sectorFilter ? { sector: sectorFilter } : {}).lean();
    if (allLeads.length > 0) {
      console.log(`\n📋 Leads encontrados del sector (sin web aún):`);
      for (const l of allLeads as any[]) {
        console.log(`   - ${l.businessName} → estado: ${l.status}`);
      }
    }
    process.exit(0);
  }

  console.log(`\n📱 Enviando ${leads.length} webs a tu WhatsApp (${TEST_NUMBER})...\n`);

  for (const lead of leads as any[]) {
    const webUrl = `${BASE_URL}/${lead.slug}`;
    const message =
      `🧪 *LeadFlow TEST*\n\n` +
      `🏢 *${lead.businessName}*\n` +
      `📍 ${lead.city}, ${lead.country} | ${lead.sector}\n\n` +
      `🌐 *Web generada:*\n${webUrl}\n\n` +
      `📊 Estado: ${lead.status}\n` +
      `📞 Teléfono lead: ${lead.phone || 'N/A'}`;

    console.log(`📤 Enviando: ${lead.businessName}`);
    console.log(`   URL: ${webUrl}`);
    await sendWA(TEST_NUMBER, message);

    // Pausa de 1s entre mensajes
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n🎉 Listo. Revisa tu WhatsApp (${TEST_NUMBER})`);
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
