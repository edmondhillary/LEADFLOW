/**
 * Helper: carga datos de un lead + WebsiteContent desde MongoDB
 * y los mapea al formato genérico que usan TODOS los templates.
 *
 * [slug]/page.tsx llama a esta función y pasa el resultado como
 * prop `overrides` al template correspondiente.
 */

import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';

export interface LeadOverrides {
  businessName: string;
  city:         string;
  country:      string;
  phone:        string;
  phoneIntl:    string;
  address:      string;
  sector:       string;
  slug:         string;
  reviewCount:  number;
  reviewRating: number;
  // Contenido generado por Claude / fallback
  heroTitle:    string;
  heroSubtitle: string;
  heroCTA:      string;
  services:     Array<{ name: string; description: string; icon?: string }>;
  testimonials: Array<{ name: string; text: string; role?: string; rating: number }>;
  aboutStory:   string;
  blogPosts:    Array<{ title: string; slug: string; excerpt: string; keywords?: string[] }>;
  seoTitle:     string;
  seoDesc:      string;
  // base path for internal links (e.g. "/mi-negocio-madrid")
  baseHref:     string;
}

/**
 * Normaliza un teléfono a formato internacional.
 * Si ya empieza con +, lo devuelve limpio.
 * Si no, intenta añadir prefijo por país.
 */
function toIntlPhone(phone: string, country: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (phone.startsWith('+')) return `+${digits}`;
  const prefixes: Record<string, string> = { ES: '34', AR: '54', UY: '598' };
  const prefix = prefixes[country] || '34';
  return `+${prefix}${digits}`;
}

export async function getLeadOverrides(leadSlug: string): Promise<LeadOverrides | null> {
  try {
    await connectDB();
    const lead = await Lead.findOne({ slug: leadSlug }).lean() as any;
    if (!lead) return null;

    const content = lead.contentRef
      ? (await WebsiteContent.findById(lead.contentRef).lean() as any)
      : null;

    const home     = content?.pages?.home || {};
    const services = content?.pages?.servicios?.items || home.featuredServices || [];
    const blogRaw  = content?.pages?.blog || [];
    const seo      = content?.seo || {};

    const sector = lead.sector || 'servicios';

    return {
      businessName: lead.businessName,
      city:         lead.city,
      country:      lead.country || 'ES',
      phone:        lead.phone || '',
      phoneIntl:    toIntlPhone(lead.phone, lead.country || 'ES'),
      address:      lead.address || lead.city,
      sector,
      slug:         lead.slug,
      reviewCount:  lead.reviewCount || 47,
      reviewRating: lead.reviewRating || 4.7,
      baseHref:     `/${lead.slug}`,

      heroTitle:    home.heroTitle    || lead.businessName,
      heroSubtitle: home.heroSubtitle || `Servicios profesionales de ${sector} en ${lead.city}.`,
      heroCTA:      home.heroCTA      || 'Contactar Ahora',

      services: services.slice(0, 6).map((s: any) => ({
        name:        s.name        || sector,
        description: s.description || `Servicio profesional de ${sector}.`,
        icon:        s.icon,
      })),

      testimonials: (home.testimonials || []).map((t: any) => ({
        name:   t.name   || 'Cliente',
        text:   t.text   || 'Excelente servicio, muy recomendable.',
        role:   t.role   || 'Cliente',
        rating: t.rating || 5,
      })),

      aboutStory: home.aboutSnippet || `${lead.businessName} es un referente de ${sector} en ${lead.city}. Ofrecemos servicios profesionales con la máxima calidad.`,

      blogPosts: blogRaw.slice(0, 3).map((p: any) => ({
        title:    p.title    || `${sector} en ${lead.city}`,
        slug:     p.slug     || 'articulo',
        excerpt:  p.excerpt  || `Artículo sobre ${sector}.`,
        keywords: p.keywords || [],
      })),

      seoTitle: seo.metaTitle || `${lead.businessName} | ${sector} en ${lead.city}`,
      seoDesc:  seo.metaDesc  || `${lead.businessName} — servicios de ${sector} en ${lead.city}.`,
    };
  } catch (err) {
    console.error('[getLeadOverrides] Error:', err);
    return null;
  }
}
