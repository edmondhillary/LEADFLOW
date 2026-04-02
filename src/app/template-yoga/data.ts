/**
 * TEMPLATE YOGA — Data Config
 *
 * Breath of Silence Yoga Estudio
 * Solo hay que cambiar este archivo para generar una web nueva.
 */

export const business = {
  name: 'Breath of Silence',
  fullName: 'Breath of Silence Yoga Estudio',
  tagline: 'Mindfulness & Movement',
  phone: '+44 20 0000 0000',
  phoneIntl: '+442000000000',
  whatsapp: '442000000000',
  email: 'namaste@breathofsilence.co.uk',
  address: '14 Serenity Row, Notting Hill, London W11 2PH',
  city: 'London',
  country: 'UK',
  legalName: 'Breath of Silence Yoga Estudio Ltd.',
  foundedYear: 2019,
  headInstructor: 'Aria Morant',
  instructorCredentials: 'Fundador & 200hr+ Certified Instructor',
  membersCount: '500+',
  scheduleInfo: '6 days/week, mañana y tarde sesiones',
  studioQuote: '"Stepping into el estudio feels like a deep exhale."',
};

export const nav = [
  { href: '/template-yoga', label: 'Inicio', icon: 'home' },
  { href: '/template-yoga/servicios', label: 'Servicios', icon: 'self_improvement' },
  { href: '/template-yoga/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-yoga/blog', label: 'Blog', icon: 'article' },
  { href: '/template-yoga/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=80',
  hatha: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  vinyasa: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80',
  restorative: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&w=1200&q=80',
  studioWide: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80',
  instructorPortrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  meditationRoom: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  blogDestacado: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'London\\\\\\\'s Sanctuary of Stillness',
  title: 'Find Tu Balance in el',
  titleItalic: 'Heart of el City',
  subtitle: 'A welcoming yoga estudio in Notting Hill offering Hatha, Vinyasa, Restorative, y Meditation classes. All levels welcome. 500+ members y growing.',
  ctaPrimary: 'Reservar Clase',
  ctaSecondary: 'Ver Clases',
};

export const classes = [
  {
    key: 'hatha',
    name: 'Hatha Yoga',
    desc: 'A gentle, grounding practice that focuses on alignment, breathwork, y holding poses. Perfect para beginners y those seeking balance.',
    duration: '60 min',
    level: 'All Levels',
    schedule: 'Mon, Wed, Fri — 7:30 AM',
  },
  {
    key: 'vinyasa',
    name: 'Vinyasa Flow',
    desc: 'A dynamic, flowing practice linking breath con movement. Builds strength, flexibility y a mudanza meditation para el moderno practitioner.',
    duration: '75 min',
    level: 'Intermediate',
    schedule: 'Tue, Thu — 6:30 PM',
  },
  {
    key: 'restorative',
    name: 'Restorative Yoga',
    desc: 'A deeply healing practice using props y larga-held poses to activate el parasympathetic nervous system. Pure restoration.',
    duration: '75 min',
    level: 'All Levels',
    schedule: 'Sat — 10:00 AM',
  },
];

export const benefits = [
  { icon: '🌿', title: 'Experienced Instructors', desc: '200hr+ certified teachers con years of dedicated practice y teaching.' },
  { icon: '🤍', title: 'Welcoming Environment', desc: 'A judgement-gratis space para every body, every background, every level.' },
  { icon: '🧘', title: 'All Levels Welcome', desc: 'Desde primero-timers to advanced practitioners — nuestro classes adapt to tú.' },
  { icon: '✨', title: 'Mindful Approach', desc: 'Nosotros integrate breathwork y mindfulness into every sesión para deeper results.' },
];

export const pricing = [
  {
    name: 'Drop-In',
    price: '£18',
    period: 'per class',
    desc: 'Perfect para trying us out or supplementing yNuestra práctica.',
    features: ['Single class acceso', 'Mat rental included', 'All class types', 'No commitment'],
    cta: 'Reservar a Class',
    highlight: false,
  },
  {
    name: 'Mensual',
    price: '£89',
    period: 'per month',
    desc: 'Nuestro most popular option para a consistent practice.',
    features: ['Unlimited classes', 'Priority booking', 'Mat almacenamiento locker', '1 gratis guest pass/month'],
    cta: 'Empezar Mensual',
    highlight: true,
  },
  {
    name: 'Anual',
    price: '£799',
    period: 'per year',
    desc: 'Mejor value para committed practitioners.',
    features: ['Everything in Mensual', '2 months gratis', 'Guest passes ×12', 'Retreat discounts 20%'],
    cta: 'Go Anual',
    highlight: false,
  },
];

export const schedule = [
  { class: 'Hatha Yoga', mon: '7:30 AM', tue: '—', wed: '7:30 AM', thu: '—', fri: '7:30 AM', sat: '9:00 AM', sun: '—' },
  { class: 'Vinyasa Flow', mon: '—', tue: '6:30 PM', wed: '—', thu: '6:30 PM', fri: '—', sat: '—', sun: '10:00 AM' },
  { class: 'Restorative', mon: '—', tue: '—', wed: '6:00 PM', thu: '—', fri: '—', sat: '10:00 AM', sun: '—' },
  { class: 'Yin Yoga', mon: '—', tue: '—', wed: '—', thu: '7:30 AM', fri: '6:00 PM', sat: '—', sun: '—' },
  { class: 'Meditation', mon: '8:00 AM', tue: '—', wed: '8:00 AM', thu: '—', fri: '8:00 AM', sat: '—', sun: '9:00 AM' },
  { class: 'Breathwork', mon: '—', tue: '7:00 PM', wed: '—', thu: '—', fri: '—', sat: '11:30 AM', sun: '—' },
];

export const allClasses = [
  {
    key: 'hatha',
    name: 'Hatha Yoga',
    type: 'Foundation',
    desc: 'A classical practice rooted in alignment y breathwork. Each posture is held con awareness, cultivating strength, flexibility, y a deep sense of inner calm. Ideal as a foundation para all other yoga styles.',
    duration: '60 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Mon, Wed, Fri',
  },
  {
    key: 'vinyasa',
    name: 'Vinyasa Flow',
    type: 'Dynamic',
    desc: 'A rhythmic, breath-led sequence that builds heat y flow. Transitions between postures become a mudanza meditation. Builds cardio fitness, muscular endurance, y mental focus simultaneously.',
    duration: '75 min',
    level: 'Intermediate',
    teacher: 'Aria Morant',
    sessions: 'Tue, Thu',
  },
  {
    key: 'restorative',
    name: 'Restorative Yoga',
    type: 'Healing',
    desc: 'A therapeutic practice using bolsters, blankets, y blocks to support el body in larga-held passive poses. Activates el parasympathetic nervous system — tu body\\\\\\\'s rest-y-digest mode.',
    duration: '75 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Wed, Sat',
  },
  {
    key: 'yin',
    name: 'Yin Yoga',
    type: 'Deep Stretch',
    desc: 'Slow-paced style holding poses para 3–5 minutes, targeting el deeper connective tissues. Deeply meditative — silence y stillness are core to el practice.',
    duration: '75 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Thu, Fri',
  },
  {
    key: 'meditation',
    name: 'Meditation',
    type: 'Mindfulness',
    desc: 'Guided seated meditation sesiones using breathwork, body scan, y visualization techniques. A dedicated space to train el mind toward clarity, ease, y presence.',
    duration: '45 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Mon, Wed, Fri, Sun',
  },
  {
    key: 'breathwork',
    name: 'Breathwork',
    type: 'Pranayama',
    desc: 'Pranayama y somatic breathwork techniques drawn desde yogic y contemporary traditions. Regulates el nervous system, releases stored tension, y awakens vital energy.',
    duration: '60 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Tue, Sat',
  },
];

export const testimonials = [
  {
    name: 'Elena R.',
    role: 'Mensual Member',
    text: 'Stepping into el estudio feels like a deep exhale. Aria\\\\\\\'s teaching holds both precision y warmth — rare qualities in a yoga space. El restorative class on Saturdays has become sacred to me.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Anual Member',
    text: 'I came in skeptical — a lifelong runner who thought yoga was too slow. Within two weeks el Vinyasa sesiones had completely transformed my recovery y mobility. This estudio changed my relationship con my body.',
    rating: 5,
  },
];

export const about = {
  badge: 'Est. 2019 — Notting Hill, London',
  heroTitle: 'A sanctuary rooted in stillness y community.',
  heroSubtitle: 'Breath of Silence was born desde a simple belief: that every person deserves a place to stop, breathe, y return to themselves.',
  storyTitle: 'Why Breath of Silence Exists',
  storyParagraphs: [
    'In 2019, Aria Morant opened el doors to a small estudio in Notting Hill con one intention: to create a yoga space that felt more like a refuge than a fitness class. Having trained across studios in London, Bali, y India, Aria had experienced both el magic y el shortcomings of moderno yoga culture.',
    'She wanted a place con no mirrors, no performance pressure — just practice. Natural oak floors, filtered afternoon light, y el kind of silence that allows tú to actually hear tu breath. Five years on, that vision has quietly become one of London\\\\\\\'s most cherished wellness communities.',
  ],
  values: [
    {
      icon: '🌱',
      title: 'Rooted in Tradition',
      desc: 'Nuestro teachings draw desde classical Hatha lineage y contemporary somatic research — ancient wisdom made accessible para moderno life.',
    },
    {
      icon: '🤝',
      title: 'Community Primero',
      desc: 'Nosotros are not a drop-in gym. Nosotros are a community. Every class, every conversation, every shared breath builds el fabric of this space.',
    },
    {
      icon: '🌬️',
      title: 'Breath as Foundation',
      desc: 'Every class returns to el breath. Not as metaphor, but as el literal anchor that transforms movement into practice.',
    },
  ],
  stats: [
    { value: '500+', label: 'Active Members' },
    { value: '6', label: 'Years of Practice' },
    { value: '6', label: 'Days a Week' },
    { value: '1', label: 'Lead Instructor' },
  ],
  ctaTitle: 'Come breathe con us.',
  ctaSubtitle: 'Tu primero class is el hardest part. After that, el estudio finds a way to become inicio.',
};

export const contacto = {
  badge: 'Encuentra tu Espacio',
  title: 'Encuentra tu Espacio',
  subtitle: 'Whether tú\\\\\\\'re brand nuevo to yoga or returning to yNuestra práctica, nosotros\\\\\\\'d love to welcome tú. Reach out — nosotros respond within 24 horario.',
  formTitle: 'Reservar una Clase',
  formSubtitle: 'Fill in tu details y preferred class. Nosotros\\\\\\\'ll confirm tu booking within 24 horario.',
  serviceOptions: ['Hatha', 'Vinyasa', 'Restorative', 'Yin', 'Meditación', 'Primera Clase'],
  schedule: 'Lunes – Sábado / 6:30 AM – 8:00 PM',
  responseTime: '24 Horario',
};

export const blogPosts = [
  {
    slug: 'morning-yoga-routine',
    title: 'A 20-Minute Mañana Yoga Routine to Empezar Tu Day.',
    category: 'Movimiento',
    readTime: '6 min',
    excerpt: 'Five gentle poses tú can practice before coffee. Wake tu spine, open tu hips, y arrive in tu day con intention rather than urgency.',
    featured: true,
  },
  {
    slug: 'meditation-for-beginners',
    title: 'Meditation para Beginners: Tú\\\\\\\'re Already Doing It Wrong (Y That\\\\\\\'s Fine).',
    category: 'Meditación',
    readTime: '8 min',
    excerpt: 'El most common misconception nosotros meditation is that tú\\\\\\\'re supposed to stop thinking. Here\\\\\\\'s what tú\\\\\\\'re actually supposed to do.',
    featured: false,
  },
  {
    slug: 'breathwork-science',
    title: 'El Science of Breathwork: Why Tu Nervous System Listens.',
    category: 'Bienestar',
    readTime: '10 min',
    excerpt: 'Pranayama isn\\\\\\\'t mysticism — it\\\\\\\'s neuroscience. Discover why controlled breathing changes tu physiology in measurable, lasting ways.',
    featured: false,
  },
  {
    slug: 'yin-vs-restorative',
    title: 'Yin vs Restorative: What\\\\\\\'s el Diferencia y Which Do Tú Need?',
    category: 'Principiantes',
    readTime: '7 min',
    excerpt: 'Both are slow. Both use props. But they work on different layers of el body y serve different purposes. Here\\\\\\\'s how to choose.',
    featured: false,
  },
  {
    slug: 'finding-balance',
    title: 'Finding Balance: How a Regular Yoga Practice Rewires el Brain.',
    category: 'Bienestar',
    readTime: '9 min',
    excerpt: 'Neuroplasticity research shows that consistent mindfulness practice literally changes el structure of tu brain. Tu mat is a laboratory.',
    featured: false,
  },
];
