/**
 * TEMPLATE DENTISTA — Data Config
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imagenes, colores y texto salen de aqui.
 */

export const business = {
  name: 'The Clinical Sanctuary',
  tagline: 'Dentista en Madrid — Urgencias 24h',
  phone: '+34 912 345 678',
  phoneIntl: '+34912345678',
  emergency: '900 000 000',
  whatsapp: '34912345678',
  email: 'hola@clinicalsanctuary.es',
  address: 'Calle de la Excelencia, 45, 28001 Madrid',
  postalCode: '28001',
  city: 'Madrid',
  country: 'España',
  legalName: 'The Clinical Sanctuary S.L.',
  foundedYear: 2009,
  yearsExperience: '15+',
  leadDentist: 'Dr. Alejandro Reyes',
};

export const nav = [
  { href: '/template-dentista', label: 'Inicio', icon: 'home' },
  { href: '/template-dentista/servicios', label: 'Servicios', icon: 'medical_services' },
  { href: '/template-dentista/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-dentista/blog', label: 'Blog', icon: 'article' },
  { href: '/template-dentista/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroClinic: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e66?auto=format&fit=crop&w=1600&q=80',
  doctorPortrait: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  dentalTeam: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
  dentalTech: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  clinicRoom: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e66?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'Clinica Dental de Referencia en Madrid',
  titleLine1: 'Dentista en Madrid',
  titleAccent: 'Urgencias Dentales 24h',
  subtitle: 'Cuidamos tu sonrisa con la mas alta tecnologia y el trato humano que mereces. Atencion de urgencias las 24 horas, implantes, ortodoncia y estetica dental con los mejores especialistas.',
  ctaPrimary: 'Reservar Cita Urgente',
  ctaSecondary: 'Ver Servicios',
  floatingCard: {
    icon: 'verified',
    title: 'Excelencia Medica',
    badge: 'ISO 9001',
  },
};

export const services = [
  {
    icon: 'dentistry',
    name: 'Implantes Dentales',
    desc: 'Recupera tu sonrisa con implantes de titanio de alta calidad. Tratamiento completo desde la planificacion 3D hasta la corona definitiva.',
    urgent: false,
  },
  {
    icon: 'straighten',
    name: 'Ortodoncia',
    desc: 'Alinea tu sonrisa con ortodoncia tradicional o invisible. Resultados precisos y duraderos para adultos y jovenes.',
    urgent: false,
  },
  {
    icon: 'emergency',
    name: 'Urgencias 24h',
    desc: 'Disponibles las 24 horas del dia, los 365 dias del ano. Atencion inmediata para dolor agudo, fracturas y emergencias dentales.',
    urgent: true,
  },
];

export const trustStats = [
  { value: '24h', label: 'Urgencias' },
  { value: '100%', label: 'Satisfaccion' },
  { value: '2.000+', label: 'Pacientes / Ano' },
  { value: '4.9/5', label: 'Valoracion' },
];

export const benefits = [
  { icon: 'schedule', title: 'Atencion Inmediata', desc: 'Urgencias dentales atendidas en menos de 60 minutos.' },
  { icon: 'verified_user', title: 'Especialistas Certificados', desc: 'Todo nuestro equipo esta colegiado y en formacion continua.' },
  { icon: 'biotech', title: 'Tecnologia de Vanguardia', desc: 'Escaner 3D, laser dental y materiales de ultima generacion.' },
];

export const credentials = [
  { label: 'ISO 9001', desc: 'Calidad Certificada' },
  { label: 'Colegio Oficial', desc: 'Odontologos Colegiados' },
  { label: 'SECOM', desc: 'Miembro Activo' },
];

export const testimonials = [
  {
    name: 'Elena Martinez',
    role: 'Paciente de Implantes',
    text: 'El Dr. Reyes y su equipo me devolvieron la confianza en mi sonrisa. El proceso fue mucho mas comodo de lo que esperaba y los resultados son perfectos. Totalmente recomendable.',
    rating: 5,
  },
  {
    name: 'Carlos Rodriguez',
    role: 'Paciente de Urgencias',
    text: 'Llame a las 2 de la madrugada con un dolor insoportable y me atendieron en menos de una hora. Profesionalidad y humanidad al mismo tiempo. Ahora son mi clinica de referencia.',
    rating: 5,
  },
  {
    name: 'Sofia Lopez',
    role: 'Paciente de Ortodoncia',
    text: 'Llevo 18 meses con ortodoncia invisible y estoy encantada. El seguimiento es impecable y el resultado mejor de lo que imaginaba. Una clinica que cuida cada detalle.',
    rating: 5,
  },
];

export const serviciosPage = {
  badge: 'Tratamientos de Excelencia',
  title: 'Nuestros Servicios',
  intro: 'Ofrecemos una amplia gama de tratamientos dentales con la mas alta tecnologia y el respaldo de especialistas certificados. Desde urgencias hasta estetica dental avanzada.',
  items: [
    {
      num: '01',
      name: 'Implantes Dentales',
      desc: 'Solucion permanente para la perdida dental. Utilizamos implantes de titanio de grado medico con planificacion 3D para resultados precisos y naturales.',
      tags: ['Planificacion 3D', 'Titanio Medico', 'Corona Ceramica'],
      large: true,
    },
    {
      num: '02',
      name: 'Ortodoncia',
      desc: 'Alineacion dental con brackets tradicionales o alineadores invisibles. Tratamiento personalizado para cada caso con seguimiento mensual.',
      tags: ['Ortodoncia Invisible', 'Brackets Esteticos'],
      large: false,
    },
    {
      num: '03',
      name: 'Urgencias 24h',
      desc: 'Atencion inmediata para emergencias dentales. Dolor agudo, fracturas, perdida de pieza o cualquier urgencia dental resuelta en el menor tiempo posible.',
      tags: ['Disponible 24/7', 'Sin Cita Previa'],
      large: false,
      accent: true,
    },
    {
      num: '04',
      name: 'Limpieza Dental',
      desc: 'Higiene oral profesional completa con ultrasonidos y pulido. Prevencion de caries y enfermedad periodontal con revision semestral incluida.',
      tags: ['Ultrasonidos', 'Revision Incluida'],
      large: false,
    },
    {
      num: '05',
      name: 'Estetica Dental',
      desc: 'Diseño de sonrisa personalizado. Blanqueamiento profesional, contorneado dental y tratamientos esteticos para una sonrisa de cine.',
      tags: ['Diseño de Sonrisa', 'Blanqueamiento LED'],
      large: false,
    },
    {
      num: '06',
      name: 'Carillas',
      desc: 'Carillas de porcelana o composite para transformar tu sonrisa de forma minimamente invasiva. Resultado natural y duradero en pocas sesiones.',
      tags: ['Porcelana', 'Minimamente Invasivo'],
      large: false,
    },
  ],
  process: [
    { step: '01', title: 'Consulta Inicial', desc: 'Primera visita gratuita para evaluar tu estado dental y presentarte las mejores opciones de tratamiento.' },
    { step: '02', title: 'Diagnostico Digital', desc: 'Radiografias digitales, escaner 3D y fotografia clinica para un diagnostico preciso y completo.' },
    { step: '03', title: 'Tratamiento', desc: 'Ejecucion del plan terapeutico con los mas altos estandares de calidad y seguimiento continuo.' },
  ],
  pricing: [
    { tier: 'Consulta', price: 'Gratuita', desc: 'Primera visita de evaluacion sin cargo. Diagnostico basico incluido.', features: ['Revision completa', 'Radiografia inicial', 'Presupuesto detallado'] },
    { tier: 'Tratamiento Estandar', price: 'Desde 80 EUR', desc: 'Limpiezas, empastes y tratamientos preventivos con la mejor calidad.', features: ['Limpieza profesional', 'Empastes ceramicos', 'Selladores'] },
    { tier: 'Tratamiento Premium', price: 'Presupuesto', desc: 'Implantes, ortodoncia y estetica dental. Financiacion sin intereses disponible.', features: ['Implantes titanio', 'Ortodoncia invisible', 'Diseño de sonrisa', 'Financiacion 0%'] },
  ],
};

export const nosotrosPage = {
  badge: 'Desde 2009 en Madrid',
  heroTitle: 'Excelencia Medica con Trato Humano',
  heroSubtitle: 'The Clinical Sanctuary nacio con la mision de ofrecer atencion dental de primer nivel con la calidez y cercania que cada paciente merece.',
  doctor: {
    name: 'Dr. Alejandro Reyes',
    role: 'Director Medico y Especialista en Implantologia',
    bio: [
      'El Dr. Reyes cuenta con mas de 15 anos de experiencia en odontologia avanzada, especializandose en implantologia y cirugia oral. Formado en la Universidad Complutense de Madrid y con masters en implantologia en Barcelona e Italia.',
      'Mi filosofia es sencilla: cada paciente merece el mismo nivel de cuidado y atencion que daria a mi propia familia. La tecnologia es nuestra herramienta, pero la confianza y la empatia son la base de todo lo que hacemos aqui.',
    ],
    stats: [
      { value: '15+', label: 'Anos de Experiencia' },
      { value: '2.000+', label: 'Pacientes Tratados' },
      { value: '4.9/5', label: 'Valoracion Media' },
    ],
  },
  values: [
    { num: '01', title: 'Excelencia Clinica', desc: 'Formacion continua, equipamiento de ultima generacion y protocolos clinicos de maxima exigencia para garantizar los mejores resultados.' },
    { num: '02', title: 'Tecnologia Avanzada', desc: 'Escaner intraoral 3D, radiologia digital de baja radiacion, laser dental y materiales biocompatibles de primera calidad.' },
    { num: '03', title: 'Confianza y Cercania', desc: 'Trato personalizado, comunicacion transparente y acompanamiento en cada paso del tratamiento para que te sientas seguro y tranquilo.' },
  ],
  team: {
    title: 'Nuestro Equipo Clinico',
    desc: 'Especialistas colegiados en implantologia, ortodoncia, periodoncia e higiene dental trabajando de forma coordinada para ofrecerte la mejor atencion integral.',
    badge: 'Equipo Colegiado — Colegio de Odontologos de Madrid',
  },
  cta: {
    title: 'Tu salud dental es nuestra prioridad.',
    desc: 'Reserva tu primera consulta gratuita y descubre por que somos la clinica de referencia en Madrid.',
  },
};

export const blogPosts = [
  {
    slug: 'urgencias-dentales-que-hacer',
    title: 'Urgencias Dentales: Que Hacer y Cuando Llamar a Tu Dentista.',
    category: 'Urgencias',
    readTime: '6 min',
    excerpt: 'Guia practica para identificar cuando una molestia dental es realmente una urgencia y que pasos seguir hasta llegar a la clinica.',
    featured: true,
  },
  {
    slug: 'implantes-dentales-guia-completa',
    title: 'Implantes Dentales: La Guia Completa para Decidir con Informacion.',
    category: 'Implantes',
    readTime: '10 min',
    excerpt: 'Todo lo que necesitas saber sobre el proceso, los tiempos, los cuidados y los resultados de los implantes de titanio.',
    featured: false,
  },
  {
    slug: 'ortodoncia-invisible-vs-brackets',
    title: 'Ortodoncia Invisible vs Brackets: Cual es la Mejor Opcion para Ti.',
    category: 'Ortodoncia',
    readTime: '8 min',
    excerpt: 'Comparativa honesta de ambas opciones para que puedas tomar la decision mas adecuada segun tu caso y estilo de vida.',
    featured: false,
  },
  {
    slug: 'blanqueamiento-dental-profesional',
    title: 'Blanqueamiento Dental Profesional: Resultados Reales sin Riesgos.',
    category: 'Estetica',
    readTime: '7 min',
    excerpt: 'Por que el blanqueamiento en clinica es mas seguro y efectivo que los kits de farmacia, y que resultados puedes esperar realmente.',
    featured: false,
  },
  {
    slug: 'higiene-dental-habitos-clave',
    title: 'Los 5 Habitos de Higiene Dental que Cambiaran tu Sonrisa.',
    category: 'Prevencion',
    readTime: '5 min',
    excerpt: 'Rutinas sencillas pero fundamentales que nuestros especialistas recomiendan para mantener tus dientes sanos entre visitas.',
    featured: false,
  },
];

export const contactoPage = {
  badge: 'Reserva tu Cita',
  title: 'Reserve su Cita',
  subtitle: 'Estamos disponibles para atenderte. Primera consulta gratuita sin compromiso.',
  formTitle: 'Solicitar Cita',
  formSubtitle: 'Rellena el formulario y te contactaremos en menos de 2 horas en horario de clinica.',
  serviceOptions: ['Urgencia Dental', 'Implantes', 'Ortodoncia', 'Limpieza', 'Estetica', 'Primera Consulta'],
  schedule: 'Lunes a Viernes / 9:00 a 21:00',
  scheduleWeekend: 'Sabados / 9:00 a 14:00',
  responseTime: 'Menos de 2 horas',
  emergencyNote: 'Para urgencias fuera de horario llama al 900 000 000',
};
