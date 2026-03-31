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

// ─── SerpAPI: encontrar top 3 webs del sector ──────────────────────────────
const EXCLUDED_DOMAINS = [
  'youtube.com', 'youtu.be', 'google.com', 'maps.google', 'goo.gl',
  'yelp.com', 'tripadvisor', 'facebook.com', 'instagram.com',
  'twitter.com', 'linkedin.com', 'wikipedia.org', 'amazon.com',
  'booking.com', 'expedia', 'airbnb', 'mercadolibre', 'olx.com',
  'paginas-amarillas', 'paginasamarillas', '11870', 'hotfrog',
  'milanuncios', 'idealista', 'fotocasa', 'segundamano',
];

async function findTopCompetitorUrls(
  sector: string, city: string, country: string, limit = 3
): Promise<string[]> {
  const apiKey = process.env.SERPAPI_KEY || process.env.SERPAPI_API_KEY;
  if (!apiKey) throw new Error('Falta SERPAPI_KEY');

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

  const params = new URLSearchParams({
    engine: 'google',
    q: query,
    api_key: apiKey,
    hl: 'es',
    gl: country.toLowerCase(),
    num: '20',
  });

  const res = await fetch(`https://serpapi.com/search?${params}`);
  const data = await res.json();
  const organic = data.organic_results || [];

  const urls: string[] = [];
  for (const r of organic) {
    const url: string = r.link || '';
    const excluded = EXCLUDED_DOMAINS.some(d => url.includes(d));
    if (!excluded && url.startsWith('http') && urls.length < limit) {
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

    // Extraer todo el diseño de una vez con evaluate
    const design = await page.evaluate(() => {
      const getCS = (el: Element, prop: string) =>
        window.getComputedStyle(el).getPropertyValue(prop);

      // ── Colores ──────────────────────────────────────────────────────
      const body = document.body;
      const allButtons = Array.from(document.querySelectorAll('button, a.btn, .button, [class*="btn"], a[class*="cta"]'));
      const ctaEl = allButtons[0];
      const h1 = document.querySelector('h1');
      const links = Array.from(document.querySelectorAll('a')).slice(0, 10);

      // Encontrar colores más usados
      const colorMap: Record<string, number> = {};
      const allEls = document.querySelectorAll('section, div, header, footer, main');
      allEls.forEach(el => {
        const bg = getCS(el, 'background-color');
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          colorMap[bg] = (colorMap[bg] || 0) + 1;
        }
      });

      const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
      const linkColor = links.length > 0 ? getCS(links[0], 'color') : '';

      const colors = {
        primary: linkColor || (h1 ? getCS(h1, 'color') : '#2563eb'),
        secondary: sortedColors[1]?.[0] || '#1e40af',
        accent: ctaEl ? getCS(ctaEl, 'background-color') : '#f59e0b',
        background: getCS(body, 'background-color') || '#ffffff',
        text: getCS(body, 'color') || '#1f2937',
        cta: ctaEl ? getCS(ctaEl, 'background-color') : '#2563eb',
        ctaText: ctaEl ? getCS(ctaEl, 'color') : '#ffffff',
      };

      // ── Tipografía ───────────────────────────────────────────────────
      const h1El = document.querySelector('h1');
      const h2El = document.querySelector('h2');
      const pEl = document.querySelector('p');

      const typography = {
        headingFont: h1El ? getCS(h1El, 'font-family').split(',')[0].replace(/['"]/g, '') : 'Inter',
        bodyFont: pEl ? getCS(pEl, 'font-family').split(',')[0].replace(/['"]/g, '') : 'Inter',
        h1Size: h1El ? getCS(h1El, 'font-size') : '48px',
        h2Size: h2El ? getCS(h2El, 'font-size') : '32px',
        bodySize: pEl ? getCS(pEl, 'font-size') : '16px',
        lineHeight: pEl ? getCS(pEl, 'line-height') : '1.6',
      };

      // ── Secciones y layout ───────────────────────────────────────────
      const sectionEls = document.querySelectorAll('section, [class*="section"], [class*="block"]');
      const sections: string[] = [];
      const sectionPatterns: any[] = [];

      const SECTION_KEYWORDS: Record<string, string[]> = {
        hero: ['hero', 'banner', 'jumbotron', 'masthead', 'portada', 'header-main'],
        services: ['servicio', 'service', 'feature', 'what-we', 'caracteristica'],
        about: ['about', 'nosotros', 'quienes', 'quien', 'historia'],
        testimonials: ['testimoni', 'review', 'opinion', 'resena', 'cliente'],
        contact: ['contact', 'contacto', 'formulario', 'form'],
        pricing: ['precio', 'price', 'pricing', 'plan', 'tarifa'],
        gallery: ['galeria', 'gallery', 'portfolio', 'proyecto', 'trabajo'],
        cta: ['cta', 'call-to-action', 'action', 'empezar', 'presupuesto'],
        faq: ['faq', 'pregunta', 'question'],
        footer: ['footer', 'pie'],
      };

      sectionEls.forEach(sec => {
        const text = (sec.className + ' ' + sec.id + ' ' + (sec.textContent || '').slice(0, 200)).toLowerCase();
        let sectionName = 'unknown';
        for (const [name, keywords] of Object.entries(SECTION_KEYWORDS)) {
          if (keywords.some(kw => text.includes(kw))) {
            sectionName = name;
            break;
          }
        }
        if (sectionName !== 'unknown' && !sections.includes(sectionName)) {
          sections.push(sectionName);
          const children = sec.querySelectorAll(':scope > div, :scope > article, :scope > li');
          const bg = getCS(sec, 'background-color');
          sectionPatterns.push({
            name: sectionName,
            hasBackground: bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent',
            layout: children.length >= 3 ? 'grid' : children.length >= 2 ? 'cards' : 'list',
            itemCount: children.length,
          });
        }
      });

      // ── Hero pattern ─────────────────────────────────────────────────
      const heroSection = document.querySelector('[class*="hero"], [class*="banner"], header + section, main > section:first-child');
      let heroPattern = 'centered';
      if (heroSection) {
        const imgs = heroSection.querySelectorAll('img');
        const videos = heroSection.querySelectorAll('video');
        const bgImg = getCS(heroSection, 'background-image');
        if (videos.length > 0) heroPattern = 'video-bg';
        else if (bgImg !== 'none') heroPattern = 'full-bg';
        else if (imgs.length > 0) {
          const cs = getCS(heroSection, 'display');
          heroPattern = cs === 'flex' || cs === 'grid' ? 'image-right' : 'split';
        }
      }

      // ── Navegación ───────────────────────────────────────────────────
      const nav = document.querySelector('nav, [class*="nav"], header');
      const navLinks = nav ? Array.from(nav.querySelectorAll('a')).map(a => a.textContent?.trim() || '').filter(t => t.length > 0 && t.length < 30) : [];
      const isSticky = nav ? ['fixed', 'sticky'].includes(getCS(nav, 'position')) : false;

      // ── Grid columns (servicios) ─────────────────────────────────────
      const servicesSection = document.querySelector('[class*="servicio"], [class*="service"], [class*="feature"]');
      let gridCols = 3;
      if (servicesSection) {
        const gridStyle = getCS(servicesSection, 'grid-template-columns');
        if (gridStyle) {
          gridCols = gridStyle.split(' ').length;
        }
      }

      // ── CTAs ─────────────────────────────────────────────────────────
      const ctaData = allButtons.slice(0, 5).map(btn => {
        const bg = getCS(btn, 'background-color');
        const border = getCS(btn, 'border');
        let style = 'solid';
        if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
          style = border && border !== 'none' ? 'outline' : 'ghost';
        }

        // Determinar posición del CTA
        let pos = 'section-end';
        const parent = btn.closest('header, nav, [class*="hero"], [class*="banner"], footer, section');
        if (parent) {
          const tag = parent.tagName.toLowerCase();
          const cls = (parent.className || '').toLowerCase();
          if (tag === 'header' || tag === 'nav' || cls.includes('nav')) pos = 'nav';
          else if (cls.includes('hero') || cls.includes('banner')) pos = 'hero';
          else if (tag === 'footer') pos = 'footer';
        }

        return {
          text: (btn.textContent?.trim() || '').slice(0, 40),
          style,
          position: pos,
        };
      });

      // ── Spacing ──────────────────────────────────────────────────────
      const firstSection = sectionEls[0];
      const container = document.querySelector('.container, [class*="container"], [class*="wrapper"], main > div');

      const spacing = {
        sectionPadding: firstSection ? getCS(firstSection, 'padding-top') : '64px',
        cardGap: '24px',
        containerMaxWidth: container ? getCS(container, 'max-width') : '1200px',
      };

      // ── Meta ─────────────────────────────────────────────────────────
      const metaTitle = document.title || '';
      const metaDescEl = document.querySelector('meta[name="description"]');
      const metaDesc = metaDescEl?.getAttribute('content') || '';
      const hasSchema = !!document.querySelector('script[type="application/ld+json"]');

      return {
        colors, typography, sections, sectionPatterns, heroPattern,
        navItems: navLinks.slice(0, 8), hasStickynav: isSticky, gridColumns: gridCols,
        ctas: ctaData, spacing, metaTitle, metaDesc, hasSchema,
      };
    });

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

  runDesignScraper({ sector, city, country })
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
