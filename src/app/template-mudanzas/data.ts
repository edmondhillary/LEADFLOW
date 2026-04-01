/**
 * TEMPLATE MUDANZAS — Data Config
 *
 * Kinetic Editorial Moving — San Francisco
 * Change only this file to generate a new version of the site.
 */

export const business = {
  name: 'Kinetic Editorial Moving',
  tagline: 'Premium Moving Services — San Francisco',
  phone: '+1 555 000 0100',
  phoneIntl: '+15550000100',
  whatsapp: '15550000100',
  email: 'hello@kineticmoving.com',
  address: '400 Market St, San Francisco, CA 94105',
  city: 'San Francisco',
  state: 'CA',
  country: 'USA',
  legalName: 'Kinetic Editorial Moving LLC',
  foundedYear: 2015,
  yearsExperience: 9,
  teamSize: 45,
  insurance: '$5M comprehensive coverage',
  totalMoves: '2,000+',
  rating: '4.9/5',
};

export const nav = [
  { href: '/template-mudanzas', label: 'Home', icon: 'home' },
  { href: '/template-mudanzas/servicios', label: 'Servicios', icon: 'local_shipping' },
  { href: '/template-mudanzas/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-mudanzas/blog', label: 'Blog', icon: 'article' },
  { href: '/template-mudanzas/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroBg: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
  moverWorking: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  packingService: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  officeRelocation: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  storageUnit: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  testimonial1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  testimonial2: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  testimonial3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  blogFeatured: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1600&q=80',
  whyUsImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  og: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&h=630&q=80',
};

export const hero = {
  badge: 'Trusted Since 2015',
  title: 'Your Trusted Moving Company in',
  titleAccent: 'San Francisco',
  subtitle: 'Professional, insured, and on time — every move. Residential, office, and long-distance relocations handled with white-glove care by 45 certified movers.',
  ctaPrimary: 'Get a Quote',
  ctaSecondary: 'Call Now',
};

export const stats = [
  { value: '2,000+', label: 'Moves Completed' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '100%', label: 'Fully Insured' },
  { value: '45', label: 'Certified Movers' },
];

export const services = [
  {
    id: 'residential',
    icon: 'home',
    name: 'Residential Moving',
    desc: 'From studio apartments to family homes, we handle every detail of your move with care, precision, and respect for your belongings.',
    tags: ['Local & Long Distance', 'Full Packing Available'],
    featured: true,
    dark: false,
  },
  {
    id: 'office',
    icon: 'business',
    name: 'Office Relocation',
    desc: 'Minimize downtime with our expert office relocation service. We work around your schedule to get you operational in your new space fast.',
    tags: ['IT Equipment Handling', 'After-Hours Service'],
    featured: true,
    dark: true,
  },
  {
    id: 'packing',
    icon: 'inventory_2',
    name: 'Packing Services',
    desc: 'Professional packing using quality materials. We protect every item from fragile art to heavy furniture.',
    tags: ['Custom Crating', 'Fragile Specialist'],
    featured: false,
    dark: false,
  },
  {
    id: 'storage',
    icon: 'warehouse',
    name: 'Storage Solutions',
    desc: 'Secure, climate-controlled storage units available short or long term, with 24/7 access and full inventory management.',
    tags: ['Climate Controlled', '24/7 Access'],
    featured: false,
    dark: false,
  },
  {
    id: 'longdistance',
    icon: 'route',
    name: 'Long-Distance Moving',
    desc: 'Cross-country moves with GPS tracking, dedicated trucks, and the same white-glove service we deliver locally.',
    tags: ['GPS Tracked', 'Door to Door'],
    featured: false,
    dark: false,
  },
  {
    id: 'whiteglove',
    icon: 'diamond',
    name: 'White Glove Service',
    desc: 'Our premium tier: full disassembly, custom wrapping, placement in new home, and debris removal. Nothing left to chance.',
    tags: ['Full Service', 'Placement & Setup'],
    featured: false,
    dark: false,
  },
];

export const whyUs = [
  {
    title: 'Trained & Certified Movers',
    desc: 'Every member of our crew completes 8-week certification training. Background checked, uniformed, and professional.',
  },
  {
    title: 'On-Time Guarantee',
    desc: 'We show up when we say we will. If we are late, your move is discounted. No excuses, no exceptions.',
  },
  {
    title: 'Careful Handling Promise',
    desc: 'Every item wrapped, padded, and secured. Backed by $5M comprehensive insurance for your total peace of mind.',
  },
];

export const processSteps = [
  {
    num: '01',
    title: 'Request Quote',
    desc: 'Tell us about your move online or by phone. We provide a free, no-obligation estimate within 2 hours.',
  },
  {
    num: '02',
    title: 'Planning',
    desc: 'Your dedicated move coordinator creates a detailed plan, schedule, and materials list tailored to your needs.',
  },
  {
    num: '03',
    title: 'Moving Day',
    desc: 'Our certified crew arrives on time, protects your space, and executes the move with precision and care.',
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'Everything placed where you want it, packaging removed, and a final walkthrough to confirm your satisfaction.',
  },
];

export const testimonials = [
  {
    name: 'Julian Marcus',
    role: 'Homeowner, Pacific Heights',
    text: 'Kinetic Editorial Moving made what I thought would be a nightmare into the smoothest experience. They wrapped every piece of art personally and were done two hours ahead of schedule.',
    rating: 5,
    image: 'testimonial1',
  },
  {
    name: 'Sarah Chen',
    role: 'Operations Director, TechBridge SF',
    text: 'We relocated our entire 60-person office over a single weekend. Zero downtime Monday morning. The team was professional, fast, and incredibly careful with all the equipment.',
    rating: 5,
    image: 'testimonial2',
  },
  {
    name: 'Robert Lawson',
    role: 'Resident, Marina District',
    text: 'The white glove service is worth every penny. They disassembled and reassembled our custom furniture, placed everything perfectly, and even removed all the packing materials.',
    rating: 5,
    image: 'testimonial3',
  },
];

export const pricingTiers = [
  {
    name: 'Basic',
    price: 'From $299',
    desc: 'Perfect for studio and one-bedroom apartments.',
    features: [
      '2 certified movers',
      'Up to 4 hours',
      'Furniture blankets included',
      'Basic liability coverage',
    ],
    recommended: false,
  },
  {
    name: 'Standard',
    price: 'From $599',
    desc: 'Our most popular option for 2-3 bedroom homes.',
    features: [
      '3 certified movers',
      'Up to 8 hours',
      'Full packing materials',
      '$1M insurance coverage',
      'Appliance handling',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    price: 'From $1,199',
    desc: 'White glove service for large homes and offices.',
    features: [
      '5+ certified movers',
      'Full day service',
      'Custom crating available',
      '$5M insurance coverage',
      'Disassembly & reassembly',
      'Debris removal',
    ],
    recommended: false,
  },
];

export const faqs = [
  {
    q: 'How far in advance should I book my move?',
    a: 'We recommend booking at least 2-4 weeks in advance, especially for weekend moves. That said, we do accommodate last-minute requests based on availability.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Kinetic Editorial Moving is fully licensed with the California PUC and carries $5M comprehensive insurance covering all your belongings during the move.',
  },
  {
    q: 'Do you provide packing materials?',
    a: 'All our tiers include moving blankets and standard padding. Full packing materials (boxes, tape, bubble wrap) are included in Standard and Premium tiers, or available as an add-on.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve the entire San Francisco Bay Area locally, and operate nationwide for long-distance moves across the continental US.',
  },
  {
    q: 'What happens if something gets damaged?',
    a: 'We take damage seriously. Our $5M comprehensive coverage means you are protected. File a claim within 30 days and we resolve it within 10 business days.',
  },
];

export const blogPosts = [
  {
    slug: 'moving-tips-san-francisco',
    title: 'The Complete Moving Checklist for San Francisco',
    category: 'Moving Tips',
    readTime: '8 min',
    excerpt: 'Everything you need to know before moving day in the Bay Area — from parking permits to elevator reservations in high-rise buildings.',
    featured: true,
  },
  {
    slug: 'packing-guide-fragile-items',
    title: 'How to Pack Fragile Items Like a Professional Mover',
    category: 'Packing Guide',
    readTime: '6 min',
    excerpt: 'The same techniques our certified crew uses to protect art, glassware, and electronics — adapted for the DIY packer.',
    featured: false,
  },
  {
    slug: 'office-relocation-guide',
    title: 'Office Relocation Without the Downtime: A Complete Guide',
    category: 'Office Relocation',
    readTime: '10 min',
    excerpt: 'How to plan a business move that does not cost you productivity. Timelines, IT checklists, and communication templates included.',
    featured: false,
  },
  {
    slug: 'long-distance-moving-checklist',
    title: 'Cross-Country Moving: What Nobody Tells You',
    category: 'Long Distance',
    readTime: '12 min',
    excerpt: 'From climate considerations for your belongings to navigating building restrictions in new cities — the insider guide to long-distance moves.',
    featured: false,
  },
  {
    slug: 'storage-solutions-guide',
    title: 'When to Use Storage During a Move (And When Not To)',
    category: 'Storage',
    readTime: '5 min',
    excerpt: 'A practical framework for deciding whether temporary storage makes sense for your situation, and how to choose the right unit.',
    featured: false,
  },
];

export const nosotros = {
  badge: 'Est. 2015 — San Francisco',
  heroTitle: 'Moving people forward since 2015.',
  heroSubtitle: 'Kinetic Editorial Moving was built on a single belief: that moving should be a positive experience, not a stressful one. Nine years and 2,000+ moves later, that commitment has never wavered.',
  story: [
    'Founded in San Francisco in 2015, Kinetic Editorial Moving started as a two-person operation with one truck and an obsession with doing the job right. What set us apart from day one was our approach to training: every mover completes an 8-week certification program before touching a single client item.',
    'Today, with 45 trained professionals and a fleet of modern moving vehicles, we handle hundreds of moves each year across the Bay Area and the country. Our rating of 4.9 out of 5 across thousands of verified reviews reflects a culture that puts the client experience above everything else.',
  ],
  values: [
    {
      num: '01',
      title: 'Professional Training',
      desc: 'Every crew member completes 8 weeks of rigorous certification covering technique, customer service, and equipment handling before their first move.',
    },
    {
      num: '02',
      title: 'On-Time Guarantee',
      desc: 'Punctuality is a promise, not a policy. We build buffer time into every schedule and communicate proactively if anything changes.',
    },
    {
      num: '03',
      title: 'White Glove Care',
      desc: 'We treat every item as if it belongs to our own family. Custom wrapping, careful placement, and zero shortcuts.',
    },
  ],
  teamStats: [
    { value: '45', label: 'Trained Movers' },
    { value: '9', label: 'Years in Business' },
    { value: '2,000+', label: 'Successful Moves' },
    { value: '$5M', label: 'Insurance Coverage' },
  ],
  certifications: [
    'California PUC Licensed',
    'AMSA Certified Mover',
    'Better Business Bureau A+',
    'Google Guaranteed',
  ],
};

export const contacto = {
  badge: 'Free Estimate',
  title: 'Request Your Free Estimate',
  subtitle: 'Tell us about your move and we will get back to you within 2 hours with a detailed, no-obligation quote.',
  formTitle: 'Get Your Free Quote',
  formSubtitle: 'Fill out the form and a move coordinator will contact you within 2 hours.',
  serviceOptions: [
    'Mudanza Residencial',
    'Traslado Oficina',
    'Embalaje',
    'Almacenamiento',
    'Larga Distancia',
    'Consulta',
  ],
  schedule: 'Monday to Saturday / 7:00 AM to 7:00 PM',
  responseTime: '2 Hours',
  insurance: '$5M Comprehensive Coverage',
};
