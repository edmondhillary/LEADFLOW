/**
 * TEMPLATE YOGA — Data Config
 *
 * Breath of Silence Yoga Studio
 * Solo hay que cambiar este archivo para generar una web nueva.
 */

export const business = {
  name: 'Breath of Silence',
  fullName: 'Breath of Silence Yoga Studio',
  tagline: 'Mindfulness & Movement',
  phone: '+44 20 0000 0000',
  phoneIntl: '+442000000000',
  whatsapp: '442000000000',
  email: 'namaste@breathofsilence.co.uk',
  address: '14 Serenity Row, Notting Hill, London W11 2PH',
  city: 'London',
  country: 'UK',
  legalName: 'Breath of Silence Yoga Studio Ltd.',
  foundedYear: 2019,
  headInstructor: 'Aria Morant',
  instructorCredentials: 'Founder & 200hr+ Certified Instructor',
  membersCount: '500+',
  scheduleInfo: '6 days/week, morning and evening sessions',
  studioQuote: '"Stepping into the studio feels like a deep exhale."',
};

export const nav = [
  { href: '/template-yoga', label: 'Home', icon: 'home' },
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
  blogFeatured: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'London\'s Sanctuary of Stillness',
  title: 'Find Your Balance in the',
  titleItalic: 'Heart of the City',
  subtitle: 'A welcoming yoga studio in Notting Hill offering Hatha, Vinyasa, Restorative, and Meditation classes. All levels welcome. 500+ members and growing.',
  ctaPrimary: 'Reservar Clase',
  ctaSecondary: 'Ver Clases',
};

export const classes = [
  {
    key: 'hatha',
    name: 'Hatha Yoga',
    desc: 'A gentle, grounding practice that focuses on alignment, breathwork, and holding poses. Perfect for beginners and those seeking balance.',
    duration: '60 min',
    level: 'All Levels',
    schedule: 'Mon, Wed, Fri — 7:30 AM',
  },
  {
    key: 'vinyasa',
    name: 'Vinyasa Flow',
    desc: 'A dynamic, flowing practice linking breath with movement. Builds strength, flexibility and a moving meditation for the modern practitioner.',
    duration: '75 min',
    level: 'Intermediate',
    schedule: 'Tue, Thu — 6:30 PM',
  },
  {
    key: 'restorative',
    name: 'Restorative Yoga',
    desc: 'A deeply healing practice using props and long-held poses to activate the parasympathetic nervous system. Pure restoration.',
    duration: '75 min',
    level: 'All Levels',
    schedule: 'Sat — 10:00 AM',
  },
];

export const benefits = [
  { icon: '🌿', title: 'Experienced Instructors', desc: '200hr+ certified teachers with years of dedicated practice and teaching.' },
  { icon: '🤍', title: 'Welcoming Environment', desc: 'A judgement-free space for every body, every background, every level.' },
  { icon: '🧘', title: 'All Levels Welcome', desc: 'From first-timers to advanced practitioners — our classes adapt to you.' },
  { icon: '✨', title: 'Mindful Approach', desc: 'We integrate breathwork and mindfulness into every session for deeper results.' },
];

export const pricing = [
  {
    name: 'Drop-In',
    price: '£18',
    period: 'per class',
    desc: 'Perfect for trying us out or supplementing your practice.',
    features: ['Single class access', 'Mat rental included', 'All class types', 'No commitment'],
    cta: 'Book a Class',
    highlight: false,
  },
  {
    name: 'Monthly',
    price: '£89',
    period: 'per month',
    desc: 'Our most popular option for a consistent practice.',
    features: ['Unlimited classes', 'Priority booking', 'Mat storage locker', '1 free guest pass/month'],
    cta: 'Start Monthly',
    highlight: true,
  },
  {
    name: 'Annual',
    price: '£799',
    period: 'per year',
    desc: 'Best value for committed practitioners.',
    features: ['Everything in Monthly', '2 months free', 'Guest passes ×12', 'Retreat discounts 20%'],
    cta: 'Go Annual',
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
    desc: 'A classical practice rooted in alignment and breathwork. Each posture is held with awareness, cultivating strength, flexibility, and a deep sense of inner calm. Ideal as a foundation for all other yoga styles.',
    duration: '60 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Mon, Wed, Fri',
  },
  {
    key: 'vinyasa',
    name: 'Vinyasa Flow',
    type: 'Dynamic',
    desc: 'A rhythmic, breath-led sequence that builds heat and flow. Transitions between postures become a moving meditation. Builds cardio fitness, muscular endurance, and mental focus simultaneously.',
    duration: '75 min',
    level: 'Intermediate',
    teacher: 'Aria Morant',
    sessions: 'Tue, Thu',
  },
  {
    key: 'restorative',
    name: 'Restorative Yoga',
    type: 'Healing',
    desc: 'A therapeutic practice using bolsters, blankets, and blocks to support the body in long-held passive poses. Activates the parasympathetic nervous system — your body\'s rest-and-digest mode.',
    duration: '75 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Wed, Sat',
  },
  {
    key: 'yin',
    name: 'Yin Yoga',
    type: 'Deep Stretch',
    desc: 'Slow-paced style holding poses for 3–5 minutes, targeting the deeper connective tissues. Deeply meditative — silence and stillness are core to the practice.',
    duration: '75 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Thu, Fri',
  },
  {
    key: 'meditation',
    name: 'Meditation',
    type: 'Mindfulness',
    desc: 'Guided seated meditation sessions using breathwork, body scan, and visualization techniques. A dedicated space to train the mind toward clarity, ease, and presence.',
    duration: '45 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Mon, Wed, Fri, Sun',
  },
  {
    key: 'breathwork',
    name: 'Breathwork',
    type: 'Pranayama',
    desc: 'Pranayama and somatic breathwork techniques drawn from yogic and contemporary traditions. Regulates the nervous system, releases stored tension, and awakens vital energy.',
    duration: '60 min',
    level: 'All Levels',
    teacher: 'Aria Morant',
    sessions: 'Tue, Sat',
  },
];

export const testimonials = [
  {
    name: 'Elena R.',
    role: 'Monthly Member',
    text: 'Stepping into the studio feels like a deep exhale. Aria\'s teaching holds both precision and warmth — rare qualities in a yoga space. The restorative class on Saturdays has become sacred to me.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Annual Member',
    text: 'I came in skeptical — a lifelong runner who thought yoga was too slow. Within two weeks the Vinyasa sessions had completely transformed my recovery and mobility. This studio changed my relationship with my body.',
    rating: 5,
  },
];

export const about = {
  badge: 'Est. 2019 — Notting Hill, London',
  heroTitle: 'A sanctuary rooted in stillness and community.',
  heroSubtitle: 'Breath of Silence was born from a simple belief: that every person deserves a place to stop, breathe, and return to themselves.',
  storyTitle: 'Why Breath of Silence Exists',
  storyParagraphs: [
    'In 2019, Aria Morant opened the doors to a small studio in Notting Hill with one intention: to create a yoga space that felt more like a refuge than a fitness class. Having trained across studios in London, Bali, and India, Aria had experienced both the magic and the shortcomings of modern yoga culture.',
    'She wanted a place with no mirrors, no performance pressure — just practice. Natural oak floors, filtered afternoon light, and the kind of silence that allows you to actually hear your breath. Five years on, that vision has quietly become one of London\'s most cherished wellness communities.',
  ],
  values: [
    {
      icon: '🌱',
      title: 'Rooted in Tradition',
      desc: 'Our teachings draw from classical Hatha lineage and contemporary somatic research — ancient wisdom made accessible for modern life.',
    },
    {
      icon: '🤝',
      title: 'Community First',
      desc: 'We are not a drop-in gym. We are a community. Every class, every conversation, every shared breath builds the fabric of this space.',
    },
    {
      icon: '🌬️',
      title: 'Breath as Foundation',
      desc: 'Every class returns to the breath. Not as metaphor, but as the literal anchor that transforms movement into practice.',
    },
  ],
  stats: [
    { value: '500+', label: 'Active Members' },
    { value: '6', label: 'Years of Practice' },
    { value: '6', label: 'Days a Week' },
    { value: '1', label: 'Lead Instructor' },
  ],
  ctaTitle: 'Come breathe with us.',
  ctaSubtitle: 'Your first class is the hardest part. After that, the studio finds a way to become home.',
};

export const contacto = {
  badge: 'Encuentra tu Espacio',
  title: 'Encuentra tu Espacio',
  subtitle: 'Whether you\'re brand new to yoga or returning to your practice, we\'d love to welcome you. Reach out — we respond within 24 hours.',
  formTitle: 'Reservar una Clase',
  formSubtitle: 'Fill in your details and preferred class. We\'ll confirm your booking within 24 hours.',
  serviceOptions: ['Hatha', 'Vinyasa', 'Restorative', 'Yin', 'Meditación', 'Primera Clase'],
  schedule: 'Monday – Saturday / 6:30 AM – 8:00 PM',
  responseTime: '24 Hours',
};

export const blogPosts = [
  {
    slug: 'morning-yoga-routine',
    title: 'A 20-Minute Morning Yoga Routine to Start Your Day.',
    category: 'Movimiento',
    readTime: '6 min',
    excerpt: 'Five gentle poses you can practice before coffee. Wake your spine, open your hips, and arrive in your day with intention rather than urgency.',
    featured: true,
  },
  {
    slug: 'meditation-for-beginners',
    title: 'Meditation for Beginners: You\'re Already Doing It Wrong (And That\'s Fine).',
    category: 'Meditación',
    readTime: '8 min',
    excerpt: 'The most common misconception about meditation is that you\'re supposed to stop thinking. Here\'s what you\'re actually supposed to do.',
    featured: false,
  },
  {
    slug: 'breathwork-science',
    title: 'The Science of Breathwork: Why Your Nervous System Listens.',
    category: 'Bienestar',
    readTime: '10 min',
    excerpt: 'Pranayama isn\'t mysticism — it\'s neuroscience. Discover why controlled breathing changes your physiology in measurable, lasting ways.',
    featured: false,
  },
  {
    slug: 'yin-vs-restorative',
    title: 'Yin vs Restorative: What\'s the Difference and Which Do You Need?',
    category: 'Principiantes',
    readTime: '7 min',
    excerpt: 'Both are slow. Both use props. But they work on different layers of the body and serve different purposes. Here\'s how to choose.',
    featured: false,
  },
  {
    slug: 'finding-balance',
    title: 'Finding Balance: How a Regular Yoga Practice Rewires the Brain.',
    category: 'Bienestar',
    readTime: '9 min',
    excerpt: 'Neuroplasticity research shows that consistent mindfulness practice literally changes the structure of your brain. Your mat is a laboratory.',
    featured: false,
  },
];
