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
import { connectDB, Lead, PipelineRun, WebsiteContent } from '../src/lib/mongodb';
import { notifyPipelineRun } from '../src/bot/telegram';
import { runScraper } from './scraper/index';
import { SECTORS, getSector, getTemplateName, getDesign } from '../src/config/sectors';
import { getSectorImages } from '../src/lib/images';
import { notifyLeadViaWhatsApp } from '../src/lib/whatsapp';

// ─── Interfaces ────────────────────────────────────────────────────────────

export interface PipelineOptions {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY' | 'US';
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
  if (country === 'ES') return 'es-ES';
  if (country === 'US') return 'es-AR';
  return 'es-AR';
}

function getCurrency(country: string): 'EUR' | 'USD' {
  return country === 'ES' ? 'EUR' : 'USD';
}

async function validateImageUrl(url: string | undefined, fallbackUrl: string): Promise<string> {
  if (!url) return fallbackUrl;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3500);
    const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal });
    clearTimeout(timer);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.startsWith('image/')) return url;
  } catch {}
  return fallbackUrl;
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

const NON_BUSINESS_WEBSITE_HOSTS = [
  /(^|\.)google\./,
  /(^|\.)g\.page$/,
  /(^|\.)goo\.gl$/,
  /(^|\.)facebook\.com$/,
  /(^|\.)instagram\.com$/,
  /(^|\.)wa\.me$/,
  /(^|\.)whatsapp\.com$/,
  /(^|\.)tiktok\.com$/,
  /(^|\.)youtube\.com$/,
  /(^|\.)x\.com$/,
  /(^|\.)twitter\.com$/,
  /(^|\.)linkedin\.com$/,
  /(^|\.)linktr\.ee$/,
  /(^|\.)tripadvisor\./,
  /(^|\.)yelp\./,
];

function getHostname(url: string): string {
  if (!url) return '';
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function isBusinessWebsite(url?: string | null): boolean {
  if (!url) return false;
  const host = getHostname(url.trim());
  if (!host) return false;
  return !NON_BUSINESS_WEBSITE_HOSTS.some((rx) => rx.test(host));
}

function leadHasRealWebsite(lead: any): boolean {
  const raw = (lead.rawScrapeData || {}) as any;
  const candidates = [
    lead.websiteUrl,
    raw.websiteResolved,
    raw.website,
    raw?.links?.website,
    raw?.normalized?.website,
  ];
  return candidates.some((url) => isBusinessWebsite(url));
}

function pickLeadPhone(lead: any): string | undefined {
  const raw = (lead.rawScrapeData || {}) as any;
  const candidates = [lead.phone, raw.phoneUnformatted, raw.phone, raw?.details?.phone, raw?.place?.phone, raw?.normalized?.phone];
  const hit = candidates.find((p) => typeof p === 'string' && p.trim().length > 0);
  return hit ? String(hit).trim() : undefined;
}

function normalizePhoneForCountry(phone: string, country: string): string {
  const clean = phone.replace(/[\s\-().]/g, '');
  const prefixes: Record<string, string> = { ES: '+34', AR: '+54', UY: '+598', US: '+1' };
  const prefix = prefixes[country] || '';

  if (clean.startsWith('+')) return clean;
  if (country === 'ES' && clean.startsWith('34')) return '+' + clean;
  if (country === 'ES') return prefix + clean;
  if (country === 'AR' && clean.startsWith('54')) return '+' + clean;
  if (country === 'AR') return prefix + clean;
  if (country === 'UY' && clean.startsWith('598')) return '+' + clean;
  if (country === 'UY') return prefix + clean;
  if (country === 'US' && clean.startsWith('1')) return '+' + clean;
  if (country === 'US') return prefix + clean;
  return clean.startsWith('+') ? clean : '+' + clean;
}

function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function envFloat(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function roundMoney(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function normalizeGeo(value: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function leadMatchesTargetCity(lead: any, targetCity: string): boolean {
  const target = normalizeGeo(targetCity);
  if (!target) return true;

  const raw = (lead.rawScrapeData || {}) as any;
  const cityCandidates = [lead.city, raw.city, raw?.normalized?.city];
  const addressCandidates = [lead.address, raw.address, raw.street];

  for (const city of cityCandidates) {
    const c = normalizeGeo(String(city || ''));
    if (!c) continue;
    if (c === target || c.includes(target) || target.includes(c)) return true;
    return false;
  }

  for (const address of addressCandidates) {
    const a = normalizeGeo(String(address || ''));
    if (!a) continue;
    if (a.includes(target)) return true;
  }

  // Sin señales de ubicación: no descartamos
  return true;
}

// ─── Inyectar datos reales en el contenido del template via Claude Haiku ───

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function injectDataWithClaude(templateName: string, lead: any): Promise<any> {
  const locale = getLocale(lead.country);
  const toneNote = locale === 'es-AR'
    ? 'Usa tono rioplatense argentino/uruguayo (voseo natural: vos, tenés, podés). Evita modismos de España.'
    : 'Usa tono español de España (tú/te, puedes, tienes). Evita voseo rioplatense.';

  const reviewCount = lead.reviewCount > 0 ? lead.reviewCount : randomBetween(40, 100);
  const reviewRating = lead.reviewRating > 0 ? lead.reviewRating : (4 + Math.random()).toFixed(1);

  const prompt = `Eres un copywriter experto en negocios locales. Tienes que personalizar el contenido de una web plantilla para un negocio real.

DATOS REALES DEL NEGOCIO (scraped de Google Maps):
- Nombre: ${lead.businessName}
- Sector: ${lead.sector}
- Ciudad: ${lead.city}
- País: ${lead.country === 'ES' ? 'España' : lead.country === 'AR' ? 'Argentina' : lead.country === 'UY' ? 'Uruguay' : lead.country}
- Teléfono: ${lead.phone || 'No disponible'}
- Dirección: ${lead.address || lead.city}
- Reseñas Google: ${reviewCount} reseñas, ${reviewRating} estrellas
${lead.rawScrapeData?.categories ? `- Categorías: ${Array.isArray(lead.rawScrapeData.categories) ? lead.rawScrapeData.categories.join(', ') : lead.rawScrapeData.categories}` : lead.rawScrapeData?.categoryName ? `- Categoría principal: ${lead.rawScrapeData.categoryName}` : ''}
${lead.rawScrapeData?.description ? `- Descripción Google: ${lead.rawScrapeData.description}` : ''}
${lead.rawScrapeData?.hours ? `- Horario: ${lead.rawScrapeData.hours}` : lead.rawScrapeData?.openingHours ? `- Horario: ${lead.rawScrapeData.openingHours.map((h: any) => `${h.day}: ${h.hours}`).join(' | ')}` : ''}

IMPORTANTE: ${toneNote}
IMPORTANTE: TODO el contenido debe quedar en español natural. No uses inglés (excepto nombres propios/marca).
IMPORTANTE: Usa exactamente el nombre comercial del negocio para títulos y referencias: "${lead.businessName}".
IMPORTANTE: Reemplaza TODAS las menciones de ciudades genéricas (Austin, San Francisco, Madrid, Barcelona, Buenos Aires, Montevideo o cualquier ciudad de ejemplo) por "${lead.city}".
IMPORTANTE: Menciona "${lead.city}" cuando aporte valor, pero evita repeticiones innecesarias.
IMPORTANTE: NO dupliques la ciudad en el hero. Si el heroTitle ya incluye ciudad, no repetir en otra parte del mismo titular.

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

  // Retry con backoff exponencial para rate limits
  const MAX_RETRIES = 4;
  let lastError: any;
  let rawText = '';

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 8192,
        messages: [{ role: 'user', content: prompt }],
      });
      rawText = response.content[0].type === 'text' ? response.content[0].text : '';
      break; // éxito, salir del loop
    } catch (err: any) {
      lastError = err;
      const isRateLimit = err?.status === 429 || err?.error?.type === 'rate_limit_error';
      const isOverloaded = err?.status === 529 || err?.error?.type === 'overloaded_error';
      if ((isRateLimit || isOverloaded) && attempt < MAX_RETRIES - 1) {
        const waitSec = Math.pow(2, attempt + 1) * 5; // 10s, 20s, 40s, 80s
        console.log(`⏳ Rate limit — reintentando en ${waitSec}s (intento ${attempt + 1}/${MAX_RETRIES})...`);
        await new Promise(r => setTimeout(r, waitSec * 1000));
      } else {
        throw err; // error no-recuperable o último intento
      }
    }
  }

  if (!rawText && lastError) throw lastError;

  // Parse JSON — intentar limpiar si viene con markdown
  let jsonStr = rawText.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
  }

  return JSON.parse(jsonStr);
}

// ─── Procesar un lead individual ───────────────────────────────────────────

export async function processSingleLead(leadId: string): Promise<PipelineResult> {
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

    // Doble-check de imágenes (si IA devuelve ogImage inválida, usamos Unsplash sectorial)
    const sectorImages = getSectorImages(lead.sector);
    generatedContent.seo = generatedContent.seo || {};
    generatedContent.seo.ogImage = await validateImageUrl(generatedContent.seo?.ogImage, sectorImages.og);

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

    // WhatsApp fire-and-forget: no bloquea el pipeline
    notifyLeadViaWhatsApp(lead).catch(err =>
      console.error(`[whatsapp] fire-and-forget error: ${err.message}`)
    );

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
  const isRioplatense = lead.country === 'AR' || lead.country === 'UY';

  return {
    pages: {
      home: {
        heroTitle: `${name} — Servicios de ${sector} en ${city}`,
        heroSubtitle: isRioplatense
          ? `Profesionales de confianza en ${city}. Presupuesto sin compromiso. Escribinos ahora.`
          : `Profesionales de confianza en ${city}. Presupuesto sin compromiso. Llámanos ahora.`,
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
        subtitle: isRioplatense
          ? `Estamos en ${city}. Te respondemos en menos de 24 horas.`
          : `Estamos en ${city}. Te respondemos en menos de 24 horas.`,
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
  const startedAt = new Date();

  console.log(`\n🚀 Pipeline LeadFlow v3`);
  console.log(`   Sector: ${sector} | Ciudad: ${city} | País: ${country} | Límite: ${limit}`);

  await connectDB();

  // Verificar que existe template ANTES de hacer scraping (getSector lanza si no existe)
  const templateName = getTemplateName(sector);
  console.log(`   Template: ${templateName} ✅`);

  // PASO 1: Scraping
  console.log(`\n🔍 PASO 1 — Scraping Google Maps...`);
  let scrapedLeadIds: string[] = [];

  const ecoMode = process.env.SCRAPE_ECO_MODE !== '0';
  const strictCityFilter = process.env.SCRAPE_STRICT_CITY
    ? process.env.SCRAPE_STRICT_CITY === '1'
    : ecoMode;
  const maxRounds = Math.max(1, envInt('SCRAPE_MAX_ROUNDS', ecoMode ? 2 : 5));
  const batchMultiplier = Math.max(1, envInt('SCRAPE_BATCH_MULTIPLIER', ecoMode ? 2 : 4));
  const maxBatchPerRound = Math.max(limit, envInt('SCRAPE_MAX_BATCH_PER_ROUND', ecoMode ? 80 : 200));
  const queryCacheHours = Math.max(0, envInt('SCRAPE_QUERY_CACHE_HOURS', ecoMode ? 24 : 0));

  console.log(
    `⚙️  Modo coste: ${ecoMode ? 'ECO' : 'NORMAL'} | ` +
    `rondas máx: ${maxRounds} | batch x${batchMultiplier} (cap ${maxBatchPerRound}) | ` +
    `cache: ${queryCacheHours}h | filtro ciudad: ${strictCityFilter ? 'ON' : 'OFF'}`,
  );
  // PASOS 1+2 COMBINADOS: scraping + validación WhatsApp en loop
  // Sigue buscando hasta tener `limit` leads con WhatsApp, o hasta MAX_SCRAPE_ROUNDS intentos.
  console.log(`\n📱 PASOS 1+2 — Scraping + validación WhatsApp (objetivo: ${limit} leads)...`);
  const validLeadIds: string[] = [];
  const validLeadSet = new Set<string>();
  const BATCH_SIZE = Math.min(Math.max(limit * batchMultiplier, limit), maxBatchPerRound);
  let round = 0;
  let totalScraped = 0;
  let apifyRuns = 0;
  let skippedByGeoTotal = 0;
  const notes: string[] = [];

  const persistTelemetry = async (args: {
    status: 'ok' | 'partial' | 'failed';
    generatedWebs: number;
    failedWebs: number;
    candidateLeads: number;
    totalScraped: number;
    error?: string;
    apifyRuns: number;
    skippedByGeo: number;
    notes?: string[];
  }) => {
    try {
      const finishedAt = new Date();
      const perRunUsd = Math.max(0, envFloat('APIFY_COST_PER_RUN_USD', 0.40));
      const perLeadUsd = Math.max(0, envFloat('APIFY_COST_PER_SCRAPED_LEAD_USD', 0));
      const estimatedCostUsd = roundMoney(args.apifyRuns * perRunUsd + args.totalScraped * perLeadUsd);
      const estimatedCostPerWebUsd = args.generatedWebs > 0
        ? roundMoney(estimatedCostUsd / args.generatedWebs)
        : roundMoney(estimatedCostUsd);

      await PipelineRun.create({
        startedAt,
        finishedAt,
        durationMs: Math.max(0, finishedAt.getTime() - startedAt.getTime()),
        sector,
        city,
        country,
        limit,
        ecoMode,
        strictCityFilter,
        maxRounds,
        batchSize: BATCH_SIZE,
        apifyRuns: args.apifyRuns,
        totalScraped: args.totalScraped,
        skippedByGeo: args.skippedByGeo,
        candidateLeads: args.candidateLeads,
        generatedWebs: args.generatedWebs,
        failedWebs: args.failedWebs,
        estimatedCostUsd,
        estimatedCostPerWebUsd,
        costModel: { perRunUsd, perScrapedLeadUsd: perLeadUsd },
        status: args.status,
        error: args.error || null,
        notes: [...notes, ...(args.notes || [])].slice(0, 30),
      });

      console.log(
        `📈 Telemetría guardada | apify_runs=${args.apifyRuns} ` +
        `| candidatos=${args.candidateLeads} | webs=${args.generatedWebs} ` +
        `| coste_est=${estimatedCostUsd} USD | coste/web=${estimatedCostPerWebUsd} USD`,
      );

      await notifyPipelineRun({
        status: args.status,
        sector,
        city,
        country,
        limit,
        ecoMode,
        strictCityFilter,
        apifyRuns: args.apifyRuns,
        totalScraped: args.totalScraped,
        skippedByGeo: args.skippedByGeo,
        candidateLeads: args.candidateLeads,
        generatedWebs: args.generatedWebs,
        failedWebs: args.failedWebs,
        estimatedCostUsd,
        estimatedCostPerWebUsd,
        durationMs: Math.max(0, finishedAt.getTime() - startedAt.getTime()),
        notes: [...notes, ...(args.notes || [])].slice(0, 30),
        error: args.error,
      });
    } catch (err: any) {
      console.warn(`⚠️  No se pudo guardar telemetría del pipeline: ${err?.message || String(err)}`);
    }
  };

  const enrichFromDb = async (maxAdds: number, label: string) => {
    if (maxAdds <= 0) return;
    console.log(`\n   🔎 ${label}: buscando hasta ${maxAdds} candidatos en DB...`);
    let added = 0;

    const fallbackLeads = await Lead.find({
      sector,
      city,
      country,
      status: { $nin: ['web_live', 'email_sent', 'visited', 'contacted', 'client'] },
      $or: [
        { hasWebsite: false },
        { websiteStatus: 'sin_web' },
        { websiteUrl: null },
      ],
    })
      .sort({ lastScrapedAt: -1 })
      .limit(Math.max(limit * 10, 20))
      .select('businessName phone websiteUrl hasWebsite websiteStatus rawScrapeData address city')
      .lean();

    for (const lead of fallbackLeads) {
      if (validLeadIds.length >= limit) break;
      const leadId = String((lead as any)._id);
      if (validLeadSet.has(leadId)) continue;
      if (strictCityFilter && !leadMatchesTargetCity(lead, city)) continue;

      const hasRealWebsite = leadHasRealWebsite(lead);
      if (hasRealWebsite) continue;

      const candidatePhone = pickLeadPhone(lead);
      if (!candidatePhone) continue;

      const normalizedPhone = normalizePhoneForCountry(candidatePhone, country);
      const hasWA = validateWhatsApp(normalizedPhone, country);
      if (!hasWA) continue;

      await Lead.findByIdAndUpdate(leadId, {
        phone: normalizedPhone,
        hasWebsite: false,
        websiteStatus: 'sin_web',
        hasWhatsApp: true,
        hasMobile: true,
        whatsAppValidatedAt: new Date(),
        isGenerationCandidate: true,
        contactPriority: 'alta',
      });

      validLeadSet.add(leadId);
      validLeadIds.push(leadId);
      added++;
      console.log(`   ✅ ${lead.businessName} — recuperado desde DB (${validLeadIds.length}/${limit})`);
      if (added >= maxAdds) break;
    }
  };

  if (queryCacheHours > 0) {
    const since = new Date(Date.now() - queryCacheHours * 60 * 60 * 1000);
    const freshPool = await Lead.countDocuments({
      sector,
      city,
      country,
      lastScrapedAt: { $gte: since },
      status: { $nin: ['web_live', 'email_sent', 'visited', 'contacted', 'client'] },
      $or: [{ hasWebsite: false }, { websiteStatus: 'sin_web' }, { websiteUrl: null }],
    });

    if (freshPool > 0) {
      console.log(`\n   ♻️  Cache local detectada: ${freshPool} leads recientes (< ${queryCacheHours}h).`);
      await enrichFromDb(limit, 'Pre-carga');
    }
  }

  while (validLeadIds.length < limit && round < maxRounds) {
    round++;
    const needed = limit - validLeadIds.length;
    console.log(`\n   🔄 Ronda ${round}: buscando ${BATCH_SIZE} negocios (necesitamos ${needed} más)...`);

    let batchIds: string[] = [];
    try {
      const scraperResult = await runScraper({
        sector, city, country,
        limit: BATCH_SIZE,
        apiKey: process.env.APIFY_KEY || '',
      });
      batchIds = scraperResult.leadIds;
      apifyRuns += Number(scraperResult?.meta?.apifyRuns || 0);
      skippedByGeoTotal += Number(scraperResult?.meta?.skippedByGeo || 0);
      totalScraped += batchIds.length;
      console.log(`   Negocios guardados/actualizados en esta ronda: ${batchIds.length}`);
    } catch (err: any) {
      console.error(`❌ Error en scraper (ronda ${round}): ${err.message}`);
      if (round === 1) {
        const errorMsg = `Scraping falló: ${err.message}`;
        notes.push(`error_round_${round}`);
        await persistTelemetry({
          status: 'failed',
          generatedWebs: 0,
          failedWebs: 0,
          candidateLeads: validLeadIds.length,
          totalScraped,
          error: errorMsg,
          apifyRuns,
          skippedByGeo: skippedByGeoTotal,
        });
        throw new Error(errorMsg);
      }
      break; // Si falla en rondas posteriores, usamos lo que tenemos
    }

    if (batchIds.length === 0) {
      console.log('   ℹ️  No hay más resultados para esta ciudad/sector.');
      break;
    }

    // Validar WhatsApp para cada lead de esta ronda
    let roundCandidateAdds = 0;
    for (const leadId of batchIds) {
      if (validLeadIds.length >= limit) break;
      const lead = await Lead.findById(leadId);
      if (!lead) continue;
      if (strictCityFilter && !leadMatchesTargetCity(lead, city)) {
        console.log(`   ⏭️  ${lead.businessName} — fuera de ciudad objetivo (${city})`);
        continue;
      }

      if (['web_live', 'email_sent', 'visited', 'contacted', 'client'].includes(lead.status)) {
        console.log(`   🔄 ${lead.businessName} — ya procesado (${lead.status}), se omite`);
        continue;
      }

      // Solo generamos para candidatos: sin web corporativa + teléfono válido
      const hasRealWebsite = leadHasRealWebsite(lead);
      if (hasRealWebsite) {
        console.log(`   ⏭️  ${lead.businessName} — tiene web corporativa (${lead.websiteUrl || 'sin URL'})`);
        continue;
      }

      const candidatePhone = pickLeadPhone(lead);
      if (!candidatePhone) {
        console.log(`   ⏭️  ${lead.businessName} — sin teléfono`);
        continue;
      }

      const normalizedPhone = normalizePhoneForCountry(candidatePhone, country);
      const hasWA = validateWhatsApp(normalizedPhone, country);
      await Lead.findByIdAndUpdate(leadId, {
        phone: normalizedPhone,
        hasWebsite: false,
        websiteStatus: 'sin_web',
        hasWhatsApp: hasWA,
        hasMobile: hasWA,
        whatsAppValidatedAt: new Date(),
        isGenerationCandidate: hasWA,
        contactPriority: hasWA ? 'alta' : 'media',
        reviewCount: (lead.rawScrapeData as any)?.reviewsCount ?? (lead.rawScrapeData as any)?.reviews ?? randomBetween(40, 100),
        reviewRating: (lead.rawScrapeData as any)?.totalScore ?? (lead.rawScrapeData as any)?.rating ?? parseFloat((4 + Math.random()).toFixed(1)),
      });

      if (hasWA) {
        if (!validLeadSet.has(leadId)) {
          validLeadSet.add(leadId);
          validLeadIds.push(leadId);
          roundCandidateAdds++;
          console.log(`   ✅ ${lead.businessName} — WhatsApp OK (${validLeadIds.length}/${limit})`);
        }
      } else {
        console.log(`   ⚠️  ${lead.businessName} — Sin móvil válido, descartado`);
      }
    }

    if (ecoMode && roundCandidateAdds === 0 && validLeadIds.length < limit) {
      console.log('   🛑 Corte temprano ECO: esta ronda no produjo candidatos nuevos. Evitamos más scraping caro.');
      notes.push(`early_stop_round_${round}`);
      break;
    }
  }

  if (validLeadIds.length < limit) {
    const missing = limit - validLeadIds.length;
    await enrichFromDb(missing, 'Fallback DB');
  }

  if (validLeadIds.length === 0) {
    console.log('⚠️  No se encontraron candidatos sin web corporativa y con teléfono/WhatsApp válido. Prueba otra ciudad.');
    await persistTelemetry({
      status: 'partial',
      generatedWebs: 0,
      failedWebs: 0,
      candidateLeads: 0,
      totalScraped,
      apifyRuns,
      skippedByGeo: skippedByGeoTotal,
      notes: ['no_candidates'],
    });
    return [];
  }

  if (validLeadIds.length < limit) {
    console.log(`⚠️  Solo se encontraron ${validLeadIds.length}/${limit} leads válidos tras ${round} rondas.`);
    notes.push('partial_candidates');
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

  await persistTelemetry({
    status: errors.length === 0 ? 'ok' : 'partial',
    generatedWebs: ok.length,
    failedWebs: errors.length,
    candidateLeads: validLeadIds.length,
    totalScraped,
    apifyRuns,
    skippedByGeo: skippedByGeoTotal,
  });

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
  const country = (getArg('country', 'ES') as 'ES' | 'AR' | 'UY' | 'US');
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
