import mongoose from 'mongoose';

// Cache de conexión para evitar múltiples conexiones en desarrollo
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define MONGODB_URI environment variable. ' +
      'Add it to .env.local for local dev or to Vercel Environment Variables for production.'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// ==================== ESQUEMAS ====================

// --- Lead ---
const LeadSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  businessName: { type: String, required: true },
  sector: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true, enum: ['ES', 'AR', 'UY'] },
  phone: String,
  email: String,
  address: String,
  googleMapsUrl: String,

  // Localización
  locale: { type: String, enum: ['es-ES', 'es-AR'], default: 'es-ES' },
  currency: { type: String, enum: ['EUR', 'USD'], default: 'EUR' },
  price: { type: Number, default: 25 },

  // Estado del pipeline
  status: {
    type: String,
    enum: ['scraped', 'analyzing', 'generating', 'web_live', 'email_sent', 'visited', 'contacted', 'client', 'expired'],
    default: 'scraped',
  },

  // Tracking
  createdAt: { type: Date, default: Date.now },
  webLiveAt: Date,
  firstVisit: Date,
  lastVisit: Date,
  visitCount: { type: Number, default: 0 },

  // Comunicación
  emailSent: { type: Boolean, default: false },
  emailSentAt: Date,
  contacted: { type: Boolean, default: false },
  contactedAt: Date,

  // Pago
  paidAt: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  stripePaymentLinkId: String,

  // Post-venta
  reviewRequested: { type: Boolean, default: false },
  reviewRequestedAt: Date,
  upsellOffered: { type: Boolean, default: false },
  upsellOfferedAt: Date,

  // WhatsApp validado
  hasWhatsApp: { type: Boolean, default: false },
  whatsAppValidatedAt: Date,

  // Template sectorial usado
  templateUsed: String,           // e.g. 'template-fontaneria'

  // Reseñas (de SerpAPI o random 40-100)
  reviewCount:  { type: Number, default: 0 },
  reviewRating: { type: Number, default: 0 },

  // Precio mensual total contratado (suma de servicios)
  monthlyTotal: { type: Number, default: 25 },

  // Servicios contratados
  services: {
    webBasic:         { type: Boolean, default: false },  // 25€/mes base
    seoMonthly:       { type: Boolean, default: false },  // +15€/mes
    blogContent:      { type: Boolean, default: false },  // +5€/mes
    reviewManagement: { type: Boolean, default: false },  // +50€/mes
    socialMedia:      { type: Boolean, default: false },  // +100€/mes
    webMaintenance:   { type: Boolean, default: false },  // +10€/mes
    emailMarketing:   { type: Boolean, default: false },  // +20€/mes
    adsManagement:    { type: Boolean, default: false },  // +150€/mes
    whatsappBot:      { type: Boolean, default: false },  // +30€/mes
  },

  // Datos crudos del scraping (referencia completa)
  rawScrapeData: { type: mongoose.Schema.Types.Mixed },

  // Referencias
  competitorRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Competitor' },
  contentRef: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteContent' },
}, { timestamps: true });

// --- Competitor ---
const CompetitorSchema = new mongoose.Schema({
  sector: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  topUrl: String,
  analyzedAt: { type: Date, default: Date.now },

  // Datos extraídos con Playwright
  navigation: [String],
  headings: [{ tag: String, text: String }],
  metaTitle: String,
  metaDesc: String,
  services: [String],
  colors: {
    primary: String,
    secondary: String,
    background: String,
    text: String,
  },
  ctas: [{ text: String, href: String }],
  keywords: [String],

  // Análisis de Claude
  recommendedStructure: mongoose.Schema.Types.Mixed,
  toneOfVoice: String,
  seoRecommendations: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

// Índice compuesto para cachear: mismo sector+ciudad+país = reusar
CompetitorSchema.index({ sector: 1, city: 1, country: 1 });

// --- Website Content ---
const WebsiteContentSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },

  pages: {
    home: {
      heroTitle: String,
      heroSubtitle: String,
      heroCTA: String,
      featuredServices: [{ name: String, description: String, icon: String }],
      testimonials: [{ name: String, text: String, rating: Number }],
      aboutSnippet: String,
    },
    servicios: {
      title: String,
      intro: String,
      items: [{ name: String, description: String, price: String, icon: String }],
    },
    contacto: {
      title: String,
      subtitle: String,
      formFields: [String],
      mapQuery: String,
    },
    nosotros: {
      title: String,
      story: String,
      values: [{ title: String, description: String }],
      yearsExperience: Number,
    },
    blog: [{
      title: String,
      slug: String,
      excerpt: String,
      content: String,
      keywords: [String],
    }],
  },

  design: {
    primaryColor: { type: String, default: '#2563eb' },
    secondaryColor: { type: String, default: '#1e40af' },
    accentColor: { type: String, default: '#f59e0b' },
    backgroundColor: { type: String, default: '#ffffff' },
    font: { type: String, default: 'Inter' },
  },

  seo: {
    metaTitle: String,
    metaDesc: String,
    keywords: [String],
    ogImage: String,
  },
}, { timestamps: true });

// ==================== MODELOS ====================
export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export const Competitor = mongoose.models.Competitor || mongoose.model('Competitor', CompetitorSchema);
export const WebsiteContent = mongoose.models.WebsiteContent || mongoose.model('WebsiteContent', WebsiteContentSchema);
