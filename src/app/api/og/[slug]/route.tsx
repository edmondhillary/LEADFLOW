import { ImageResponse } from 'next/og';

import { connectDB, Lead } from '@/lib/mongodb';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, ctx: Ctx) {
  try {
    const { slug } = await ctx.params;

    await connectDB();
    const lead = await Lead.findOne({ slug }).lean() as any;

    const businessName = lead?.businessName || 'Tu negocio local';
    const city = lead?.city || 'tu ciudad';
    const sector = lead?.sector || 'servicios';

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)',
            color: '#f8fafc',
            padding: '58px 64px',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>LeadFlow</div>
            <div style={{ fontSize: 22, opacity: 0.9 }}>Te hicimos una web</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.06, letterSpacing: -2, maxWidth: '1000px' }}>
              {businessName}
            </div>
            <div style={{ fontSize: 28, opacity: 0.95, maxWidth: '980px' }}>
              Diseño profesional para {sector} en {city}. Lista para captar clientes desde hoy.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 22, opacity: 0.9 }}>¿La quieres igual para tu negocio?</div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 20px',
              borderRadius: 14,
              background: '#f59e0b',
              color: '#0f172a',
              fontSize: 24,
              fontWeight: 800,
            }}>
              Ver demo
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0f172a',
            color: '#f8fafc',
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          LeadFlow · Te hicimos una web
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }
}
