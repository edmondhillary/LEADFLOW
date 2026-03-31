/**
 * Script: list-leads.ts
 * Muestra todos los leads en MongoDB con su estado y URL de web
 * Uso: npm run list-leads
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB, Lead, WebsiteContent } from '../src/lib/mongodb';

async function main() {
  await connectDB();

  const leads = await Lead.find({}).sort({ createdAt: -1 }).limit(50).lean();

  if (leads.length === 0) {
    console.log('📭 No hay leads en la base de datos todavía.');
    process.exit(0);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4242';

  console.log(`\n📊 LEADS EN MONGODB (${leads.length} total)\n`);
  console.log('═'.repeat(80));

  for (const lead of leads as any[]) {
    const hasContent = lead.contentRef ? '✅ Web generada' : '⏳ Sin contenido';
    const webUrl = `${baseUrl}/${lead.slug}`;

    console.log(`\n🏢 ${lead.businessName}`);
    console.log(`   Sector: ${lead.sector} | Ciudad: ${lead.city} | País: ${lead.country}`);
    console.log(`   Estado: ${lead.status} | ${hasContent}`);
    console.log(`   Teléfono: ${lead.phone || '❌ Sin teléfono'}`);
    console.log(`   URL: ${webUrl}`);
    console.log(`   ID: ${lead._id}`);
    console.log('─'.repeat(60));
  }

  console.log(`\n💡 RESUMEN POR ESTADO:`);
  const byStatus: Record<string, number> = {};
  for (const lead of leads as any[]) {
    byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
  }
  for (const [status, count] of Object.entries(byStatus)) {
    console.log(`   ${status}: ${count}`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
