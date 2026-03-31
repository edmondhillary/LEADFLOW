/**
 * ORQUESTADOR v2 — LeadFlow Pipeline
 *
 * Nuevo flujo de 6 pasos:
 * 1. Scraper → Google Maps, filtra sin web + solo móviles
 * 2. Design Scraper → Playwright scrapes top 3 de Google, extrae diseño
 * 3. Brand Builder → genera design guidelines del sector+ciudad
 * 4. Content Gen v2 → genera contenido con brand guidelines + programmatic SEO
 * 5. Payments → crea Stripe Payment Link
 * 6. WhatsApp → envía preview al lead (test o prod)
 *
 * Uso: npx tsx skills/generate.ts --sector fontanero --city Madrid --country ES --limit 5
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../src/lib/mongodb';
import { runScraper } from './scraper/index';
import { runDesignScraper } from './design-scraper/index';
import { buildBrandGuidelines, BrandGuidelines } from './brand-builder/index';
import { runContentGen } from './content-gen/index';
import { createPaymentLink } from './payments/index';
import { sendWhatsApp } from './whatsapp/index';

interface PipelineOptions {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY';
  limit: number;
  leadId?: string;
  skipWhatsApp?: boolean;
  testWhatsApp?: boolean;
  skipScraper?: boolean;
  skipDesignScraper?: boolean;
}

interface PipelineResult {
  leadId: string;
  businessName: string;
  webUrl: string;
  paymentLink: string | null;
  whatsappSent: boolean;
  error?: string;
}

async function processSingleLead(
  leadId: string,
  brandGuidelines: BrandGuidelines | undefined,
  options: { testWhatsApp?: boolean; skipWhatsApp?: boolean }
): Promise<PipelineResult> {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error(`Lead no encontrado: ${leadId}`);

  const baseUrl = process.env.NGROK_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
  const result: PipelineResult = {
    leadId,
    businessName: lead.businessName,
    webUrl: `${baseUrl}/${lead.slug}`,
    paymentLink: null,
    whatsappSent: false,
  };

  try {
    // PASO 4: Content Gen v2 (con brand guidelines)
    console.log(`\n🤖 [${lead.businessName}] Generando contenido v2…`);
    await runContentGen({ leadId, brandGuidelines });

    // PASO 5: Payment Link (no bloqueante)
    console.log(`\n💳 [${lead.businessName}] Creando payment link…`);
    try {
      const paymentUrl = await createPaymentLink({ leadId });
      result.paymentLink = paymentUrl;
    } catch (payErr: any) {
      console.warn(`⚠️  Payment fallido (no bloqueante): ${payErr.message}`);
    }

    // PASO 6: WhatsApp
    if (!options.skipWhatsApp && lead.phone) {
      const testMode = options.testWhatsApp ?? true;
      console.log(`\n📱 [${lead.businessName}] WhatsApp ${testMode ? '(TEST)' : '(PROD)'}…`);
      result.whatsappSent = await sendWhatsApp({ leadId, testMode });
    }

  } catch (err: any) {
    result.error = err.message;
    console.error(`❌ Error en ${lead.businessName}: ${err.message}`);
  }

  return result;
}

export async function runPipeline(options: PipelineOptions): Promise<PipelineResult[]> {
  const {
    sector, city, country, limit, leadId,
    skipWhatsApp = false, testWhatsApp = true,
    skipScraper = false, skipDesignScraper = false,
  } = options;

  await connectDB();
  const results: PipelineResult[] = [];

  // ══════════════════════════════════════════════════════════════════════
  // Modo: reprocesar un lead específico (salta pasos 1-3)
  // ══════════════════════════════════════════════════════════════════════
  if (leadId) {
    console.log(`\n🔄 Reprocesando lead: ${leadId}`);

    // Intentar cargar brand guidelines cacheadas
    let brandGuidelines: BrandGuidelines | undefined;
    const lead = await Lead.findById(leadId);
    if (lead) {
      try {
        brandGuidelines = await buildBrandGuidelines({
          sector: lead.sector, city: lead.city, country: lead.country,
        });
      } catch {}
    }

    const result = await processSingleLead(leadId, brandGuidelines, { testWhatsApp, skipWhatsApp });
    results.push(result);
    return results;
  }

  // ══════════════════════════════════════════════════════════════════════
  // Pipeline completo
  // ══════════════════════════════════════════════════════════════════════

  // PASO 1: Scraper (Google Maps → leads sin web + solo móviles)
  if (!skipScraper) {
    console.log(`\n${'━'.repeat(50)}`);
    console.log(`🕷️  PASO 1/6: Scraping Google Maps…`);
    console.log(`${'━'.repeat(50)}`);
    await runScraper({
      sector, city, country, limit,
      apiKey: process.env.SERPAPI_KEY!,
    });
  }

  // PASO 2: Design Scraper (Playwright → top 3 webs del sector)
  let designReference: any = null;
  if (!skipDesignScraper) {
    console.log(`\n${'━'.repeat(50)}`);
    console.log(`🎨 PASO 2/6: Scraping diseño de los top 3 competidores…`);
    console.log(`${'━'.repeat(50)}`);
    try {
      designReference = await runDesignScraper({ sector, city, country });
    } catch (err: any) {
      console.warn(`⚠️  Design scraper fallido (continuamos con defaults): ${err.message}`);
    }
  }

  // PASO 3: Brand Builder (genera design guidelines)
  console.log(`\n${'━'.repeat(50)}`);
  console.log(`📐 PASO 3/6: Generando brand guidelines…`);
  console.log(`${'━'.repeat(50)}`);
  let brandGuidelines: BrandGuidelines | undefined;
  try {
    brandGuidelines = await buildBrandGuidelines({
      sector, city, country, designReference,
    });
  } catch (err: any) {
    console.warn(`⚠️  Brand builder fallido (continuamos sin guidelines): ${err.message}`);
  }

  // Obtener leads para procesar
  const leadsToProcess = await Lead.find({
    sector, city, country,
    status: { $in: ['scraped', 'analyzing'] },
  }).limit(limit).sort({ createdAt: -1 });

  if (leadsToProcess.length === 0) {
    console.log('⚠️  No hay leads para procesar');
    return results;
  }

  console.log(`\n📋 Procesando ${leadsToProcess.length} leads con brand guidelines…`);

  // PASOS 4-6: por cada lead
  for (let i = 0; i < leadsToProcess.length; i++) {
    const lead = leadsToProcess[i];
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`🏢 [${i + 1}/${leadsToProcess.length}] ${lead.businessName}`);
    console.log(`${'═'.repeat(50)}`);

    const result = await processSingleLead(
      lead._id.toString(),
      brandGuidelines,
      { testWhatsApp, skipWhatsApp }
    );
    results.push(result);

    if (i < leadsToProcess.length - 1) {
      console.log('\n⏳ Pausa 2s…');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // RESUMEN
  // ══════════════════════════════════════════════════════════════════════
  console.log(`\n${'═'.repeat(50)}`);
  console.log('📊 RESUMEN DEL PIPELINE v2');
  console.log(`${'═'.repeat(50)}`);

  const ok = results.filter(r => !r.error);
  const errors = results.filter(r => r.error);
  const withWA = results.filter(r => r.whatsappSent);

  console.log(`✅ Completados: ${ok.length}/${results.length}`);
  console.log(`📱 WhatsApp enviados: ${withWA.length}`);
  console.log(`❌ Errores: ${errors.length}`);
  if (brandGuidelines) {
    console.log(`🎨 Brand: ${brandGuidelines.colors.primary} | ${brandGuidelines.typography.headingFont} | ${brandGuidelines.layout.heroPattern}`);
  }

  if (ok.length > 0) {
    console.log('\n🌐 Webs generadas:');
    ok.forEach(r => console.log(`   ${r.businessName}: ${r.webUrl}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errores:');
    errors.forEach(r => console.log(`   ${r.businessName}: ${r.error}`));
  }

  return results;
}

// ─── CLI ────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const opts: PipelineOptions = {
    sector:            getArg('sector', 'fontanero'),
    city:              getArg('city', 'Madrid'),
    country:           getArg('country', 'ES') as 'ES' | 'AR' | 'UY',
    limit:             parseInt(getArg('limit', '5')),
    leadId:            getArg('leadId') || undefined,
    skipWhatsApp:      args.includes('--skip-wa'),
    testWhatsApp:      !args.includes('--prod-wa'),  // default: test mode
    skipScraper:       args.includes('--skip-scraper'),
    skipDesignScraper: args.includes('--skip-design'),
  };

  if (!process.env.SERPAPI_KEY) { console.error('❌ Falta SERPAPI_KEY'); process.exit(1); }
  if (!process.env.ANTHROPIC_API_KEY) { console.error('❌ Falta ANTHROPIC_API_KEY'); process.exit(1); }

  console.log('\n🚀 LeadFlow Pipeline v2');
  console.log(`   Sector: ${opts.sector} | Ciudad: ${opts.city} | País: ${opts.country}`);
  console.log(`   Límite: ${opts.limit} | WA: ${opts.testWhatsApp ? 'TEST' : 'PROD'}`);

  runPipeline(opts)
    .then(results => {
      const ok = results.filter(r => !r.error).length;
      console.log(`\n🎉 Pipeline v2 finalizado. ${ok}/${results.length} webs.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error fatal:', err.message);
      process.exit(1);
    });
}
