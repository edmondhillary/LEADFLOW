/**
 * TEMPLATE PINTOR — Data Config (The Architectural Canvas)
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imágenes, colores y texto salen de aquí.
 */

export const business = {
  name: 'The Architectural Canvas',
  tagline: 'Acabados Arquitectónicos Premium',
  phone: '900 000 000',
  phoneIntl: '+34900000000',
  whatsapp: '34000000000',
  email: 'proyectos@archcanvas.es',
  address: 'Calle de la Estética, 24',
  postalCode: '28001',
  city: 'Madrid',
  country: 'España',
  legalName: 'ARCHITECTURAL CANVAS S.L.',
  foundedYear: 2010,
  yearsExperience: 14,
};

export const nav = [
  { href: '/template-pintor', label: 'Home', icon: 'home' },
  { href: '/template-pintor/servicios', label: 'Servicios', icon: 'format_paint' },
  { href: '/template-pintor/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-pintor/blog', label: 'Blog', icon: 'article' },
  { href: '/template-pintor/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=1600&q=80',
  finish1: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
  finish2: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
  finish3: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  paintSwatch: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?auto=format&fit=crop&w=800&q=80',
  interior1: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  exterior1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  exterior2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  deco1: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
  aboutHero: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=1600&q=80',
  aboutFounder: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  aboutTeam: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  blogFeatured: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  contactPainter: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  og: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=1200&h=630&q=80',
};

export const hero = {
  badge: 'Artesanía en cada trazo',
  title: 'Transformamos tus espacios con',
  titleAccent: 'precisión',
  subtitle: 'Elevamos la estética de su hogar u oficina mediante técnicas de acabado superiores y una curaduría de materiales de alta gama.',
  ctaPrimary: 'Solicitar Presupuesto Gratis',
  ctaSecondary: 'Ver Portafolio',
};

export const finishes = [
  { name: 'Estuco Veneciano Moderno', desc: 'Textura marmórea con reflejos de luz natural.', size: 'large' },
  { name: 'Acabados Satinados', desc: 'Resistencia y elegancia para zonas de alto tráfico.', size: 'medium' },
  { name: 'Precisión Técnica', desc: 'Aplicación controlada con materiales premium.', size: 'medium' },
];

export const services = [
  { icon: 'format_paint', name: 'Pintura Interior', desc: 'Creamos ambientes que respiran. Desde salones majestuosos hasta dormitorios serenos, aplicamos técnicas que maximizan la luz natural.', features: ['Salones y áreas sociales', 'Dormitorios y suites', 'Tratamiento de techos y molduras'] },
  { icon: 'house', name: 'Pintura Exterior', desc: 'Revestimientos impermeables de alta resistencia para proteger la estructura frente al clima extremo. Fachadas, terrazas y elementos metálicos.', features: ['Fachadas residenciales', 'Resistencia UV certificada', 'Terrazas y decking'] },
  { icon: 'brush', name: 'Decoración y Acabados', desc: 'Más allá del color plano. Integramos texturas y patrones que definen el carácter único de cada habitación.', features: ['Estuco veneciano', 'Papel pintado premium', 'Efectos decorativos'] },
  { icon: 'shield', name: 'Tratamientos Especiales', desc: 'Protección anticorrosiva, barnizado de maderas, lacado de superficies y tratamientos ignífugos para proyectos especializados.', features: ['Barnizado y lacado', 'Anticorrosión', 'Tratamientos ignífugos'] },
];

export const serviciosPage = {
  badge: 'Crafting Atmosphere',
  title: 'Nuestros',
  titleAccent: 'Servicios',
  subtitle: 'Transformamos espacios a través del color y la textura, elevando la arquitectura de su hogar con precisión artesanal.',
};

export const trust = [
  { icon: 'check_circle', title: 'Asesoría cromática personalizada' },
  { icon: 'check_circle', title: 'Materiales eco-amigables de bajo olor' },
  { icon: 'check_circle', title: 'Protección total de mobiliario y suelos' },
];

export const testimonials = [
  { name: 'Laura Fernández', role: 'Propietaria', text: 'El equipo transformó nuestro salón con un acabado veneciano que parece sacado de una revista. Profesionalismo absoluto y limpieza impecable.', rating: 5 },
  { name: 'Miguel Torres', role: 'Arquitecto de Interiores', text: 'Colaboramos regularmente con Architectural Canvas. Su dominio de las técnicas decorativas y la precisión en los acabados es sobresaliente.', rating: 5 },
];

export const about = {
  badge: 'Est. 2010 — Madrid',
  heroTitle: 'Definiendo el estándar en acabados arquitectónicos.',
  heroSubtitle: 'Nacimos de la convicción de que pintar no es solo aplicar color, sino definir espacio, luz y textura.',
  founder: {
    name: 'Pablo Méndez',
    role: 'Director Técnico',
    bio: [
      'Con más de 14 años especializándose en acabados de alta gama, Pablo ha liderado proyectos para residencias de lujo, hoteles boutique y espacios comerciales emblemáticos en toda España.',
      'Cada pared es un lienzo. Mi trabajo no termina cuando la pintura seca, termina cuando el cliente ve su espacio y entiende que ha cambiado la forma en que vive.',
    ],
    stats: [
      { value: '14+', label: 'Años de Experiencia' },
      { value: '800+', label: 'Proyectos Completados' },
      { value: '100%', label: 'Satisfacción Garantizada' },
    ],
  },
  values: [
    { num: '01', title: 'Preparación Meticulosa', desc: 'El 60% de un buen acabado está en la preparación. Lijado, imprimación y protección antes de aplicar una sola gota de pintura.' },
    { num: '02', title: 'Materiales Premium', desc: 'Solo trabajamos con pinturas ecológicas de bajo VOC, pigmentos minerales y acabados de grado arquitectónico.' },
    { num: '03', title: 'Inspección Final', desc: 'Cada proyecto incluye una inspección técnica post-aplicación para garantizar que el sellado y la pigmentación cumplan con nuestros estándares.' },
  ],
  cta: {
    title: '¿Listo para renovar su espacio?',
    desc: 'Obtenga una cotización detallada sin compromiso. Calidad garantizada en cada m².',
  },
};

export const contacto = {
  badge: 'Contacto Profesional',
  title: 'Pide tu presupuesto sin compromiso',
  subtitle: 'Nuestro equipo está disponible para evaluar tu proyecto y ofrecerte una propuesta detallada.',
  serviceOptions: ['Pintura Interior', 'Fachadas y Exterior', 'Pintura Decorativa', 'Barnizado y Lacado', 'Industrial / Oficinas'],
  schedule: 'Lunes a Viernes / 8:00 a 18:00',
  responseTime: '24 Horas',
};

export const blogPosts = [
  {
    slug: 'tendencias-color-2026',
    title: 'Tendencias de color 2026: los tonos que definirán tu hogar.',
    category: 'Color & Diseño',
    readTime: '8 min',
    excerpt: 'Exploramos la paleta del año y cómo aplicar estos colores para transformar cada estancia.',
    featured: true,
  },
  {
    slug: 'preparacion-paredes',
    title: 'La preparación perfecta: por qué es el 60% del trabajo.',
    category: 'Técnica',
    readTime: '6 min',
    excerpt: 'Lijado, imprimación y sellado. Los pasos invisibles que garantizan un acabado de revista.',
    featured: false,
  },
  {
    slug: 'pintura-ecologica',
    title: 'Pinturas ecológicas: salud y rendimiento sin compromiso.',
    category: 'Materiales',
    readTime: '10 min',
    excerpt: 'Por qué las pinturas de bajo VOC no solo son mejores para la salud sino también para el acabado final.',
    featured: false,
  },
  {
    slug: 'estuco-veneciano-guia',
    title: 'Estuco veneciano: guía completa del acabado más exclusivo.',
    category: 'Decoración',
    readTime: '12 min',
    excerpt: 'Historia, técnica de aplicación y mantenimiento del acabado marmóreo más demandado.',
    featured: false,
  },
];
