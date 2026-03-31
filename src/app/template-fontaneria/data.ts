/**
 * TEMPLATE FONTANERÍA — Data Config
 *
 * Solo hay que cambiar este archivo para generar una web nueva.
 * Todo el contenido, imágenes, colores y texto salen de aquí.
 */

export const business = {
  name: 'FLUID ARCHITECT',
  tagline: 'Precision Engineering',
  phone: '900 000 000',
  phoneIntl: '+34900000000',
  whatsapp: '34000000000',
  email: 'proyectos@fluidarchitect.com',
  address: 'Calle de la Ingeniería, 42, Planta 1',
  postalCode: '28001',
  city: 'Madrid',
  country: 'España',
  legalName: 'THE FLUID ARCHITECT S.L.',
  foundedYear: 2012,
  yearsExperience: 15,
};

export const nav = [
  { href: '/template-fontaneria', label: 'Home', icon: 'home' },
  { href: '/template-fontaneria/servicios', label: 'Servicios', icon: 'plumbing' },
  { href: '/template-fontaneria/nosotros', label: 'Nosotros', icon: 'contact_support' },
  { href: '/template-fontaneria/blog', label: 'Blog', icon: 'article' },
  { href: '/template-fontaneria/contacto', label: 'Contacto', icon: 'contact_support' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80',
  trustSection: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
  serviceArea: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  serviciosHero: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
  serviciosTech: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
  aboutHero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
  aboutHistory: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  aboutTeam: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  blogFeatured: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
  blogCaldera: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
  blogDrain: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  blogHeater: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
  og: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&h=630&q=80',
};

export const hero = {
  badge: 'Disponibilidad Inmediata',
  title: 'Fontanero urgente en tu ciudad 24h',
  subtitle: 'Asistencia técnica especializada con llegada en menos de 40 minutos. Garantía total por escrito en todas nuestras intervenciones.',
  ctaPrimary: 'Llamar Ahora',
  ctaSecondary: 'Pedir Presupuesto',
  features: [
    { icon: 'timer', title: 'Respuesta Flash', desc: 'Llegamos a su domicilio en 40 min o menos.' },
    { icon: 'verified_user', title: 'Garantía Escrita', desc: 'Certificado oficial de garantía en cada reparación.' },
  ],
};

export const services = [
  { icon: 'water_drop', name: 'Fugas de agua', desc: 'Localización no invasiva y reparación inmediata de filtraciones y humedades.', urgent: false },
  { icon: 'plumbing', name: 'Desatascos urgentes', desc: 'Limpieza de tuberías con maquinaria de alta presión para resultados definitivos.', urgent: true },
  { icon: 'mode_fan', name: 'Calefacción y calderas', desc: 'Instalación, mantenimiento y reparación técnica de sistemas térmicos.', urgent: false },
  { icon: 'faucet', name: 'Grifería y sanitarios', desc: 'Sustitución y reparación de elementos de baño y cocina con recambios originales.', urgent: false },
];

export const serviciosPage = {
  badge: 'Ingeniería Hidráulica',
  title: 'Nuestros Servicios de Fontanería',
  intro: 'Combinamos décadas de experiencia con tecnología de vanguardia para ofrecer soluciones de precisión. Desde inspecciones con Cámara TV de alta resolución hasta sistemas geófonos localizadores de fugas, garantizamos intervenciones mínimamente invasivas con resultados definitivos.',
  chips: [
    { icon: 'precision_manufacturing', text: 'Tecnología de Punta' },
    { icon: 'verified', text: 'Expertos Certificados' },
  ],
  items: [
    { icon: 'plumbing', name: 'Desatascos', desc: 'Resolvemos obstrucciones críticas en tuberías y desagües utilizando maquinaria de presión de última generación. Garantizamos la limpieza total del conducto sin causar daños estructurales a su red de saneamiento.', urgent: true },
    { icon: 'leak_add', name: 'Fugas de Agua', desc: 'Localización de roturas ocultas mediante tecnología acústica y gas trazador. Detectamos el punto exacto de la avería sin necesidad de picar paredes de forma innecesaria, ahorrando costes y molestias.', urgent: false },
    { icon: 'hvac', name: 'Instalación de Calderas', desc: 'Instalación certificada de sistemas de calefacción a gas y eléctricos. Optimizamos el consumo energético de su hogar con equipos de alta eficiencia y garantías extendidas del fabricante.', urgent: false },
    { icon: 'bathtub', name: 'Reformas de Baños', desc: 'Renovación completa de instalaciones sanitarias. Desde el cambio de bañera por plato de ducha hasta la modernización total de tuberías, combinamos diseño estético con funcionalidad técnica.', urgent: false },
  ],
  tech: {
    title: 'Inspección con Cámara TV',
    desc: 'Nuestros sistemas de cámara permiten visualizar el interior de tuberías de cualquier diámetro. Es la herramienta definitiva para diagnosticar fisuras, raíces incrustadas o sedimentaciones calcáreas antes de actuar.',
    features: [
      'Grabación digital para informes de seguros',
      'Localización de arquetas ocultas',
      'Diagnóstico preventivo sin obras',
    ],
  },
};

export const trust = [
  { icon: 'schedule', title: 'Rapidez 24/7', desc: 'Estamos disponibles en cualquier momento del día o la noche, todos los días del año.' },
  { icon: 'request_quote', title: 'Presupuesto sin compromiso', desc: 'Transparencia total. Conocerás el coste exacto antes de comenzar cualquier trabajo.' },
  { icon: 'edit_document', title: 'Garantía por escrito', desc: 'Protegemos tu inversión con un documento oficial que certifica la calidad de la reparación.' },
];

export const testimonials = [
  { name: 'Carlos Méndez', role: 'Particular', text: 'Llegaron en apenas 30 minutos cuando se rompió la tubería principal. Profesionales, limpios y muy eficaces. El precio fue justo.', rating: 5 },
  { name: 'Elena Rodríguez', role: 'Gerente de Restaurante', text: 'Excelente servicio para mi local comercial. Detectaron la fuga sin romper azulejos innecesarios. Muy recomendables.', rating: 5 },
];

export const coverage = {
  title: 'Cobertura Local Inmediata',
  desc: 'Prestamos servicio en todo el área metropolitana y barrios periféricos. Nuestro despliegue logístico nos permite garantizar tiempos de respuesta récord.',
  zones: ['Centro Histórico', 'Zona Norte', 'Barrio Residencial', 'Área Industrial', 'Distritos Sur', 'Municipios Colindantes'],
};

export const about = {
  badge: 'Excelencia Técnica',
  heroTitle: 'Comprometidos con la calidad en cada reparación',
  heroSubtitle: 'Elevamos los estándares de la fontanería convencional a través de la precisión arquitectónica y el compromiso inquebrantable con la infraestructura de su hogar.',
  history: [
    'Fundada sobre los pilares de la ingeniería civil y el servicio artesanal, Fluid Architect nació de la necesidad de profesionalizar un sector crítico. Durante más de una década y media, hemos transformado la percepción de los servicios de fontanería, tratando cada intervención como una obra de precisión.',
    'Lo que comenzó como un pequeño equipo de dos especialistas se ha convertido en una firma líder, reconocida por su capacidad para resolver desafíos estructurales complejos donde otros solo ven averías superficiales. Nuestro enfoque humano asegura que, detrás de cada tubería y válvula, siempre priorizamos la tranquilidad de las familias a las que servimos.',
  ],
  values: [
    { icon: 'schedule', title: 'Puntualidad', desc: 'Respetamos su tiempo con una logística milimétrica. Entendemos que su jornada es valiosa y nuestras citas son compromisos inamovibles.' },
    { icon: 'visibility', title: 'Transparencia', desc: 'Sin costes ocultos ni tecnicismos confusos. Desglosamos cada reparación y presupuesto con total claridad antes de comenzar.' },
    { icon: 'verified', title: 'Profesionalidad', desc: 'Técnicos certificados bajo normativas internacionales, uniformados y equipados con la tecnología más avanzada del mercado.' },
  ],
  team: {
    title: 'El Capital Humano',
    desc: 'Nuestro equipo no solo está compuesto por expertos en hidráulica; son asesores técnicos comprometidos con la integridad de su infraestructura. Cada miembro de Fluid Architect pasa por un riguroso proceso de certificación continua.',
    badge: 'Equipo de técnicos certificados y uniformados',
  },
  cta: {
    title: '¿Listo para experimentar la excelencia técnica?',
    desc: 'No permita que una avería comprometa su calidad de vida. Nuestro equipo técnico está disponible para ofrecerle una solución definitiva.',
  },
};

export const contacto = {
  badge: 'Asistencia Inmediata',
  title: 'Contacta con nosotros',
  subtitle: 'Nuestra red de ingenieros certificados está disponible para resolver cualquier incidencia técnica. Ofrecemos tiempos de respuesta inferiores a 60 minutos para casos urgentes.',
  formTitle: 'Solicitar presupuesto',
  formSubtitle: 'Complete el formulario y un técnico especializado le contactará en breve.',
  serviceOptions: ['Urgencia 24h', 'Instalación Fontanería', 'Mantenimiento Industrial', 'Detección de Fugas', 'Otros'],
  schedule: '24 Horas / 7 Días',
  responseTime: '45 Minutos',
};

export const blogPosts = [
  {
    slug: 'como-detectar-fuga-oculta',
    title: 'Cómo detectar una fuga oculta',
    category: 'Detección Técnica',
    excerpt: 'Guía completa para identificar fugas de agua ocultas en tu hogar antes de que causen daños mayores.',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: '5-consejos-caldera',
    title: '5 consejos para tu caldera',
    category: 'Climatización',
    excerpt: 'Mantenimiento preventivo esencial para alargar la vida útil de tu caldera y reducir el consumo.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    slug: 'que-hacer-inundacion-bano',
    title: 'Qué hacer si se inunda tu baño',
    category: 'Emergencia',
    excerpt: 'Protocolo de emergencia inmediato para minimizar daños estructurales antes de nuestra llegada.',
    image: null,
    featured: false,
  },
  {
    slug: 'mantenimiento-preventivo-desagues',
    title: 'Mantenimiento preventivo de desagües',
    category: 'Mantenimiento',
    excerpt: 'Evite costosas intervenciones mediante el cuidado sistemático de su red de evacuación.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    featured: false,
  },
  {
    slug: 'elegir-mejor-termo-electrico',
    title: 'Elegir el mejor termo eléctrico',
    category: 'Guía de Compra',
    excerpt: 'Analizamos eficiencia energética, capacidad volumétrica y durabilidad cerámica para su próxima instalación.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];
