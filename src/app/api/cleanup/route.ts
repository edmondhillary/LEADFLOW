/**
 * API Route: /api/cleanup
 * Llamada por n8n cada hora para expirar leads de +48h
 * Protegida con API secret
 */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Lead } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  // Verificar secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const expiredResult = await Lead.updateMany(
    { status: { $in: ['email_sent', 'visited'] }, emailSentAt: { $lt: fortyEightHoursAgo } },
    { $set: { status: 'expired' } }
  );

  const cleanedResult = await Lead.deleteMany({
    status: 'scraped',
    createdAt: { $lt: thirtyDaysAgo },
  });

  // Notificar a Telegram si hay expirados
  if (expiredResult.modifiedCount > 0 && process.env.TELEGRAM_BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🧹 *Cleanup automático*\n⏰ Expirados: ${expiredResult.modifiedCount}\n🗑️ Limpiados: ${cleanedResult.deletedCount}`,
        parse_mode: 'Markdown',
      }),
    });
  }

  return NextResponse.json({
    ok: true,
    expired: expiredResult.modifiedCount,
    cleaned: cleanedResult.deletedCount,
    timestamp: now.toISOString(),
  });
}
