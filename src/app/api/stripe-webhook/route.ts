import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectDB, Lead } from '@/lib/mongodb';
import { notifyNewClient } from '@/bot/telegram';

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
        // Notificar a Telegram usando el helper del bot
        const monthlyTotal = lead.monthlyTotal ?? lead.price ?? 25;
        notifyNewClient(leadId, monthlyTotal).catch((e) =>
          console.error('[stripe-webhook] notifyNewClient error:', e)
        );

        // TODO: Enviar email de bienvenida via Brevo (Skill: email)
        // TODO: Programar recordatorio de reseña para 3 días después
      }
    }
  }

  return NextResponse.json({ received: true });
}
