/**
 * SKILL: LeadFlow Content Generator v2
 *
 * Genera contenido para las 5 páginas usando:
 * - BrandGuidelines del brand-builder (colores, fonts, layout, SEO templates)
 * - Reseñas reales de Google Maps (para testimonios)
 * - Programmatic SEO patterns (title/desc/h1 templates, schema, keywords)
 *
 * REGLAS:
 * - CERO emojis — solo nombres de iconos Lucide
 * - Contenido local y auténtico
 * - SEO: cada página tiene unique value, no solo variables swapeadas
 * - Voz: formal en ES, voseo en AR/UY
 */

import Anthropic from '@anthropic-ai/sdk';
import { connectDB, Lead, Competitor, WebsiteContent } from '../../src/lib/mongodb';
import { BrandGuidelines } from '../brand-builder/index';
import { getSectorConfig } from '../../src/lib/sectors';

function getAnthropic() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('Falta ANTHROPIC_API_KEY en .env.local');
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// ─── Tipos ──────────────────────────────────────────────────────────────────
interface GeneratedContent {
  pages: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      heroCTA: string;
      featuredServices: { name: string; description: string; icon: string }[];
      testimonials: { name: string; text: string; rating: number }[];
      aboutSnippet: string;
      trustBadges: { text: string; icon: string }[];
    };
    servicios: {
      title: string;
      intro: string;
      items: { name: string; description: string; price: string; icon: string }[];
    };
    contacto: {
      title: string;
      subtitle: string;
      formFields: string[];
      mapQuery: string;
      phone: string;
      schedule: string;
    };
    nosotros: {
      title: string;
      story: string;
      values: { title: string; description: string; icon: string }[];
      yearsExperience: number;
      team: { name: string; role: string }[];
    };
    blog: {
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      keywords: string[];
    }[];
  };
  design: {
    primaryColor: string;
    primaryDark: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    surfaceColor: string;
    textColor: string;
    font: string;
    headingFont: string;
  };
  seo: {
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    schemaType: string;
    h1: string;
  };
}

// ─── Iconos por sector (Lucide names) ───────────────────────────────────────
const SECTOR_ICONS: Record<string, string[]> = {
  fontanero:    ['wrench', 'droplets', 'pipe', 'settings', 'shield-check', 'clock', 'phone'],
  electricista: ['zap', 'lightbulb', 'plug', 'battery-charging', 'cpu', 'shield-check', 'clock'],
  peluqueria:   ['scissors', 'sparkles', 'star', 'heart', 'smile', 'calendar', 'award'],
  dentista:     ['shield-check', 'star', 'heart-pulse', 'activity', 'award', 'calendar', 'smile'],
  restaurante:  ['utensils', 'chef-hat', 'clock', 'map-pin', 'star', 'phone', 'calendar'],
  gimnasio:     ['dumbbell', 'activity', 'heart', 'timer', 'trophy', 'users', 'calendar'],
  taller:       ['wrench', 'car', 'settings', 'shield-check', 'clock', 'phone', 'award'],
};

async function generateWithClaude(prompt: string): Promise<string> {
  const anthropic = getAnthropic();
  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  });
  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Claude no devolvió texto');
  return content.text;
}

async function parseJSON<T>(raw: string): Promise<T> {
  let jsonStr = raw.trim();
  if (jsonStr.startsWith('`')) {
    jsonStr = jsonStr.replace(/^```(?:json)?[\r\n]*/i, '').replace(/[\r\n]*```\s*$/, '').trim();
  }
  try { return JSON.parse(jsonStr); } catch {}
  const start = jsonStr.indexOf('{');
  const end = jsonStr.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(jsonStr.slice(start, end + 1)); } catch {}
  }
  const cleaned = jsonStr.replace(/[\x00-\x1F\x7F]/g, ' ');
  return JSON.parse(cleaned);
}

// ─── Main ───────────────────────────────────────────────────────────────────
export async function runContentGen(options: {
  leadId: string;
  brandGuidelines?: BrandGuidelines;
}): Promise<GeneratedContent | null> {
  const { leadId, brandGuidelines } = options;

  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) { console.error(`❌ Lead no encontrado: ${leadId}`); return null; }

  console.log(`\n📝 Generando contenido v2: ${lead.businessName}`);

  // Competitor data (reviews)
  const competitor = await Competitor.findOne({
    sector: lead.sector, city: lead.city, country: lead.country,
  });

  const bg = brandGuidelines;
  const currency = lead.currency === 'EUR' ? '€' : '$';
  const sectorCfg = getSectorConfig(lead.sector);
  const icons = sectorCfg?.lucideIcons || SECTOR_ICONS[lead.sector] || ['star', 'wrench', 'check-circle', 'briefcase', 'award', 'clock', 'phone'];
  const isLatam = lead.country === 'AR' || lead.country === 'UY';

  // Locale voice
  const voiceInstructions = isLatam
    ? `Usa español rioplatense con "vos". Ej: "¿Necesitás ayuda?" no "¿Necesitas ayuda?". Tono cercano y profesional.`
    : `Usa español de España. Tono directo, profesional pero amigable. No demasiado formal.`;

  // Reviews context
  const reviewsCtx = competitor?.reviews?.length
    ? `Reseñas reales de negocios similares (inspírate, no copies):\n${competitor.reviews.slice(0, 4).map((r: string, i: number) => `${i + 1}. "${r}"`).join('\n')}`
    : 'Crea testimonios realistas con nombres locales.';

  // SEO context from brand guidelines or sector config
  const sectorKeywords = isLatam
    ? (sectorCfg?.seoKeywords?.LATAM || [])
    : (sectorCfg?.seoKeywords?.ES || []);
  const seoCtx = bg ? `
SEO TEMPLATES (Programmatic SEO):
- Title: ${bg.seo.titleTemplate}
- Desc: ${bg.seo.descTemplate}
- H1: ${bg.seo.h1Template}
- Schema: ${bg.seo.schemaType}
- Keywords: ${bg.seo.keywordPattern.join(', ')}
` : `Keywords principales: "${lead.sector} ${lead.city}", "${lead.sector} urgente ${lead.city}"${sectorKeywords.length ? `, "${sectorKeywords.slice(0, 3).join(`", "`)}"` : ''}`;

  // Design context from brand guidelines
  const designCtx = bg ? `
DESIGN TOKENS (del análisis de competidores top):
- Primary: ${bg.colors.primary}, Accent: ${bg.colors.accent}
- Heading font: ${bg.typography.headingFont}, Body font: ${bg.typography.bodyFont}
- Hero pattern: ${bg.layout.heroPattern}
- Service grid: ${bg.layout.serviceGridCols} columnas
- CTA style: ${bg.cta.primaryStyle}
- CTA text hero: "${bg.cta.heroCTAtext}"
` : '';

  // Sector-specific services reference
  const sectorServices = sectorCfg?.services
    ? (isLatam ? sectorCfg.services.LATAM : sectorCfg.services.ES)
    : [];
  const sectorServicesCtx = sectorServices.length ? `
SERVICIOS TÍPICOS DEL SECTOR (usa como referencia de precios y nombres, adapta al negocio):
${sectorServices.map(s => `- ${s.name}: ${s.priceRange}`).join('\n')}
` : '';

  // Sector-specific trust signals
  const sectorTrust = sectorCfg?.trustSignals
    ? (isLatam ? sectorCfg.trustSignals.LATAM : sectorCfg.trustSignals.ES)
    : [];
  const sectorTrustCtx = sectorTrust.length ? `
SEÑALES DE CONFIANZA ESPECÍFICAS DEL SECTOR (usa en trustBadges y copy):
${sectorTrust.map(t => `- "${t}"`).join('\n')}
` : '';

  // Sector-specific content guidance
  const sectorPromptExtra = sectorCfg?.contentPrompt || '';

  // Blog topics from sector config
  const sectorBlogTopics = sectorCfg?.blogTopics || [];
  const blogCtx = sectorBlogTopics.length ? `
TEMAS DE BLOG CON POTENCIAL SEO PARA ESTE SECTOR (úsalos como inspiración para los títulos):
${sectorBlogTopics.slice(0, 4).map((t, i) => `${i + 1}. ${t}`).join('\n')}
` : '';

  // ════════════════════════════════════════════════════════════════════════
  // PROMPT v2 (sector-aware)
  // ════════════════════════════════════════════════════════════════════════
  const prompt = `Eres un experto en marketing local y programmatic SEO para negocios en España/Latinoamérica.

NEGOCIO:
- Nombre: ${lead.businessName}
- Sector: ${lead.sector}
- Ciudad: ${lead.city}
- País: ${lead.country} | Moneda: ${currency}
- Teléfono: ${lead.phone || 'N/A'}

${voiceInstructions}

${seoCtx}

${designCtx}

${sectorServicesCtx}
${sectorTrustCtx}
${blogCtx}
${sectorPromptExtra}

${reviewsCtx}

REGLAS OBLIGATORIAS:
1. CERO EMOJIS — ningún emoji en ningún campo. Los iconos van como nombre de Lucide: "wrench", "zap", "star", etc.
2. Cada página debe tener UNIQUE VALUE — no solo variables cambiadas
3. Testimonios con nombres reales locales de ${lead.city} (ej: Antonio García, María López)
4. Servicios con precios realistas en ${currency} para ${lead.city}
5. Blog: 2 artículos SEO con keyword "${lead.sector} ${lead.city}" — contenido útil, no relleno
6. Botones de acción específicos: "${isLatam ? 'Pedí Presupuesto' : 'Pedir Presupuesto'}", "Llamar Ahora", "Ver Servicios"
7. Puntos suspensivos con "…" (U+2026) no con "..."
8. "nosotros.story" debe ser 2-3 párrafos separados por \\n\\n
9. trustBadges: 3 badges de confianza con icono Lucide (ej: {"text": "Más de 500 clientes", "icon": "users"})

Responde SOLO con JSON válido:
{
  "pages": {
    "home": {
      "heroTitle": "max 60 chars, impactante",
      "heroSubtitle": "max 120 chars, valor claro",
      "heroCTA": "${bg?.cta.heroCTAtext || (isLatam ? 'Pedí Presupuesto' : 'Pedir Presupuesto')}",
      "featuredServices": [
        {"name": "servicio real", "description": "2 frases", "icon": "${icons[0]}"},
        {"name": "servicio real", "description": "2 frases", "icon": "${icons[1]}"},
        {"name": "servicio real", "description": "2 frases", "icon": "${icons[2]}"}
      ],
      "testimonials": [
        {"name": "nombre real local", "text": "2-3 frases realistas", "rating": 5},
        {"name": "nombre real local", "text": "2-3 frases realistas", "rating": 5},
        {"name": "nombre real local", "text": "2-3 frases realistas", "rating": 4}
      ],
      "aboutSnippet": "2-3 frases sobre el negocio",
      "trustBadges": [
        {"text": "dato de confianza", "icon": "${icons[5]}"},
        {"text": "dato de confianza", "icon": "shield-check"},
        {"text": "dato de confianza", "icon": "award"}
      ]
    },
    "servicios": {
      "title": "Nuestros Servicios",
      "intro": "párrafo que vende",
      "items": [
        {"name": "nombre", "description": "detalle real", "price": "desde 50${currency}", "icon": "${icons[0]}"},
        {"name": "nombre", "description": "detalle real", "price": "desde 80${currency}", "icon": "${icons[1]}"},
        {"name": "nombre", "description": "detalle real", "price": "consultar", "icon": "${icons[2]}"},
        {"name": "nombre", "description": "detalle real", "price": "desde 120${currency}", "icon": "${icons[3]}"},
        {"name": "nombre", "description": "detalle real", "price": "desde 200${currency}", "icon": "${icons[4]}"}
      ]
    },
    "contacto": {
      "title": "${isLatam ? 'Contactanos' : 'Contáctanos'}",
      "subtitle": "frase de invitación",
      "formFields": ["Nombre", "Teléfono", "Email", "Mensaje"],
      "mapQuery": "${lead.businessName} ${lead.city}",
      "phone": "${lead.phone || ''}",
      "schedule": "horario realista (ej: Lunes a Viernes 9:00 - 18:00)"
    },
    "nosotros": {
      "title": "Quiénes Somos",
      "story": "2-3 párrafos separados por \\n\\n",
      "values": [
        {"title": "valor", "description": "descripción", "icon": "shield-check"},
        {"title": "valor", "description": "descripción", "icon": "heart"},
        {"title": "valor", "description": "descripción", "icon": "award"}
      ],
      "yearsExperience": 10,
      "team": [
        {"name": "nombre inventado realista", "role": "Director"},
        {"name": "nombre inventado realista", "role": "Técnico"}
      ]
    },
    "blog": [
      {
        "title": "título SEO con '${lead.sector} ${lead.city}'",
        "slug": "slug-url",
        "excerpt": "2-3 frases",
        "content": "artículo de 300-500 palabras, útil, no relleno",
        "keywords": ["${lead.sector} ${lead.city}", "keyword2", "keyword3"]
      },
      {
        "title": "segundo artículo SEO",
        "slug": "slug-url",
        "excerpt": "2-3 frases",
        "content": "artículo de 200-400 palabras",
        "keywords": ["keyword1", "keyword2"]
      }
    ]
  },
  "design": {
    "primaryColor": "${bg?.colors.primary || '#2563eb'}",
    "primaryDark": "${bg?.colors.primaryDark || '#1d4ed8'}",
    "secondaryColor": "${bg?.colors.secondary || '#1e40af'}",
    "accentColor": "${bg?.colors.accent || '#f59e0b'}",
    "backgroundColor": "#ffffff",
    "surfaceColor": "${bg?.colors.surface || '#f8fafc'}",
    "textColor": "${bg?.colors.text || '#1f2937'}",
    "font": "${bg?.typography.bodyFont || 'Inter'}",
    "headingFont": "${bg?.typography.headingFont || 'Inter'}"
  },
  "seo": {
    "metaTitle": "título SEO 50-60 chars con keyword",
    "metaDesc": "descripción SEO 140-160 chars",
    "keywords": ["${lead.sector} ${lead.city}", "más"],
    "schemaType": "${bg?.seo.schemaType || 'LocalBusiness'}",
    "h1": "H1 principal con keyword"
  }
}`;

  console.log('🤖 Llamando a Claude Haiku v2…');
  const rawContent = await generateWithClaude(prompt);

  console.log('📦 Parseando respuesta…');
  const content = await parseJSON<GeneratedContent>(rawContent);

  // Guardar en MongoDB
  await Lead.findByIdAndUpdate(leadId, { status: 'generating' });

  const existingContent = await WebsiteContent.findOne({ leadId });
  if (existingContent) {
    await WebsiteContent.findOneAndUpdate({ leadId }, { ...content });
    console.log('♻️  Contenido actualizado en MongoDB');
  } else {
    const webContent = await WebsiteContent.create({ leadId, ...content });
    await Lead.findByIdAndUpdate(leadId, {
      contentRef: webContent._id,
      status: 'web_live',
      webLiveAt: new Date(),
    });
    console.log('✅ Contenido guardado en MongoDB');
  }

  console.log(`\n🎉 Contenido v2 generado: ${lead.businessName}`);
  console.log(`   H1: "${content.seo.h1}"`);
  console.log(`   Hero: "${content.pages.home.heroTitle}"`);
  console.log(`   Servicios: ${content.pages.servicios.items.length} items`);
  console.log(`   Blog: ${content.pages.blog.length} artículos`);
  console.log(`   Schema: ${content.seo.schemaType}`);

  return content;
}

// ─── CLI ────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const leadId = getArg('leadId');
  if (!leadId) { console.error('❌ Falta --leadId'); process.exit(1); }

  runContentGen({ leadId })
    .then(r => { if (r) console.log('🎉 Listo.'); process.exit(0); })
    .catch(e => { console.error('❌', e.message); process.exit(1); });
}
