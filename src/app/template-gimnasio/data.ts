/**
 * TEMPLATE GIMNASIO — Data Config (Kinetic Brutalism)
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imágenes, colores y texto salen de aquí.
 */

export const business = {
  name: 'KINETIC',
  tagline: 'Elite Performance Center',
  phone: '900 000 000',
  phoneIntl: '+34900000000',
  whatsapp: '34000000000',
  email: 'info@kineticgym.com',
  address: 'Avenida del Deporte, 100, Planta 1',
  postalCode: '28001',
  city: 'Madrid',
  country: 'España',
  legalName: 'KINETIC FITNESS S.L.',
  foundedYear: 2010,
  yearsExperience: 14,
};

export const nav = [
  { href: '/template-gimnasio', label: 'Inicio', icon: 'home' },
  { href: '/template-gimnasio/servicios', label: 'Servicios', icon: 'fitness_center' },
  { href: '/template-gimnasio/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-gimnasio/blog', label: 'Blog', icon: 'article' },
  { href: '/template-gimnasio/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  heroAthlete: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
  performance: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80',
  crossfit: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
  boxing: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
  hiit: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  coreBlast: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  serviciosHero: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
  serviciosData: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  serviciosCoach: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  serviciosBoxing: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
  aboutHero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  aboutFounder: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  aboutTeam: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80',
  blogDestacado: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  ctaBg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
  og: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&h=630&q=80',
};

export const hero = {
  badge: 'Elite Performance Center',
  title: 'SUPERA TUS',
  titleAccent: 'LÍMITES',
  subtitle: 'Entrena en la meca del alto rendimiento. Tecnología de vanguardia, coaches de élite y una comunidad que no conoce el descanso.',
  ctaPrimary: 'COMIENZA TU PRUEBA GRATIS',
  ctaSecondary: 'VER INSTALACIONES',
  stats: [
    { value: '24/7', label: 'Acceso Total' },
    { value: '+500', label: 'Equipos Elite' },
    { value: '50+', label: 'Clases Semanales' },
  ],
};

export const services = [
  { icon: 'fitness_center', name: 'Sala de Pesas', desc: 'Más de 500 equipos de última generación para entrenamiento de fuerza e hipertrofia.', urgent: false },
  { icon: 'sprint', name: 'CrossFit', desc: 'WODs diseñados para llevar tu resistencia cardiovascular y fuerza al límite absoluto.', urgent: false },
  { icon: 'sports_mma', name: 'Combat Arts', desc: 'Técnica de combate real combinada con acondicionamiento físico de élite.', urgent: false },
  { icon: 'self_improvement', name: 'Yoga & Recovery', desc: 'Recuperación activa y movilidad. El equilibrio necesario para la longevidad del atleta.', urgent: false },
];

export const plans = [
  {
    name: 'Básico',
    price: '29',
    featured: false,
    features: ['Acceso a sala de pesas', 'Vestidores y duchas', 'App de seguimiento'],
    missing: ['Clases grupales'],
  },
  {
    name: 'Pro',
    price: '59',
    featured: true,
    features: ['Todo lo del plan Básico', 'Clases grupales ilimitadas', 'Plan nutricional mensual', 'Acceso a Sauna & Recovery'],
    missing: [],
  },
  {
    name: 'Élite',
    price: '99',
    featured: false,
    features: ['Todo lo del plan Pro', 'Personal Trainer (4 sesiones)', 'Área VIP & Parking'],
    missing: [],
  },
];

export const classes = [
  { name: 'Powerlifting', schedule: 'Martes & Jueves', size: 'large' },
  { name: 'Combat Arts', schedule: 'Lunes a Viernes', size: 'medium' },
  { name: 'Core Blast', schedule: 'Diario', size: 'small' },
  { name: 'Zen Recovery', schedule: 'Miércoles & Sábado', size: 'small' },
];

export const serviciosPage = {
  title: 'PODER',
  titleAccent: 'REDEFINIDO',
  subtitle: 'No somos un gimnasio convencional. Somos un laboratorio de rendimiento humano diseñado para aquellos que exigen lo extraordinario.',
  personalTraining: {
    title: 'Entrenamiento Personal',
    subtitle: 'Ingeniería de resultados aplicada a tu biotipo único.',
    mainFeature: {
      title: 'Metodología Basada en Datos',
      desc: 'Cada sesión es monitoreada con tecnología de punta para asegurar un progreso lineal y evitar mesetas. No entrenamos por instinto, entrenamos por evidencia.',
    },
    stats: { value: '1:1', label: 'Exclusividad Total', desc: 'Privacidad absoluta en tu zona de entrenamiento. Sin distracciones.' },
    nutrition: { title: 'Plan Nutricional', desc: 'Optimización metabólica personalizada para potenciar el rendimiento físico y la recuperación.' },
    coach: { name: 'Marcus Rivera', role: 'Especialista en Biomecánica y Alto Rendimiento' },
  },
  groupClasses: {
    title: 'Energía Colectiva',
    items: [
      { name: 'CrossFit', tag: 'Intenso', desc: 'WODs diseñados para llevar tu resistencia cardiovascular y fuerza al límite absoluto.' },
      { name: 'HIIT', icon: 'timer', desc: 'Quema calórica máxima en ráfagas de explosividad pura. Eficiencia radical.' },
      { name: 'Yoga', icon: 'self_improvement', desc: 'Recuperación activa y movilidad. El equilibrio necesario para la longevidad del atleta.' },
      { name: 'Boxing', desc: 'Técnica de combate real combinada con un acondicionamiento físico de élite.', features: ['Técnica de Golpeo', 'Agilidad Mental', 'Sparring Controlado'] },
    ],
  },
};

export const trust = [
  { icon: 'bolt', title: 'Entrenamiento de alta intensidad', desc: 'Protocolos científicos diseñados para maximizar resultados en el mínimo tiempo.' },
  { icon: 'monitoring', title: 'Bio-seguimiento avanzado', desc: 'Tecnología wearable integrada para monitorizar cada aspecto de tu rendimiento.' },
  { icon: 'restaurant', title: 'Nutrición de precisión', desc: 'Planes alimenticios personalizados alineados con tus objetivos de composición corporal.' },
];

export const testimonials = [
  { name: 'Alejandro Ruiz', role: 'Atleta Semi-Pro', text: 'KINETIC cambió completamente mi enfoque del entrenamiento. La metodología basada en datos me llevó a superar mis récords personales en solo 3 meses.', rating: 5 },
  { name: 'Sara López', role: 'Empresaria', text: 'No es solo un gimnasio, es una experiencia. El equipo de coaches, las instalaciones y la comunidad hacen que cada sesión sea brutal y transformadora.', rating: 5 },
];

export const about = {
  badge: 'Est. 2010 — Madrid',
  heroTitle: 'Construyendo la próxima generación de atletas.',
  heroSubtitle: 'KINETIC nació de la convicción de que el fitness debe ser una ciencia, no una moda. Creamos un espacio donde la disciplina se encuentra con la tecnología.',
  founder: {
    name: 'Carlos Vega',
    role: 'Fundador & Head Coach',
    bio: [
      'Con más de 14 años en el mundo del fitness de alto rendimiento, Carlos fundó KINETIC con una visión clara: democratizar el acceso a metodologías de entrenamiento que antes solo estaban disponibles para atletas profesionales.',
      'No creo en entrenamientos genéricos. Cada cuerpo es un sistema único que requiere un protocolo específico. Mi rol es decodificar ese sistema y optimizarlo al máximo.',
    ],
    stats: [
      { value: '14+', label: 'Años de Experiencia' },
      { value: '500+', label: 'Socios Activos' },
      { value: '50+', label: 'Clases Semanales' },
    ],
  },
  values: [
    { num: '01', title: 'Ciencia del Movimiento', desc: 'Cada programa está respaldado por evidencia científica. No seguimos tendencias, seguimos resultados.' },
    { num: '02', title: 'Comunidad Brutal', desc: 'Un ambiente donde la mediocridad no tiene cabida. Rodeate de personas que elevan tu estándar.' },
    { num: '03', title: 'Evolución Constante', desc: 'Actualizamos equipos, metodologías y formación continuamente. Lo que funcionaba ayer no es suficiente hoy.' },
  ],
  expertise: [
    { icon: 'fitness_center', title: 'Fuerza & Potencia', desc: 'Powerlifting, hipertrofia y rendimiento atlético.' },
    { icon: 'sprint', title: 'Condicionamiento', desc: 'CrossFit, HIIT y entrenamiento funcional.' },
    { icon: 'sports_mma', title: 'Artes de Combate', desc: 'Boxing, MMA y defensa personal.' },
    { icon: 'self_improvement', title: 'Recuperación', desc: 'Yoga, movilidad y regeneración.' },
  ],
  cta: {
    title: 'TU PRIMERA SESIÓN ES GRATIS.',
    desc: 'Ven, conoce las instalaciones, entrena con nosotros y decide si KINETIC es tu lugar. Sin presión, solo resultados.',
  },
};

export const contacto = {
  badge: 'Inscripción',
  title: 'ÚNETE A LA REVOLUCIÓN',
  titleAccent: 'KINETIC',
  subtitle: 'Completa tu registro y toma el control de tu evolución física.',
  serviceOptions: ['Plan Elite - Acceso Total', 'Plan Pro - Entrenamiento Guiado', 'Plan Basic - Acceso Gym'],
  schedule: '24 Horas / 7 Días',
  responseTime: 'Inmediata',
};

export const blogPosts = [
  {
    slug: 'periodizacion-entrenamiento',
    title: 'Periodización del entrenamiento: la clave del progreso.',
    category: 'Rendimiento',
    readTime: '8 min',
    excerpt: 'Por qué entrenar más duro no siempre es la respuesta. La ciencia detrás de los ciclos de volumen e intensidad.',
    featured: true,
  },
  {
    slug: 'nutricion-alto-rendimiento',
    title: 'Nutrición para alto rendimiento: más allá de las calorías.',
    category: 'Nutrición',
    readTime: '12 min',
    excerpt: 'Timing de macros, suplementación basada en evidencia y estrategias de recuperación metabólica.',
    featured: false,
  },
  {
    slug: 'prevencion-lesiones',
    title: 'Prevención de lesiones: movilidad como inversión.',
    category: 'Recuperación',
    readTime: '6 min',
    excerpt: 'El calentamiento que haces está mal. Protocolos de movilidad que realmente previenen lesiones.',
    featured: false,
  },
  {
    slug: 'fuerza-mental-entrenamiento',
    title: 'La fuerza mental: el músculo que nadie entrena.',
    category: 'Mentalidad',
    readTime: '10 min',
    excerpt: 'Visualización, tolerancia al dolor y disciplina. Las herramientas psicológicas del atleta de élite.',
    featured: false,
  },
];
