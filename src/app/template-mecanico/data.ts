export const business = {
  name: 'INDUSTRIAL AUTHORITY',
  tagline: 'Taller Mecánico de Urgencias Madrid',
  description: 'Servicio mecánico de emergencia con tecnología de diagnóstico avanzada. Respuesta en 15 minutos, garantía total.',
  phone: '+34 900 000 000',
  phoneIntl: '+34900000000',
  whatsapp: '34900000000',
  email: 'urgencias@industrialauthority.es',
  address: 'Polígono Industrial Norte, Nave 42',
  postalCode: '28001',
  city: 'Madrid',
  country: 'España',
  legalName: 'INDUSTRIAL AUTHORITY TALLER S.L.',
  founded: '2009',
};

export const nav = [
  { href: '/template-mecanico', label: 'Home' },
  { href: '/template-mecanico/servicios', label: 'Reparación' },
  { href: '/template-mecanico/servicios', label: 'Mantenimiento' },
  { href: '/template-mecanico/servicios', label: 'Diagnóstico' },
];

export const images = {
  // Hero — mechanic tools dark
  heroBg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
  // Engine parts
  engineParts: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
  // Workshop interior
  workshopInterior: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
  // Mechanic working
  mechanicHands: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=80',
  // Team
  mechanicTeam: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80',
  // Car diagnostic equipment
  diagnosticEquip: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80',
  // Contact map
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
};

export const stats = [
  { value: '15MIN', label: 'Tiempo de Respuesta' },
  { value: '100%', label: 'Garantía Total' },
  { value: '24H', label: 'Servicio Continuo' },
  { value: '99.8%', label: 'Precisión Diagnóstico' },
];

export const homeServices = [
  {
    title: 'Reparación',
    desc: 'Reparación integral de motor, transmisión y sistemas mecánicos con repuestos OEM certificados.',
    icon: '🔧',
    bullets: ['Motor & Turbo', 'Sistemas de Frenado', 'Transmisión'],
  },
  {
    title: 'Mantenimiento',
    desc: 'Programas de mantenimiento preventivo para maximizar la vida útil de su vehículo.',
    icon: '⚙️',
    bullets: ['Revisión Oficial', 'Fluidos & Filtros', 'Inspección Pre-ITV'],
  },
  {
    title: 'Diagnóstico',
    desc: 'Diagnóstico de alta precisión con software AUTOLOGIC 2.0 y escáner OBDII profesional.',
    icon: '🔬',
    bullets: ['Diagnosis OBDII', 'Electrónica Avanzada', 'Chequeo Pre-ITV'],
  },
];

export const techSpecs = [
  { label: 'Certificación', value: 'MAESTRO ASE' },
  { label: 'Software', value: 'AUTOLOGIC 2.0' },
  { label: 'Repuestos', value: 'OEM ORIGINAL' },
  { label: 'Ubicación', value: 'CENTRO CIUDAD' },
];

export const repairServices = [
  'Motor & Turbo',
  'Sistemas de Frenado',
  'Transmisión',
  'Reconstrucción de Motor',
  'Transmisión Hidráulica',
  'Sistemas Eléctricos',
];

export const maintenanceServices = [
  'Revisión Oficial',
  'Fluidos & Filtros',
  'Neumáticos',
  'Inspección Pre-ITV',
];

export const diagnosticsServices = [
  'Diagnosis OBDII',
  'Electrónica Avanzada',
  'Chequeo Pre-ITV',
];

export const commonFailures = [
  { title: 'Pérdida de Potencia Bruta', desc: 'Análisis completo del sistema de combustión, turbo y electrónica de motor.' },
  { title: 'Ruidos de Fricción Metálica', desc: 'Diagnóstico preciso de rodamientos, frenos y componentes de transmisión.' },
  { title: 'Vibración en Transmisión', desc: 'Revisión integral del tren motriz, juntas homocinéticas y árbol de transmisión.' },
];

export const credentials = [
  { label: 'ISO 9001:2015', desc: 'Gestión de calidad certificada' },
  { label: 'ASE Master Certified', desc: 'Certificación técnica máxima' },
  { label: 'Industrial Spec', desc: 'Estándar industrial europeo' },
  { label: 'OEM Standards', desc: 'Repuestos fabricante original' },
];

export const precisionProtocol = [
  {
    num: '01',
    title: 'Safety-First',
    desc: 'Cada intervención sigue el protocolo de seguridad certificado ASE. Ningún vehículo sale del taller sin superar el control de calidad de 47 puntos.',
  },
  {
    num: '02',
    title: 'Transparencia Total',
    desc: 'Presupuesto detallado antes de comenzar cualquier trabajo. Sin costes ocultos, sin sorpresas. Garantía escrita en cada reparación.',
  },
];

export const blogPosts = [
  {
    slug: 'seguridad-vial-invierno',
    title: 'Seguridad Vial en Invierno: Los 8 Puntos Críticos que Debes Revisar',
    category: 'Seguridad Vial',
    readTime: '5 min',
    excerpt: 'Antes de afrontar las carreteras en condiciones adversas, estos son los componentes que un mecánico certificado debe inspeccionar en tu vehículo.',
    image: 'mechanicHands',
  },
  {
    slug: 'mantenimiento-preventivo-ahorra-dinero',
    title: 'Mantenimiento Preventivo: Por Qué Cuesta Menos Prevenir que Reparar',
    category: 'Mantenimiento',
    readTime: '7 min',
    excerpt: 'Un programa de mantenimiento regular puede ahorrarte hasta un 60% en costes de reparación. Analizamos los intervalos óptimos para cada componente.',
    image: 'engineParts',
  },
  {
    slug: 'diagnostico-obd-guia-completa',
    title: 'Diagnóstico OBD: Qué Significan los Códigos de Error de tu Coche',
    category: 'Diagnóstico OBD',
    readTime: '8 min',
    excerpt: 'Los códigos P0xxx, B0xxx y C0xxx tienen un significado preciso. Aprende a interpretarlos y entiende cuándo necesitas acudir a un especialista urgentemente.',
    image: 'diagnosticEquip',
  },
];
