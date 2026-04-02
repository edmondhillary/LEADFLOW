/**
 * TEMPLATE ACADEMIA — Data Config
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imagenes, colores y texto salen de aqui.
 */

export const business = {
  name: 'Scholarly Academy',
  tagline: 'La Academia Digital del Futuro',
  phone: '900 000 200',
  phoneIntl: '+34 900 000 200',
  whatsapp: '34900000200',
  email: 'hola@scholarlyacademy.es',
  address: 'Calle de la Innovacion, 88',
  postalCode: '28014',
  city: 'Madrid',
  country: 'Espana',
  legalName: 'Scholarly Academy S.L.',
  foundedYear: 2020,
  students: '50.000+',
  jobPlacementRate: '94%',
  mentors: '120+',
  avgRating: '4.9/5',
};

export const nav = [
  { href: '/template-academia', label: 'Inicio', icon: 'home' },
  { href: '/template-academia/servicios', label: 'Servicios', icon: 'school' },
  { href: '/template-academia/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-academia/blog', label: 'Blog', icon: 'article' },
  { href: '/template-academia/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
  uxuiCourse: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  webdevCourse: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  marketingCourse: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  dataCourse: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  studentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  testimonialAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  blogDestacado: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  og: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=630&q=80',
};

export const hero = {
  badge: 'Plataforma Academica N.1 en Espana',
  title: 'Empodere su futuro con habilidades líderes en la industria',
  titleHighlight: 'Industry-Lead Skills',
  subtitle: 'Aprende con los mejores expertos del sector. Cursos intensivos, mentoria personalizada y una comunidad de mas de 50.000 profesionales que ya han transformado sus carreras.',
  ctaPrimary: 'Empezar a aprender',
  ctaSecondary: 'Ver plan de estudio',
  liveCard: 'Live Ahora',
  liveCardSub: 'UX/UI Mastery Masterclass',
};

export const partners = [
  { name: 'Google' },
  { name: 'Meta' },
  { name: 'Amazon' },
  { name: 'Netflix' },
  { name: 'Microsoft' },
];

export const courses = [
  {
    slug: 'uxui-mastery',
    title: 'UX/UI Mastery',
    category: 'Diseno',
    desc: 'Domina el diseno de experiencias digitales desde los fundamentos hasta la entrega de prototipos listos para produccion con Figma y metodologias centradas en el usuario.',
    level: 'Intermedio',
    duration: '12 semanas',
    price: '499€',
    featured: true,
    image: 'uxuiCourse',
  },
  {
    slug: 'advanced-web-dev',
    title: 'Advanced Web Dev',
    category: 'Ingenieria',
    desc: 'Arquitectura de aplicaciones modernas con React, Next.js, TypeScript y Node. Aprende a construir sistemas escalables y a pensar como un arquitecto de software.',
    level: 'Avanzado',
    duration: '16 semanas',
    price: '699€',
    featured: true,
    image: 'webdevCourse',
  },
  {
    slug: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    category: 'Marketing',
    desc: 'Estrategia de marketing digital 360. SEO, SEM, redes sociales, correo marketing y analisis de datos para construir marcas que conectan y convierten.',
    level: 'Basico',
    duration: '8 semanas',
    price: '299€',
    featured: false,
    image: 'marketingCourse',
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    category: 'Datos',
    desc: 'Python, machine learning, visualizacion de datos y estadistica aplicada. Transforma datos en decisiones con herramientas del sector como Pandas, Scikit-aprender y Tableau.',
    level: 'Intermedio',
    duration: '20 semanas',
    price: '799€',
    featured: false,
    image: 'dataCourse',
  },
  {
    slug: 'product-management',
    title: 'Product Management',
    category: 'Producto',
    desc: 'Metodologias agiles, roadmaps, OKRs y gestion de stakeholders. Aprende a liderar productos digitales con impacto real desde la idea hasta el lanzamiento.',
    level: 'Intermedio',
    duration: '10 semanas',
    price: '449€',
    featured: false,
    image: 'uxuiCourse',
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'Seguridad',
    desc: 'Fundamentos de seguridad informatica, ethical hacking, analisis de vulnerabilidades y respuesta a incidentes. Certificacion preparatoria incluida.',
    level: 'Avanzado',
    duration: '14 semanas',
    price: '599€',
    featured: false,
    image: 'dataCourse',
  },
];

export const stats = [
  { value: '50k+', label: 'Estudiantes' },
  { value: '94%', label: 'Insercion Laboral' },
  { value: '120+', label: 'Mentores' },
  { value: '4.9/5', label: 'Valoracion Media' },
];

export const testimonial = {
  name: 'Sarah Jenkins',
  role: 'Lead Developer, Meta',
  avatar: 'testimonialAvatar',
  quote: 'Scholarly Academy cambio completamente mi manera de pensar sobre el desarrollo de software. Los instructores no solo te ensenyan a escribir codigo — te ensenyan a pensar como un arquitecto. En seis meses pase de junior a liderar un equipo en Meta.',
};

export const process = [
  { num: '01', title: 'Elige tu Curso', desc: 'Explora nuestro catalogo y encuentra el programa que se alinea con tus objetivos profesionales. Asesoramiento personalizado incluido.' },
  { num: '02', title: 'Aprende con Expertos', desc: 'Mentores activos en las mejores empresas del mundo. Clases en vivo, sesiones de feedback y proyectos reales del sector.' },
  { num: '03', title: 'Lanza tu Carrera', desc: 'Bolsa de empleo exclusiva, revision de CV y preparacion de entrevistas. El 94% de nuestros graduates consiguen trabajo en menos de 3 meses.' },
];

export const pricing = [
  {
    tier: 'Basico',
    price: '199€',
    period: '/mes',
    desc: 'Acceso a un curso y recursos de la comunidad.',
    features: ['1 curso a elegir', 'Acceso a comunidad', 'Recursos descargables', 'Certificado de finalizacion'],
    cta: 'Empezar',
    highlighted: false,
  },
  {
    tier: 'Pro',
    price: '399€',
    period: '/mes',
    desc: 'Acceso ilimitado a todos los cursos y mentoria.',
    features: ['Todos los cursos', 'Mentoria grupal semanal', 'Proyectos reales', 'Bolsa de empleo', 'Certificados acreditados'],
    cta: 'Mas Popular',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    price: 'A medida',
    period: '',
    desc: 'Formacion corporativa para equipos y empresas.',
    features: ['Equipos desde 10 personas', 'Instructores dedicados', 'Contenido personalizado', 'Dashboard de progreso', 'Soporte prioritario'],
    cta: 'Contactar',
    highlighted: false,
  },
];

export const nosotros = {
  badge: 'Est. 2020 — Madrid',
  heroTitle: 'Formando a los lideres digitales del manana.',
  heroSubtitle: 'Scholarly Academy nacio con una mision clara: democratizar el acceso a la educacion tecnologica de calidad y conectar a los estudiantes con las oportunidades que merecen.',
  mission: 'Creemos que el acceso al conocimiento de calidad no deberia ser un privilegio. Por eso hemos construido la plataforma educativa mas rigurosa y accesible de habla hispana, con instructores que trabajan activamente en las empresas mas innovadoras del mundo.',
  values: [
    { num: '01', title: 'Rigor Academico', desc: 'Todo nuestro contenido es revisado por profesionales activos en el sector. Actualizamos los curriculos cada trimestre para reflejar las demandas reales del mercado.' },
    { num: '02', title: 'Comunidad Primero', desc: 'El aprendizaje no ocurre en soledad. Hemos construido una comunidad de mas de 50.000 profesionales que colaboran, comparten y crecen juntos.' },
    { num: '03', title: 'Impacto Medible', desc: 'El 94% de nuestros graduates consiguen empleo en su area en menos de 3 meses. Medimos nuestro exito por el tuyo.' },
  ],
  instructors: [
    { name: 'Elena Morales', role: 'Lead UX Designer, Google', specialty: 'UX/UI Mastery', years: '12 anos de experiencia' },
    { name: 'David Park', role: 'Senior Engineer, Netflix', specialty: 'Advanced Web Dev', years: '10 anos de experiencia' },
    { name: 'Ana Torres', role: 'Head of Growth, Spotify', specialty: 'Digital Marketing', years: '9 anos de experiencia' },
    { name: 'Marco Silva', role: 'Data Scientist, Amazon', specialty: 'Data Science', years: '8 anos de experiencia' },
  ],
  cta: {
    title: 'Unete a la comunidad.',
    desc: 'Habla con un asesor academico y descubre que programa es el ideal para tus objetivos profesionales.',
  },
};

export const contacto = {
  badge: 'Contacto',
  title: 'Habla con un Asesor',
  subtitle: 'Nuestros asesores academicos estan disponibles para ayudarte a elegir el camino formativo que mejor se adapta a tus objetivos y disponibilidad.',
  formTitle: 'Solicitar Informacion',
  formSubtitle: 'Completar el formulario y un asesor se pondra en contacto en menos de 24 horas.',
  courseOptions: ['UX/UI Mastery', 'Advanced Web Dev', 'Digital Marketing Strategy', 'Data Science', 'Product Management', 'Primera Consulta'],
  schedule: 'Lunes a Viernes / 9:00 a 20:00',
  responseTime: '24 Horas',
};

export const blogPosts = [
  {
    slug: 'como-aprender-programacion-desde-cero',
    title: 'Como aprender programacion desde cero en 2026.',
    category: 'Programacion',
    readTime: '10 min',
    excerpt: 'La ruta de aprendizaje mas eficiente para convertirte en desarrollador completo-stack partiendo desde cero. Lenguajes, recursos y la mentalidad correcta.',
    featured: true,
  },
  {
    slug: 'fundamentos-diseno-ux',
    title: 'Los 5 fundamentos del diseno UX que todo disenador debe dominar.',
    category: 'Diseno UX',
    readTime: '8 min',
    excerpt: 'Investigacion de usuario, arquitectura de informacion, prototipado y pruebas de usabilidad. Los pilares que separan el diseno mediocre del diseno excelente.',
    featured: false,
  },
  {
    slug: 'estrategia-marketing-digital-2026',
    title: 'La estrategia de marketing digital que funciona en 2026.',
    category: 'Marketing Digital',
    readTime: '12 min',
    excerpt: 'El panorama ha cambiado. Te explicamos como construir una estrategia integral que combine SEO, contenido, paid media y comunidad para resultados sostenibles.',
    featured: false,
  },
  {
    slug: 'introduccion-data-science-python',
    title: 'Introduccion a Data Science con Python: por donde empezar.',
    category: 'Data Science',
    readTime: '15 min',
    excerpt: 'Pandas, NumPy, Matplotlib y Scikit-aprender. Un recorrido practico por las herramientas esenciales que todo data scientist debe conocer.',
    featured: false,
  },
  {
    slug: 'productividad-trabajo-remoto',
    title: 'Productividad en el trabajo remoto: sistemas que realmente funcionan.',
    category: 'Productividad',
    readTime: '7 min',
    excerpt: 'Los profesionales mas productivos no trabajan mas horas — trabajan mejor. Exploramos los sistemas y herramientas que los top performers usan cada dia.',
    featured: false,
  },
];
