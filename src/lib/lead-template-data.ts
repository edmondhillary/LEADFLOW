/**
 * Helper: carga datos de un lead + WebsiteContent desde MongoDB
 * y los mapea al formato genérico que usan TODOS los templates.
 *
 * [slug]/page.tsx llama a esta función y pasa el resultado como
 * prop `overrides` al template correspondiente.
 */

import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';

export interface ContactOverrides {
  title: string;
  subtitle: string;
  formFields: string[];
  mapQuery: string;
  responsePromise: string;
  whatsappPrefill: string;
}

export interface AboutOverrides {
  title: string;
  story: string;
  mission: string;
  yearsExperience: number;
  values: Array<{ title: string; description: string }>;
  highlights: string[];
}

export interface AssetsOverrides {
  ownerImage: string;
  heroImage: string;
  aboutImage: string;
  blogImage: string;
  gallery: string[];
}

export interface LeadOverrides {
  businessName: string;
  logoText:     string;
  city:         string;
  country:      string;
  countryCode:  string;
  street:       string;
  postalCode:   string;
  state:        string;
  locale:       'es-ES' | 'es-AR' | 'en-US';
  phone:        string;
  phoneIntl:    string;
  email:        string;
  website:      string;
  address:      string;
  hours:        string;
  openingHours: string[];
  businessType: string;
  categories:   string[];
  priceRange:   string;
  imagesCount:  number;
  additionalInfo: Record<string, unknown>;
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
  contact:      ContactOverrides;
  about:        AboutOverrides;
  assets:       AssetsOverrides;
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
  const prefixes: Record<string, string> = { ES: '34', AR: '54', UY: '598', US: '1' };
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

function getLocale(country: string): 'es-ES' | 'es-AR' | 'en-US' {
  if (country === 'US') return 'en-US';
  return country === 'AR' || country === 'UY' ? 'es-AR' : 'es-ES';
}

function openingHoursToLines(raw: any): string[] {
  const rows = raw?.openingHours || raw?.normalized?.openingHours || [];
  if (!Array.isArray(rows)) return [];
  return rows
    .map((r: any) => {
      const day = String(r?.day || '').trim();
      const hours = String(r?.hours || '').trim();
      if (!day || !hours) return '';
      return `${day}: ${hours}`;
    })
    .filter(Boolean);
}

function buildHighlights(raw: any, city: string, sector: string): string[] {
  const out: string[] = [];
  const push = (v?: string) => {
    if (!v) return;
    const txt = v.trim();
    if (!txt) return;
    if (!out.includes(txt)) out.push(txt);
  };

  const additional = raw?.additionalInfo || raw?.normalized?.additionalInfo || {};
  for (const [section, entries] of Object.entries(additional as Record<string, any>)) {
    if (!Array.isArray(entries)) continue;
    for (const item of entries) {
      if (!item || typeof item !== 'object') continue;
      for (const [label, enabled] of Object.entries(item)) {
        if (enabled) push(`${section}: ${label}`);
      }
    }
  }

  push(`Cobertura local en ${city}`);
  push(`Especialistas en ${sector}`);
  return out.slice(0, 6);
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

function adaptTextByLocale(text: string, locale: 'es-ES' | 'es-AR' | 'en-US'): string {
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

    const home = content?.pages?.home || {};
    const serviciosPage = content?.pages?.servicios || {};
    const contactoPage = content?.pages?.contacto || {};
    const nosotrosPage = content?.pages?.nosotros || {};
    const services = serviciosPage?.items || home.featuredServices || [];
    const blogRaw = content?.pages?.blog || [];
    const seo = content?.seo || {};
    const raw = lead.rawScrapeData || {};
    const locale = getLocale(lead.country || 'ES');
    const website = raw.website || raw?.links?.website || lead.websiteUrl || '';
    const businessName = cleanBusinessName(lead.businessName || raw.title || 'Negocio local');
    const email = inferEmail(lead.email, website, businessName);
    const logoText = businessName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w: string) => w[0]?.toUpperCase())
      .join('') || businessName.slice(0, 2).toUpperCase();

    const sector = lead.sector || 'servicios';
    const country = lead.country || 'ES';
    const phone = lead.phone || raw.phoneUnformatted || raw.phone || '';
    const openingHours = openingHoursToLines(raw);
    const categoryList = Array.isArray(raw.categories)
      ? raw.categories
      : Array.isArray(raw?.normalized?.categories)
        ? raw.normalized.categories
        : raw.categoryName
          ? [raw.categoryName]
          : [];
    const ownerImage = raw.imageUrl || raw?.normalized?.imageUrl || '';
    const mapDirections = raw.url || raw?.links?.directions || lead.googleMapsUrl || '';
    const gps = raw?.gps_coordinates
      ? { latitude: raw.gps_coordinates.latitude, longitude: raw.gps_coordinates.longitude }
      : raw?.location?.lat && raw?.location?.lng
        ? { latitude: raw.location.lat, longitude: raw.location.lng }
        : raw?.normalized?.coords?.lat && raw?.normalized?.coords?.lng
          ? { latitude: raw.normalized.coords.lat, longitude: raw.normalized.coords.lng }
          : null;

    const heroTitle = dedupeCity(home.heroTitle || businessName, lead.city);
    const fallbackSubtitle = locale === 'es-AR'
      ? `Servicios profesionales de ${sector} en ${lead.city}. Atención rápida y trato cercano.`
      : `Servicios profesionales de ${sector} en ${lead.city}. Atención rápida y trato cercano.`;

    const heroSubtitleRaw = home.heroSubtitle || fallbackSubtitle;
    const heroCTARaw = home.heroCTA || 'Contactar ahora';
    const aboutRaw = nosotrosPage.story || home.aboutSnippet || `${businessName} es un referente de ${sector} en ${lead.city}. Ofrecemos servicios profesionales con la máxima calidad.`;
    const aboutValues = Array.isArray(nosotrosPage.values) && nosotrosPage.values.length
      ? nosotrosPage.values
      : [
          { title: 'Calidad', description: `Trabajo profesional de ${sector} con foco en detalle.` },
          { title: 'Confianza', description: `Atención cercana y transparente en ${lead.city}.` },
          { title: 'Compromiso', description: 'Cumplimos plazos y cuidamos cada entrega.' },
        ];
    const aboutHighlights = buildHighlights(raw, lead.city, sector);

    const contact: ContactOverrides = {
      title: adaptTextByLocale(contactoPage.title || `Contacta con ${businessName}`, locale),
      subtitle: adaptTextByLocale(contactoPage.subtitle || `Te respondemos rápido en ${lead.city}.`, locale),
      formFields: Array.isArray(contactoPage.formFields) && contactoPage.formFields.length
        ? contactoPage.formFields.map((f: string) => String(f))
        : ['Nombre', 'Teléfono', 'Servicio', 'Mensaje'],
      mapQuery: contactoPage.mapQuery || `${businessName} ${lead.city}`,
      responsePromise: adaptTextByLocale('Respondemos en menos de 2 horas en horario laboral.', locale),
      whatsappPrefill: `Hola, me gustaría solicitar información sobre ${businessName} en ${lead.city}.`,
    };

    const about: AboutOverrides = {
      title: adaptTextByLocale(nosotrosPage.title || `Sobre ${businessName} en ${lead.city}`, locale),
      story: adaptTextByLocale(aboutRaw, locale),
      mission: adaptTextByLocale(nosotrosPage.mission || `Ayudar a clientes de ${lead.city} con soluciones de ${sector} claras, rápidas y de calidad.`, locale),
      yearsExperience: Number(nosotrosPage.yearsExperience || 8),
      values: aboutValues.map((v: any) => ({
        title: adaptTextByLocale(v?.title || 'Valor', locale),
        description: adaptTextByLocale(v?.description || 'Compromiso con la calidad.', locale),
      })),
      highlights: aboutHighlights,
    };

    const assets: AssetsOverrides = {
      ownerImage,
      heroImage: ownerImage,
      aboutImage: ownerImage,
      blogImage: ownerImage,
      gallery: ownerImage ? [ownerImage] : [],
    };

    return {
      businessName,
      logoText,
      city:         lead.city,
      country,
      countryCode:  String(raw.countryCode || country || 'ES'),
      street:       String(raw.street || ''),
      postalCode:   String(raw.postalCode || ''),
      state:        String(raw.state || ''),
      locale,
      phone,
      phoneIntl:    toIntlPhone(phone, country),
      email,
      website,
      address:      lead.address || lead.city,
      hours:        raw.hours || openingHours[0] || '',
      openingHours,
      businessType: raw.type || raw.categoryName || sector,
      categories:   categoryList,
      priceRange:   String(raw.price || ''),
      imagesCount:  Number(raw.imagesCount || 0),
      additionalInfo: (raw.additionalInfo || raw?.normalized?.additionalInfo || {}) as Record<string, unknown>,
      mapDirections,
      gps,
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

      aboutStory: about.story,

      blogPosts: blogRaw.slice(0, 3).map((p: any) => ({
        title:    adaptTextByLocale(p.title || `${sector} en ${lead.city}`, locale),
        slug:     p.slug     || 'articulo',
        excerpt:  adaptTextByLocale(p.excerpt || `Artículo sobre ${sector}.`, locale),
        keywords: p.keywords || [],
      })),

      seoTitle: seo.metaTitle || `${businessName} | ${sector} en ${lead.city}`,
      seoDesc:  seo.metaDesc  || `${businessName} — servicios de ${sector} en ${lead.city}.`,
      contact,
      about,
      assets,
    };
  } catch (err) {
    console.error('[getLeadOverrides] Error:', err);
    return null;
  }
}
