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
}): Promise<string | null> {
  const { leadId } = options;

  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) {
    console.error(`❌ Lead no encontrado: ${leadId}`);
    return null;
  }

  console.log(`\n💳 Creando Payment Link para: ${lead.businessName}`);

  // Seleccionar price ID según moneda
  const priceId = lead.currency === 'EUR'
    ? process.env.STRIPE_PRICE_EUR_MONTHLY
    : process.env.STRIPE_PRICE_USD_MONTHLY;

  if (!priceId) {
    throw new Error(`Falta STRIPE_PRICE_${lead.currency}_MONTHLY en .env.local`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';

  const stripe = getStripe();

  // Crear el payment link con Stripe SDK
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    metadata: {
      leadId: leadId,
      businessName: lead.businessName,
      sector: lead.sector,
      city: lead.city,
      country: lead.country,
    },
    after_completion: {
      type: 'redirect',
      redirect: {
        url: `${baseUrl}/${lead.slug}?pagado=true`,
      },
    },
    phone_number_collection: { enabled: false },
    allow_promotion_codes: false,
  });

  // Guardar el payment link en el lead
  await Lead.findByIdAndUpdate(leadId, {
    stripePaymentLinkId: paymentLink.id,
  });

  console.log(`✅ Payment Link creado:`);
  console.log(`   URL: ${paymentLink.url}`);
  console.log(`   ID: ${paymentLink.id}`);
  console.log(`   Precio: ${lead.price}${lead.currency === 'EUR' ? '€' : '$'}/mes`);

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
