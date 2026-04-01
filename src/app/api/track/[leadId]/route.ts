import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Lead } from '@/lib/mongodb';
import { notifyVisit, notifyServiceAlert } from '@/bot/telegram';

// Pixel GIF transparente 1x1
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

const GIF_RESPONSE = () =>
  new NextResponse(TRANSPARENT_GIF, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const { leadId } = await params;

  try {
    await connectDB();
  } catch (dbError) {
    // MongoDB caída — notificar y devolver pixel igualmente
    try {
      await notifyServiceAlert('mongodb', String(dbError));
    } catch { /* bot también puede fallar si mongo está down */ }
    return GIF_RESPONSE();
  }

  try {
    const lead = await Lead.findById(leadId);
    if (!lead) return GIF_RESPONSE();

    const now = new Date();
    const isFirstVisit = !lead.firstVisit;

    // Actualizar registro de visita
    await Lead.findByIdAndUpdate(leadId, {
      $set: {
        lastVisit: now,
        ...(isFirstVisit ? { firstVisit: now, status: 'visited' } : {}),
      },
      $inc: { visitCount: 1 },
    });

    const newVisitCount = (lead.visitCount ?? 0) + 1;

    // ─── Lead caliente: 3+ visitas en las últimas 24h ───────────────────────
    let isHot = false;
    if (newVisitCount >= 3 && lead.lastVisit) {
      const msSinceLastVisit = now.getTime() - new Date(lead.lastVisit).getTime();
      const hoursSinceLast = msSinceLastVisit / (1000 * 60 * 60);
      // Consideramos "caliente" si la visita anterior fue en las últimas 24h
      isHot = hoursSinceLast < 24;
    }

    // Notificar: primera visita, cada visita posterior, o lead caliente
    const shouldNotify = isFirstVisit || isHot || newVisitCount % 1 === 0; // todas
    if (shouldNotify) {
      // Fire and forget — no bloqueamos el pixel
      notifyVisit(leadId, newVisitCount, isHot).catch((err) => {
        console.error('[track] notifyVisit error:', err);
      });
    }
  } catch (error) {
    console.error('[track] error:', error);
  }

  return GIF_RESPONSE();
}
