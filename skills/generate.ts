/**
 * ORQUESTADOR PRINCIPAL — LeadFlow Pipeline
 *
 * Ejecuta el pipeline completo para N leads:
 * 1. Scraper → encuentra negocios sin web en Google Maps
 * 2. SEO Analyzer → analiza competidor top (cacheado 7 días)
 * 3. Content Gen → genera contenido con Claude Haiku
 * 4. Payments → crea Stripe Payment Link
 * 5. Email → envía preview al lead (si tiene email)
 *
 * Uso desde Telegram o CLI:
 * npx tsx skills/generate.ts --sector fontanero --city Madrid --country ES --limit 5
 *
 * También acepta --leadId para reprocesar un lead existente desde el paso 2.
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Cargar .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../src/lib/mongodb';
import { runScraper } from './scraper/index';
import { runSeoAnalyzer } from './seo-analyzer/index';
import { runContentGen } from './content-gen/index';
import { createPaymentLink } from './payments/index';
import { sendPreviewEmail } from './email/index';

interface PipelineOptions {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY';
  limit: number;
  leadId?: string;       // Si se pasa, salta el scraper y procesa este lead
  skipEmail?: boolean;   // Para probar sin enviar emails
  skipScraper?: boolean; // Para procesar leads ya scraped
}

interface PipelineResult {
  leadId: string;
  businessName: string;
  webUrl: string;
  paymentLink: string | null;
  emailSent: boolean;
  error?: string;
}

async function processSingleLead(
  leadId: string,
  options: Pick<PipelineOptions, 'sector' | 'city' | 'country' | 'skipEmail'>
): Promise<PipelineResult> {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error(`Lead no encontrado: ${leadId}`);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
  const result: PipelineResult = {
    leadId,
    businessName: lead.businessName,
    webUrl: `${baseUrl}/${lead.slug}`,
    paymentLink: null,
    emailSent: false,
  };

  try {
    // PASO 2: SEO Analyzer
    console.log(`\n🔍 [${lead.businessName}] Analizando competidor...`);
    await runSeoAnalyzer({
      sector: lead.sector,
      city: lead.city,
      country: lead.country,
      apiKey: process.env.SERPAPI_KEY!,
    });

    // PASO 3: Content Gen
    console.log(`\n🤖 [${lead.businessName}] Generando contenido...`);
    await runContentGen({ leadId });

    // PASO 4: Payment Link
    console.log(`\n💳 [${lead.businessName}] Creando payment link...`);
    const paymentUrl = await createPaymentLink({ leadId });
    result.paymentLink = paymentUrl;

    // PASO 5: Email (si tiene email y no se skipea)
    if (!options.skipEmail && lead.email) {
      console.log(`\n📧 [${lead.businessName}] Enviando email...`);
      result.emailSent = await sendPreviewEmail({ leadId });
    } else if (!lead.email) {
      console.log(`\n⚠️  [${lead.businessName}] Sin email — solo se genera la web`);
    }

  } catch (err: any) {
    result.error = err.message;
    console.error(`❌ Error en ${lead.businessName}: ${err.message}`);
  }

  return result;
}

export async function runPipeline(options: PipelineOptions): Promise<PipelineResult[]> {
  const { sector, city, country, limit, leadId, skipEmail = false, skipScraper = false } = options;

  await connectDB();

  const results: PipelineResult[] = [];

  // Modo: reprocesar un lead específico
  if (leadId) {
    console.log(`\n🔄 Reprocesando lead: ${leadId}`);
    const result = await processSingleLead(leadId, { sector, city, country, skipEmail });
    results.push(result);
    return results;
  }

  // Modo: pipeline completo
  let leadsToProcess: any[] = [];

  if (!skipScraper) {
    // PASO 1: Scraper
    console.log(`\n🕷️  PASO 1: Scrapeando ${limit} negocios sin web...`);
    await runScraper({
      sector, city, country, limit,
      apiKey: process.env.SERPAPI_KEY!,
    });
  }

  // Obtener leads recién scraped (o los que ya estaban)
  leadsToProcess = await Lead.find({
    sector, city, country,
    status: { $in: ['scraped', 'analyzing'] },
  }).limit(limit).sort({ createdAt: -1 });

  if (leadsToProcess.length === 0) {
    console.log('⚠️  No hay leads para procesar');
    return results;
  }

  console.log(`\n📋 Procesando ${leadsToProcess.length} leads...`);

  for (const lead of leadsToProcess) {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`🏢 ${lead.businessName} (${lead.city})`);
    console.log(`${'═'.repeat(50)}`);

    const result = await processSingleLead(
      lead._id.toString(),
      { sector, city, country, skipEmail }
    );
    results.push(result);

    // Pequeña pausa entre leads para no saturar las APIs
    if (leadsToProcess.indexOf(lead) < leadsToProcess.length - 1) {
      console.log('\n⏳ Pausa 2s...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // RESUMEN FINAL
  console.log(`\n${'═'.repeat(50)}`);
  console.log('📊 RESUMEN DEL PIPELINE');
  console.log(`${'═'.repeat(50)}`);

  const ok = results.filter(r => !r.error);
  const errors = results.filter(r => r.error);
  const withEmail = results.filter(r => r.emailSent);

  console.log(`✅ Completados: ${ok.length}/${results.length}`);
  console.log(`📧 Emails enviados: ${withEmail.length}`);
  console.log(`❌ Errores: ${errors.length}`);

  if (ok.length > 0) {
    console.log('\n🌐 Webs generadas:');
    ok.forEach(r => console.log(`   • ${r.businessName}: ${r.webUrl}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errores:');
    errors.forEach(r => console.log(`   • ${r.businessName}: ${r.error}`));
  }

  return results;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const options: PipelineOptions = {
    sector:      getArg('sector', 'fontanero'),
    city:        getArg('city', 'Madrid'),
    country:     (getArg('country', 'ES') as 'ES' | 'AR' | 'UY'),
    limit:       parseInt(getArg('limit', '5')),
    leadId:      getArg('leadId') || undefined,
    skipEmail:   args.includes('--skip-email'),
    skipScraper: args.includes('--skip-scraper'),
  };

  // Validaciones
  if (!process.env.SERPAPI_KEY) {
    console.error('❌ Falta SERPAPI_KEY');
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Falta ANTHROPIC_API_KEY');
    process.exit(1);
  }

  console.log('\n🚀 LeadFlow Pipeline Iniciado');
  console.log(`   Sector: ${options.sector}`);
  console.log(`   Ciudad: ${options.city}`);
  console.log(`   País: ${options.country}`);
  console.log(`   Límite: ${options.limit}`);

  runPipeline(options)
    .then(results => {
      const ok = results.filter(r => !r.error).length;
      console.log(`\n🎉 Pipeline finalizado. ${ok}/${results.length} webs generadas.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error fatal:', err.message);
      process.exit(1);
    });
}
