/**
 * Script: test-whatsapp-meta.ts
 * Envía WhatsApp a un lead específico usando Meta Cloud API.
 * Respeta WHATSAPP_DRY_RUN (safe by default → manda a tu número de test).
 *
 * Uso:
 *   npx ts-node scripts/test-whatsapp-meta.ts --lead-id 6540abc123...
 *   npx ts-node scripts/test-whatsapp-meta.ts --lead-id 6540abc123 --force-real
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../src/lib/mongodb';
import { notifyLeadViaWhatsApp, cleanPhone } from '../src/lib/whatsapp';

async function main() {
  const args = process.argv.slice(2);

  // Parse --lead-id
  const leadIdIdx = args.indexOf('--lead-id');
  const leadId = leadIdIdx !== -1 ? args[leadIdIdx + 1] : args[0];

  if (!leadId) {
    console.error('Uso: npx ts-node scripts/test-whatsapp-meta.ts --lead-id <MONGO_ID>');
    console.error('      npx ts-node scripts/test-whatsapp-meta.ts <MONGO_ID>');
    process.exit(1);
  }

  // Config check
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const isDryRun = process.env.WHATSAPP_DRY_RUN !== 'false';
  const dryRunNumber = process.env.WHATSAPP_DRY_RUN_NUMBER || '+34617680026';
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world';
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || 'en_US';

  console.log('\n=== WhatsApp Meta Cloud API — Test ===\n');
  console.log(`Token:      ${token ? token.substring(0, 12) + '...' : 'NO CONFIGURADO'}`);
  console.log(`Phone ID:   ${phoneId || 'NO CONFIGURADO'}`);
  console.log(`DRY-RUN:    ${isDryRun ? 'SI (seguro)' : 'NO (producción!)'}`);
  console.log(`Template:   ${templateName} (${templateLang})`);
  if (isDryRun) {
    console.log(`Test phone: ${dryRunNumber}`);
  }

  if (!token || !phoneId) {
    console.error('\nFaltan WHATSAPP_TOKEN y/o WHATSAPP_PHONE_ID en .env.local');
    process.exit(1);
  }

  // Conectar y buscar lead
  await connectDB();
  const lead = await Lead.findById(leadId).lean();

  if (!lead) {
    console.error(`\nLead no encontrado: ${leadId}`);
    process.exit(1);
  }

  const l = lead as any;
  console.log(`\n--- Lead encontrado ---`);
  console.log(`Nombre:     ${l.businessName}`);
  console.log(`Sector:     ${l.sector}`);
  console.log(`Ciudad:     ${l.city}, ${l.country}`);
  console.log(`Teléfono:   ${l.phone || 'SIN TELÉFONO'}`);
  console.log(`Status:     ${l.status}`);
  console.log(`Slug:       ${l.slug}`);
  console.log(`HasWA:      ${l.hasWhatsApp}`);
  console.log(`WA previo:  msgId=${l.whatsappMessageId || 'ninguno'} | sentAt=${l.whatsappSentAt || 'nunca'}`);

  if (!l.phone) {
    console.error('\nEste lead NO tiene teléfono. No se puede enviar WhatsApp.');
    process.exit(1);
  }

  const targetPhone = isDryRun ? dryRunNumber : l.phone;
  console.log(`\nEnviando a: ${cleanPhone(targetPhone)} ${isDryRun ? '(DRY-RUN)' : '(REAL)'}`);

  // Mostrar params que se van a enviar (según template)
  if (templateName !== 'hello_world') {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.es';
    const webUrl = `${baseUrl}/${l.slug}`;
    console.log(`\n--- Params para "${templateName}" ---`);
    console.log(`  {{1}} nombre_contacto: "${l.businessName}"`);
    console.log(`  {{2}} nombre_negocio:  "${l.businessName}"`);
    console.log(`  {{3}} url_web:         "${webUrl}"`);
    if (!l.businessName || !l.slug) {
      console.error(`\nLead incompleto — falta ${!l.businessName ? 'businessName' : 'slug'}. Se va a skipear.`);
    }
  } else {
    console.log(`\nTemplate "hello_world" — sin params.`);
  }

  console.log('\nDisparando...\n');

  // Usar el flujo completo (notifyLeadViaWhatsApp) para que también actualice Mongo
  const notifyResult = await notifyLeadViaWhatsApp(l);

  if (notifyResult.skipped) {
    console.log(`\nSKIPPED: ${notifyResult.reason}`);
    process.exit(0);
  }

  // Verificar actualización en Mongo
  const updated = await Lead.findById(leadId).lean() as any;
  console.log(`\n--- Post-envío (Mongo) ---`);
  console.log(`whatsappMessageId: ${updated?.whatsappMessageId || 'no actualizado'}`);
  console.log(`whatsappSentAt:    ${updated?.whatsappSentAt || 'no actualizado'}`);
  console.log(`Resultado:         ${notifyResult.sent ? 'ENVIADO' : 'FALLO'}${notifyResult.messageId ? ` (msgId: ${notifyResult.messageId})` : ''}`);

  console.log('\nListo. Revisá tu WhatsApp.');
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
