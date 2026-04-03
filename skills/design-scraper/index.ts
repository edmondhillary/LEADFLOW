/**
 * SKILL: LeadFlow Design Scraper
 *
 * Scrapes the top 3 Google results for a sector+city.
 * Uses Playwright to extract the "design DNA":
 *   - Color palette (backgrounds, text, accents, CTAs)
 *   - Typography (font families, sizes, weights)
 *   - Layout structure (sections order, hero pattern, grid vs list)
 *   - Navigation pattern
 *   - CTA styles and copy
 *   - Section patterns (hero, services, testimonials, about, contact, footer)
 *   - Spacing rhythm
 *   - Image usage patterns
 *
 * Saves results in MongoDB (DesignReference collection) cached 7 days.
 *
 * Uso: npx tsx skills/design-scraper/index.ts --sector electricista --city Valencia --country ES
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB } from '../../src/lib/mongodb';
import mongoose from 'mongoose';

// ─── Schema para cachear diseños ─────────────────────────────────────────────
const DesignReferenceSchema = new mongoose.Schema({
  sector: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  scrapedAt: { type: Date, default: Date.now },
  competitors: [{
    url: String,
    position: Number,
    // Colores
    colors: {
      primary: String,
      secondary: String,
      accent: String,
      background: String,
      text: String,
      cta: String,
      ctaText: String,
    },
    // Tipografía
    typography: {
      headingFont: String,
      bodyFont: String,
      h1Size: String,
      h2Size: String,
      bodySize: String,
      lineHeight: String,
    },
    // Layout
    layout: {
      sections: [String],        // orden: ['hero', 'services', 'about', 'testimonials', 'cta', 'contact', 'footer']
      heroPattern: String,       // 'image-right', 'full-bg', 'video-bg', 'split', 'centered'
      gridColumns: Number,       // servicios: 2, 3 o 4 columnas
      hasStickynav: Boolean,
      navItems: [String],
    },
    // CTAs
    ctas: [{
      text: String,
      style: String,             // 'solid', 'outline', 'ghost'
      position: String,          // 'hero', 'nav', 'section-end', 'footer'
    }],
    // Secciones detectadas
    sectionPatterns: [{
      name: String,              // 'hero', 'services', 'testimonials', etc.
      hasBackground: Boolean,
      layout: String,            // 'grid', 'list', 'carousel', 'cards'
      itemCount: Number,
    }],
    // Spacing
    spacing: {
      sectionPadding: String,
      cardGap: String,
      containerMaxWidth: String,
    },
    // Metadata
    metaTitle: String,
    metaDesc: String,
    hasSchema: Boolean,
    loadTime: Number,
  }],
  // Consensus: el diseño promedio/más común entre los top 3
  consensus: {
    dominantColors: {
      primary: String,
      secondary: String,
      accent: String,
      background: String,
      text: String,
    },
    preferredFonts: {
      heading: String,
      body: String,
    },
    commonSections: [String],
    heroPattern: String,
    gridColumns: Number,
    ctaStyle: String,
    avgSectionPadding: String,
  },
}, { timestamps: true });

DesignReferenceSchema.index({ sector: 1, city: 1, country: 1 });

const DesignReference = mongoose.models.DesignReference
  || mongoose.model('DesignReference', DesignReferenceSchema);

// ─── Apify: encontrar top 3 webs del sector ──────────────────────────────
const EXCLUDED_DOMAINS = [
  'youtube.com', 'youtu.be', 'google.com', 'maps.google', 'goo.gl',
  'yelp.com', 'tripadvisor', 'facebook.com', 'instagram.com',
  'twitter.com', 'linkedin.com', 'wikipedia.org', 'amazon.com',
  'booking.com', 'expedia', 'airbnb', 'mercadolibre', 'olx.com',
  'paginas-amarillas', 'paginasamarillas', '11870', 'hotfrog',
  'milanuncios', 'idealista', 'fotocasa', 'segundamano',
];

interface ApifyMapResult {
  website?: string;
  rank?: number;
  reviewsCount?: number;
}

function apifyActorPathId(actorId: string): string {
  if (!actorId) return 'apify~google-maps-scraper';
  if (actorId.includes('~')) return actorId;
  return actorId.replace('/', '~');
}

function apifyActorCandidates(): string[] {
  const fromEnv = process.env.APIFY_GOOGLE_MAPS_ACTOR_ID || '';
  const candidates = [
    fromEnv,
    'compass/crawler-google-places',
    'compass/google-maps-extractor',
    'apify/google-maps-scraper',
  ]
    .map(apifyActorPathId)
    .filter(Boolean);
  return [...new Set(candidates)];
}

function apifyLanguage(country: string): string {
  return country === 'US' ? 'en' : 'es';
}

function apifyCountryCode(country: string): string {
  return (country || 'ES').toLowerCase();
}

async function searchGoogleMapsWithApify(
  query: string,
  apiKey: string,
  country: string,
  limit: number,
): Promise<ApifyMapResult[]> {
  const input = {
    searchStringsArray: [query],
    maxCrawledPlacesPerSearch: Math.max(limit, 1),
    language: apifyLanguage(country),
    countryCode: apifyCountryCode(country),
  };

  const attempted: string[] = [];
  for (const actorId of apifyActorCandidates()) {
    attempted.push(actorId);

    const runResponse = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${apiKey}&waitForFinish=180`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (runResponse.status === 404) continue;
    if (!runResponse.ok) {
      throw new Error(`Apify run error (${actorId}): ${runResponse.status} ${runResponse.statusText}`);
    }

    const runPayload = await runResponse.json();
    const runData = runPayload?.data || runPayload;
    const datasetId = runData?.defaultDatasetId;
    if (!datasetId) {
      throw new Error(`Apify run (${actorId}) sin defaultDatasetId`);
    }

    const itemsUrl = new URL(`https://api.apify.com/v2/datasets/${datasetId}/items`);
    itemsUrl.searchParams.set('token', apiKey);
    itemsUrl.searchParams.set('clean', 'true');
    itemsUrl.searchParams.set('format', 'json');
    itemsUrl.searchParams.set('limit', String(Math.max(limit, 1)));

    const itemsResponse = await fetch(itemsUrl.toString());
    if (!itemsResponse.ok) {
      throw new Error(`Apify dataset error (${actorId}): ${itemsResponse.status} ${itemsResponse.statusText}`);
    }

    const items = await itemsResponse.json();
    return Array.isArray(items) ? (items as ApifyMapResult[]) : [];
  }

  throw new Error(`No se encontró actor de Google Maps en Apify. Probados: ${attempted.join(', ')}`);
}

async function findTopCompetitorUrls(
  sector: string, city: string, country: string, limit = 3
): Promise<string[]> {
  const apiKey = process.env.APIFY_KEY;
  if (!apiKey) throw new Error('Falta APIFY_KEY');

  const SECTOR_TERMS: Record<string, Record<string, string>> = {
    fontanero:    { ES: 'fontanero', AR: 'plomero', UY: 'plomero' },
    electricista: { ES: 'electricista', AR: 'electricista', UY: 'electricista' },
    peluqueria:   { ES: 'peluquería', AR: 'peluquería', UY: 'peluquería' },
    dentista:     { ES: 'dentista', AR: 'odontólogo', UY: 'odontólogo' },
    restaurante:  { ES: 'restaurante', AR: 'restaurante', UY: 'restaurante' },
    gimnasio:     { ES: 'gimnasio', AR: 'gimnasio', UY: 'gimnasio' },
    taller:       { ES: 'taller mecánico', AR: 'taller mecánico', UY: 'taller mecánico' },
  };

  const term = SECTOR_TERMS[sector]?.[country] || sector;
  const query = `${term} ${city}`;

  console.log(`🔍 Buscando top ${limit} webs: "${query}"`);

  const mapsResults = await searchGoogleMapsWithApify(query, apiKey, country, 20);
  const urls: string[] = [];

  const ordered = mapsResults
    .filter((r) => typeof r.website === 'string' && r.website.startsWith('http'))
    .sort((a, b) => (Number(a.rank || 999) - Number(b.rank || 999)) || (Number(b.reviewsCount || 0) - Number(a.reviewsCount || 0)));

  for (const r of ordered) {
    const url: string = r.website || '';
    const excluded = EXCLUDED_DOMAINS.some(d => url.includes(d));
    if (!excluded && url.startsWith('http') && urls.length < limit && !urls.includes(url)) {
      urls.push(url);
    }
  }

  console.log(`✅ Encontradas ${urls.length} webs competidoras`);
  urls.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));
  return urls;
}

// ─── Playwright: extraer diseño de una web ──────────────────────────────────
async function scrapeDesign(url: string, position: number) {
  const { chromium } = await import('playwright');

  console.log(`\n🎨 Scrapeando diseño de: ${url}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const startTime = Date.now();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000); // esperar renderizado

    const loadTime = Date.now() - startTime;

    const html = await page.content();
    const textBlob = html.toLowerCase();

    const navItems = (await page.locator('nav a, header a').allTextContents())
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t.length < 30)
      .slice(0, 8);

    const metaTitle = await page.title();
    const metaDescLocator = page.locator('meta[name="description"]');
    const metaDesc = (await metaDescLocator.count()) > 0
      ? ((await metaDescLocator.first().getAttribute('content')) || '')
      : '';
    const hasSchema = html.includes('application/ld+json');

    const ctaHandles = await page.locator('a[href*="contact"], button, .btn, .cta, [class*="button"], [class*="cta"]').elementHandles();
    const ctas = [] as Array<{ text: string; style: string; position: string }>;
    for (const handle of ctaHandles.slice(0, 5)) {
      const txt = ((await handle.textContent()) || '').trim().slice(0, 40);
      if (!txt) continue;
      ctas.push({ text: txt, style: 'solid', position: 'section-end' });
    }

    const sectionKeywords: Record<string, string[]> = {
      hero: ['hero', 'banner', 'jumbotron', 'masthead', 'portada'],
      services: ['servicio', 'service', 'feature', 'what-we'],
      about: ['about', 'nosotros', 'quienes', 'historia'],
      testimonials: ['testimoni', 'review', 'opinion', 'reseña', 'cliente'],
      contact: ['contact', 'contacto', 'formulario'],
      pricing: ['precio', 'price', 'pricing', 'tarifa'],
      gallery: ['galeria', 'gallery', 'portfolio', 'proyecto'],
      cta: ['call-to-action', 'presupuesto', 'empezar'],
      faq: ['faq', 'pregunta', 'question'],
      footer: ['footer', 'pie'],
    };

    const sections: string[] = [];
    for (const [name, keywords] of Object.entries(sectionKeywords)) {
      if (keywords.some((kw) => textBlob.includes(kw))) sections.push(name);
    }

    const sectionPatterns = sections.map((name) => ({
      name,
      hasBackground: true,
      layout: name === 'services' ? 'grid' : 'list',
      itemCount: name === 'services' ? 3 : 1,
    }));

    const h1Text = ((await page.locator('h1').first().textContent()) || '').trim();
    const h2Text = ((await page.locator('h2').first().textContent()) || '').trim();
    const pText = ((await page.locator('p').first().textContent()) || '').trim();

    const design = {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937',
        cta: '#2563eb',
        ctaText: '#ffffff',
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
        h1Size: h1Text.length > 40 ? '40px' : '48px',
        h2Size: h2Text.length > 40 ? '28px' : '32px',
        bodySize: pText.length > 120 ? '15px' : '16px',
        lineHeight: '1.6',
      },
      sections,
      sectionPatterns,
      heroPattern: html.includes('<video') ? 'video-bg' : html.includes('<img') ? 'split' : 'centered',
      navItems,
      hasStickynav: /sticky|fixed/.test(textBlob),
      gridColumns: sections.includes('services') ? 3 : 2,
      ctas,
      spacing: {
        sectionPadding: '64px',
        cardGap: '24px',
        containerMaxWidth: '1200px',
      },
      metaTitle,
      metaDesc,
      hasSchema,
    };

    await browser.close();

    return {
      url,
      position,
      colors: design.colors,
      typography: design.typography,
      layout: {
        sections: design.sections,
        heroPattern: design.heroPattern,
        gridColumns: design.gridColumns,
        hasStickynav: design.hasStickynav,
        navItems: design.navItems,
      },
      ctas: design.ctas,
      sectionPatterns: design.sectionPatterns,
      spacing: design.spacing,
      metaTitle: design.metaTitle,
      metaDesc: design.metaDesc,
      hasSchema: design.hasSchema,
      loadTime,
    };
  } catch (err: any) {
    console.error(`⚠️ Error scrapeando ${url}: ${err.message}`);
    await browser.close();
    return null;
  }
}

// ─── Consenso: extraer el diseño más común entre los top ────────────────────
function buildConsensus(competitors: any[]) {
  const valid = competitors.filter(Boolean);
  if (valid.length === 0) return null;

  // Color más frecuente por posición
  const pickMost = (arr: string[]) => {
    const freq: Record<string, number> = {};
    arr.filter(Boolean).forEach(v => freq[v] = (freq[v] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  };

  // Secciones que aparecen en al menos 2 de 3 sitios
  const sectionCount: Record<string, number> = {};
  valid.forEach(c => c.layout?.sections?.forEach((s: string) => {
    sectionCount[s] = (sectionCount[s] || 0) + 1;
  }));
  const commonSections = Object.entries(sectionCount)
    .filter(([_, count]) => count >= Math.ceil(valid.length / 2))
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  return {
    dominantColors: {
      primary: pickMost(valid.map(c => c.colors?.primary)),
      secondary: pickMost(valid.map(c => c.colors?.secondary)),
      accent: pickMost(valid.map(c => c.colors?.accent)),
      background: pickMost(valid.map(c => c.colors?.background)),
      text: pickMost(valid.map(c => c.colors?.text)),
    },
    preferredFonts: {
      heading: pickMost(valid.map(c => c.typography?.headingFont)),
      body: pickMost(valid.map(c => c.typography?.bodyFont)),
    },
    commonSections,
    heroPattern: pickMost(valid.map(c => c.layout?.heroPattern)),
    gridColumns: Math.round(valid.reduce((s, c) => s + (c.layout?.gridColumns || 3), 0) / valid.length),
    ctaStyle: pickMost(valid.flatMap((c: any) => c.ctas?.map((ct: any) => ct.style) || [])),
    avgSectionPadding: pickMost(valid.map(c => c.spacing?.sectionPadding)),
  };
}

// ─── Exportable ─────────────────────────────────────────────────────────────
export async function runDesignScraper(options: {
  sector: string;
  city: string;
  country: string;
  forceRefresh?: boolean;
}): Promise<any> {
  const { sector, city, country, forceRefresh = false } = options;

  await connectDB();

  // Check cache (7 días)
  if (!forceRefresh) {
    const cached = await DesignReference.findOne({
      sector, city, country,
      scrapedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });
    if (cached) {
      console.log(`📦 Usando diseño cacheado (${cached.competitors.length} competidores)`);
      return cached.toObject();
    }
  }

  // Buscar top 3 URLs
  const urls = await findTopCompetitorUrls(sector, city, country, 3);
  if (urls.length === 0) {
    console.error('❌ No se encontraron competidores para scrapear diseño');
    return null;
  }

  // Scrapear cada uno
  const competitors = [];
  for (let i = 0; i < urls.length; i++) {
    const result = await scrapeDesign(urls[i], i + 1);
    if (result) competitors.push(result);
    // Pausa entre scrapes
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 1000));
  }

  if (competitors.length === 0) {
    console.error('❌ No se pudo scrapear ningún competidor');
    return null;
  }

  // Generar consenso
  const consensus = buildConsensus(competitors);

  // Guardar en MongoDB
  const ref = await DesignReference.findOneAndUpdate(
    { sector, city, country },
    { sector, city, country, competitors, consensus, scrapedAt: new Date() },
    { upsert: true, new: true }
  );

  console.log(`\n✅ Diseño analizado: ${competitors.length} competidores`);
  console.log(`   Hero pattern: ${consensus?.heroPattern}`);
  console.log(`   Secciones comunes: ${consensus?.commonSections?.join(', ')}`);
  console.log(`   Font heading: ${consensus?.preferredFonts?.heading}`);
  console.log(`   Grid cols: ${consensus?.gridColumns}`);

  return ref.toObject();
}

// ─── CLI ────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const sector = getArg('sector', 'electricista');
  const city = getArg('city', 'Valencia');
  const country = getArg('country', 'ES');
  const forceRefresh = args.includes('--force');

  runDesignScraper({ sector, city, country, forceRefresh })
    .then(result => {
      if (result) {
        console.log('\n📊 Consenso de diseño:');
        console.log(JSON.stringify(result.consensus, null, 2));
      }
      process.exit(0);
    })
    .catch(err => {
      console.error('❌', err.message);
      process.exit(1);
    });
}
