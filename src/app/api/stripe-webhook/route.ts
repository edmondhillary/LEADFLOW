import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB, Lead } from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const leadId = session.metadata?.leadId;

    if (leadId) {
      await connectDB();
      const lead = await Lead.findByIdAndUpdate(leadId, {
        status: 'client',
        paidAt: new Date(),
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
      }, { new: true });

      if (lead) {
        // Notificar a Telegram
        if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
          const priceStr = lead.currency === 'EUR' ? `${lead.price}€/mes` : `$${lead.price}/mes`;
          const domainCost = lead.currency === 'EUR' ? '15€' : '$15';

          await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: `🎉 *¡NUEVO CLIENTE!*\n\n🏢 ${lead.businessName}\n💰 ${priceStr} + ${domainCost} dominio\n📍 ${lead.city}\n\n📧 Email de bienvenida enviado`,
              parse_mode: 'Markdown',
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: '🌐 Comprar dominio', callback_data: `domain_${leadId}` },
                    { text: '📋 Ver ficha', callback_data: `info_${leadId}` },
                  ],
                ],
              },
            }),
          });
        }

        // TODO: Enviar email de bienvenida via Brevo (Skill: email)
        // TODO: Programar recordatorio de reseña para 3 días después
      }
    }
  }

  return NextResponse.json({ received: true });
}
