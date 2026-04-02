/**
 * TEMPLATE BARBERIA — The Noir Atelier Data Config
 *
 * All content, images, colors and text live here.
 * Change this file to generate a new site.
 */

export const business = {
  name: 'El Noir Atelier',
  tagline: 'Aseo de precisión para el caballero moderno',
  phone: '+44 20 7946 0123',
  phoneIntl: '+442079460123',
  whatsapp: '442079460123',
  email: 'hello@noir-atelier.com',
  address: '123 Heritage Lane, London EC1A 1BB',
  city: 'London',
  country: 'United Kingdom',
  legalName: 'El Noir Atelier Ltd.',
  foundedYear: 2024,
  established: 'MMXXIV',
};

export const nav = [
  { href: '/template-barberia', label: 'Inicio' },
  { href: '/template-barberia/servicios', label: 'Servicios' },
  { href: '/template-barberia/nosotros', label: 'Nosotros' },
  { href: '/template-barberia/blog', label: 'Journal' },
  { href: '/template-barberia/contacto', label: 'Contacto' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=80',
  haircut: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80',
  beard: 'https://images.unsplash.com/photo-1520633024148-9a8c5ef5d04a?auto=format&fit=crop&w=1200&q=80',
  ritual: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  shopInterior: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80',
  shopProducts: 'https://images.unsplash.com/photo-1598928877762-5eb5dd7de339?auto=format&fit=crop&w=1200&q=80',
  blogDestacado: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1520633024148-9a8c5ef5d04a?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1598928877762-5eb5dd7de339?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'Established MMXXIV',
  title: 'Precision Grooming para el',
  titleItalic: 'Caballero moderno',
  subtitle: 'Un santuario de artesanía y refinamiento en el corazón de Londres. Donde la técnica patrimonial se encuentra con la precisión contemporánea.',
  ctaPrimary: 'Reservar cita',
  ctaSecondary: 'Ver servicios',
};

export const services = [
  {
    num: '01',
    name: 'Signature Haircut',
    price: 'desde 45',
    desc: 'Un corte de precisión adaptado a la forma única de tu cabeza. Incluye una consulta exhaustiva, Wash y un estilo experto.',
    image: 'haircut',
    duration: '45 min',
  },
  {
    num: '02',
    name: 'Beard Sculpture',
    price: 'desde 30',
    desc: 'Preparación de toallas calientes, modelado meticuloso y un acabado de maquinilla de afeitar recta para una definición impecable.',
    image: 'beard',
    duration: '30 min',
  },
  {
    num: '03',
    name: 'El Noir Ritual',
    price: 'desde 110 €',
    desc: 'La mejor experiencia de taller: corte característico, escultura de barba, tratamiento facial y una bebida de reserva privada.',
    image: 'ritual',
    duration: '120 min',
  },
];

export const serviciosPage = {
  badge: 'La selección',
  title: 'Craft Without Compromise',
  intro: 'Cada servicio es un estudio en precisión. Combinamos la técnica tradicional con los mejores productos de boticario, asegurando que cada visita sea un ritual, no solo una cita.',
  timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
  process: [
    { num: '01', title: 'Consulta', desc: 'Comenzamos con una discusión detallada de su estilo de vida, preferencias y el resultado que imagina.' },
    { num: '02', title: 'Preparation', desc: 'Toallas calientes, aceites de pretratamiento de primera calidad y un momento de calma para comenzar el ritual correctamente.' },
    { num: '03', title: 'el Corte', desc: 'Técnica de nivel de maestría aplicada con enfoque absoluto. Cada línea intencional, cada ángulo considerado.' },
    { num: '04', title: 'Finish & Style', desc: 'Selección de productos curados aplicados a mano. Te vas luciendo y sintiéndote lo mejor posible.' },
  ],
  etiquette: [
    'Trate de llegar cinco minutos antes de su cita.',
    'Las llegadas tardías pueden resultar en un servicio acortado',
    '24-hora cancellation notice required',
    'Walk-ins welcome, subject to availability',
  ],
};

export const philosophy = [
  {
    num: '01',
    title: 'Master Artisans',
    desc: 'Todos los peluqueros de El Noir Atelier se han formado durante un mínimo de cinco años. No aceptamos ningún compromiso en la embarcación.',
  },
  {
    num: '02',
    title: 'Premium Apothecary',
    desc: 'Utilizamos solo productos naturales de aseo de lotes pequeños procedentes de boticarios tradicionales de toda Europa.',
  },
  {
    num: '03',
    title: "El Member's Lounge",
    desc: 'Malta curada, cafés especiales y un ambiente privado. Esperar se convierte en un placer.',
  },
];

export const testimonial = {
  quote: 'El Noir Atelier no es una barbería. Es un estándar. La precisión, el ambiente, la ceremonia, nada más en Londres se acerca.',
  author: 'Julian Thorne',
  role: 'Architect & Patron',
};

export const about = {
  badge: 'Est. MMXXIV — London',
  heroTitle: 'A Heritage of Precision.',
  heroSubtitle: 'Fundada en la creencia de que un caballero merece más que un corte de pelo. El Noir Atelier se construyó como un santuario, un espacio donde coexisten la artesanía, la cultura y el refinamiento silencioso.',
  studioNote: 'Nuestro estudio en Heritage Lane fue diseñado con un solo principio: cada superficie, cada detalle, cada interacción debe comunicar maestría.',
  barbers: [
    {
      name: 'James Whitmore',
      role: 'Jefe de peluquería y fundador',
      bio: 'Formado en Londres y Sevilla, James aporta dos décadas de artesanía a cada silla. Fundó El Noir Atelier con la convicción de que el aseo es un acto de autoestima.',
      speciality: 'Classic Cuts, Straight Razor',
    },
    {
      name: 'Marcus Osei',
      role: 'Senior Barber',
      bio: 'Marcus es conocido por su enfoque escultórico del trabajo con la barba. Su precisión con una hoja recta le ha ganado seguidores devotos en todo Londres.',
      speciality: 'Beard Sculpture, Fades',
    },
    {
      name: 'Daniel Holt',
      role: 'Barber & Skincare Specialist',
      bio: 'Daniel integra la experiencia en el cuidado de la piel en cada cita, asegurando que el ritual se extienda más allá de la silla y en una filosofía completa de aseo personal.',
      speciality: 'Facial Treatments, Skin',
    },
  ],
  values: [
    { num: '01', title: 'La artesanía', desc: 'Técnica transmitida a través del aprendizaje. Honramos las viejas costumbres al tiempo que abrazamos lo que la precisión exige hoy en día.' },
    { num: '02', title: 'El Material', desc: 'Solo los productos naturales y de origen ético tocan tu piel. Creemos que lo que usas importa tanto como la forma en que se aplica.' },
    { num: '03', title: 'El Espacio', desc: 'Un ambiente tranquilo y sin prisas. Tu cita es tuya. Sin prisas, sin interrupciones, sin compromisos.' },
  ],
  cta: {
    title: 'Comienza la experiencia.',
    desc: 'Reserva tu sesión y conoce al equipo. Una sola visita habla más que cualquier descripción.',
  },
};

export const contacto = {
  badge: 'Reservar',
  title: 'Reserva tu sesión',
  subtitle: 'Las citas limitadas garantizan que cada cliente reciba toda nuestra atención. Reserva con antelación para asegurarte la hora que prefieras.',
  formTitle: 'Solicitar una Cita',
  formSubtitle: 'Un miembro de nuestro equipo confirmará tu reserva en un plazo de 24 horas.',
  serviceOptions: ['Signature Haircut', 'Beard Sculpture', 'El Noir Ritual', 'Consulta'],
  schedule: 'Martes — Sábado / 09:00 — 19:00',
  responseTime: '24 Horario',
  appointmentNote: 'Citas limitadas disponibles cada semana',
};

export const blogPosts = [
  {
    slug: 'the-anatomy-of-a-perfect-fade',
    title: 'El Anatomy of a Perfect Fade.',
    category: 'Technique',
    readTime: '8 min',
    excerpt: 'Desglosando la mecánica detrás de un fundido impecable, desde la selección de guardias hasta la técnica de mezcla y el acabado final a mano.',
    featured: true,
    image: 'blogDestacado',
  },
  {
    slug: 'straight-razor-care-guide',
    title: 'El Straight Razor: A Cuidado Manual.',
    category: 'Technique',
    readTime: '6 min',
    excerpt: 'Cómo afilar, afilar y mantener una maquinilla de afeitar recta para que funcione con precisión durante décadas.',
    featured: false,
    image: 'blog1',
  },
  {
    slug: 'shaping-the-modern-beard',
    title: 'Dando forma a la barba moderna.',
    category: 'Beard',
    readTime: '7 min',
    excerpt: 'Una guía para comprender la geometría de la barba: escotes, líneas de las mejillas y cómo adaptar la forma a la estructura de la cara.',
    featured: false,
    image: 'blog2',
  },
  {
    slug: 'the-honest-guide-to-hair-products',
    title: 'Una guía honesta de productos para el cabello.',
    category: 'Style',
    readTime: '9 min',
    excerpt: 'Arcilla, pomada, cera, pasta: eliminamos el ruido y explicamos lo que realmente le hace cada producto a tu cabello.',
    featured: false,
    image: 'blog3',
  },
  {
    slug: 'the-barbershop-as-cultural-space',
    title: 'La Barbería como Espacio Cultural.',
    category: 'Culture',
    readTime: '11 min',
    excerpt: 'Desde la antigua Roma hasta el East End: trazar la barbería como una constante en la vida social masculina a lo largo de los siglos.',
    featured: false,
    image: 'blog4',
  },
];
