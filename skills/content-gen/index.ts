/**
 * SKILL 3: LeadFlow Content Generator
 *
 * Usa Claude Haiku para generar el contenido completo de las 5 páginas
 * de la web del negocio basándose en:
 * - Datos del lead (nombre, sector, ciudad, país)
 * - Análisis del competidor top (tono, keywords, estructura)
 * - Reseñas reales de Google Maps (para testimonios realistas)
 *
 * Guarda el contenido en MongoDB (colección WebsiteContent).
 *
 * Uso: npx tsx skills/content-gen/index.ts --leadId <mongoId>
 */

import Anthropic from '@anthropic-ai/sdk';
import { connectDB, Lead, Competitor, WebsiteContent } from '../../src/lib/mongodb';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface GeneratedContent {
  pages: {
    home: {
      heroTitle: string;
      heroSubtitle: string;
      heroCTA: string;
      featuredServices: { name: string; description: string; icon: string }[];
      testimonials: { name: string; text: string; rating: number }[];
      aboutSnippet: string;
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
    };
    nosotros: {
      title: string;
      story: string;
      values: { title: string; description: string }[];
      yearsExperience: number;
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
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    font: string;
  };
  seo: {
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
  };
}

const SECTOR_ICONS: Record<string, string[]> = {
  fontanero:    ['🔧', '🚿', '🪠', '💧', '🔩'],
  electricista: ['⚡', '💡', '🔌', '🔋', '🛠️'],
  peluqueria:   ['✂️', '💇', '🪮', '💈', '🌟'],
  dentista:     ['🦷', '😁', '🏥', '💊', '⭐'],
  restaurante:  ['🍽️', '👨‍🍳', '🥘', '🍷', '⭐'],
  gimnasio:     ['💪', '🏋️', '🧘', '🏃', '⭐'],
  taller:       ['🔧', '🚗', '⚙️', '🛠️', '🔩'],
};

function getLocaleVoice(locale: string): string {
  if (locale === 'es-AR') {
    return `Usa el español rioplatense con "vos" en lugar de "tú".
    Por ejemplo: "¿Necesitás ayuda?" en vez de "¿Necesitas ayuda?".
    El tono debe ser cercano y profesional, típico de Argentina/Uruguay.`;
  }
  return `Usa el español de España, natural y profesional.
  Tono directo pero amigable, sin ser demasiado formal.`;
}

async function generateWithClaude(prompt: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: prompt,
    }],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Claude no devolvió texto');
  return content.text;
}

async function parseJSON<T>(raw: string): Promise<T> {
  // Extraer JSON del bloque de código si viene envuelto
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const jsonStr = match ? match[1] : raw;
  try {
    return JSON.parse(jsonStr);
  } catch {
    // Intentar limpiar y parsear de nuevo
    const cleaned = jsonStr.replace(/[\x00-\x1F\x7F]/g, ' ');
    return JSON.parse(cleaned);
  }
}

export async function runContentGen(options: {
  leadId: string;
}): Promise<GeneratedContent | null> {
  const { leadId } = options;

  await connectDB();

  // Cargar lead
  const lead = await Lead.findById(leadId);
  if (!lead) {
    console.error(`❌ Lead no encontrado: ${leadId}`);
    return null;
  }

  console.log(`\n📝 Generando contenido para: ${lead.businessName}`);
  console.log(`   Sector: ${lead.sector} | Ciudad: ${lead.city} | País: ${lead.country}`);

  // Cargar análisis del competidor (puede no existir)
  const competitor = await Competitor.findOne({
    sector: lead.sector,
    city: lead.city,
    country: lead.country,
  });

  const localeVoice = getLocaleVoice(lead.locale);
  const currency = lead.currency === 'EUR' ? '€' : '$';
  const icons = SECTOR_ICONS[lead.sector] || ['⭐', '🔧', '✅', '💼', '🌟'];

  // Reviews del competidor para testimonios realistas
  const reviewsContext = competitor?.reviews?.length
    ? `Tienes estas reseñas reales de negocios similares en ${lead.city} para inspirar los testimonios (no copiar exactamente):
${competitor.reviews.slice(0, 4).map((r: string, i: number) => `${i + 1}. "${r}"`).join('\n')}`
    : 'Crea testimonios realistas y creíbles de clientes satisfechos.';

  // Contexto del competidor
  const competitorContext = competitor
    ? `El competidor top en ${lead.city} usa estas keywords: ${competitor.keywords?.slice(0, 8).join(', ')}.
Tono que funciona en esta zona: ${competitor.toneOfVoice}.
Servicios que ofrecen: ${competitor.services?.slice(0, 5).join(', ')}.`
    : `Adapta el contenido al sector ${lead.sector} en ${lead.city}.`;

  // ============================================================
  // PROMPT PRINCIPAL
  // ============================================================
  const mainPrompt = `Eres un experto en marketing local para pequeños negocios en España y Latinoamérica.

Genera el contenido completo para la web de este negocio:
- Nombre: ${lead.businessName}
- Sector: ${lead.sector}
- Ciudad: ${lead.city}
- País: ${lead.country}
- Moneda: ${currency}

${localeVoice}

${competitorContext}

${reviewsContext}

INSTRUCCIONES:
- El contenido debe sonar auténtico y local, no genérico
- Los servicios deben ser específicos y con precios reales aproximados en ${currency}
- Los testimonios deben tener nombres locales de ${lead.city}
- El blog debe incluir keywords SEO locales para posicionar en "${lead.sector} ${lead.city}"
- La historia de "Nosotros" debe ser cálida y creíble (5-15 años de experiencia)

Responde SOLO con un JSON válido con esta estructura exacta:
{
  "pages": {
    "home": {
      "heroTitle": "título impactante del hero (max 60 chars)",
      "heroSubtitle": "subtítulo que explica el valor (max 120 chars)",
      "heroCTA": "texto del botón principal (max 25 chars)",
      "featuredServices": [
        {"name": "servicio", "description": "descripción corta", "icon": "${icons[0]}"},
        {"name": "servicio", "description": "descripción corta", "icon": "${icons[1]}"},
        {"name": "servicio", "description": "descripción corta", "icon": "${icons[2]}"}
      ],
      "testimonials": [
        {"name": "nombre local", "text": "testimonio realista de 2-3 frases", "rating": 5},
        {"name": "nombre local", "text": "testimonio realista de 2-3 frases", "rating": 5},
        {"name": "nombre local", "text": "testimonio realista de 2-3 frases", "rating": 4}
      ],
      "aboutSnippet": "párrafo corto sobre el negocio (2-3 frases)"
    },
    "servicios": {
      "title": "Nuestros Servicios",
      "intro": "párrafo introductorio de servicios",
      "items": [
        {"name": "nombre", "description": "descripción detallada", "price": "desde 50${currency}", "icon": "${icons[0]}"},
        {"name": "nombre", "description": "descripción detallada", "price": "desde 80${currency}", "icon": "${icons[1]}"},
        {"name": "nombre", "description": "descripción detallada", "price": "consultar", "icon": "${icons[2]}"},
        {"name": "nombre", "description": "descripción detallada", "price": "desde 120${currency}", "icon": "${icons[3]}"},
        {"name": "nombre", "description": "descripción detallada", "price": "desde 200${currency}", "icon": "${icons[4] || '⭐'}"}
      ]
    },
    "contacto": {
      "title": "Contáctanos",
      "subtitle": "frase de invitación al contacto",
      "formFields": ["Nombre", "Teléfono", "Email", "Mensaje"],
      "mapQuery": "${lead.businessName} ${lead.city}"
    },
    "nosotros": {
      "title": "Quiénes Somos",
      "story": "historia del negocio en 2-3 párrafos, cálida y creíble",
      "values": [
        {"title": "valor 1", "description": "descripción"},
        {"title": "valor 2", "description": "descripción"},
        {"title": "valor 3", "description": "descripción"}
      ],
      "yearsExperience": 8
    },
    "blog": [
      {
        "title": "título SEO con keyword '${lead.sector} ${lead.city}'",
        "slug": "slug-url-amigable",
        "excerpt": "resumen del artículo (2-3 frases)",
        "content": "artículo completo de 400-600 palabras con información útil sobre ${lead.sector} en ${lead.city}",
        "keywords": ["${lead.sector} ${lead.city}", "${lead.sector}", "${lead.city}", "keyword4", "keyword5"]
      },
      {
        "title": "segundo artículo SEO sobre ${lead.sector}",
        "slug": "segundo-slug",
        "excerpt": "resumen del segundo artículo",
        "content": "segundo artículo de 300-400 palabras",
        "keywords": ["keyword1", "keyword2", "keyword3"]
      }
    ]
  },
  "design": {
    "primaryColor": "${competitor?.colors?.primary || '#2563eb'}",
    "secondaryColor": "${competitor?.colors?.secondary || '#1e40af'}",
    "accentColor": "#f59e0b",
    "backgroundColor": "#ffffff",
    "font": "Inter"
  },
  "seo": {
    "metaTitle": "${lead.businessName} - ${lead.sector} en ${lead.city} | título SEO",
    "metaDesc": "descripción SEO de 140-160 chars con keyword principal",
    "keywords": ["${lead.sector} ${lead.city}", "${lead.sector}", "${lead.city}", "más keywords"]
  }
}`;

  console.log('🤖 Llamando a Claude Haiku...');
  const rawContent = await generateWithClaude(mainPrompt);

  console.log('📦 Parseando respuesta...');
  const content = await parseJSON<GeneratedContent>(rawContent);

  // Actualizar status del lead
  await Lead.findByIdAndUpdate(leadId, { status: 'generating' });

  // Guardar en MongoDB
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

  console.log(`\n🎉 Contenido generado para: ${lead.businessName}`);
  console.log(`   Hero: "${content.pages.home.heroTitle}"`);
  console.log(`   Servicios: ${content.pages.servicios.items.length} items`);
  console.log(`   Blog: ${content.pages.blog.length} artículos`);
  console.log(`   SEO: ${content.seo.metaTitle}`);

  return content;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const leadId = getArg('leadId');
  if (!leadId) {
    console.error('❌ Falta --leadId <mongoId>');
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Falta ANTHROPIC_API_KEY en .env.local');
    process.exit(1);
  }

  runContentGen({ leadId })
    .then(result => {
      if (result) console.log('\n🎉 Content Gen completado.');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
