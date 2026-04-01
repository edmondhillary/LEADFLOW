/**
 * SKILL 5: LeadFlow Payments
 *
 * Crea un Stripe Payment Link personalizado para el lead.
 * El link incluye el precio correcto (EUR/USD) y metadata del lead
 * para que el webhook pueda identificarlo al pagar.
 *
 * Uso: npx tsx skills/payments/index.ts --leadId <mongoId>
 */

import Stripe from 'stripe';
import { connectDB, Lead } from '../../src/lib/mongodb';

// Lazy init — evita que falle al importar antes de cargar .env.local
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Falta STRIPE_SECRET_KEY en .env.local');
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function createPaymentLink(options: {
  leadId: string;
  amountCents?: number;   // custom amount in cents, e.g. 2500 = 25€
  services?: string[];    // list of service names for the description
}): Promise<string | null> {
  const { leadId, amountCents, services: serviceList } = options;

  await connectDB();
  const lead = await Lead.findById(leadId);
  if (!lead) {
    console.error(`❌ Lead no encontrado: ${leadId}`);
    return null;
  }

  const stripe = getStripe();

  // Calculate amount: custom or default 25€/2500 ARS
  const currency = lead.currency === 'EUR' ? 'eur' : 'usd';
  const defaultAmount = lead.currency === 'EUR' ? 2500 : 2500; // 25€ or $25
  const finalAmount = amountCents ?? defaultAmount;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';

  // Build description from services
  const serviceLabels: Record<string, string> = {
    webBasic: 'Web profesional',
    seoMonthly: 'SEO mensual',
    blogContent: 'Blog/contenido',
    reviewManagement: 'Gestión reseñas + Google Maps',
    socialMedia: 'Redes sociales',
    webMaintenance: 'Mantenimiento web',
    emailMarketing: 'Email marketing',
    adsManagement: 'Gestión Ads',
    whatsappBot: 'Bot WhatsApp',
  };
  const servicesDesc = serviceList?.length
    ? serviceList.map(s => serviceLabels[s] || s).join(' + ')
    : 'Web profesional mensual';

  console.log(`\n💳 Creando Payment Link para: ${lead.businessName} — ${finalAmount / 100}${lead.currency}/mes`);

  // Create price on the fly (no env key needed)
  const price = await stripe.prices.create({
    currency,
    unit_amount: finalAmount,
    recurring: { interval: 'month' },
    product_data: {
      name: `${lead.businessName} — ${servicesDesc}`,
      metadata: {
        leadId,
        sector: lead.sector,
        city: lead.city,
      },
    },
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata: {
      leadId,
      businessName: lead.businessName,
      sector: lead.sector,
      city: lead.city,
      country: lead.country,
    },
    after_completion: {
      type: 'redirect',
      redirect: { url: `${baseUrl}/${lead.slug}?pagado=true` },
    },
    phone_number_collection: { enabled: false },
    allow_promotion_codes: true,
  });

  // Update lead with services and total
  const updateData: Record<string, unknown> = {
    stripePaymentLinkId: paymentLink.id,
    monthlyTotal: finalAmount / 100,
  };
  if (serviceList?.length) {
    for (const svc of serviceList) {
      updateData[`services.${svc}`] = true;
    }
    if (serviceList.includes('webBasic') || finalAmount > 0) {
      updateData['services.webBasic'] = true;
    }
  }
  await Lead.findByIdAndUpdate(leadId, { $set: updateData });

  console.log(`✅ Payment Link creado: ${paymentLink.url}`);
  return paymentLink.url;
}

export async function createDomainPaymentLink(options: {
  leadId: string;
  domainName: string;
}): Promise<string | null> {
  const { leadId, domainName } = options;

  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) return null;

  const priceId = lead.currency === 'EUR'
    ? process.env.STRIPE_PRICE_EUR_DOMAIN
    : process.env.STRIPE_PRICE_USD_DOMAIN;

  if (!priceId) return null;

  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      leadId,
      type: 'domain',
      domainName,
    },
    after_completion: {
      type: 'redirect',
      redirect: { url: `${baseUrl}/${lead.slug}?dominio=ok` },
    },
  });

  console.log(`✅ Domain Payment Link: ${paymentLink.url}`);
  return paymentLink.url;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const leadId = getArg('leadId');
  if (!leadId) {
    console.error('❌ Falta --leadId <mongoId>');
    process.exit(1);
  }

  createPaymentLink({ leadId })
    .then(url => {
      if (url) console.log(`\n🎉 Payment Link: ${url}`);
      process.exit(url ? 0 : 1);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
