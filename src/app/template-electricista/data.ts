export const business = {
  name: 'VOLT_PRECISION',
  tagline: 'Electricista Urgente en Madrid 24h',
  description: 'Líderes en servicios eléctricos de urgencia en la Comunidad de Madrid. Ingeniería de precisión al servicio de tu seguridad 24/7.',
  phone: '900 000 000',
  phoneIntl: '+34900000000',
  whatsapp: '34900000000',
  email: 'emergencias@voltprecision.com',
  address: 'Calle Industrial 45, Edificio A',
  city: 'Madrid',
  zip: '28001',
  country: 'España',
  legalName: 'Volt Precision Electrical S.L.',
  founded: '2009',
};

export const nav = [
  { href: '/template-electricista/servicios', label: 'Servicios' },
  { href: '/template-electricista/nosotros', label: 'Nosotros' },
  { href: '/template-electricista/contacto', label: 'Contacto' },
  { href: '/template-electricista/contacto', label: 'Emergencias' },
];

export const images = {
  // Hero BG — industrial electrical panel, dark & high contrast
  heroBg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  // Electrician working on panel
  electricianPanel: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
  // Copper wiring installation
  wiringInstall: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  // Technical blueprint / circuit panel close-up
  circuitPanel: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  // Team of electricians in industrial setting
  teamHero: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1600&q=80',
  // Copper wiring macro
  copperWiring: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  // Blog featured — electrician with safety gear inspecting panel
  blogDestacado: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  // Contact map — aerial city
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  // Technical documentation / certification
  certDoc: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
};

export const hero = {
  badge: 'Servicio 24 Horas Madrid',
  title: 'Electricista',
  titleAccent: 'Urgente',
  titleSuffix: 'en Madrid',
  subtitle: 'Llegamos en menos de 30 minutos. Soluciones técnicas inmediatas para averías críticas, cortocircuitos y fallos de suministro.',
  ctaPrimary: 'Llamar ahora 24/7',
  ctaSecondary: 'Ver Servicios',
};

export const statusConduit = [
  'Disponibilidad 100%',
  'Técnicos Certificados',
  'Garantía por Escrito',
];

export const homeServices = [
  {
    num: '01',
    label: 'Urgencia',
    title: 'Reparación de Averías',
    desc: 'Localización de fallos a tierra, cortocircuitos y sobrecargas. Intervención inmediata con equipo de diagnóstico avanzado.',
    checks: ['Localización de fugas', 'Reactivación de ICP/IGA', 'Sustitución de cableado quemado'],
  },
  {
    num: '02',
    label: 'Sistemas',
    title: 'Cuadros Eléctricos',
    desc: 'Montaje y saneamiento de cuadros según normativa REBT. Protección magnetotérmica y diferencial de alta sensibilidad.',
    progress: 75,
  },
  {
    num: '03',
    label: 'Proyectos',
    title: 'Instalaciones & Boletines',
    desc: 'Altas nuevas, aumentos de potencia y certificados de eficiencia energética para viviendas y locales.',
  },
];

export const benefits = [
  {
    icon: 'timer',
    title: 'Respuesta Relámpago',
    desc: 'Nuestra red de técnicos en Madrid capital y periferia nos permite garantizar tiempos de llegada inferiores a 30 minutos en casos críticos.',
  },
  {
    icon: 'verified_user',
    title: 'Certificación Oficial',
    desc: 'Empresa instaladora autorizada por la Comunidad de Madrid. Cada trabajo cumple estrictamente con el Reglamento Electrotécnico para Baja Tensión.',
  },
  {
    icon: 'engineering',
    title: 'Instrumental Pro',
    desc: 'Utilizamos analizadores de redes, cámaras termográficas y comprobadores de secciones para asegurar una reparación duradera y segura.',
  },
];

export const fullServices = [
  {
    icon: 'electric_bolt',
    title: 'Urgencias Eléctricas',
    desc: 'Respuesta inmediata 24/7 para averías críticas. Diagnóstico técnico y reparación de cortocircuitos y cortes de suministro.',
    checks: ['Disponibilidad 24 horas', 'Reparación de cortocircuitos', 'Restablecimiento de potencia'],
    size: 'large',
  },
  {
    icon: 'electrical_services',
    title: 'Instalaciones',
    desc: 'Modernización y eficiencia energética para residencias y centros industriales.',
    subcards: [
      { label: 'Reformas Integrales', desc: 'Renovación completa de sistemas obsoletos bajo normativa RBT.' },
      { label: 'Iluminación LED', desc: 'Estudios lumínicos y optimización de consumo energético.' },
      { label: 'Puntos de Recarga', desc: 'Instalación certificada para vehículos eléctricos.' },
    ],
    size: 'medium',
  },
  {
    icon: 'verified',
    title: 'Certificaciones',
    subtitle: 'Boletín Eléctrico Rápido',
    desc: 'Emisión de Certificados de Instalación Eléctrica (CIE) en tiempo récord. Somos instaladores autorizados por el ministerio de industria.',
    checks: ['Aumentos de potencia', 'Altas de suministro', 'Cambios de titularidad'],
    size: 'dark',
  },
];

export const stats = [
  { value: '15+', label: 'Años de Experiencia' },
  { value: 'CIE', label: 'Instaladores Certificados' },
  { value: '100%', label: 'Cumplimiento de Seguridad' },
  { value: '24/7', label: 'Respuesta Inmediata' },
];

export const precisionProtocol = [
  {
    num: '01',
    title: 'Metodología Safety-Primero',
    desc: 'Nuestros técnicos aplican un protocolo de seguridad estricto que supera los requisitos normativos. Cada proyecto comienza con una evaluación de riesgos y concluye con un test de estrés de los sistemas instalados.',
  },
  {
    num: '02',
    title: 'Transparencia Total',
    desc: 'Aportamos documentación técnica detallada y presupuesto cerrado antes de comenzar cualquier trabajo. Sin variables ocultas, sin tecnicismos — resultados claros y verificables.',
  },
];

export const credentials = ['REBT 2024', 'CIE MASTER', 'NFPA 70', 'ISO 9001', 'OSHA CERT'];

export const expertiseData = [
  { label: 'Radio de Servicio', value: 'Madrid y área metropolitana' },
  { label: 'Equipo Técnico', value: '24 Oficiales Cualificados' },
];

export const blogPosts = [
  {
    slug: 'consejos-seguridad-electrica-hogar',
    title: '5 Consejos de Seguridad Eléctrica para tu Hogar',
    category: 'Seguridad',
    readTime: '8 min',
    excerpt: 'Protege tu infraestructura y a tu familia con estas comprobaciones preventivas esenciales recomendadas por ingenieros certificados.',
    dark: false,
    featured: true,
  },
  {
    slug: 'ahorro-factura-luz',
    title: 'Cómo Ahorrar en tu Factura de Luz',
    category: 'Eficiencia',
    readTime: '12 min',
    excerpt: 'Análisis técnico de optimización de carga y nuevos sistemas de iluminación LED industrial.',
    dark: true,
    featured: false,
  },
  {
    slug: 'reglamentacion-2024',
    title: 'Guía Completa de Reglamentación 2024',
    category: 'Normativa',
    readTime: '15 min',
    excerpt: 'Resumen de los cambios legislativos en instalaciones de baja tensión y certificaciones REBT.',
    dark: false,
    featured: false,
  },
  {
    slug: 'panel-solar-vs-red',
    title: 'Panel Solar vs Red Tradicional',
    category: 'Tecnología',
    readTime: '10 min',
    excerpt: '¿Es rentable la transición al autoconsumo en naves industriales este año?',
    yellow: true,
    featured: false,
  },
  {
    slug: 'termografia-prevencion-incendios',
    title: 'Termografía: Prevención de Incendios',
    category: 'Mantenimiento',
    readTime: '6 min',
    excerpt: 'Cómo el escaneo térmico puede detectar fallos invisibles antes de que ocurran.',
    dark: false,
    featured: false,
  },
];

export const contact = {
  serviceOptions: [
    'Urgencia 24h',
    'Instalación Residencial',
    'Mantenimiento Industrial',
    'Boletín Eléctrico',
    'Auditoría Energética',
    'Consulta General',
  ],
};
