/**
 * TEMPLATE JARDINERIA — Data Config
 *
 * The Botanical Editorial Landscape Design
 * All content, images, colors and text come from here.
 */

export const business = {
  name: 'The Botanical Editorial',
  fullName: 'The Botanical Editorial Landscape Design',
  tagline: 'Curated Landscape Design',
  phone: '+44 20 0000 0000',
  phoneIntl: '+442000000000',
  whatsapp: '442000000000',
  email: 'studio@botanicaleditorial.com',
  address: 'Studio 12, Garden Quarter, London SW7 2AZ',
  city: 'London',
  country: 'United Kingdom',
  legalName: 'The Botanical Editorial Ltd.',
  foundedYear: 2018,
  yearsExperience: 7,
};

export const nav = [
  { href: '/template-jardineria', label: 'Home', icon: 'home' },
  { href: '/template-jardineria/servicios', label: 'Servicios', icon: 'yard' },
  { href: '/template-jardineria/nosotros', label: 'Nosotros', icon: 'groups' },
  { href: '/template-jardineria/blog', label: 'Blog', icon: 'article' },
  { href: '/template-jardineria/contacto', label: 'Contacto', icon: 'mail' },
];

export const images = {
  heroGarden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80',
  maintenance: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=1200&q=80',
  landscaping: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  beforeGarden: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80',
  afterGarden: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=1200&q=80',
  projectDetail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  blogFeatured: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=1200&q=80',
  blog1: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  blog2: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=800&q=80',
  blog3: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  blog4: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=800&q=80',
  blog5: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  contactMap: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
  nosotrosHero: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?auto=format&fit=crop&w=1600&q=80',
};

export const hero = {
  badge: 'Award-Winning Garden Design',
  title: 'Garden Transformation',
  titleEmphasis: 'in Your Area',
  subtitle: 'Curated landscape design for private residences and estates across London. From initial consultation to ongoing stewardship — we craft gardens that endure.',
  ctaPrimary: 'Request a Quote',
  ctaSecondary: 'View Services',
  quoteCard: {
    text: 'A garden is not an ornament. It is a living manuscript — authored slowly, over seasons.',
    attribution: 'The Botanical Editorial',
  },
};

export const portfolio = {
  name: 'The Oakridge Estate',
  duration: '4 Weeks',
  speciesPlanted: '140+ species planted',
  location: 'Surrey, England',
  year: '2024',
};

export const services = [
  {
    num: '01',
    name: 'Full Landscaping',
    desc: 'Complete ground-up landscape design and installation. We transform bare or neglected outdoor spaces into curated gardens with structural planting, pathways, and water features.',
    tags: ['Site Assessment', 'Design Proposal', 'Full Installation'],
    image: 'landscaping',
  },
  {
    num: '02',
    name: 'Monthly Maintenance',
    desc: 'Scheduled horticultural care tailored to your garden\'s seasonal requirements. A dedicated team visits on a fixed programme to ensure perpetual health and presentation.',
    tags: ['Weekly or Monthly Visits', 'Seasonal Planting', 'Health Monitoring'],
    image: 'maintenance',
  },
  {
    num: '03',
    name: 'Horticultural Care',
    desc: 'Specialist plant health management including soil diagnostics, nutrient programmes, and disease treatment. We speak the language of plants so your garden thrives.',
    tags: ['Soil Analysis', 'Plant Nutrition', 'Disease Management'],
    image: 'heroGarden',
  },
  {
    num: '04',
    name: 'Irrigation Design',
    desc: 'Bespoke irrigation systems engineered for efficiency and ecological responsibility. Smart scheduling, drip networks, and rainwater harvesting integrated seamlessly.',
    tags: ['Smart Controllers', 'Drip Systems', 'Rainwater Harvesting'],
    image: 'afterGarden',
  },
  {
    num: '05',
    name: 'Pruning & Tree Care',
    desc: 'Certified arboricultural work from crown reduction to formative pruning. We shape trees and hedges with precision, respecting the character of each specimen.',
    tags: ['Crown Reduction', 'Formative Pruning', 'Tree Health Reports'],
    image: 'projectDetail',
  },
];

export const tailoredPrograms = [
  {
    name: 'Seasonal Programme',
    frequency: 'Quarterly',
    desc: 'Four curated visits per year aligned to seasonal transitions. Ideal for gardens that need considered intervention rather than constant attendance.',
    features: ['Spring preparation', 'Summer maintenance', 'Autumn cut-back', 'Winter protection'],
  },
  {
    name: 'Signature Stewardship',
    frequency: 'Monthly',
    desc: 'Our most comprehensive ongoing service. Monthly visits from a dedicated horticultural team with full reporting and annual redesign consultation included.',
    features: ['Monthly visits', 'Dedicated team', 'Annual redesign consult', 'Priority response'],
    featured: true,
  },
  {
    name: 'Estate Programme',
    frequency: 'Weekly',
    desc: 'Designed for large private estates requiring continuous professional attention. A full ground-care crew attends weekly with estate management coordination.',
    features: ['Weekly attendance', 'Full crew deployment', 'Estate management liaison', 'Bespoke SLA'],
  },
];

export const values = [
  {
    num: '01',
    title: 'Absolute Reliability',
    desc: 'We arrive when we say we will, deliver what we propose, and document every visit with professional reports.',
  },
  {
    num: '02',
    title: 'Design Intent',
    desc: 'Every planting decision is made with the full composition in mind — texture, colour, structure, and seasonal rhythm.',
  },
  {
    num: '03',
    title: 'Horticultural Expertise',
    desc: 'Our team holds RHS qualifications and arboricultural certifications. We bring science and craft in equal measure.',
  },
  {
    num: '04',
    title: 'Professional Grade Equipment',
    desc: 'We deploy the finest tools and materials — from precision pruning sets to organic soil amendments sourced from specialist nurseries.',
  },
];

export const testimonials = [
  {
    name: 'Julian Thorne',
    role: 'Oakridge Estates',
    text: 'The Botanical Editorial transformed three acres of overgrown land into something that feels like it has existed for a century. Their restraint and horticultural intelligence are remarkable.',
    rating: 5,
  },
  {
    name: 'Margot Vance',
    role: 'Harbor View Heights',
    text: 'From the initial survey to the final planting, every stage was handled with precision and care. Our garden is now the finest feature of the property.',
    rating: 5,
  },
  {
    name: 'Dr. Elias Sterling',
    role: 'The Heights',
    text: 'I commissioned a garden that could be enjoyed through every season. What was delivered exceeded that brief entirely. An exceptional studio.',
    rating: 5,
  },
];

export const blogPosts = [
  {
    slug: 'principles-of-garden-design',
    title: 'The Seven Principles of Enduring Garden Design.',
    category: 'Design',
    readTime: '10 min',
    excerpt: 'What separates a beautiful garden from a lasting one? We explore the compositional principles that underpin every long-lived landscape.',
    featured: true,
  },
  {
    slug: 'seasonal-maintenance-guide',
    title: 'The Seasonal Maintenance Calendar: A Professional Guide.',
    category: 'Maintenance',
    readTime: '8 min',
    excerpt: 'A month-by-month framework for keeping a garden in optimal health throughout the British year.',
    featured: false,
  },
  {
    slug: 'plant-selection-for-structure',
    title: 'Structural Planting: Choosing Plants That Define Space.',
    category: 'Planting',
    readTime: '7 min',
    excerpt: 'The bones of a great garden are its structural plants. We guide you through species selection for year-round form.',
    featured: false,
  },
  {
    slug: 'smart-irrigation-systems',
    title: 'Modern Irrigation: Engineering Water Efficiency into Your Garden.',
    category: 'Irrigation',
    readTime: '9 min',
    excerpt: 'Smart controllers, soil sensors, and drip networks — how contemporary irrigation technology is reshaping garden stewardship.',
    featured: false,
  },
  {
    slug: 'sustainable-landscaping-practices',
    title: 'Sustainable Landscaping: The Case for Ecological Planting.',
    category: 'Sustainability',
    readTime: '11 min',
    excerpt: 'Native planting, composting systems, and habitat creation — designing gardens that give back to the ecosystem.',
    featured: false,
  },
];

export const contacto = {
  badge: 'Studio Enquiries',
  title: 'Request a Quote',
  subtitle: 'Whether you have a specific brief or simply an aspiration, our studio team will respond within 48 hours to discuss your project.',
  formTitle: 'Tell Us About Your Garden',
  formSubtitle: 'A senior horticulturalist will be in touch within 48 hours.',
  serviceOptions: [
    'Paisajismo Completo',
    'Mantenimiento Mensual',
    'Cuidado Horticultura',
    'Riego',
    'Poda',
    'Consulta',
  ],
  schedule: 'Monday to Friday / 8:00 to 18:00',
  responseTime: '24-48 Hours',
};

export const processSteps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'A senior horticulturalist visits your property to assess the site, understand your brief, and discuss possibilities.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'We produce a detailed planting plan with species lists, hard landscaping proposals, and seasonal planting schedules.',
  },
  {
    num: '03',
    title: 'Installation',
    desc: 'Our specialist teams execute the design with precision, sourcing plants from trusted nurseries and using professional-grade equipment.',
  },
  {
    num: '04',
    title: 'Ongoing Care',
    desc: 'A tailored maintenance programme is established to ensure your garden evolves beautifully through every season.',
  },
];
