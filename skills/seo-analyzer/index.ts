/**
 * SKILL 2: LeadFlow SEO Analyzer
 *
 * Analiza el competidor TOP de Google Maps (local, no publicidad, no grandes marcas).
 * Usa SerpAPI para encontrarlo y Playwright para extraer su arquitectura web.
 * También extrae sus reseñas de Google para inspirar los testimonios del lead.
 * Guarda el análisis en MongoDB (colección Competitor) y lo reutiliza si ya existe.
 *
 * Uso: npx tsx skills/seo-analyzer/index.ts --sector fontanero --city Madrid --country ES
 */

import { connectDB, Competitor } from '../../src/lib/mongodb';

interface CompetitorData {
  topUrl: string;
  navigation: string[];
  headings: { tag: string; text: string }[];
  metaTitle: string;
  metaDesc: string;
  services: string[];
  colors: { primary: string; secondary: string; background: string; text: string };
  ctas: { text: string; href: string }[];
  keywords: string[];
  toneOfVoice: string;
  recommendedStructure: object;
  reviews: string[];
}

async function findTopCompetitor(
  sector: string,
  city: string,
  country: string,
  apiKey: string
): Promise<string | null> {
  const terms: Record<string, Record<string, string>> = {
    fontanero:    { ES: 'fontanero', AR: 'plomero', UY: 'plomero' },
    electricista: { ES: 'electricista', AR: 'electricista', UY: 'electricista' },
    peluqueria:   { ES: 'peluquería', AR: 'peluquería', UY: 'peluquería' },
    dentista:     { ES: 'dentista', AR: 'odontólogo', UY: 'odontólogo' },
    restaurante:  { ES: 'restaurante', AR: 'restaurante', UY: 'restaurante' },
    gimnasio:     { ES: 'gimnasio', AR: 'gimnasio', UY: 'gimnasio' },
    taller:       { ES: 'taller mecánico', AR: 'taller mecánico', UY: 'taller mecánico' },
  };

  const term = terms[sector]?.[country] || sector;
  const query = `${term} ${city}`;

  console.log(`🔍 Buscando competidor top: "${query}"`);

  // Búsqueda orgánica en Google (no Maps) para encontrar el #1 local con web
  const params = new URLSearchParams({
    engine: 'google',
    q: query,
    api_key: apiKey,
    hl: 'es',
    gl: country.toLowerCase(),
    num: '20',
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  const data = await response.json();

  // Filtramos: solo resultados orgánicos locales, excluimos directorios y grandes marcas
  const EXCLUDED_DOMAINS = [
    'youtube.com', 'youtu.be',
    'yelp.com', 'tripadvisor', 'pages.google', 'facebook.com', 'instagram.com',
    'twitter.com', 'linkedin.com', 'wikipedia.org', 'amazon.com', 'infobae.com',
    'idealista', 'milanuncios', 'habitaclia', 'fotocasa', 'segundamano',
    'booking.com', 'expedia', 'airbnb', 'mercadolibre', 'olx.com',
    'paginas-amarillas', 'paginasamarillas', '11870', 'hotfrog',
    'google.com', 'maps.google', 'goo.gl',
  ];

  const organicResults = data.organic_results || [];

  for (const result of organicResults) {
    const url: string = result.link || '';
    const isExcluded = EXCLUDED_DOMAINS.some(domain => url.includes(domain));
    if (!isExcluded && url.startsWith('http')) {
      console.log(`✅ Competidor encontrado: ${url}`);
      return url;
    }
  }

  return null;
}

async function getGoogleReviews(
  sector: string,
  city: string,
  apiKey: string
): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      engine: 'google_maps',
      q: `${sector} ${city}`,
      type: 'search',
      api_key: apiKey,
      hl: 'es',
    });

    const response = await fetch(`https://serpapi.com/search?${params}`);
    const data = await response.json();
    const results = data.local_results || [];

    // Cogemos el primero que tenga place_id y buenas reviews
    const top = results.find((r: any) => r.place_id && r.reviews > 10);
    if (!top) return [];

    // Obtenemos las reviews de ese negocio
    const reviewParams = new URLSearchParams({
      engine: 'google_maps_reviews',
      place_id: top.place_id,
      api_key: apiKey,
      hl: 'es',
    });

    const reviewResponse = await fetch(`https://serpapi.com/search?${reviewParams}`);
    const reviewData = await reviewResponse.json();
    const reviews = reviewData.reviews || [];

    return reviews
      .filter((r: any) => r.rating >= 4 && r.snippet && r.snippet.length > 30)
      .slice(0, 6)
      .map((r: any) => r.snippet);

  } catch (err) {
    console.warn('⚠️ No se pudieron obtener reseñas de Google Maps');
    return [];
  }
}

async function analyzeWithPlaywright(url: string): Promise<Partial<CompetitorData>> {
  // Importación dinámica de playwright (opcional en el build de Next.js)
  const { chromium } = await import('playwright');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const data = await page.evaluate(() => {
      // Navegación
      const navLinks = Array.from(document.querySelectorAll('nav a, header a'))
        .map(a => (a as HTMLAnchorElement).textContent?.trim())
        .filter(Boolean)
        .slice(0, 10) as string[];

      // Headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
        .slice(0, 15)
        .map(h => ({ tag: h.tagName.toLowerCase(), text: h.textContent?.trim() || '' }))
        .filter(h => h.text.length > 2);

      // Meta tags
      const metaTitle = document.title || '';
      const metaDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || '';

      // CTAs (botones y links importantes)
      const ctaSelectors = 'a[href*="contact"], a[href*="contact"], button, .btn, .cta, [class*="button"], [class*="cta"]';
      const ctas = Array.from(document.querySelectorAll(ctaSelectors))
        .slice(0, 8)
        .map(el => ({
          text: el.textContent?.trim() || '',
          href: (el as HTMLAnchorElement).href || '',
        }))
        .filter(c => c.text.length > 1);

      // Colores dominantes (del CSS)
      const bodyStyle = window.getComputedStyle(document.body);
      const colors = {
        primary: '#2563eb',
        secondary: '#1e40af',
        background: bodyStyle.backgroundColor || '#ffffff',
        text: bodyStyle.color || '#1f2937',
      };

      // Intentar detectar color primario desde variables CSS o clases
      const root = document.documentElement;
      const rootStyle = window.getComputedStyle(root);
      const primaryVar = rootStyle.getPropertyValue('--primary') ||
                         rootStyle.getPropertyValue('--color-primary') ||
                         rootStyle.getPropertyValue('--brand-color');
      if (primaryVar) colors.primary = primaryVar.trim();

      return { navLinks, headings, metaTitle, metaDesc, ctas, colors };
    });

    // Extraer servicios mencionados en el contenido
    const pageText = await page.evaluate(() => document.body.innerText);
    const servicePatterns = /(?:servicio[s]?|ofrecemos|trabajamos en|especialistas en)[:\s]+([^.!\n]{10,100})/gi;
    const services: string[] = [];
    let match;
    while ((match = servicePatterns.exec(pageText)) !== null && services.length < 8) {
      services.push(match[1].trim());
    }

    await browser.close();

    return {
      topUrl: url,
      navigation: data.navLinks,
      headings: data.headings,
      metaTitle: data.metaTitle,
      metaDesc: data.metaDesc,
      ctas: data.ctas,
      colors: data.colors,
      services: services.length > 0 ? services : [],
    };

  } catch (err: any) {
    console.warn(`⚠️ Playwright falló en ${url}: ${err.message}`);
    await browser.close();
    return { topUrl: url };
  }
}

function analyzeStructure(data: Partial<CompetitorData>): object {
  const pageCount = data.navigation?.length || 0;
  const hasServices = data.navigation?.some(n =>
    /servicio|product|service/i.test(n)
  );
  const hasContact = data.navigation?.some(n =>
    /contact|contacto/i.test(n)
  );

  return {
    recommendedPages: ['home', 'servicios', 'nosotros', 'contacto', 'blog'],
    heroPattern: data.headings?.[0]?.text ? 'headline-cta' : 'full-image',
    includeTestimonials: true,
    includePricing: false,
    ctaStyle: (data.ctas?.length ?? 0) > 2 ? 'multiple' : 'single',
    keywordDensity: (data.keywords?.length ?? 0) > 5 ? 'high' : 'medium',
  };
}

function detectTone(data: Partial<CompetitorData>): string {
  const text = [
    data.metaTitle,
    data.metaDesc,
    ...(data.headings?.map(h => h.text) || []),
  ].join(' ').toLowerCase();

  if (/profesional|experto|certificado|garantía/i.test(text)) return 'profesional-confiable';
  if (/económico|barato|precio|oferta/i.test(text)) return 'económico-accesible';
  if (/urgente|24h|emergencia|rápido/i.test(text)) return 'urgencia-disponibilidad';
  return 'profesional-cercano';
}

export async function runSeoAnalyzer(options: {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY';
  apiKey: string;
  forceRefresh?: boolean;
}): Promise<CompetitorData | null> {
  const { sector, city, country, apiKey, forceRefresh = false } = options;

  await connectDB();

  // Verificar si ya tenemos análisis reciente (menos de 7 días)
  if (!forceRefresh) {
    const existing = await Competitor.findOne({ sector, city, country });
    if (existing) {
      const daysSince = (Date.now() - existing.analyzedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        console.log(`♻️  Reutilizando análisis existente (${Math.round(daysSince)} días)`);
        return existing.toObject();
      }
    }
  }

  // Encontrar competidor top
  const topUrl = await findTopCompetitor(sector, city, country, apiKey);
  if (!topUrl) {
    console.error('❌ No se encontró ningún competidor válido');
    return null;
  }

  // Analizar con Playwright
  console.log(`🎭 Analizando web: ${topUrl}`);
  const analysis = await analyzeWithPlaywright(topUrl);

  // Obtener reseñas de Google Maps
  console.log('⭐ Obteniendo reseñas de Google Maps...');
  const reviews = await getGoogleReviews(sector, city, apiKey);

  // Extraer keywords del meta
  const keywords = [
    sector, city, country === 'ES' ? 'España' : country,
    ...(analysis.metaTitle?.split(/\s+/).filter(w => w.length > 4) || []),
  ].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 15);

  const competitorData: CompetitorData = {
    topUrl: analysis.topUrl || topUrl,
    navigation: analysis.navigation || [],
    headings: analysis.headings || [],
    metaTitle: analysis.metaTitle || '',
    metaDesc: analysis.metaDesc || '',
    services: analysis.services || [],
    colors: analysis.colors || { primary: '#2563eb', secondary: '#1e40af', background: '#ffffff', text: '#1f2937' },
    ctas: analysis.ctas || [],
    keywords,
    toneOfVoice: detectTone(analysis),
    recommendedStructure: analyzeStructure(analysis),
    reviews,
  };

  // Guardar o actualizar en MongoDB
  await Competitor.findOneAndUpdate(
    { sector, city, country },
    { ...competitorData, analyzedAt: new Date() },
    { upsert: true, new: true }
  );

  console.log(`\n✅ Análisis completado:`);
  console.log(`   URL: ${competitorData.topUrl}`);
  console.log(`   Tono: ${competitorData.toneOfVoice}`);
  console.log(`   Keywords: ${competitorData.keywords.slice(0, 5).join(', ')}`);
  console.log(`   Reseñas obtenidas: ${competitorData.reviews.length}`);

  return competitorData;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const options = {
    sector:  getArg('sector', 'fontanero'),
    city:    getArg('city', 'Madrid'),
    country: (getArg('country', 'ES') as 'ES' | 'AR' | 'UY'),
    apiKey:  process.env.SERPAPI_KEY || '',
    forceRefresh: args.includes('--force'),
  };

  if (!options.apiKey) {
    console.error('❌ Falta SERPAPI_KEY en .env.local');
    process.exit(1);
  }

  runSeoAnalyzer(options)
    .then(result => {
      if (result) console.log('\n🎉 SEO Analyzer completado.');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
