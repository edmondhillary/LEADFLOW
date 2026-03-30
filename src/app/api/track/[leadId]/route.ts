import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Lead } from '@/lib/mongodb';

// Pixel GIF transparente de 1x1
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    await connectDB();

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return new NextResponse(TRANSPARENT_GIF, {
        headers: { 'Content-Type': 'image/gif', 'Cache-Control': 'no-store' },
      });
    }

    // Registrar visita
    const isFirstVisit = !lead.firstVisit;
    await Lead.findByIdAndUpdate(leadId, {
      $set: {
        lastVisit: new Date(),
        ...(isFirstVisit ? { firstVisit: new Date(), status: 'visited' } : {}),
      },
      $inc: { visitCount: 1 },
    });

    // Notificar a Telegram si es primera visita
    if (isFirstVisit && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const message = `👁️ *${lead.businessName}* acaba de ver su web\n\n` +
        `📍 ${lead.city} · ${lead.sector}\n` +
        `☎️ ${lead.phone || 'Sin teléfono'}\n` +
        `📧 ${lead.email || 'Sin email'}\n\n` +
        `🔗 [Ver su web](${process.env.NEXT_PUBLIC_BASE_URL}/${lead.slug})`;

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🌐 Ver web', url: `${process.env.NEXT_PUBLIC_BASE_URL}/${lead.slug}` },
                { text: '💬 WhatsApp', url: `https://wa.me/${lead.phone?.replace(/\D/g, '')}` },
              ],
              [
                { text: '💳 Enviar cobro', callback_data: `pay_${leadId}` },
              ],
            ],
          },
        }),
      });
    }
  } catch (error) {
    console.error('Track error:', error);
  }

  return new NextResponse(TRANSPARENT_GIF, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
