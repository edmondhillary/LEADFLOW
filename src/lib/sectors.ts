/**
 * LeadFlow — Sector Configs
 *
 * Centraliza toda la información específica por sector:
 * - Nombres localizados (ES / AR / UY)
 * - Colores y estética recomendados
 * - Servicios típicos con rangos de precios
 * - Señales de confianza específicas
 * - Keywords SEO principales
 * - Guía de contenido para Claude (contentPrompt)
 * - Temas de blog sugeridos
 *
 * Usado por: content-gen, brand-builder, images.ts, Telegram bot
 */

export interface SectorService {
  name: string;
  priceRange: string; // e.g. "50–120€" / "$8.000–$25.000"
}

export interface SectorConfig {
  id: string;
  /** Nombres localizados según país */
  names: { ES: string; AR: string; UY: string };
  /** Schema.org @type */
  schemaType: string;
  /** ¿Es servicio de urgencia/emergencia? (afecta copy) */
  isEmergency: boolean;
  /** Países donde está disponible */
  availableIn: ('ES' | 'AR' | 'UY')[];
  /** Paleta de color por defecto para el sector */
  defaultColors: { primary: string; primaryDark: string; accent: string };
  /** Iconos Lucide para este sector (en orden de relevancia) */
  lucideIcons: string[];
  /** Servicios típicos por mercado */
  services: { ES: SectorService[]; LATAM: SectorService[] };
  /** Badges de confianza específicos del sector */
  trustSignals: { ES: string[]; LATAM: string[] };
  /** Keywords SEO principales */
  seoKeywords: { ES: string[]; LATAM: string[] };
  /** Prompt extra para Claude — define personalidad, tono y detalles del sector */
  contentPrompt: string;
  /** Temas de blog con potencial SEO */
  blogTopics: string[];
  /** Certificaciones / acreditaciones típicas */
  certifications: string[];
}

// ─── Sectores ────────────────────────────────────────────────────────────────

export const SECTORS: Record<string, SectorConfig> = {

  // ── 1. FONTANERO / PLOMERO ──────────────────────────────────────────────
  fontanero: {
    id: 'fontanero',
    names: { ES: 'Fontanero', AR: 'Plomero', UY: 'Plomero' },
    schemaType: 'Plumber',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#1e40af', primaryDark: '#1e3a8a', accent: '#0ea5e9' },
    lucideIcons: ['wrench', 'droplets', 'settings', 'shield-check', 'clock', 'phone', 'zap'],
    services: {
      ES: [
        { name: 'Reparación de averías urgentes', priceRange: '60–150€' },
        { name: 'Instalación de tuberías', priceRange: '80–300€' },
        { name: 'Desatascos', priceRange: '50–120€' },
        { name: 'Instalación de calentadores', priceRange: '150–400€' },
        { name: 'Sustitución de grifería', priceRange: '60–200€' },
        { name: 'Detección de fugas', priceRange: '80–180€' },
      ],
      LATAM: [
        { name: 'Reparación de cañerías', priceRange: '$8.000–$25.000' },
        { name: 'Destapación de desagüe', priceRange: '$5.000–$15.000' },
        { name: 'Instalación de calefón', priceRange: '$15.000–$40.000' },
        { name: 'Cambio de griferías', priceRange: '$6.000–$18.000' },
        { name: 'Detección de pérdidas', priceRange: '$8.000–$20.000' },
        { name: 'Instalaciones nuevas', priceRange: 'a convenir' },
      ],
    },
    trustSignals: {
      ES: ['Servicio 24 horas, 365 días', 'Más de 10 años de experiencia', 'Presupuesto gratis sin compromiso'],
      LATAM: ['Urgencias 24 hs', 'Matriculado y habilitado', 'Presupuesto sin cargo'],
    },
    seoKeywords: {
      ES: ['fontanero urgente', 'fontanero barato', 'desatascos', 'pérdida de agua', 'avería fontanería'],
      LATAM: ['plomero urgente', 'destapación de cañería', 'pérdida de agua', 'plomero barato'],
    },
    contentPrompt: `
SECTOR: Fontanería / Plomería
- Es un servicio de URGENCIA: el copy debe transmitir disponibilidad 24 horas, rapidez y fiabilidad.
- Palabras clave de dolor del cliente: "cañería rota", "pérdida de agua", "desagüe tapado", "sin agua caliente".
- Diferenciadores que funcionan: tiempo de respuesta (ej: "llegamos en 30 minutos"), presupuesto gratis, certificación oficial.
- El héroe debe tener una llamada urgente: "¿Tienes una avería ahora? Llama ya" y botón de teléfono visible.
- Los testimonios deben mencionar emergencias resueltas rápido.
- Evitar: jerga técnica excesiva. El cliente quiere soluciones, no explicaciones de ingeniería.
- Tono: directo, seguro, tranquilizador ("lo resolvemos hoy mismo").`,
    blogTopics: [
      'Cómo detectar una fuga de agua en casa antes de que sea grave',
      'Por qué se tapa el desagüe y cómo evitarlo',
      'Cuándo cambiar el calentador de agua: señales de aviso',
      'Fontanería en invierno: cómo proteger las tuberías del frío',
      'Grifería que gotea: cuánto agua (y dinero) pierdes al mes',
    ],
    certifications: ['RITE (Reglamento de Instalaciones Térmicas)', 'Carnet de instalador', 'Seguro de responsabilidad civil'],
  },

  // ── 2. ELECTRICISTA ─────────────────────────────────────────────────────
  electricista: {
    id: 'electricista',
    names: { ES: 'Electricista', AR: 'Electricista', UY: 'Electricista' },
    schemaType: 'Electrician',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#1d4ed8', primaryDark: '#1e3a8a', accent: '#f59e0b' },
    lucideIcons: ['zap', 'lightbulb', 'plug', 'battery-charging', 'shield-check', 'clock', 'cpu'],
    services: {
      ES: [
        { name: 'Reparación de averías eléctricas', priceRange: '60–180€' },
        { name: 'Instalación eléctrica completa', priceRange: '500–3.000€' },
        { name: 'Cambio de cuadro eléctrico', priceRange: '300–800€' },
        { name: 'Instalación de enchufes y puntos de luz', priceRange: '50–150€/ud' },
        { name: 'Carga para vehículo eléctrico (wallbox)', priceRange: '400–900€' },
        { name: 'Mantenimiento preventivo', priceRange: 'desde 80€' },
      ],
      LATAM: [
        { name: 'Reparación de cortocircuitos', priceRange: '$8.000–$30.000' },
        { name: 'Instalación eléctrica', priceRange: 'a convenir' },
        { name: 'Cambio de tablero', priceRange: '$25.000–$70.000' },
        { name: 'Instalación de tomacorrientes', priceRange: '$5.000–$15.000/ud' },
        { name: 'Puesta a tierra', priceRange: '$20.000–$50.000' },
        { name: 'Mantenimiento preventivo', priceRange: 'desde $8.000' },
      ],
    },
    trustSignals: {
      ES: ['Electricista oficial autorizado REE', 'Servicio urgente 24 horas', 'Certificado de instalación incluido'],
      LATAM: ['Matriculado en ENRE/UTE', 'Urgencias 24 hs', 'Certificado eléctrico incluido'],
    },
    seoKeywords: {
      ES: ['electricista urgente', 'avería eléctrica', 'cambio cuadro eléctrico', 'instalación wallbox', 'cortocircuito'],
      LATAM: ['electricista urgente', 'cortocircuito', 'cambio de tablero', 'instalación eléctrica barata'],
    },
    contentPrompt: `
SECTOR: Electricidad
- Servicio de URGENCIA + técnico especializado. El cliente tiene miedo al riesgo eléctrico; tranquilizarlo es clave.
- Palabras clave de dolor: "cortocircuito", "se fue la luz", "calor en enchufes", "diferencial salta".
- Diferenciadores top: certificado oficial de la instalación, respuesta rápida, electricista matriculado.
- Tendencia 2024 muy importante: instalación de wallbox para coche eléctrico (gran ticket, alta conversión).
- En la sección de servicios destaca SIEMPRE la seguridad y la normativa ("instalación conforme al REBT").
- Tono: técnico-confiable. El cliente quiere saber que el profesional sabe lo que hace y es seguro.
- Los testimonios deben mencionar rapidez en la resolución y tranquilidad tras la intervención.`,
    blogTopics: [
      'Por qué salta el diferencial y cómo solucionarlo',
      'Cuándo es obligatorio cambiar el cuadro eléctrico',
      'Instalar un wallbox en casa: todo lo que necesitas saber',
      'Señales de que tu instalación eléctrica es peligrosa',
      'Ahorro energético: cómo reducir la factura de luz en casa',
    ],
    certifications: ['Instalador autorizado REBT', 'Carnet de instalador eléctrico', 'Seguro de RC profesional'],
  },

  // ── 3. PELUQUERÍA / BARBERÍA ────────────────────────────────────────────
  peluqueria: {
    id: 'peluqueria',
    names: { ES: 'Peluquería', AR: 'Peluquería', UY: 'Peluquería' },
    schemaType: 'HairSalon',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#7c3aed', primaryDark: '#6d28d9', accent: '#ec4899' },
    lucideIcons: ['scissors', 'sparkles', 'star', 'calendar', 'heart', 'award', 'smile'],
    services: {
      ES: [
        { name: 'Corte de cabello', priceRange: '15–35€' },
        { name: 'Tinte y coloración', priceRange: '40–90€' },
        { name: 'Mechas y balayage', priceRange: '60–150€' },
        { name: 'Tratamiento de keratina', priceRange: '80–180€' },
        { name: 'Peinado para eventos', priceRange: '35–80€' },
        { name: 'Alisado permanente', priceRange: '100–200€' },
      ],
      LATAM: [
        { name: 'Corte de cabello', priceRange: '$2.500–$6.000' },
        { name: 'Coloración', priceRange: '$4.000–$12.000' },
        { name: 'Mechas', priceRange: '$5.000–$18.000' },
        { name: 'Tratamiento de keratina', priceRange: '$8.000–$20.000' },
        { name: 'Peinado para eventos', priceRange: '$3.000–$8.000' },
        { name: 'Alisado', priceRange: '$10.000–$25.000' },
      ],
    },
    trustSignals: {
      ES: ['Más de 500 clientas satisfechas', 'Productos L\'Oréal y Schwarzkopf', 'Reserva online en 2 minutos'],
      LATAM: ['Más de 500 clientas satisfechas', 'Productos profesionales importados', 'Turnos online disponibles'],
    },
    seoKeywords: {
      ES: ['peluquería cerca', 'tinte cabello barato', 'mechas balayage', 'corte de pelo mujer', 'peluquería reserva online'],
      LATAM: ['peluquería cerca', 'tinte cabello', 'mechas balayage', 'turno peluquería online'],
    },
    contentPrompt: `
SECTOR: Peluquería / Estética capilar
- El cliente busca CONFIANZA + RESULTADO VISUAL. Las fotos (antes/después) son esenciales, pero en texto las descripciones deben ser evocadoras.
- Palabras clave de deseo: "look nuevo", "cabello sano y brillante", "transformación", "color perfecto".
- Diferenciadores: productos profesionales de marca, técnicas en tendencia (balayage, keratina), reserva online fácil.
- El heroTitle debe ser aspiracional, no descriptivo. Ej: "Tu mejor versión empieza aquí" en vez de "Peluquería en Madrid".
- Los servicios deben describir el RESULTADO esperado, no solo el procedimiento.
- Testimonios: deben mencionar el cambio de look, la atención personalizada y las ganas de volver.
- Tono: cálido, cercano, femenino (o mixto si incluye barbería). Usar "te" de forma afectiva.
- NO usar el término "visagismo" ni palabras técnicas sin explicar.`,
    blogTopics: [
      'Balayage vs mechas: ¿cuál es mejor para tu cabello?',
      'Cómo cuidar el cabello teñido en casa para que dure más',
      'Tendencias de corte de pelo para esta temporada',
      'Qué es la keratina y por qué tu cabello la necesita',
      'Cómo elegir el tono de tinte perfecto para tu tono de piel',
    ],
    certifications: ['Diploma de peluquería profesional', 'Curso especializado en colorimetría', 'Certificación L\'Oréal Professionnel'],
  },

  // ── 4. DENTISTA / CLÍNICA DENTAL ────────────────────────────────────────
  dentista: {
    id: 'dentista',
    names: { ES: 'Dentista', AR: 'Odontólogo', UY: 'Odontólogo' },
    schemaType: 'Dentist',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#0891b2', primaryDark: '#0e7490', accent: '#06b6d4' },
    lucideIcons: ['shield-check', 'smile', 'heart-pulse', 'star', 'award', 'calendar', 'activity'],
    services: {
      ES: [
        { name: 'Limpieza dental (revisión incluida)', priceRange: '60–100€' },
        { name: 'Empastes y obturaciones', priceRange: '50–150€' },
        { name: 'Ortodoncia invisible (Invisalign)', priceRange: 'desde 2.500€' },
        { name: 'Blanqueamiento dental', priceRange: '150–350€' },
        { name: 'Implantes dentales', priceRange: 'desde 900€/ud' },
        { name: 'Urgencias dentales', priceRange: '60–200€' },
      ],
      LATAM: [
        { name: 'Limpieza y detartrado', priceRange: '$4.000–$10.000' },
        { name: 'Obturaciones (caries)', priceRange: '$3.000–$8.000' },
        { name: 'Ortodoncia', priceRange: 'desde $80.000' },
        { name: 'Blanqueamiento', priceRange: '$15.000–$35.000' },
        { name: 'Implantes', priceRange: 'desde $80.000/ud' },
        { name: 'Urgencias dentales', priceRange: '$5.000–$15.000' },
      ],
    },
    trustSignals: {
      ES: ['Colegiado en el COEM', 'Tecnología digital 3D', 'Financiación sin intereses disponible'],
      LATAM: ['Matriculado en COdBA/SMU', 'Tecnología de última generación', 'Planes de pago accesibles'],
    },
    seoKeywords: {
      ES: ['dentista urgencias', 'ortodoncia invisible', 'blanqueamiento dental', 'implantes dentales baratos', 'revisión dental gratuita'],
      LATAM: ['odontólogo urgencias', 'ortodoncia', 'blanqueamiento dental', 'implantes dentales'],
    },
    contentPrompt: `
SECTOR: Odontología / Clínica Dental
- El cliente tiene DOS miedos: el dolor y el precio. El copy debe neutralizar ambos explícitamente.
- Frases que funcionan: "sin dolor", "anestesia moderna", "financiación sin intereses", "primera consulta gratuita".
- Diferenciadores clave: tecnología (Invisalign, CAD/CAM, radiografía digital), colegiado, urgencias el mismo día.
- La sección de servicios debe tener precios orientativos (el cliente huye si no ve ningún precio).
- Urgencias: destacar mucho el servicio de urgencias — alta conversión y alta urgencia de compra.
- El tono debe ser PROFESIONAL-AMIGABLE. No demasiado clínico (genera miedo), no demasiado informal (genera desconfianza).
- Testimonios: deben mencionar la ausencia de dolor, el trato humano y el resultado estético.
- Importante: no exagerar con promesas de resultados. El sector tiene mucha regulación publicitaria.`,
    blogTopics: [
      'Invisalign vs brackets: ¿qué ortodoncia es mejor para adultos?',
      'Cuántos implantes dentales se pueden poner y cuánto duran',
      'Blanqueamiento dental en casa vs clínica: diferencias reales',
      'Por qué duele la muela del juicio y cuándo operarla',
      'Cómo cuidar los dientes para no ir al dentista más de lo necesario',
    ],
    certifications: ['Colegiado/Matriculado oficial', 'Especialista en Ortodoncia', 'Especialista en Implantología', 'Certificación Invisalign'],
  },

  // ── 5. RESTAURANTE / BAR ────────────────────────────────────────────────
  restaurante: {
    id: 'restaurante',
    names: { ES: 'Restaurante', AR: 'Restaurante', UY: 'Restaurante' },
    schemaType: 'Restaurant',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#b45309', primaryDark: '#92400e', accent: '#dc2626' },
    lucideIcons: ['utensils', 'chef-hat', 'wine', 'clock', 'map-pin', 'star', 'calendar'],
    services: {
      ES: [
        { name: 'Menú del día', priceRange: '10–18€' },
        { name: 'Carta completa', priceRange: '20–45€/persona' },
        { name: 'Celebraciones y grupos', priceRange: 'desde 25€/persona' },
        { name: 'Menú degustación', priceRange: '45–80€' },
        { name: 'Catering para eventos', priceRange: 'a consultar' },
        { name: 'Reserva privada de sala', priceRange: 'a consultar' },
      ],
      LATAM: [
        { name: 'Almuerzo ejecutivo', priceRange: '$800–$2.000' },
        { name: 'Cena a la carta', priceRange: '$2.000–$5.000/persona' },
        { name: 'Celebraciones', priceRange: 'desde $2.000/persona' },
        { name: 'Servicio de catering', priceRange: 'a consultar' },
        { name: 'Mesa para eventos corporativos', priceRange: 'a consultar' },
      ],
    },
    trustSignals: {
      ES: ['Cocina de mercado con ingredientes locales', 'Abierto todos los días', 'Reserva tu mesa en 1 minuto'],
      LATAM: ['Ingredientes frescos del día', 'Abierto todos los días', 'Reservá tu mesa en 1 minuto'],
    },
    seoKeywords: {
      ES: ['restaurante cerca', 'menú del día', 'restaurante celebraciones', 'restaurante con reserva online', 'donde comer hoy'],
      LATAM: ['restaurante cerca', 'almuerzo ejecutivo', 'restaurante para celebraciones', 'reserva online'],
    },
    contentPrompt: `
SECTOR: Restaurante / Gastronomía
- El cliente decide con los sentidos: el copy debe despertar el apetito y la imaginación. Descripciones evocadoras.
- Palabras que funcionan: "producto fresco", "receta de la abuela", "ingredientes de temporada", "sabor auténtico".
- Diferenciadores: cocina local/tradicional vs innovadora, ambiente, relación calidad-precio, facilidad de reserva.
- El heroTitle debe crear DESEO, no describir: "Donde cada plato cuenta una historia" > "Restaurante en Valencia".
- Servicios: incluir menú del día (gran captador de tráfico SEO) y servicio para celebraciones (alto ticket).
- Testimonios: deben mencionar la calidad de la comida, el servicio y el ambiente.
- Blog: artículos de recetas o ingredientes de temporada tienen tráfico orgánico alto.
- Tono: cálido, apetecible, evocador. Como si el chef hablara directamente al cliente.
- NO usar frases genéricas como "la mejor cocina de la ciudad" sin contexto.`,
    blogTopics: [
      'Los mejores platos de nuestra carta para compartir en grupo',
      'Cómo elegir el vino perfecto para cada plato',
      'Menú para comuniones y celebraciones: todo lo que debes saber',
      'Ingredientes de temporada: por qué comemos lo que toca',
      'La historia detrás de nuestro plato estrella',
    ],
    certifications: ['Carnet de manipulador de alimentos', 'Registro sanitario', 'Certificación de alérgenos'],
  },

  // ── 6. GIMNASIO / CENTRO FITNESS ────────────────────────────────────────
  gimnasio: {
    id: 'gimnasio',
    names: { ES: 'Gimnasio', AR: 'Gimnasio', UY: 'Gimnasio' },
    schemaType: 'HealthClub',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#dc2626', primaryDark: '#b91c1c', accent: '#f97316' },
    lucideIcons: ['dumbbell', 'activity', 'heart', 'timer', 'trophy', 'users', 'flame'],
    services: {
      ES: [
        { name: 'Cuota mensual sala de musculación', priceRange: '25–50€/mes' },
        { name: 'Clases dirigidas (yoga, spinning, etc.)', priceRange: '30–60€/mes' },
        { name: 'Entrenamiento personal', priceRange: '40–70€/sesión' },
        { name: 'Plan nutricional', priceRange: '80–200€' },
        { name: 'Acceso libre 24 horas', priceRange: '35–60€/mes' },
        { name: 'Matrícula de inscripción', priceRange: '0–30€' },
      ],
      LATAM: [
        { name: 'Cuota mensual sala', priceRange: '$5.000–$15.000/mes' },
        { name: 'Clases grupales', priceRange: '$6.000–$18.000/mes' },
        { name: 'Entrenador personal', priceRange: '$3.000–$8.000/sesión' },
        { name: 'Plan nutricional', priceRange: '$10.000–$30.000' },
        { name: 'Pack trimestral', priceRange: '$12.000–$35.000' },
      ],
    },
    trustSignals: {
      ES: ['Entrenadores titulados TAFAD/CCAFD', 'Maquinaria Technogym', 'Primera semana gratis'],
      LATAM: ['Entrenadores certificados', 'Equipamiento de primera línea', 'Primera semana sin cargo'],
    },
    seoKeywords: {
      ES: ['gimnasio cerca', 'gimnasio barato', 'clases de yoga', 'entrenador personal', 'gimnasio 24 horas'],
      LATAM: ['gimnasio cerca', 'cuota gimnasio', 'clases de fitness', 'entrenador personal'],
    },
    contentPrompt: `
SECTOR: Gimnasio / Centro Fitness
- El cliente busca TRANSFORMACIÓN FÍSICA + MOTIVACIÓN. El copy debe inspirar acción.
- Palabras que activan: "tu mejor versión", "sin excusas", "resultados reales", "comunidad", "energía".
- Diferenciadores: horario amplio/24h, entrenadores titulados, ambiente, tipo de clases, precio.
- El heroTitle debe ser motivacional y aspiracional. Ej: "Empieza hoy, nota el cambio en 30 días".
- MUY IMPORTANTE: mencionar la oferta de captación (primera semana gratis, matrícula sin coste) en el hero.
- Servicios: desglosar bien las cuotas — el cliente quiere comparar. Incluir pack anual con descuento.
- Testimonios: deben mostrar transformaciones reales (pérdida de peso, ganar músculo, mejorar salud).
- Blog: contenido de fitness y nutrición tiene altísimo tráfico orgánico. Usarlo para captar leads.
- Tono: enérgico, motivador, directo. Sin condescendencia ni presión excesiva.`,
    blogTopics: [
      'Rutina de 3 días para principiantes: cómo empezar en el gym sin perderte',
      'Cardio vs pesas: qué es mejor para perder grasa',
      'Los 5 errores más comunes al hacer ejercicio (y cómo evitarlos)',
      'Qué comer antes y después del entrenamiento para mejores resultados',
      'Cómo mantenerse motivado cuando no tienes ganas de ir al gimnasio',
    ],
    certifications: ['TAFAD / Grado en CCAFD', 'Certificación entrenador personal', 'Licencia de apertura de centro deportivo'],
  },

  // ── 7. TALLER MECÁNICO ──────────────────────────────────────────────────
  taller: {
    id: 'taller',
    names: { ES: 'Taller Mecánico', AR: 'Taller Mecánico', UY: 'Taller Mecánico' },
    schemaType: 'AutoRepair',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#374151', primaryDark: '#1f2937', accent: '#f59e0b' },
    lucideIcons: ['wrench', 'car', 'settings', 'shield-check', 'clock', 'gauge', 'tool'],
    services: {
      ES: [
        { name: 'Cambio de aceite y filtros', priceRange: '40–80€' },
        { name: 'Revisión pre-ITV', priceRange: '30–60€' },
        { name: 'Cambio de frenos y pastillas', priceRange: '80–250€' },
        { name: 'Diagnóstico electrónico', priceRange: '30–60€' },
        { name: 'Cambio de correa de distribución', priceRange: '200–600€' },
        { name: 'Neumáticos y equilibrado', priceRange: '50–200€' },
      ],
      LATAM: [
        { name: 'Cambio de aceite y filtros', priceRange: '$5.000–$15.000' },
        { name: 'Revisión general', priceRange: '$3.000–$8.000' },
        { name: 'Cambio de frenos', priceRange: '$8.000–$25.000' },
        { name: 'Diagnóstico electrónico', priceRange: '$3.000–$8.000' },
        { name: 'Correa de distribución', priceRange: '$20.000–$60.000' },
        { name: 'Cubiertas y balanceo', priceRange: '$5.000–$20.000' },
      ],
    },
    trustSignals: {
      ES: ['Taller oficial multimarca', 'Garantía de 12 meses en reparaciones', 'Presupuesto previo sin cargo'],
      LATAM: ['Mecánico matriculado', 'Garantía en reparaciones', 'Presupuesto gratis'],
    },
    seoKeywords: {
      ES: ['taller mecánico barato', 'revisión ITV', 'cambio aceite', 'taller cerca', 'diagnóstico coche'],
      LATAM: ['taller mecánico', 'mecánico barato', 'cambio de aceite', 'taller cerca'],
    },
    contentPrompt: `
SECTOR: Taller Mecánico / Reparación de Vehículos
- El cliente está preocupado por: precio (¿me van a engañar?), tiempo (¿cuánto tarda?) y confianza (¿saben lo que hacen?).
- El copy debe neutralizar el miedo al timo: "presupuesto detallado antes de empezar", "sin sorpresas en la factura".
- Diferenciadores: rapidez, multimarca, diagnóstico electrónico, garantía en mano de obra.
- La revisión pre-ITV es un gancho de captación EXCELENTE (mucha búsqueda estacional, precio bajo, gran puerta de entrada).
- Los servicios deben tener precios orientativos — el cliente que no ve precios llama al competidor.
- Testimonios: deben hablar de honestidad, rapidez y buen precio. La desconfianza es el mayor freno de compra.
- Tono: honesto, técnico pero accesible, seguro. El mecánico de confianza del barrio.
- Blog: consejos de mantenimiento tienen mucho tráfico y posicionan como expertos.`,
    blogTopics: [
      'Cuándo hacer la revisión del coche: kilometraje vs tiempo',
      'Señales de que los frenos de tu coche necesitan cambio urgente',
      'Cómo pasar la ITV a la primera: checklist completo',
      'Por qué el aceite del motor es la sangre de tu coche',
      'Los 5 fallos más comunes en vehículos y cuánto cuesta repararlos',
    ],
    certifications: ['Taller oficial homologado', 'Operario cualificado RR.HH.', 'Certificado de gestión de residuos'],
  },

  // ── 8. CERRAJERO ────────────────────────────────────────────────────────
  cerrajero: {
    id: 'cerrajero',
    names: { ES: 'Cerrajero', AR: 'Cerrajero', UY: 'Cerrajero' },
    schemaType: 'Locksmith',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#0f172a', primaryDark: '#020617', accent: '#f59e0b' },
    lucideIcons: ['key', 'lock', 'shield', 'clock', 'phone', 'wrench', 'shield-check'],
    services: {
      ES: [
        { name: 'Apertura de puertas urgente', priceRange: '60–150€' },
        { name: 'Cambio de cerradura de seguridad', priceRange: '80–200€' },
        { name: 'Instalación de bombín', priceRange: '60–120€' },
        { name: 'Blindaje de puertas', priceRange: '300–900€' },
        { name: 'Apertura de cajas fuertes', priceRange: '100–300€' },
        { name: 'Copia de llaves de seguridad', priceRange: '15–60€' },
      ],
      LATAM: [
        { name: 'Apertura de puertas urgente', priceRange: '$8.000–$20.000' },
        { name: 'Cambio de cerradura', priceRange: '$10.000–$25.000' },
        { name: 'Instalación de cerradura de seguridad', priceRange: '$8.000–$20.000' },
        { name: 'Duplicado de llaves', priceRange: '$2.000–$8.000' },
        { name: 'Cambio de cilindro', priceRange: '$6.000–$15.000' },
      ],
    },
    trustSignals: {
      ES: ['Disponible 24 horas, 7 días', 'Sin deterioro de la puerta', 'Llegada en menos de 30 minutos'],
      LATAM: ['Urgencias 24 hs', 'Sin daños en la puerta', 'Llegamos en 30 minutos'],
    },
    seoKeywords: {
      ES: ['cerrajero urgente', 'cerrajero 24 horas', 'abrir puerta sin llave', 'cambio cerradura', 'cerrajero barato'],
      LATAM: ['cerrajero urgente', 'abrir puerta sin llave', 'cambio de cerradura', 'cerrajero 24 hs'],
    },
    contentPrompt: `
SECTOR: Cerrajería / Cerrajero de urgencias
- Es el sector de urgencia PURA: el 90% de las llamadas son porque el cliente está ENCERRADO. Máxima urgencia en el copy.
- El heroTitle y la primera sección deben empezar con la urgencia: "¿Estás encerrado? Llamamos en 30 minutos".
- El teléfono debe aparecer en el hero, en el nav, y en la sección de contacto. Es el principal CTA.
- Diferenciadores críticos: tiempo de llegada prometido, sin deterioro de la puerta, precio cerrado antes de actuar.
- ALERTA SECTOR: hay muchos cerrajeros fraudulentos. El copy debe construir confianza agresivamente.
- Testimonios: rapidez de llegada + precio justo + no rompieron la puerta = combinación perfecta.
- Servicios: la apertura urgente es el hero del producto. El resto (cerraduras, blindajes) son upsells.
- Tono: directo, tranquilizador, resolutivo. "Estamos en 30 minutos" > "nos caracterizamos por la rapidez".`,
    blogTopics: [
      'Qué hacer si te has quedado sin llaves: guía rápida',
      'Cerraduras de seguridad: cuál elegir para tu hogar',
      'Cómo saber si tu cerradura necesita cambio urgente',
      'Blindar una puerta: cuánto cuesta y cuánto seguridad da',
      'Los cerrajeros falsos: cómo identificarlos y evitarlos',
    ],
    certifications: ['Cerrajero acreditado', 'Seguro de responsabilidad civil', 'Empresa inscrita en el RAE'],
  },

  // ── 9. PINTOR ───────────────────────────────────────────────────────────
  pintor: {
    id: 'pintor',
    names: { ES: 'Pintor', AR: 'Pintor', UY: 'Pintor' },
    schemaType: 'HousePainter',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#0d9488', primaryDark: '#0f766e', accent: '#f97316' },
    lucideIcons: ['paint-bucket', 'brush', 'home', 'sparkles', 'star', 'award', 'check-circle'],
    services: {
      ES: [
        { name: 'Pintura de habitación completa', priceRange: '150–400€' },
        { name: 'Pintura de piso completo', priceRange: '800–2.500€' },
        { name: 'Pintura de fachada', priceRange: '500–3.000€' },
        { name: 'Pintura decorativa y efectos', priceRange: '200–600€' },
        { name: 'Papel pintado / vinílico', priceRange: '150–500€' },
        { name: 'Lacado de puertas y carpintería', priceRange: '100–300€' },
      ],
      LATAM: [
        { name: 'Pintura de habitación', priceRange: '$15.000–$40.000' },
        { name: 'Pintura de departamento', priceRange: '$50.000–$150.000' },
        { name: 'Pintura de fachada', priceRange: '$30.000–$150.000' },
        { name: 'Pintura decorativa', priceRange: '$20.000–$60.000' },
        { name: 'Papel tapiz / empapelado', priceRange: '$15.000–$50.000' },
      ],
    },
    trustSignals: {
      ES: ['Más de 200 pisos pintados', 'Pinturas Bruguer y Valentine', 'Presupuesto gratis en 24 horas'],
      LATAM: ['Más de 200 trabajos realizados', 'Pinturas de primera marca', 'Presupuesto sin cargo'],
    },
    seoKeywords: {
      ES: ['pintor barato', 'pintar piso precio', 'pintor profesional', 'presupuesto pintura', 'pintar habitación'],
      LATAM: ['pintor barato', 'pintar departamento', 'pintor profesional', 'presupuesto pintura'],
    },
    contentPrompt: `
SECTOR: Pintura / Pintores profesionales
- El cliente quiere ver el resultado: el copy debe ser visual y describir la transformación del espacio.
- Palabras clave de deseo: "espacio renovado", "como nuevo", "acabados perfectos", "sin manchas ni goteos".
- Diferenciadores: limpieza y orden en el trabajo, uso de pinturas de marca, rapidez, presupuesto cerrado.
- El heroTitle debe mostrar la transformación: "Tu hogar, renovado en 48 horas" > "Pintores en Barcelona".
- El precio por m² es el gancho de captación más potente del sector — inclúyelo en la sección de servicios.
- Testimonios: deben mencionar la limpieza, puntualidad y calidad del acabado (los 3 mayores miedos del cliente).
- Blog: tutoriales y guías de colores tienen mucho tráfico de clientes en fase de decisión.
- Tono: práctico, profesional, orientado al resultado. El buen pintor que todos quieren pero pocos encuentran.`,
    blogTopics: [
      'Cómo elegir el color de pintura para cada habitación',
      'Cuánto cuesta pintar un piso: guía de precios actualizada',
      'Pintura satinada vs mate: cuándo usar cada una',
      'Cómo preparar las paredes antes de pintar para un acabado perfecto',
      'Tendencias de colores para el hogar este año',
    ],
    certifications: ['Técnico en pintura decorativa', 'Aplicador certificado de pinturas técnicas', 'Seguro de RC en obra'],
  },

  // ── 10. FISIOTERAPIA ────────────────────────────────────────────────────
  fisioterapia: {
    id: 'fisioterapia',
    names: { ES: 'Fisioterapeuta', AR: 'Kinesiólogo', UY: 'Kinesiólogo' },
    schemaType: 'PhysicalTherapy',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#059669', primaryDark: '#047857', accent: '#06b6d4' },
    lucideIcons: ['heart-pulse', 'activity', 'hand', 'shield-check', 'star', 'calendar', 'award'],
    services: {
      ES: [
        { name: 'Fisioterapia manual', priceRange: '40–70€/sesión' },
        { name: 'Rehabilitación de lesiones deportivas', priceRange: '45–80€/sesión' },
        { name: 'Punción seca (dry needling)', priceRange: '50–80€/sesión' },
        { name: 'Electroterapia y ultrasonidos', priceRange: '35–60€/sesión' },
        { name: 'Fisioterapia respiratoria', priceRange: '40–70€/sesión' },
        { name: 'Tratamiento de cervicales y lumbares', priceRange: '40–75€/sesión' },
      ],
      LATAM: [
        { name: 'Kinesiología manual', priceRange: '$4.000–$10.000/sesión' },
        { name: 'Rehabilitación deportiva', priceRange: '$5.000–$12.000/sesión' },
        { name: 'Punción seca', priceRange: '$5.000–$12.000/sesión' },
        { name: 'Electroterapia', priceRange: '$3.000–$8.000/sesión' },
        { name: 'Tratamiento de contracturas', priceRange: '$4.000–$10.000/sesión' },
      ],
    },
    trustSignals: {
      ES: ['Colegiado en el CPFC', 'Titulado en Fisioterapia por universidad pública', 'Primera sesión de valoración gratuita'],
      LATAM: ['Kinesiólogo matriculado', 'Titulado universitario', 'Sesión de evaluación sin cargo'],
    },
    seoKeywords: {
      ES: ['fisioterapeuta cerca', 'fisioterapia barata', 'lesión cervical', 'punción seca', 'fisioterapia deportiva'],
      LATAM: ['kinesiólogo cerca', 'kinesiología barata', 'rehabilitación deportiva', 'contractura cervical'],
    },
    contentPrompt: `
SECTOR: Fisioterapia / Kinesiología
- El cliente viene con DOLOR. El copy debe transmitir alivio, recuperación y volver a la vida normal.
- Frases que funcionan: "sin dolor en X sesiones", "vuelve a moverte libre", "tratamiento personalizado".
- Diferenciadores: titulación colegiada, técnicas avanzadas (punción seca, terapia manual), primera valoración gratuita.
- La primera consulta gratuita es el gancho de conversión más potente del sector — destacar en el hero.
- Servicios: explicar brevemente qué ES cada tratamiento (muchos clientes no saben qué es la punción seca).
- Testimonios: deben mostrar recuperación de dolor crónico o lesión deportiva específica.
- Blog: artículos de dolor de espalda, cervicales y lesiones deportivas tienen altísimo tráfico.
- Tono: empático, profesional, esperanzador. El cliente quiere recuperarse, no escuchar terminología médica.`,
    blogTopics: [
      'Cervicales: ejercicios para aliviar el dolor en casa',
      'Cuántas sesiones de fisioterapia necesitas para una lesión de espalda',
      'Punción seca: qué es y para qué sirve realmente',
      'Cómo prevenir lesiones si trabajas muchas horas sentado',
      'Fisioterapia deportiva: cuándo ir antes y después de la lesión',
    ],
    certifications: ['Grado en Fisioterapia', 'Colegiado CPFC/KINE', 'Formación en punción seca', 'Máster en fisioterapia deportiva'],
  },

  // ── 11. VETERINARIO ─────────────────────────────────────────────────────
  veterinario: {
    id: 'veterinario',
    names: { ES: 'Veterinario', AR: 'Veterinario', UY: 'Veterinario' },
    schemaType: 'VeterinaryCare',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#16a34a', primaryDark: '#15803d', accent: '#f59e0b' },
    lucideIcons: ['heart', 'shield-check', 'stethoscope', 'star', 'calendar', 'clock', 'award'],
    services: {
      ES: [
        { name: 'Consulta veterinaria general', priceRange: '30–60€' },
        { name: 'Vacunación y desparasitación', priceRange: '20–50€' },
        { name: 'Urgencias veterinarias', priceRange: '60–150€' },
        { name: 'Cirugía veterinaria', priceRange: '200–1.500€' },
        { name: 'Peluquería canina/felina', priceRange: '25–60€' },
        { name: 'Servicio de radiología y analíticas', priceRange: '50–150€' },
      ],
      LATAM: [
        { name: 'Consulta veterinaria', priceRange: '$3.000–$8.000' },
        { name: 'Vacunas y desparasitación', priceRange: '$2.000–$5.000' },
        { name: 'Urgencias', priceRange: '$5.000–$15.000' },
        { name: 'Cirugía', priceRange: '$20.000–$120.000' },
        { name: 'Baño y peluquería', priceRange: '$2.500–$6.000' },
      ],
    },
    trustSignals: {
      ES: ['Veterinario colegiado', 'Urgencias disponibles', 'Más de 1.000 pacientes atendidos'],
      LATAM: ['Veterinario matriculado', 'Urgencias 24 hs', 'Más de 1.000 mascotas atendidas'],
    },
    seoKeywords: {
      ES: ['veterinario cerca', 'veterinario barato', 'urgencias veterinarias', 'vacunas perro', 'clínica veterinaria'],
      LATAM: ['veterinario cerca', 'veterinario barato', 'urgencias veterinarias', 'vacunas perro'],
    },
    contentPrompt: `
SECTOR: Veterinaria / Clínica Veterinaria
- El cliente ama a su mascota. El copy debe reflejar ese amor y transmitir cuidado genuino por los animales.
- Frases que conectan emocionalmente: "porque tu mascota es parte de la familia", "los cuidamos como si fueran nuestros".
- Diferenciadores: urgencias (alta demanda), veterinario colegiado con nombre, tecnología (radiología, analíticas in situ).
- Las urgencias son un producto de entrada de alta conversión — destacarlas con número de teléfono visible.
- Servicios: incluir peluquería canina (menor ticket pero muy demandada, genera tráfico de vuelta).
- Testimonios: historias de mascotas recuperadas de enfermedades o cirugías tienen alto impacto emocional.
- Blog: consejos de salud animal y nutrición son muy buscados por propietarios de mascotas.
- Tono: cálido, empático, profesional. Hablar de las mascotas por su especie, no como "el animal".`,
    blogTopics: [
      'Cuándo vacunar a tu perro: calendario completo por edades',
      'Señales de que tu gato no se encuentra bien y qué hacer',
      'Alimentación sana para perros: qué pueden y qué no pueden comer',
      'Cómo preparar a tu mascota para la primera visita al veterinario',
      'Las enfermedades más frecuentes en perros y cómo prevenirlas',
    ],
    certifications: ['Licenciado en Veterinaria', 'Colegiado COVB/COLVEMA', 'Especialista en cirugía', 'Certificado de ecografía'],
  },

  // ── 12. ACADEMIA / CLASES PARTICULARES ─────────────────────────────────
  academia: {
    id: 'academia',
    names: { ES: 'Academia', AR: 'Instituto', UY: 'Academia' },
    schemaType: 'EducationalOrganization',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#4f46e5', primaryDark: '#4338ca', accent: '#06b6d4' },
    lucideIcons: ['book-open', 'graduation-cap', 'star', 'users', 'award', 'calendar', 'check-circle'],
    services: {
      ES: [
        { name: 'Clases particulares ESO/Bachillerato', priceRange: '15–35€/hora' },
        { name: 'Preparación de oposiciones', priceRange: '200–500€/mes' },
        { name: 'Inglés (todos los niveles)', priceRange: '80–200€/mes' },
        { name: 'Matemáticas y física', priceRange: '15–30€/hora' },
        { name: 'Clases online', priceRange: '12–25€/hora' },
        { name: 'Clases grupales reducidas', priceRange: '60–150€/mes' },
      ],
      LATAM: [
        { name: 'Clases particulares secundaria', priceRange: '$2.000–$6.000/hora' },
        { name: 'Preparación de ingreso universitario', priceRange: '$8.000–$25.000/mes' },
        { name: 'Inglés', priceRange: '$3.000–$10.000/mes' },
        { name: 'Matemáticas y exactas', priceRange: '$2.000–$5.000/hora' },
        { name: 'Clases virtuales', priceRange: '$1.500–$4.000/hora' },
      ],
    },
    trustSignals: {
      ES: ['Profesores titulados universitarios', 'Más del 90% de alumnos aprobados', 'Primera clase de prueba gratuita'],
      LATAM: ['Profesores universitarios', 'Más del 90% de ingresantes', 'Primera clase de prueba sin cargo'],
    },
    seoKeywords: {
      ES: ['clases particulares', 'academia barata', 'preparar selectividad', 'clases inglés', 'profesor particular'],
      LATAM: ['clases particulares', 'preparación ingreso', 'clases de inglés', 'profesor particular online'],
    },
    contentPrompt: `
SECTOR: Academia / Clases Particulares
- El cliente (padre/madre o estudiante) busca RESULTADOS ACADÉMICOS. El copy debe hablar de aprobar, subir nota, ingresar.
- Frases que funcionan: "más del 90% de alumnos aprueba a la primera", "de suspenso a notable en 3 meses".
- Diferenciadores: profesores titulados (no estudiantes), grupos reducidos, metodología personalizada, opción online.
- La clase de prueba gratuita es el gancho de conversión clave — destacar en el hero con urgencia de plazas.
- Servicios: desglosar por asignatura/nivel Y por formato (individual vs grupal vs online).
- Testimonios: deben mostrar mejora de notas o acceso a la universidad/trabajo deseado.
- Blog: artículos de técnicas de estudio y preparación de exámenes tienen mucho tráfico estacional.
- Tono: motivador, cercano, orientado a resultados. Hablar del éxito del alumno, no de las características del servicio.`,
    blogTopics: [
      'Cómo estudiar para los exámenes finales: técnicas que realmente funcionan',
      'Por qué las matemáticas se les dan mal a muchos alumnos (y cómo solucionarlo)',
      'Clases presenciales vs online: ¿qué funciona mejor?',
      'Cómo preparar la selectividad en los últimos meses',
      'Señales de que tu hijo necesita refuerzo escolar cuanto antes',
    ],
    certifications: ['Profesores con titulación universitaria', 'Centro homologado', 'Metodología certificada'],
  },

  // ── 13. EMPRESA DE LIMPIEZA ─────────────────────────────────────────────
  limpieza: {
    id: 'limpieza',
    names: { ES: 'Empresa de Limpieza', AR: 'Empresa de Limpieza', UY: 'Empresa de Limpieza' },
    schemaType: 'HouseCleaning',
    isEmergency: false,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#0891b2', primaryDark: '#0e7490', accent: '#10b981' },
    lucideIcons: ['sparkles', 'home', 'check-circle', 'star', 'shield-check', 'clock', 'users'],
    services: {
      ES: [
        { name: 'Limpieza de hogar (por horas)', priceRange: '12–20€/hora' },
        { name: 'Limpieza a fondo', priceRange: '120–300€' },
        { name: 'Limpieza de oficinas', priceRange: 'desde 200€/mes' },
        { name: 'Limpieza post-obra', priceRange: '200–600€' },
        { name: 'Limpieza de cristales', priceRange: '50–200€' },
        { name: 'Limpieza de comunidades', priceRange: 'desde 300€/mes' },
      ],
      LATAM: [
        { name: 'Limpieza de hogar', priceRange: '$1.500–$4.000/hora' },
        { name: 'Limpieza a fondo', priceRange: '$10.000–$30.000' },
        { name: 'Limpieza de oficinas', priceRange: 'desde $15.000/mes' },
        { name: 'Limpieza post-obra', priceRange: '$20.000–$60.000' },
        { name: 'Limpieza de vidrios', priceRange: '$5.000–$20.000' },
      ],
    },
    trustSignals: {
      ES: ['Personal contratado y asegurado', 'Productos ecológicos incluidos', 'Sin permanencia — cancela cuando quieras'],
      LATAM: ['Personal en relación de dependencia', 'Productos incluidos', 'Sin contratos de permanencia'],
    },
    seoKeywords: {
      ES: ['empresa de limpieza', 'limpieza de hogar', 'servicio de limpieza barato', 'limpieza de oficinas', 'limpiar piso'],
      LATAM: ['empresa de limpieza', 'limpieza de hogar', 'servicio doméstico', 'limpieza de oficinas'],
    },
    contentPrompt: `
SECTOR: Empresa de Limpieza del Hogar y Oficinas
- El cliente busca CONFIANZA (alguien en su casa) + RESULTADO VISIBLE + PRECIO CLARO.
- Frases que funcionan: "tu casa, impecable", "sin preocuparte de nada", "personal de confianza asegurado".
- El mayor freno de compra es dejar entrar a desconocidos: neutralizarlo es la prioridad del copy.
- Diferenciadores: personal con contrato y seguro, sin permanencia, productos ecológicos, horarios flexibles.
- Los servicios deben tener precio por hora O por superficie (no "precio a consultar" en los básicos).
- Testimonios: deben hablar de la confianza ganada, el resultado impecable y la puntualidad.
- Blog: consejos de limpieza y organización del hogar tienen altísimo tráfico y engagement.
- Tono: cercano, confiable, práctico. Como la persona de confianza que viene a ayudarte.`,
    blogTopics: [
      'Cómo organizar la limpieza del hogar semana a semana sin agobiarte',
      'Productos de limpieza ecológicos que realmente funcionan',
      'Cómo limpiar el baño y que dure el resultado más tiempo',
      'Limpieza post-mudanza: por dónde empezar',
      'Cuánto cuesta contratar una empresa de limpieza: guía de precios',
    ],
    certifications: ['Empresa inscrita en REA', 'Seguro de responsabilidad civil', 'Personal con contrato laboral', 'Certificado de manipulación de productos químicos'],
  },

  // ── 14. MECÁNICO (motos / vehículos a domicilio) ────────────────────────
  mecanico: {
    id: 'mecanico',
    names: { ES: 'Mecánico', AR: 'Mecánico', UY: 'Mecánico' },
    schemaType: 'AutoRepair',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#292524', primaryDark: '#1c1917', accent: '#f97316' },
    lucideIcons: ['wrench', 'bike', 'settings', 'shield-check', 'clock', 'phone', 'tool'],
    services: {
      ES: [
        { name: 'Reparación de motocicletas', priceRange: '40–200€' },
        { name: 'Mecánico a domicilio', priceRange: '60–150€' },
        { name: 'Cambio de aceite y filtros (moto)', priceRange: '30–70€' },
        { name: 'Revisión general de vehículo', priceRange: '40–80€' },
        { name: 'Reparación de scooters eléctricos', priceRange: '50–180€' },
        { name: 'Diagnóstico de averías', priceRange: '30–60€' },
      ],
      LATAM: [
        { name: 'Reparación de motos', priceRange: '$4.000–$20.000' },
        { name: 'Mecánico a domicilio', priceRange: '$5.000–$15.000' },
        { name: 'Cambio de aceite (moto)', priceRange: '$2.500–$6.000' },
        { name: 'Revisión general', priceRange: '$3.000–$8.000' },
        { name: 'Diagnóstico de averías', priceRange: '$2.500–$6.000' },
      ],
    },
    trustSignals: {
      ES: ['Mecánico certificado con 10+ años', 'Servicio a domicilio disponible', 'Presupuesto gratis sin compromiso'],
      LATAM: ['Mecánico matriculado', 'Vamos a domicilio', 'Presupuesto sin cargo'],
    },
    seoKeywords: {
      ES: ['mecánico motos', 'reparación motocicleta', 'mecánico a domicilio', 'taller motos barato'],
      LATAM: ['mecánico motos', 'reparación moto', 'mecánico a domicilio', 'taller motos'],
    },
    contentPrompt: `
SECTOR: Mecánica de Motos / Vehículos a domicilio
- Diferenciador clave: servicio A DOMICILIO — el cliente no necesita mover la moto averiada.
- Palabras de dolor: "moto que no arranca", "scooter averiado", "no puedo ir al taller".
- El heroTitle debe destacar el servicio móvil: "Tu mecánico llega donde estás".
- Urgencia real: muchos clientes tienen una moto como único transporte — necesitan solución rápida.
- Blog: tutoriales de mantenimiento preventivo de moto tienen mucho tráfico.
- Tono: práctico, técnico, directo. El mecánico de confianza que viene a ti.`,
    blogTopics: [
      'Mantenimiento básico de moto que puedes hacer tú mismo',
      'Señales de que tu moto necesita revisión urgente',
      'Cómo elegir el aceite correcto para tu motocicleta',
      'Mecánico a domicilio vs taller: ¿cuándo conviene cada uno?',
      'Los problemas más frecuentes en scooters eléctricos',
    ],
    certifications: ['Certificado de mecánico de vehículos', 'Carnet de conducir A2/A', 'Seguro de RC profesional'],
  },

  // ── 15. AIRE ACONDICIONADO / CLIMATIZACIÓN ──────────────────────────────
  'aire-acondicionado': {
    id: 'aire-acondicionado',
    names: { ES: 'Aire Acondicionado', AR: 'Aire Acondicionado', UY: 'Aire Acondicionado' },
    schemaType: 'HVACBusiness',
    isEmergency: true,
    availableIn: ['ES', 'AR', 'UY'],
    defaultColors: { primary: '#0369a1', primaryDark: '#075985', accent: '#22c55e' },
    lucideIcons: ['wind', 'thermometer', 'snowflake', 'settings', 'shield-check', 'clock', 'zap'],
    services: {
      ES: [
        { name: 'Instalación de aire acondicionado', priceRange: '300–800€' },
        { name: 'Reparación de averías urgentes', priceRange: '60–200€' },
        { name: 'Mantenimiento y limpieza anual', priceRange: '60–120€' },
        { name: 'Recarga de gas refrigerante', priceRange: '80–200€' },
        { name: 'Instalación bomba de calor', priceRange: '800–2.500€' },
        { name: 'Revisión pre-verano', priceRange: '50–90€' },
      ],
      LATAM: [
        { name: 'Instalación de split', priceRange: '$15.000–$40.000' },
        { name: 'Reparación urgente', priceRange: '$5.000–$20.000' },
        { name: 'Mantenimiento y limpieza', priceRange: '$4.000–$10.000' },
        { name: 'Carga de gas', priceRange: '$6.000–$18.000' },
        { name: 'Instalación bomba de calor', priceRange: '$50.000–$150.000' },
      ],
    },
    trustSignals: {
      ES: ['Técnico certificado F-Gas', 'Servicio urgente en verano', 'Garantía de 2 años en instalaciones'],
      LATAM: ['Técnico certificado', 'Urgencias en temporada', 'Garantía en instalaciones'],
    },
    seoKeywords: {
      ES: ['aire acondicionado barato', 'instalar aire acondicionado', 'reparación aire acondicionado', 'técnico clima urgente', 'mantenimiento AC'],
      LATAM: ['aire acondicionado barato', 'instalación split', 'reparación aire acondicionado', 'técnico clima'],
    },
    contentPrompt: `
SECTOR: Aire Acondicionado / Climatización (HVAC)
- Servicio ESTACIONAL de alta urgencia: en verano/invierno el cliente no puede esperar.
- El copy debe crear urgencia estacional: "¿Sin frío en pleno agosto?" / "¿Sin calefacción en diciembre?"
- Diferenciadores: técnico certificado F-Gas (obligatorio en ES), rapidez en temporada alta, garantía.
- La instalación nueva es el producto principal (alto ticket). El mantenimiento pre-verano es el gancho de captación.
- Las averías urgentes en julio/agosto tienen ALTÍSIMA conversión — destacar disponibilidad.
- Blog: guías de eficiencia energética y ahorro en factura tienen mucho tráfico anual.
- Tono: técnico, eficiente, tranquilizador. "Tu casa a la temperatura perfecta, garantizado".`,
    blogTopics: [
      'Cuándo limpiar el filtro del aire acondicionado (y cómo hacerlo)',
      'Split fijo vs portátil: ¿cuál consume menos y enfría mejor?',
      'Cómo ahorrar en la factura de luz con el aire acondicionado',
      'Señales de que tu aire acondicionado necesita carga de gas',
      'Bomba de calor vs caldera: ¿cuál es más eficiente en 2026?',
    ],
    certifications: ['Certificado F-Gas (Reglamento 517/2014)', 'Instalador RITE', 'Seguro de RC profesional'],
  },

};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Obtiene la config del sector, con fallback a config genérica */
export function getSectorConfig(sectorId: string): SectorConfig | null {
  return SECTORS[sectorId] ?? null;
}

/** Nombre localizado del sector según país */
export function getSectorName(sectorId: string, country: 'ES' | 'AR' | 'UY'): string {
  const cfg = getSectorConfig(sectorId);
  if (!cfg) return sectorId;
  return cfg.names[country] || cfg.names.ES;
}

/** Lista de todos los IDs de sector disponibles */
export const ALL_SECTOR_IDS = Object.keys(SECTORS);

/** Sectores de emergencia (24h) */
export const EMERGENCY_SECTORS = ALL_SECTOR_IDS.filter(id => SECTORS[id].isEmergency);

/** Sectores por país */
export function getSectorsForCountry(country: 'ES' | 'AR' | 'UY'): SectorConfig[] {
  return ALL_SECTOR_IDS
    .filter(id => SECTORS[id].availableIn.includes(country))
    .map(id => SECTORS[id]);
}
