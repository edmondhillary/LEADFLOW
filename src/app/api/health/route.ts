/**
 * GET /api/health
 *
 * Endpoint de salud que el bot de Telegram pinga con /health.
 * Comprueba:
 *   - Que el servidor Next.js responde (implícito)
 *   - Conexión a MongoDB
 *
 * Responde 200 si todo OK, 503 si hay problemas.
 */
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();
  const checks: Record<string, { ok: boolean; ms?: number; error?: string }> = {};

  // ── MongoDB ──────────────────────────────────────────────────────────────
  try {
    await connectDB();
    checks.mongodb = { ok: true, ms: Date.now() - start };
  } catch (err) {
    checks.mongodb = { ok: false, error: String(err) };
  }

  // ── Vercel / proceso general (si llegamos aquí, Next.js funciona) ────────
  checks.server = { ok: true, ms: Date.now() - start };

  const allOk = Object.values(checks).every((c) => c.ok);

  return NextResponse.json(
    {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
    },
    { status: allOk ? 200 : 503 }
  );
}
