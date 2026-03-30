// Sistema de internacionalización para ES-ES y ES-AR/UY

export type Locale = 'es-ES' | 'es-AR';
export type Country = 'ES' | 'AR' | 'UY';

export function getLocale(country: Country): Locale {
  return country === 'ES' ? 'es-ES' : 'es-AR';
}

export function getCurrency(country: Country): 'EUR' | 'USD' {
  return country === 'ES' ? 'EUR' : 'USD';
}

export function formatPrice(amount: number, country: Country): string {
  const currency = getCurrency(country);
  return currency === 'EUR' ? `${amount}€` : `$${amount}`;
}

// Traducciones comunes
const translations: Record<Locale, Record<string, string>> = {
  'es-ES': {
    // CTAs
    'cta.call': 'Llámanos',
    'cta.appointment': 'Pide cita',
    'cta.quote': 'Pide presupuesto',
    'cta.contact': 'Contáctanos',
    'cta.whatsapp': 'Escríbenos por WhatsApp',

    // Secciones
    'section.services': 'Nuestros Servicios',
    'section.about': 'Sobre Nosotros',
    'section.contact': 'Contacto',
    'section.blog': 'Blog',
    'section.testimonials': 'Lo que dicen nuestros clientes',

    // Oferta
    'offer.banner': 'Oferta especial',
    'offer.original': '60€/mes',
    'offer.price': '25€/mes',
    'offer.expires': 'Expira en',

    // Email
    'email.subject': '{name}, hemos creado vuestra web',
    'email.greeting': '¿Queréis ver vuestra web?',
    'email.review': 'Nos ayudaríais mucho con una reseña',
    'email.thanks': '¡Gracias por vuestra reseña!',

    // General
    'general.years': 'años de experiencia',
    'general.free_quote': 'Presupuesto gratuito',
    'general.emergency': 'Servicio de urgencias',
    'general.schedule': 'Horario de atención',
  },
  'es-AR': {
    // CTAs
    'cta.call': 'Llamá',
    'cta.appointment': 'Pedí tu turno',
    'cta.quote': 'Pedí presupuesto',
    'cta.contact': 'Contactanos',
    'cta.whatsapp': 'Escribinos por WhatsApp',

    // Secciones
    'section.services': 'Nuestros Servicios',
    'section.about': 'Sobre Nosotros',
    'section.contact': 'Contacto',
    'section.blog': 'Blog',
    'section.testimonials': 'Lo que dicen nuestros clientes',

    // Oferta
    'offer.banner': 'Oferta especial',
    'offer.original': '$60/mes',
    'offer.price': '$25/mes',
    'offer.expires': 'Expira en',

    // Email
    'email.subject': '{name}, creamos tu web',
    'email.greeting': '¿Querés ver tu web?',
    'email.review': 'Nos ayudarías mucho con una reseña',
    'email.thanks': '¡Gracias por tu reseña!',

    // General
    'general.years': 'años de experiencia',
    'general.free_quote': 'Presupuesto gratuito',
    'general.emergency': 'Servicio de urgencias',
    'general.schedule': 'Horario de atención',
  },
};

export function t(key: string, locale: Locale, vars?: Record<string, string>): string {
  let text = translations[locale]?.[key] || translations['es-ES']?.[key] || key;

  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }

  return text;
}

// Mapeo de sectores por país
export const sectorMap: Record<Country, Record<string, string>> = {
  ES: {
    fontanero: 'fontanero',
    electricista: 'electricista',
    peluqueria: 'peluquería',
    dentista: 'dentista',
    restaurante: 'restaurante',
    gimnasio: 'gimnasio',
    taller: 'taller mecánico',
    limpieza: 'empresa de limpieza',
    pintor: 'pintor',
    cerrajero: 'cerrajero',
  },
  AR: {
    fontanero: 'plomero',
    electricista: 'electricista',
    peluqueria: 'peluquería',
    dentista: 'dentista',
    restaurante: 'restaurante',
    gimnasio: 'gimnasio',
    taller: 'taller mecánico',
    limpieza: 'empresa de limpieza',
    pintor: 'pintor',
    cerrajero: 'cerrajero',
  },
  UY: {
    fontanero: 'plomero',
    electricista: 'electricista',
    peluqueria: 'peluquería',
    dentista: 'dentista',
    restaurante: 'restaurante',
    gimnasio: 'gimnasio',
    taller: 'taller mecánico',
    limpieza: 'empresa de limpieza',
    pintor: 'pintor',
    cerrajero: 'cerrajero',
  },
};

export function getLocalSector(sector: string, country: Country): string {
  return sectorMap[country]?.[sector] || sector;
}
