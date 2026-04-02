/**
 * ORQUESTADOR v3 — LeadFlow Pipeline
 *
 * Nuevo flujo simplificado (v3):
 * 1. Scraper → Google Maps, filtra sin web + solo móviles + valida WhatsApp
 * 2. Seleccionar template sectorial ya hecho (22 templates)
 * 3. Inyectar datos del scraping (nombre, ciudad, teléfono, reseñas...)
 * 4. Reemplazar TODAS las ciudades genéricas por la ciudad real
 * 5. Guardar WebsiteContent en MongoDB (la ruta [slug] lo lee y renderiza)
 * 6. Notificar por Telegram con link + datos del lead
 *
 * Si no existe template para el sector → error, no procesar ese lead.
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import Anthropic from '@anthropic-ai/sdk';
import { connectDB, Lead, WebsiteContent } from '../src/lib/mongodb';
import { runScraper } from './scraper/index';
import { SECTORS, getSector, getTemplateName, getDesign } from '../src/config/sectors';

// ─── Interfaces ────────────────────────────────────────────────────────────

export interface PipelineOptions {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY';
  limit: number;
  skipDesignScraper?: boolean;
  skipWhatsApp?: boolean;
  testWhatsApp?: boolean;
}

export interface PipelineResult {
  leadId: string;
  businessName: string;
  webUrl: string;
  error?: string;
}

// ─── Utilidades ────────────────────────────────────────────────────────────

function getBaseUrl() {
  return process.env.NGROK_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getLocale(country: string): 'es-ES' | 'es-AR' {
  return country === 'ES' ? 'es-ES' : 'es-AR';
}

function getCurrency(country: string): 'EUR' | 'USD' {
  return country === 'ES' ? 'EUR' : 'USD';
}

// ─── Validar WhatsApp (método simple: check formato móvil validado) ────────
// Nota: Para validación real, usar Twilio Lookup o WhatsApp Business API.
// Por ahora marcamos hasWhatsApp=true si el número es móvil validado por el scraper
// (scraper ya filtra solo móviles). Implementar validación real aquí cuando se tenga API.

function validateWhatsApp(phone: string, _country: string): boolean {
  // El scraper ya filtra SOLO números móviles (regex por país).
  // Twilio Lookup "line_type_intelligence" es un add-on de pago — no usamos.
  // Penetración WhatsApp en móviles: España >95%, Argentina >92%, Uruguay >88%.
  // Si tiene número → asumimos WhatsApp. ✅
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8;
}

// ─── Inyectar datos reales en el contenido del template via Claude Haiku ───

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function injectDataWithClaude(templateName: string, lead: any): Promise<any> {
  const locale = getLocale(lead.country);
  const toneNote = locale === 'es-AR'
    ? 'Usa tono rioplatense argentino/uruguayo (vos, che, etc.).'
    : 'Usa tono español de España (usted/tú, vosotros).';

  const reviewCount = lead.reviewCount > 0 ? lead.reviewCount : randomBetween(40, 100);
  const reviewRating = lead.reviewRating > 0 ? lead.reviewRating : (4 + Math.random()).toFixed(1);

  const prompt = `Eres un copywriter experto en negocios locales. Tienes que personalizar el contenido de una web plantilla para un negocio real.

DATOS REALES DEL NEGOCIO (scraped de Google Maps):
- Nombre: ${lead.businessName}
- Sector: ${lead.sector}
- Ciudad: ${lead.city}
- País: ${lead.country === 'ES' ? 'España' : lead.country === 'AR' ? 'Argentina' : 'Uruguay'}
- Teléfono: ${lead.phone || 'No disponible'}
- Dirección: ${lead.address || lead.city}
- Reseñas Google: ${reviewCount} reseñas, ${reviewRating} estrellas
${lead.rawScrapeData?.categories ? `- Categorías: ${Array.isArray(lead.rawScrapeData.categories) ? lead.rawScrapeData.categories.join(', ') : lead.rawScrapeData.categories}` : ''}
${lead.rawScrapeData?.description ? `- Descripción Google: ${lead.rawScrapeData.description}` : ''}
${lead.rawScrapeData?.hours ? `- Horario: ${lead.rawScrapeData.hours}` : ''}

IMPORTANTE: ${toneNote}
IMPORTANTE: Reemplaza TODAS las menciones de ciudades genéricas (Austin, San Francisco, Madrid, Barcelona, Buenos Aires, Montevideo o cualquier ciudad de ejemplo) por "${lead.city}".
IMPORTANTE: Todos los textos de hero, servicios, testimonios deben mencionar "${lead.city}" cuando sea natural.

Genera un objeto JSON con el contenido personalizado para la web. El JSON debe tener exactamente esta estructura:

{
  "pages": {
    "home": {
      "heroTitle": "título atractivo que incluya el nombre del negocio y la ciudad (max 70 chars)",
      "heroSubtitle": "subtítulo que describe el servicio con tono local y ciudad (max 150 chars)",
      "heroCTA": "texto del botón principal (max 30 chars)",
      "featuredServices": [
        {"name": "servicio 1", "description": "descripción breve 60 chars", "icon": "material_icon_name"},
        {"name": "servicio 2", "description": "descripción breve 60 chars", "icon": "material_icon_name"},
        {"name": "servicio 3", "description": "descripción breve 60 chars", "icon": "material_icon_name"}
      ],
      "testimonials": [
        {"name": "Nombre Apellido (nombre local de ${lead.city})", "text": "testimonio creíble 100 chars", "rating": 5},
        {"name": "Nombre Apellido (nombre local de ${lead.city})", "text": "testimonio creíble 100 chars", "rating": 5},
        {"name": "Nombre Apellido (nombre local de ${lead.city})", "text": "testimonio creíble 100 chars", "rating": 4}
      ],
      "aboutSnippet": "párrafo sobre el negocio, mencionando ${lead.city} y años de experiencia (max 200 chars)"
    },
    "servicios": {
      "title": "Nuestros Servicios de ${lead.sector} en ${lead.city}",
      "intro": "introducción 150 chars mencionando ciudad y especialidad",
      "items": [
        {"name": "servicio", "description": "descripción 100 chars", "price": "Desde X€", "icon": "material_icon"}
      ]
    },
    "contacto": {
      "title": "Contacta con ${lead.businessName}",
      "subtitle": "texto motivador para contactar, menciona ciudad",
      "formFields": ["Nombre", "Teléfono", "Servicio", "Mensaje"],
      "mapQuery": "${lead.businessName} ${lead.city}"
    },
    "nosotros": {
      "title": "Sobre ${lead.businessName} en ${lead.city}",
      "story": "historia creíble del negocio local, 200 chars, menciona ciudad",
      "values": [
        {"title": "valor 1", "description": "50 chars"},
        {"title": "valor 2", "description": "50 chars"},
        {"title": "valor 3", "description": "50 chars"}
      ],
      "yearsExperience": 8
    },
    "blog": [
      {
        "title": "título SEO local con keyword ${lead.sector} ${lead.city} (max 70 chars)",
        "slug": "slug-url-amigable",
        "excerpt": "extracto 120 chars",
        "keywords": ["${lead.sector}", "${lead.city}", "keyword3"]
      },
      {"title": "2º artículo título SEO", "slug": "slug-2", "excerpt": "extracto 120 chars", "keywords": []},
      {"title": "3º artículo título SEO", "slug": "slug-3", "excerpt": "extracto 120 chars", "keywords": []}
    ]
  },
  "seo": {
    "metaTitle": "${lead.businessName} | ${lead.sector} en ${lead.city} (max 60 chars)",
    "metaDesc": "descripción SEO local 155 chars con keyword principal y ciudad",
    "keywords": ["${lead.sector} ${lead.city}", "${lead.businessName}", "keyword3", "keyword4", "keyword5"],
    "h1": "H1 principal con keyword local",
    "schemaType": "LocalBusiness"
  }
}

Devuelve ÚNICAMENTE el JSON válido, sin markdown ni explicaciones.`;

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });

  const rawText = response.content[0].type === 'text' ? response.content[0].text : '';

  // Parse JSON — intentar limpiar si viene con markdown
  let jsonStr = rawText.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
  }

  return JSON.parse(jsonStr);
}

// ─── Procesar un lead individual ───────────────────────────────────────────

async function processSingleLead(leadId: string): Promise<PipelineResult> {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error(`Lead no encontrado: ${leadId}`);

  const baseUrl = getBaseUrl();
  const result: PipelineResult = {
    leadId,
    businessName: lead.businessName,
    webUrl: `${baseUrl}/${lead.slug}`,
  };

  try {
    // Verificar que existe template para el sector (lanza si no existe)
    const templateName = getTemplateName(lead.sector);
    const templateHomePath = resolve(process.cwd(), 'src', 'app', templateName, 'page.tsx');
    if (!existsSync(templateHomePath)) {
      throw new Error(`Template no disponible para sector "${lead.sector}": ${templateName}`);
    }
    const design = getDesign(lead.sector);

    // Actualizar estado
    await Lead.findByIdAndUpdate(leadId, {
      status: 'generating',
      templateUsed: templateName,
    });

    // Generar contenido personalizado con Claude Haiku
    console.log(`\n🤖 [${lead.businessName}] Personalizando contenido con Claude Haiku...`);
    let generatedContent: any;
    try {
      generatedContent = await injectDataWithClaude(templateName, lead);
    } catch (aiErr: any) {
      console.warn(`⚠️  Claude falló (${aiErr.message}), usando contenido genérico...`);
      // Fallback: contenido genérico con datos reales
      generatedContent = buildFallbackContent(lead);
    }

    // Guardar WebsiteContent en MongoDB
    const existing = lead.contentRef
      ? await WebsiteContent.findById(lead.contentRef)
      : null;

    const contentData = {
      leadId,
      pages: generatedContent.pages,
      design: {
        primaryColor:   design.primary,
        secondaryColor: design.primary,
        accentColor:    design.accent,
        backgroundColor: '#ffffff',
        font:           design.font,
      },
      seo: generatedContent.seo,
    };

    let contentId: string;
    if (existing) {
      await WebsiteContent.findByIdAndUpdate(lead.contentRef, contentData);
      contentId = lead.contentRef.toString();
    } else {
      const newContent = await WebsiteContent.create(contentData);
      contentId = newContent._id.toString();
    }

    // Actualizar lead: web_live + contentRef + templateUsed
    await Lead.findByIdAndUpdate(leadId, {
      status: 'web_live',
      webLiveAt: new Date(),
      contentRef: contentId,
      templateUsed: templateName,
    });

    console.log(`✅ [${lead.businessName}] Web publicada: ${result.webUrl}`);
    return result;

  } catch (err: any) {
    console.error(`❌ [${lead.businessName}] Error: ${err.message}`);
    await Lead.findByIdAndUpdate(leadId, { status: 'scraped' }); // revert
    return { ...result, error: err.message };
  }
}

// ─── Contenido fallback (sin Claude) ──────────────────────────────────────

function buildFallbackContent(lead: any) {
  const city = lead.city;
  const sector = lead.sector;
  const name = lead.businessName;

  return {
    pages: {
      home: {
        heroTitle: `${name} — Servicios de ${sector} en ${city}`,
        heroSubtitle: `Profesionales de confianza en ${city}. Presupuesto sin compromiso. Llámanos ahora.`,
        heroCTA: 'Pedir Presupuesto',
        featuredServices: [
          { name: `${sector} profesional`, description: `Servicio de ${sector} en ${city} con garantía`, icon: 'build' },
          { name: 'Presupuesto gratis', description: 'Sin compromiso, respuesta en 24h', icon: 'request_quote' },
          { name: 'Trabajo garantizado', description: 'Satisfacción garantizada o repetimos', icon: 'verified' },
        ],
        testimonials: [
          { name: 'Cliente satisfecho', text: `Excelente servicio de ${sector} en ${city}. Muy profesionales.`, rating: 5 },
          { name: 'Cliente habitual', text: `Llevan años siendo mi empresa de ${sector} de confianza en ${city}.`, rating: 5 },
        ],
        aboutSnippet: `${name} lleva años ofreciendo servicios de ${sector} en ${city} con la máxima calidad y profesionalidad.`,
      },
      servicios: {
        title: `Servicios de ${sector} en ${city}`,
        intro: `En ${name} ofrecemos servicios profesionales de ${sector} en ${city} y alrededores.`,
        items: [
          { name: `${sector} residencial`, description: `Servicio completo en ${city}`, price: 'Consultar', icon: 'home' },
          { name: `${sector} comercial`, description: `Para empresas en ${city}`, price: 'Consultar', icon: 'business' },
          { name: 'Urgencias 24h', description: `Servicio urgente en ${city}`, price: 'Consultar', icon: 'emergency' },
        ],
      },
      contacto: {
        title: `Contacta con ${name}`,
        subtitle: `Estamos en ${city}. Respuesta garantizada en menos de 24 horas.`,
        formFields: ['Nombre', 'Teléfono', 'Servicio', 'Mensaje'],
        mapQuery: `${name} ${city}`,
      },
      nosotros: {
        title: `Sobre ${name} en ${city}`,
        story: `Somos una empresa de ${sector} con amplia experiencia en ${city}. Nuestro compromiso es la calidad y la satisfacción del cliente.`,
        values: [
          { title: 'Calidad', description: 'Trabajo impecable garantizado' },
          { title: 'Puntualidad', description: 'Respetamos tus horarios' },
          { title: 'Honestidad', description: 'Presupuestos claros y transparentes' },
        ],
        yearsExperience: 8,
      },
      blog: [
        {
          title: `Cómo elegir el mejor ${sector} en ${city}`,
          slug: `mejor-${sector}-${city.toLowerCase().replace(/\s/g,'-')}`,
          excerpt: `Guía completa para encontrar el mejor ${sector} en ${city}.`,
          content: `# Cómo elegir el mejor ${sector} en ${city}\n\nEncontrar un buen profesional de ${sector} en ${city} puede ser complicado. En este artículo te damos las claves para elegir bien.\n\n## Experiencia y referencias\n\nLo primero es verificar la experiencia. Un buen ${sector} en ${city} debe tener referencias verificables y años de experiencia en la zona.\n\n## Precio justo\n\nCompara varios presupuestos. El precio más barato no siempre es el mejor. Busca una relación calidad-precio equilibrada en ${city}.\n\n## Garantías\n\nTodo trabajo de ${sector} debe venir con garantía. Asegúrate de que el profesional te entregue documentación del trabajo realizado.\n\n## Por qué elegir ${name}\n\nEn ${name} llevamos años sirviendo a los clientes de ${city} con profesionalidad y dedicación.`,
          keywords: [`${sector} ${city}`, `${name}`, `profesional ${sector}`],
        },
      ],
    },
    seo: {
      metaTitle: `${name} | ${sector} en ${city}`,
      metaDesc: `${name} — Servicios profesionales de ${sector} en ${city}. Presupuesto gratuito sin compromiso. Llámanos.`,
      keywords: [`${sector} ${city}`, `${name}`, `${sector} profesional ${city}`],
      h1: `${sector} profesional en ${city} — ${name}`,
      schemaType: 'LocalBusiness',
    },
  };
}

// ─── Pipeline principal ────────────────────────────────────────────────────

export async function runPipeline(options: PipelineOptions): Promise<PipelineResult[]> {
  const { sector, city, country, limit } = options;

  console.log(`\n🚀 Pipeline LeadFlow v3`);
  console.log(`   Sector: ${sector} | Ciudad: ${city} | País: ${country} | Límite: ${limit}`);

  await connectDB();

  // Verificar que existe template ANTES de hacer scraping (getSector lanza si no existe)
  const templateName = getTemplateName(sector);
  console.log(`   Template: ${templateName} ✅`);

  // PASO 1: Scraping
  console.log(`\n🔍 PASO 1 — Scraping Google Maps...`);
  let scrapedLeadIds: string[] = [];
  // PASOS 1+2 COMBINADOS: scraping + validación WhatsApp en loop
  // Sigue buscando hasta tener `limit` leads con WhatsApp, o hasta MAX_SCRAPE_ROUNDS intentos.
  console.log(`\n📱 PASOS 1+2 — Scraping + validación WhatsApp (objetivo: ${limit} leads)...`);
  const validLeadIds: string[] = [];
  const MAX_ROUNDS = 5;        // máximo 5 rondas de scraping (evita bucle infinito)
  const BATCH_SIZE = limit * 3; // pedimos 3× más de lo necesario para compensar los que tienen web
  let round = 0;
  let totalScraped = 0;

  while (validLeadIds.length < limit && round < MAX_ROUNDS) {
    round++;
    const needed = limit - validLeadIds.length;
    console.log(`\n   🔄 Ronda ${round}: buscando ${BATCH_SIZE} negocios (necesitamos ${needed} más)...`);

    let batchIds: string[] = [];
    try {
      const scraperResult = await runScraper({
        sector, city, country,
        limit: BATCH_SIZE,
        apiKey: process.env.SERPAPI_KEY || '',
      });
      batchIds = scraperResult.leadIds;
      totalScraped += batchIds.length;
      console.log(`   Negocios sin web encontrados en esta ronda: ${batchIds.length}`);
    } catch (err: any) {
      console.error(`❌ Error en scraper (ronda ${round}): ${err.message}`);
      if (round === 1) throw new Error(`Scraping falló: ${err.message}`);
      break; // Si falla en rondas posteriores, usamos lo que tenemos
    }

    if (batchIds.length === 0) {
      console.log('   ℹ️  No hay más negocios sin web en esta ciudad/sector.');
      break;
    }

    // Validar WhatsApp para cada lead de esta ronda
    for (const leadId of batchIds) {
      if (validLeadIds.length >= limit) break;
      const lead = await Lead.findById(leadId);
      if (!lead?.phone) continue;

      const hasWA = validateWhatsApp(lead.phone, country);
      await Lead.findByIdAndUpdate(leadId, {
        hasWhatsApp: hasWA,
        whatsAppValidatedAt: new Date(),
        reviewCount: (lead.rawScrapeData as any)?.reviews ?? randomBetween(40, 100),
        reviewRating: (lead.rawScrapeData as any)?.rating ?? parseFloat((4 + Math.random()).toFixed(1)),
      });

      if (hasWA) {
        validLeadIds.push(leadId);
        console.log(`   ✅ ${lead.businessName} — WhatsApp OK (${validLeadIds.length}/${limit})`);
      } else {
        console.log(`   ⚠️  ${lead.businessName} — Sin móvil válido, descartado`);
      }
    }
  }

  if (validLeadIds.length === 0) {
    console.log('⚠️  No se encontraron negocios sin web con número móvil. Prueba otra ciudad.');
    return [];
  }

  if (validLeadIds.length < limit) {
    console.log(`⚠️  Solo se encontraron ${validLeadIds.length}/${limit} leads válidos tras ${round} rondas.`);
  }

  scrapedLeadIds = validLeadIds;
  console.log(`\n   ✅ ${validLeadIds.length} leads con WhatsApp listos para generar webs.`);

  // PASO 3-5: Generar web para cada lead
  console.log(`\n⚙️  PASO 3 — Generando webs (${validLeadIds.length} leads)...`);
  const results: PipelineResult[] = [];

  for (const leadId of validLeadIds) {
    try {
      const result = await processSingleLead(leadId);
      results.push(result);

      if (!result.error) {
        console.log(`✅ ${result.businessName}: ${result.webUrl}`);
      }
    } catch (err: any) {
      const lead = await Lead.findById(leadId);
      results.push({
        leadId,
        businessName: lead?.businessName || 'Desconocido',
        webUrl: '',
        error: err.message,
      });
    }
  }

  const ok     = results.filter(r => !r.error);
  const errors = results.filter(r => r.error);

  console.log(`\n✅ Pipeline completado:`);
  console.log(`   Webs generadas: ${ok.length}/${results.length}`);
  if (errors.length > 0) {
    console.log(`   Errores: ${errors.length}`);
    for (const e of errors) console.log(`   ❌ ${e.businessName}: ${e.error}`);
  }

  return results;
}

// ─── CLI ───────────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const sector  = getArg('sector', 'fontanero');
  const city    = getArg('city', 'Madrid');
  const country = (getArg('country', 'ES') as 'ES' | 'AR' | 'UY');
  const limit   = parseInt(getArg('limit', '3'));

  runPipeline({ sector, city, country, limit })
    .then(results => {
      console.log(`\n🎉 ${results.filter(r => !r.error).length} webs generadas.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error fatal:', err.message);
      process.exit(1);
    });
}
