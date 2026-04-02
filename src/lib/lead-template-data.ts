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
  logoText:     string;
  city:         string;
  country:      string;
  locale:       'es-ES' | 'es-AR';
  phone:        string;
  phoneIntl:    string;
  email:        string;
  website:      string;
  address:      string;
  hours:        string;
  businessType: string;
  mapDirections: string;
  gps:          { latitude: number; longitude: number } | null;
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

function toSlug(value: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanBusinessName(name: string): string {
  if (!name) return '';
  let cleaned = name.trim();
  if (cleaned.includes('|')) cleaned = cleaned.split('|')[0].trim();
  if (cleaned.includes(' - ')) cleaned = cleaned.split(' - ')[0].trim();
  return cleaned;
}

function inferDomain(website: string | undefined, businessName: string): string {
  if (website) {
    try {
      const host = new URL(website.startsWith('http') ? website : `https://${website}`).hostname;
      return host.replace(/^www\./, '');
    } catch {}
  }
  const slug = toSlug(businessName) || 'negocio-local';
  return `${slug}.com`;
}

function inferEmail(explicitEmail: string | undefined, website: string | undefined, businessName: string): string {
  if (explicitEmail) return explicitEmail;
  const domain = inferDomain(website, businessName);
  return `info@${domain}`;
}

function getLocale(country: string): 'es-ES' | 'es-AR' {
  return country === 'AR' || country === 'UY' ? 'es-AR' : 'es-ES';
}

function dedupeCity(text: string, city: string): string {
  if (!text || !city) return text;
  const escaped = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'ig');
  let seen = false;
  const out = text.replace(re, (m) => {
    if (seen) return '';
    seen = true;
    return m;
  });
  return out.replace(/\s{2,}/g, ' ').replace(/\s+,/g, ',').trim();
}

function toRioplatense(text: string): string {
  if (!text) return text;
  return text
    .replace(/Contáctanos/gi, 'Contactanos')
    .replace(/Llámanos/gi, 'Escribinos')
    .replace(/Empieza/gi, 'Empezá')
    .replace(/Reserva/gi, 'Reservá')
    .replace(/Puedes/gi, 'Podés')
    .replace(/puedes/gi, 'podés')
    .replace(/Tienes/gi, 'Tenés')
    .replace(/tienes/gi, 'tenés')
    .replace(/Contáctame/gi, 'Contactame');
}

function adaptTextByLocale(text: string, locale: 'es-ES' | 'es-AR'): string {
  if (!text) return text;
  return locale === 'es-AR' ? toRioplatense(text) : text;
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
    const raw      = lead.rawScrapeData || {};
    const locale   = getLocale(lead.country || 'ES');
    const website  = raw.website || raw?.links?.website || '';
    const businessName = cleanBusinessName(lead.businessName || raw.title || 'Negocio local');
    const email = inferEmail(lead.email, website, businessName);
    const domain = inferDomain(website, businessName);
    const logoText = businessName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w: string) => w[0]?.toUpperCase())
      .join('') || businessName.slice(0, 2).toUpperCase();

    const sector = lead.sector || 'servicios';
    const heroTitle = dedupeCity(home.heroTitle || businessName, lead.city);
    const fallbackSubtitle = locale === 'es-AR'
      ? `Servicios profesionales de ${sector} en ${lead.city}. Atención rápida y trato cercano.`
      : `Servicios profesionales de ${sector} en ${lead.city}. Atención rápida y trato cercano.`;

    const heroSubtitleRaw = home.heroSubtitle || fallbackSubtitle;
    const heroCTARaw = home.heroCTA || 'Contactar ahora';
    const aboutRaw = home.aboutSnippet || `${businessName} es un referente de ${sector} en ${lead.city}. Ofrecemos servicios profesionales con la máxima calidad.`;

    return {
      businessName,
      logoText,
      city:         lead.city,
      country:      lead.country || 'ES',
      locale,
      phone:        lead.phone || '',
      phoneIntl:    toIntlPhone(lead.phone, lead.country || 'ES'),
      email,
      website,
      address:      lead.address || lead.city,
      hours:        raw.hours || '',
      businessType: raw.type || sector,
      mapDirections: raw?.links?.directions || lead.googleMapsUrl || '',
      gps:          raw?.gps_coordinates || null,
      sector,
      slug:         lead.slug,
      reviewCount:  lead.reviewCount || 47,
      reviewRating: lead.reviewRating || 4.7,
      baseHref:     `/${lead.slug}`,

      heroTitle,
      heroSubtitle: adaptTextByLocale(heroSubtitleRaw, locale),
      heroCTA:      adaptTextByLocale(heroCTARaw, locale),

      services: services.slice(0, 6).map((s: any) => ({
        name:        s.name        || sector,
        description: adaptTextByLocale(s.description || `Servicio profesional de ${sector}.`, locale),
        icon:        s.icon,
      })),

      testimonials: (home.testimonials || []).map((t: any) => ({
        name:   t.name   || 'Cliente',
        text:   adaptTextByLocale(t.text || 'Excelente servicio, muy recomendable.', locale),
        role:   t.role   || 'Cliente',
        rating: t.rating || 5,
      })),

      aboutStory: adaptTextByLocale(aboutRaw, locale),

      blogPosts: blogRaw.slice(0, 3).map((p: any) => ({
        title:    adaptTextByLocale(p.title || `${sector} en ${lead.city}`, locale),
        slug:     p.slug     || 'articulo',
        excerpt:  adaptTextByLocale(p.excerpt || `Artículo sobre ${sector}.`, locale),
        keywords: p.keywords || [],
      })),

      seoTitle: seo.metaTitle || `${businessName} | ${sector} en ${lead.city}`,
      seoDesc:  seo.metaDesc  || `${businessName} — servicios de ${sector} en ${lead.city}.`,
    };
  } catch (err) {
    console.error('[getLeadOverrides] Error:', err);
    return null;
  }
}
