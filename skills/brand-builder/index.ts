/**
 * SKILL: LeadFlow Brand Builder
 *
 * Recibe el análisis del Design Scraper (consensus + competitors)
 * y genera design guidelines concretas para ese sector+ciudad.
 *
 * Output: un objeto BrandGuidelines con todo lo que content-gen y
 * los templates Next.js necesitan para replicar la calidad de los top.
 *
 * Uso: npx tsx skills/brand-builder/index.ts --sector electricista --city Valencia --country ES
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB } from '../../src/lib/mongodb';
import mongoose from 'mongoose';

// ─── Tipos ──────────────────────────────────────────────────────────────────
export interface BrandGuidelines {
  sector: string;
  city: string;
  country: string;
  // Design tokens
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    ctaBg: string;
    ctaText: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    h1: { size: string; weight: string; lineHeight: string };
    h2: { size: string; weight: string; lineHeight: string };
    h3: { size: string; weight: string; lineHeight: string };
    body: { size: string; weight: string; lineHeight: string };
    small: { size: string; weight: string; lineHeight: string };
  };
  spacing: {
    sectionY: string;
    containerMax: string;
    cardGap: string;
    componentGap: string;
  };
  // Layout
  layout: {
    sections: string[];              // orden de secciones
    heroPattern: string;             // 'image-right' | 'full-bg' | 'centered' | 'split'
    serviceGridCols: number;         // 2 | 3 | 4
    testimonialLayout: string;       // 'cards' | 'carousel' | 'grid'
    navStyle: string;                // 'sticky' | 'static'
    footerStyle: string;             // 'simple' | 'columns' | 'full'
  };
  // CTAs
  cta: {
    primaryStyle: string;            // 'solid' | 'outline' | 'ghost'
    primaryRadius: string;
    secondaryStyle: string;
    heroCTAtext: string;
    navCTAtext: string;
    sectionCTAtext: string;
  };
  // SEO (programmatic SEO patterns)
  seo: {
    titleTemplate: string;
    descTemplate: string;
    h1Template: string;
    urlPattern: string;
    schemaType: string;              // 'LocalBusiness' | 'Service' | etc.
    keywordPattern: string[];
  };
  // Content tone
  voice: {
    locale: string;
    formality: string;               // 'formal' | 'casual' | 'professional'
    perspective: string;             // 'nosotros' | 'yo'
  };
}

// ─── Schema MongoDB ─────────────────────────────────────────────────────────
const BrandGuidelinesSchema = new mongoose.Schema({
  sector: String,
  city: String,
  country: String,
  guidelines: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

BrandGuidelinesSchema.index({ sector: 1, city: 1, country: 1 });

const BrandGuidelinesModel = mongoose.models.BrandGuidelines
  || mongoose.model('BrandGuidelines', BrandGuidelinesSchema);

// ─── Helpers de color ───────────────────────────────────────────────────────
function rgbToHex(rgb: string): string {
  if (!rgb || rgb.startsWith('#')) return rgb || '#2563eb';
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return '#2563eb';
  const [r, g, b] = match.map(Number);
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function darkenHex(hex: string, amount = 20): string {
  if (!hex.startsWith('#')) hex = rgbToHex(hex);
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// ─── Sector defaults (fallbacks profesionales) ──────────────────────────────
const SECTOR_DEFAULTS: Record<string, Partial<BrandGuidelines>> = {
  electricista: {
    colors: {
      primary: '#f59e0b', primaryDark: '#d97706', secondary: '#1e3a5f',
      accent: '#f59e0b', background: '#ffffff', surface: '#f8fafc',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#f59e0b', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Electricista en {city} | Presupuesto Gratis',
      descTemplate: 'Electricista profesional en {city}. Instalaciones, reparaciones y urgencias eléctricas. Presupuesto sin compromiso. Llámanos ahora.',
      h1Template: 'Electricista Profesional en {city}',
      urlPattern: '{slug}',
      schemaType: 'Electrician',
      keywordPattern: ['electricista {city}', 'electricista urgente {city}', 'instalaciones eléctricas {city}'],
    },
  },
  fontanero: {
    colors: {
      primary: '#2563eb', primaryDark: '#1d4ed8', secondary: '#0f172a',
      accent: '#06b6d4', background: '#ffffff', surface: '#f0f9ff',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#2563eb', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Fontanero en {city} | Urgencias 24h',
      descTemplate: 'Fontanero profesional en {city}. Reparaciones, desatascos y urgencias 24 horas. Presupuesto sin compromiso.',
      h1Template: 'Fontanero de Confianza en {city}',
      urlPattern: '{slug}',
      schemaType: 'Plumber',
      keywordPattern: ['fontanero {city}', 'fontanero urgente {city}', 'desatascos {city}'],
    },
  },
  peluqueria: {
    colors: {
      primary: '#be185d', primaryDark: '#9d174d', secondary: '#831843',
      accent: '#f472b6', background: '#ffffff', surface: '#fdf2f8',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#be185d', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Peluquería en {city} | Pide Cita',
      descTemplate: 'Peluquería profesional en {city}. Corte, color, mechas y tratamientos capilares. Reserva tu cita online.',
      h1Template: 'Tu Peluquería de Confianza en {city}',
      urlPattern: '{slug}',
      schemaType: 'HairSalon',
      keywordPattern: ['peluquería {city}', 'peluquero {city}', 'corte de pelo {city}'],
    },
  },
  dentista: {
    colors: {
      primary: '#0891b2', primaryDark: '#0e7490', secondary: '#164e63',
      accent: '#22d3ee', background: '#ffffff', surface: '#f0fdfa',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#0891b2', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Dentista en {city} | Primera Consulta Gratis',
      descTemplate: 'Clínica dental en {city}. Implantes, ortodoncia, limpieza y estética dental. Primera consulta gratuita.',
      h1Template: 'Clínica Dental en {city}',
      urlPattern: '{slug}',
      schemaType: 'Dentist',
      keywordPattern: ['dentista {city}', 'clínica dental {city}', 'implantes dentales {city}'],
    },
  },
  restaurante: {
    colors: {
      primary: '#dc2626', primaryDark: '#b91c1c', secondary: '#1f2937',
      accent: '#f59e0b', background: '#ffffff', surface: '#fef2f2',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#dc2626', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Restaurante en {city} | Reserva Mesa',
      descTemplate: 'Restaurante en {city}. Cocina tradicional y menú del día. Reserva tu mesa ahora.',
      h1Template: 'Restaurante en {city}',
      urlPattern: '{slug}',
      schemaType: 'Restaurant',
      keywordPattern: ['restaurante {city}', 'comer en {city}', 'menú del día {city}'],
    },
  },
  gimnasio: {
    colors: {
      primary: '#7c3aed', primaryDark: '#6d28d9', secondary: '#1f2937',
      accent: '#a78bfa', background: '#ffffff', surface: '#f5f3ff',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#7c3aed', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Gimnasio en {city} | Prueba Gratis',
      descTemplate: 'Gimnasio en {city}. Musculación, clases grupales y entrenamiento personal. Prueba un día gratis.',
      h1Template: 'Tu Gimnasio en {city}',
      urlPattern: '{slug}',
      schemaType: 'HealthClub',
      keywordPattern: ['gimnasio {city}', 'gym {city}', 'entrenador personal {city}'],
    },
  },
  taller: {
    colors: {
      primary: '#ea580c', primaryDark: '#c2410c', secondary: '#1c1917',
      accent: '#f97316', background: '#ffffff', surface: '#fff7ed',
      text: '#1f2937', textMuted: '#6b7280', border: '#e5e7eb',
      ctaBg: '#ea580c', ctaText: '#ffffff',
    },
    seo: {
      titleTemplate: '{business} - Taller Mecánico en {city} | Presupuesto Gratis',
      descTemplate: 'Taller mecánico en {city}. Revisiones, cambio de aceite, frenos y diagnosis. Presupuesto sin compromiso.',
      h1Template: 'Taller Mecánico en {city}',
      urlPattern: '{slug}',
      schemaType: 'AutoRepair',
      keywordPattern: ['taller mecánico {city}', 'taller {city}', 'mecánico {city}'],
    },
  },
};

// ─── Builder principal ──────────────────────────────────────────────────────
export async function buildBrandGuidelines(options: {
  sector: string;
  city: string;
  country: string;
  designReference?: any; // output del design-scraper
}): Promise<BrandGuidelines> {
  const { sector, city, country, designReference } = options;

  await connectDB();

  // Check cache (7 días)
  const cached = await BrandGuidelinesModel.findOne({
    sector, city, country,
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  });
  if (cached) {
    console.log('📦 Usando brand guidelines cacheadas');
    return cached.guidelines as BrandGuidelines;
  }

  const defaults = SECTOR_DEFAULTS[sector] || SECTOR_DEFAULTS.electricista;
  const consensus = designReference?.consensus;
  const locale = country === 'AR' || country === 'UY' ? 'es-AR' : 'es-ES';

  // Mezclar datos reales de competidores con defaults del sector
  const guidelines: BrandGuidelines = {
    sector,
    city,
    country,

    colors: {
      primary: rgbToHex(consensus?.dominantColors?.primary) || defaults.colors!.primary,
      primaryDark: darkenHex(rgbToHex(consensus?.dominantColors?.primary) || defaults.colors!.primary),
      secondary: rgbToHex(consensus?.dominantColors?.secondary) || defaults.colors!.secondary,
      accent: rgbToHex(consensus?.dominantColors?.accent) || defaults.colors!.accent,
      background: defaults.colors!.background,
      surface: defaults.colors!.surface,
      text: defaults.colors!.text,
      textMuted: defaults.colors!.textMuted,
      border: defaults.colors!.border,
      ctaBg: rgbToHex(consensus?.dominantColors?.accent) || defaults.colors!.ctaBg,
      ctaText: '#ffffff',
    },

    typography: {
      headingFont: consensus?.preferredFonts?.heading || 'Inter',
      bodyFont: consensus?.preferredFonts?.body || 'Inter',
      h1: { size: '3rem', weight: '800', lineHeight: '1.1' },
      h2: { size: '2rem', weight: '700', lineHeight: '1.2' },
      h3: { size: '1.25rem', weight: '600', lineHeight: '1.3' },
      body: { size: '1rem', weight: '400', lineHeight: '1.6' },
      small: { size: '0.875rem', weight: '400', lineHeight: '1.5' },
    },

    spacing: {
      sectionY: consensus?.avgSectionPadding || '80px',
      containerMax: '1200px',
      cardGap: '24px',
      componentGap: '16px',
    },

    layout: {
      sections: consensus?.commonSections?.length
        ? consensus.commonSections
        : ['hero', 'services', 'about', 'testimonials', 'cta', 'contact', 'footer'],
      heroPattern: consensus?.heroPattern || 'image-right',
      serviceGridCols: consensus?.gridColumns || 3,
      testimonialLayout: 'cards',
      navStyle: 'sticky',
      footerStyle: 'columns',
    },

    cta: {
      primaryStyle: consensus?.ctaStyle || 'solid',
      primaryRadius: '8px',
      secondaryStyle: 'outline',
      heroCTAtext: locale === 'es-AR' ? 'Pedí Presupuesto' : 'Pedir Presupuesto',
      navCTAtext: locale === 'es-AR' ? 'Llamar Ahora' : 'Llamar Ahora',
      sectionCTAtext: locale === 'es-AR' ? 'Contactanos' : 'Contáctanos',
    },

    seo: {
      ...(defaults.seo as any),
      titleTemplate: (defaults.seo as any)?.titleTemplate?.replace('{city}', city) || `{business} en ${city}`,
      descTemplate: (defaults.seo as any)?.descTemplate?.replace('{city}', city) || `Servicios de ${sector} en ${city}`,
      h1Template: (defaults.seo as any)?.h1Template?.replace('{city}', city) || `${sector} en ${city}`,
      keywordPattern: (defaults.seo as any)?.keywordPattern?.map((k: string) => k.replace('{city}', city)) || [`${sector} ${city}`],
    },

    voice: {
      locale,
      formality: 'professional',
      perspective: 'nosotros',
    },
  };

  // Guardar en MongoDB
  await BrandGuidelinesModel.findOneAndUpdate(
    { sector, city, country },
    { sector, city, country, guidelines },
    { upsert: true, new: true }
  );

  console.log(`\n✅ Brand guidelines generadas para ${sector} en ${city}`);
  console.log(`   Colors: primary=${guidelines.colors.primary}, accent=${guidelines.colors.accent}`);
  console.log(`   Fonts: heading=${guidelines.typography.headingFont}, body=${guidelines.typography.bodyFont}`);
  console.log(`   Layout: hero=${guidelines.layout.heroPattern}, grid=${guidelines.layout.serviceGridCols}cols`);
  console.log(`   SEO schema: ${guidelines.seo.schemaType}`);

  return guidelines;
}

// ─── CLI ────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  buildBrandGuidelines({
    sector: getArg('sector', 'electricista'),
    city: getArg('city', 'Valencia'),
    country: getArg('country', 'ES'),
  })
    .then(g => {
      console.log('\n📋 Guidelines:');
      console.log(JSON.stringify(g, null, 2));
      process.exit(0);
    })
    .catch(err => {
      console.error('❌', err.message);
      process.exit(1);
    });
}
