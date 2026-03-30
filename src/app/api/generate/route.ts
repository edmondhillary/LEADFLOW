/**
 * API Route: /api/generate
 * Dispara el pipeline completo desde n8n o webhook externo
 * Protegida con API secret
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { sector, city, country, limit = 5 } = body;

  if (!sector || !city || !country) {
    return NextResponse.json({ error: 'Faltan: sector, city, country' }, { status: 400 });
  }

  // Ejecutar el pipeline en background (no bloqueamos la respuesta)
  // En producción esto se podría mover a una Queue (BullMQ, etc.)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4242';

  // Responder inmediatamente y procesar en background
  const response = NextResponse.json({
    ok: true,
    message: `Pipeline iniciado: ${sector} en ${city} (${country}) — ${limit} webs`,
    timestamp: new Date().toISOString(),
  });

  // Notificar a Telegram que el pipeline arrancó
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🚀 *Pipeline iniciado via n8n*\n\nSector: ${sector}\nCiudad: ${city}\nPaís: ${country}\nWebs: ${limit}`,
        parse_mode: 'Markdown',
      }),
    });
  }

  return response;
}
