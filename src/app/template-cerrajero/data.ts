/**
 * TEMPLATE CERRAJERO — Data Config
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imágenes, colores y texto salen de aquí.
 */

export const business = {
  name: 'THE SENTINEL',
  fullName: 'The Sentinel Guard Cerrajero',
  tagline: 'Cerrajero Urgente 24h — Madrid',
  phone: '600 000 000',
  phoneIntl: '+34600000000',
  whatsapp: '34600000000',
  email: 'urgencias@thesentinelguard.es',
  address: 'Polígono Industrial Sur, Nave 8, 28041 Madrid',
  city: 'Madrid',
  country: 'España',
  legalName: 'The Sentinel Guard S.L.',
  foundedYear: 2015,
  responseTime: '20 minutos',
};

export const nav = [
  { href: '/template-cerrajero', label: 'Home', icon: 'home' },
  { href: '/template-cerrajero/servicios', label: 'Servicios', icon: 'lock' },
  { href: '/template-cerrajero/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-cerrajero/blog', label: 'Blog', icon: 'article' },
  { href: '/template-cerrajero/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroLock: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1600&q=80',
  lockDetail: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1200&q=80',
  techWorking: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
  securityDoor: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80',
  blogFeatured: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'Cerrajero 24h Madrid',
  title: 'Cerrajero urgente en Madrid 24 horas',
  titleHighlight: 'Madrid',
  subtitle: 'Apertura de puertas sin daños, cambio de cerraduras y cerrajería de urgencias. Tiempo de respuesta garantizado: 20 minutos en toda la capital.',
  ctaPrimary: 'ABRIR PUERTA AHORA',
  ctaSecondary: '600 000 000',
  trustBadges: [
    { icon: 'schedule', label: 'Servicio 24h' },
    { icon: 'verified_user', label: 'Profesional Certificado' },
    { icon: 'security', label: 'Con Seguro' },
  ],
  statCard: {
    value: '20 min',
    label: 'Tiempo de respuesta',
  },
};

export const services = [
  {
    id: 'apertura',
    name: 'Apertura Sin Daños',
    desc: 'Abrimos su puerta sin dañar la cerradura ni el marco. Técnica de precisión profesional con herramienta especializada.',
    icon: 'lock_open',
    urgent: true,
  },
  {
    id: 'cambio',
    name: 'Cambio de Cerraduras',
    desc: 'Instalación de cerraduras de alta seguridad. Asesoramiento personalizado según el nivel de protección requerido.',
    icon: 'lock',
    urgent: false,
  },
  {
    id: 'cierres',
    name: 'Cierres de Locales',
    desc: 'Soluciones de seguridad para locales comerciales. Sistemas anti-robo y cierres metálicos de alta resistencia.',
    icon: 'store',
    urgent: false,
  },
  {
    id: 'antibumping',
    name: 'Cerraduras Anti-Bumping',
    desc: 'Protección total contra técnicas de apertura ilegales. Cerraduras de cilindro europeo con patente registrada.',
    icon: 'shield',
    urgent: false,
  },
  {
    id: 'cajas',
    name: 'Cajas Fuertes',
    desc: 'Apertura de emergencia, cambio de combinación e instalación de cajas fuertes empotradas y de sobremesa.',
    icon: 'inventory_2',
    urgent: false,
  },
];

export const stats = [
  { value: '20 min', label: 'Respuesta media' },
  { value: 'Garantía', label: 'Por escrito' },
  { value: 'Factura', label: 'Oficial' },
  { value: 'ISO 9001', label: 'Certificado' },
];

export const trustBadges = [
  { label: 'Servicio 24h', icon: 'schedule' },
  { label: 'Profesional Certificado', icon: 'verified_user' },
  { label: 'Con Seguro', icon: 'security' },
];

export const credentials = [
  { label: 'ISO 9001' },
  { label: 'TRUSTED PRO' },
  { label: 'SECURITY FIRST' },
];

export const testimonials = [
  {
    name: 'Carlos Fuentes',
    role: 'Propietario, Madrid Centro',
    text: 'Llegaron en menos de 20 minutos a las 2 de la madrugada. Abrieron sin dañar la puerta y me cambiaron la cerradura al momento. Servicio impecable.',
    rating: 5,
  },
  {
    name: 'Laura Sánchez',
    role: 'Directora de Local Comercial',
    text: 'The Sentinel Guard lleva encargándose de la seguridad de mi local desde hace tres años. Profesionales, puntuales y con garantía escrita en todo lo que hacen.',
    rating: 5,
  },
  {
    name: 'Miguel Torres',
    role: 'Administrador de Fincas',
    text: 'Los tengo como proveedor de referencia para todos mis edificios. Respuesta ultrarrápida, precio justo y factura oficial. Totalmente recomendables.',
    rating: 5,
  },
];

export const serviciosPage = {
  badge: 'Cerrajería Profesional',
  title: 'Servicios de Cerrajería',
  intro: 'Más de 10 años de experiencia en apertura de puertas, cambio de cerraduras y sistemas de seguridad en Madrid. Disponibilidad 24 horas, 365 días al año.',
  items: [
    {
      num: '01',
      name: 'Apertura Sin Daños',
      desc: 'Servicio de apertura de puertas de urgencia sin daños en la cerradura ni en el marco. Utilizamos técnicas profesionales de decodificación y herramientas de precisión que garantizan la integridad total de la puerta.',
      tags: ['Urgencias 24h', 'Sin Daños', 'Resultado Garantizado'],
      image: 'techWorking',
    },
    {
      num: '02',
      name: 'Cambio de Cerraduras',
      desc: 'Instalación de cerraduras de última generación. Trabajamos con las mejores marcas del mercado: TESA, LINCE, ABUS. Asesoramiento gratuito para elegir el nivel de seguridad adecuado a su vivienda o local.',
      tags: ['Alta Seguridad', 'Todas las Marcas', 'Garantía 2 Años'],
      image: 'lockDetail',
    },
    {
      num: '03',
      name: 'Cierres de Locales',
      desc: 'Instalación y reparación de cierres metálicos para locales comerciales. Sistemas de seguridad perimetral con alarma integrada y cerradura multipunto de alta resistencia.',
      tags: ['Locales Comerciales', 'Multipunto', 'Alarma Integrada'],
      image: 'securityDoor',
    },
    {
      num: '04',
      name: 'Cerraduras Anti-Bumping',
      desc: 'Protección contra todas las técnicas de apertura ilegales: bumping, ganzuado, taladro. Cilindros de seguridad con llave de patente registrada y combinación de pines de alta seguridad.',
      tags: ['Anti-Bumping', 'Anti-Ganzúa', 'Llave Patentada'],
      image: 'lockDetail',
    },
    {
      num: '05',
      name: 'Cajas Fuertes',
      desc: 'Apertura de emergencia cuando ha olvidado la combinación. Cambio de combinación y código de acceso. Instalación de cajas fuertes empotradas y de sobremesa con certificación UL.',
      tags: ['Apertura Urgente', 'Cambio Combinación', 'Instalación'],
      image: 'techWorking',
    },
  ],
  pricing: [
    {
      tier: 'Básico',
      price: 'Desde 45€',
      desc: 'Apertura estándar en horario normal',
      features: ['Apertura sin daños', 'Diagnóstico gratuito', 'Factura oficial'],
    },
    {
      tier: 'Urgente',
      price: 'Desde 75€',
      desc: 'Servicio 24h incluyendo noches y festivos',
      features: ['Disponible 24/7', 'Respuesta 20 min', 'Garantía escrita', 'Sin cargos ocultos'],
      featured: true,
    },
    {
      tier: 'Integral',
      price: 'Consultar',
      desc: 'Apertura + cambio de cerradura incluido',
      features: ['Todo incluido', 'Cerradura premium', 'Garantía 2 años', 'Mantenimiento'],
    },
  ],
  process: [
    { step: '01', title: 'Llama Ahora', desc: 'Contacta por teléfono o WhatsApp. Te atendemos al instante las 24 horas.' },
    { step: '02', title: 'Presupuesto Claro', desc: 'Te damos precio cerrado antes de ir. Sin sorpresas ni cargos ocultos.' },
    { step: '03', title: 'Llegada en 20 min', desc: 'Nuestro técnico llega en un máximo de 20 minutos en Madrid capital.' },
    { step: '04', title: 'Trabajo Garantizado', desc: 'Entregamos garantía escrita de todos nuestros trabajos y emitimos factura oficial.' },
  ],
};

export const nosotrosPage = {
  badge: 'Desde 2015 en Madrid',
  title: 'Profesionales de la seguridad a tu servicio',
  subtitle: 'The Sentinel Guard nació con una misión clara: ofrecer el servicio de cerrajería más rápido y fiable de Madrid, con la transparencia y profesionalidad que los madrileños merecen.',
  story: [
    'En 2015, fundamos The Sentinel Guard con una premisa sencilla: no dejar a nadie tirado ante una urgencia de cerrajería. Demasiados madrileños sufrían esperas de horas, presupuestos opacos y trabajos sin garantía.',
    'Hoy somos el servicio de cerrajería de referencia en Madrid con más de 5.000 intervenciones realizadas. Nuestro equipo de técnicos certificados cubre toda la capital en un tiempo de respuesta garantizado de 20 minutos.',
  ],
  values: [
    {
      num: '01',
      title: 'Rapidez',
      desc: 'Entendemos que una urgencia de cerrajería no puede esperar. Por eso garantizamos 20 minutos de respuesta en toda Madrid capital, las 24 horas del día.',
      icon: 'speed',
    },
    {
      num: '02',
      title: 'Profesionalidad',
      desc: 'Todos nuestros técnicos tienen carnet de empresa de seguridad y formación continua. Trabajamos con herramienta profesional y materiales de primera calidad.',
      icon: 'verified_user',
    },
    {
      num: '03',
      title: 'Garantia',
      desc: 'Emitimos garantía escrita en todos nuestros trabajos y factura oficial. Precio cerrado antes de empezar, sin cargos ocultos ni sorpresas al final.',
      icon: 'workspace_premium',
    },
  ],
  expertise: [
    { label: 'Intervenciones realizadas', value: '5.000+' },
    { label: 'Años de experiencia', value: '10+' },
    { label: 'Técnicos certificados', value: '12' },
    { label: 'Tiempo de respuesta', value: '20 min' },
  ],
  cta: {
    title: 'Necesitas un cerrajero de urgencia?',
    desc: 'Llama ahora y un técnico certificado estará en tu puerta en 20 minutos.',
  },
};

export const contacto = {
  badge: 'Contacto 24h',
  title: 'Llamar Ahora',
  subtitle: 'Disponibles las 24 horas, 365 días al año. Respuesta garantizada en 20 minutos en Madrid capital.',
  formTitle: 'Solicitar Presupuesto',
  formSubtitle: 'Para urgencias llama directamente. Para presupuestos o consultas usa este formulario.',
  serviceOptions: ['Apertura Urgente', 'Cambio Cerradura', 'Cierre Local', 'Caja Fuerte', 'Consulta'],
  schedule: 'Servicio 24h / 365 días al año',
  responseTime: '20 Minutos',
};

export const blogPosts = [
  {
    slug: 'tipos-cerraduras-seguridad-hogar',
    title: 'Guía completa: tipos de cerraduras de seguridad para el hogar.',
    category: 'Seguridad',
    readTime: '8 min',
    excerpt: 'Conoce las diferencias entre cerraduras de seguridad, multipunto y antibumping. Te ayudamos a elegir la protección adecuada para tu vivienda.',
    featured: true,
  },
  {
    slug: 'que-hacer-cuando-te-quedas-fuera',
    title: 'Qué hacer cuando te quedas fuera de casa de madrugada.',
    category: 'Emergencias',
    readTime: '5 min',
    excerpt: 'Pasos que debes seguir en una situación de urgencia de cerrajería para resolver el problema de forma rápida y segura.',
    featured: false,
  },
  {
    slug: 'cerraduras-antibumping-vale-la-pena',
    title: 'Cerraduras anti-bumping: por qué son imprescindibles en 2025.',
    category: 'Seguridad',
    readTime: '6 min',
    excerpt: 'El bumping es la técnica de apertura ilegal más usada en España. Descubre cómo protegerte con una cerradura de cilindro de alta seguridad.',
    featured: false,
  },
  {
    slug: 'mantenimiento-cerraduras-consejos',
    title: 'Mantenimiento de cerraduras: 5 consejos para que duren años.',
    category: 'Mantenimiento',
    readTime: '4 min',
    excerpt: 'Pequeños cuidados que prolongan la vida útil de tus cerraduras y evitan averías en el peor momento.',
    featured: false,
  },
  {
    slug: 'como-elegir-cerrojo-puerta-blindada',
    title: 'Cómo elegir el cerrojo correcto para tu puerta blindada.',
    category: 'Instalación',
    readTime: '7 min',
    excerpt: 'No todas las cerraduras son compatibles con puertas blindadas. Te explicamos qué buscar para maximizar la seguridad de tu hogar.',
    featured: false,
  },
];
