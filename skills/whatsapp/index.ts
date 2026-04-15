/**
 * SKILL 7: LeadFlow WhatsApp
 *
 * Envía mensaje de WhatsApp via Twilio con la URL de la web generada.
 * En modo TEST: envía a tu propio número para revisar las webs.
 * En modo PROD: envía al número del lead.
 *
 * Uso: npx tsx skills/whatsapp/index.ts --leadId <mongoId> [--test]
 */

import { connectDB, Lead, WebsiteContent } from '../../src/lib/mongodb';

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // Sandbox Twilio
const TEST_NUMBER = process.env.TWILIO_TEST_NUMBER; // Tu número personal para probar

const SENDER_NAME = process.env.WHATSAPP_SENDER_NAME || 'Edu';
const BRAND_NAME = process.env.WHATSAPP_BRAND_NAME || 'NEXIFY';

function getWhatsAppCopy(country: string) {
  if (country === 'AR' || country === 'UY') {
    return (businessName: string, webUrl: string) =>
      `Hola!! Soy ${SENDER_NAME} de ${BRAND_NAME}. Nos tomamos el atrevimiento de crear una página web profesional para *${businessName}*. Podés verla acá:\n\n` +
      `👉 ${webUrl}\n\n` +
      `El servicio completo tiene un costo de $25/mes (hosting aparte ~$3,50/mes).\n\n` +
      `Avisame si te interesa! Solo tendríamos que retocar un par de cosas y fotos a tu gusto y ya lo podrías unir a tu ficha de Google Maps.\n\n` +
      `Un saludo! 😊`;
  }

  return (businessName: string, webUrl: string) =>
    `Hola!! Soy ${SENDER_NAME} de ${BRAND_NAME}. Nos hemos tomado el atrevimiento de crear una página web profesional para *${businessName}*. Puede verla aquí:\n\n` +
    `👉 ${webUrl}\n\n` +
    `El servicio completo tiene un coste de 25€/mes (hosting aparte ~3,50€/mes).\n\n` +
    `Avísame si le interesa! Solo tendríamos que retocar un par de cosas y fotos a tu gusto y ya lo podrías unir a tu ficha de Google Maps.\n\n` +
    `Un saludo! 😊`;
}

async function sendTwilioWhatsApp(to: string, message: string): Promise<boolean> {
  if (!TWILIO_SID || !TWILIO_TOKEN) {
    throw new Error('Faltan TWILIO_ACCOUNT_SID o TWILIO_AUTH_TOKEN en .env.local');
  }

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
    console.error('❌ Twilio error:', data);
    return false;
  }

  console.log(`✅ WhatsApp enviado → SID: ${data.sid}`);
  return true;
}

export async function sendWhatsApp(options: {
  leadId: string;
  testMode?: boolean;
}): Promise<boolean> {
  const { leadId, testMode = false } = options;

  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) {
    console.error(`❌ Lead no encontrado: ${leadId}`);
    return false;
  }

  if (!lead.phone) {
    console.error(`❌ Lead sin teléfono: ${lead.businessName}`);
    return false;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
  const webUrl = `${baseUrl}/${lead.slug}`;

  const copyFn = getWhatsAppCopy(lead.country);
  const message = copyFn(lead.businessName, webUrl);

  // En modo test → manda a TU número para revisar la web
  // En modo prod → manda al número del lead
  const destination = testMode && TEST_NUMBER ? TEST_NUMBER : lead.phone;
  const modeLabel = testMode ? '🧪 TEST' : '📤 PROD';

  console.log(`\n📱 ${modeLabel} Enviando WhatsApp`);
  console.log(`   Para: ${destination}`);
  console.log(`   Negocio: ${lead.businessName}`);
  console.log(`   Web: ${webUrl}`);

  const sent = await sendTwilioWhatsApp(destination, message);

  if (sent) {
    // Solo marcamos emailSent si es modo producción (enviado al lead real)
    if (!testMode) {
      await Lead.findByIdAndUpdate(leadId, {
        status: 'email_sent', // reutilizamos este estado para WhatsApp también
        emailSent: true,
        emailSentAt: new Date(),
      });
    }
  }

  return sent;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const leadId = getArg('leadId');
  const testMode = args.includes('--test');

  if (!leadId) {
    console.error('❌ Falta --leadId <mongoId>');
    console.error('   Opcional: --test (envía a tu número en vez del lead)');
    process.exit(1);
  }

  sendWhatsApp({ leadId, testMode })
    .then(ok => {
      console.log(ok ? '\n🎉 WhatsApp enviado.' : '\n❌ WhatsApp fallido.');
      process.exit(ok ? 0 : 1);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
