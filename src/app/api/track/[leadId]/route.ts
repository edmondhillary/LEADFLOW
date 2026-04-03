import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
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

const BOT_UA_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /slurp/i,
  /headless/i,
  /lighthouse/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegrambot/i,
  /linkedinbot/i,
  /discordbot/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /monitor/i,
  /uptime/i,
  /preview/i,
];

const MILESTONE_VISITS = new Set([1, 3, 5, 10, 20, 50, 100]);

function isLikelyBot(userAgent: string): boolean {
  if (!userAgent) return false;
  return BOT_UA_PATTERNS.some((rx) => rx.test(userAgent));
}

function getVisitorFingerprint(request: NextRequest): { fingerprint: string; userAgent: string } {
  const userAgent = request.headers.get('user-agent') || '';
  const xff = request.headers.get('x-forwarded-for') || '';
  const xri = request.headers.get('x-real-ip') || '';
  const ip = (xff.split(',')[0] || xri || 'unknown').trim();
  const raw = `${ip}|${userAgent.slice(0, 180)}`;
  const fingerprint = createHash('sha256').update(raw).digest('hex').slice(0, 24);
  return { fingerprint, userAgent };
}

export async function GET(
  request: NextRequest,
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
    const dedupeMinutes = Math.max(1, parseInt(process.env.TRACK_DEDUPE_MINUTES || '45', 10));
    const dedupeMs = dedupeMinutes * 60 * 1000;
    const ignoreFirstVisit = process.env.TRACK_IGNORE_FIRST_VISIT !== '0';

    const { fingerprint, userAgent } = getVisitorFingerprint(request);
    if (isLikelyBot(userAgent)) {
      return GIF_RESPONSE();
    }

    // Primera visita humana: solo armamos tracking, no contamos ni notificamos.
    if (ignoreFirstVisit && !lead.trackingArmedAt) {
      await Lead.findByIdAndUpdate(leadId, {
        $set: {
          trackingArmedAt: now,
        },
      });
      return GIF_RESPONSE();
    }

    // Dedupe por visitante+ventana para no inflar métricas con refresh/crawlers residuales.
    const isDuplicateVisit =
      lead.trackingLastFingerprint === fingerprint &&
      !!lead.trackingLastCountedAt &&
      (now.getTime() - new Date(lead.trackingLastCountedAt).getTime()) < dedupeMs;

    if (isDuplicateVisit) {
      return GIF_RESPONSE();
    }

    const nextVisitCount = (lead.visitCount ?? 0) + 1;
    const isFirstCountedVisit = nextVisitCount === 1;

    // Actualizar registro de visita válida
    const setData: Record<string, unknown> = {
      lastVisit: now,
      trackingLastFingerprint: fingerprint,
      trackingLastCountedAt: now,
    };

    if (isFirstCountedVisit) {
      setData.firstVisit = now;
    }

    if (!['contacted', 'client', 'expired'].includes(lead.status)) {
      setData.status = 'visited';
    }

    await Lead.findByIdAndUpdate(leadId, {
      $set: setData,
      $inc: { visitCount: 1 },
    });

    const newVisitCount = nextVisitCount;

    // ─── Lead caliente: 3+ visitas en las últimas 24h ───────────────────────
    let isHot = false;
    if (newVisitCount >= 3 && lead.lastVisit) {
      const msSinceLastVisit = now.getTime() - new Date(lead.lastVisit).getTime();
      const hoursSinceLast = msSinceLastVisit / (1000 * 60 * 60);
      // Consideramos "caliente" si la visita anterior fue en las últimas 24h
      isHot = hoursSinceLast < 24;
    }

    // Notificar en hitos relevantes y cuando se pone caliente.
    const shouldNotify = isFirstCountedVisit || isHot || MILESTONE_VISITS.has(newVisitCount);
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
