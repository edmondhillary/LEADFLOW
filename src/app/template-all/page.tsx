'use client';

import Link from 'next/link';

const templates = [
  {
    slug: 'template-restaurante',
    name: 'The Culinary Editorial',
    industry: 'Restaurante',
    design: 'Editorial Dorado · Noto Serif',
    color: '#1B1D0E',
    accent: '#FED65B',
    dark: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-veterinario',
    name: 'Kindred Paws',
    industry: 'Veterinario',
    design: 'Clinical Sanctuary · Plus Jakarta Sans',
    color: '#166875',
    accent: '#a4ebf9',
    dark: false,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-electricista',
    name: 'VOLT_PRECISION',
    industry: 'Electricista',
    design: 'Industrial Editorial · Inter',
    color: '#1c1b1b',
    accent: '#ffd700',
    dark: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-mecanico',
    name: 'INDUSTRIAL AUTHORITY',
    industry: 'Mecánico',
    design: 'Precision Brutalism · Space Grotesk',
    color: '#121416',
    accent: '#ff5f00',
    dark: true,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-peluqueria',
    name: "L'Artiste Coiffure",
    industry: 'Peluquería',
    design: 'Curated Gallery · Noto Serif',
    color: '#2d3435',
    accent: '#785a1a',
    dark: false,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-psicologo',
    name: 'SerenePath Psychology',
    industry: 'Psicólogo',
    design: 'Grounded Editorial · Noto Serif',
    color: '#586152',
    accent: '#a7b19f',
    dark: false,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-pilates',
    name: 'KINETIC GALLERY',
    industry: 'Pilates Studio',
    design: 'Editorial Wellness · Noto Serif',
    color: '#536257',
    accent: '#d6e7d8',
    dark: false,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-yoga',
    name: 'Breath of Silence',
    industry: 'Yoga Studio',
    design: 'Digital Sanctuary · Noto Serif',
    color: '#566342',
    accent: '#a3b18a',
    dark: false,
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-dentista',
    name: 'The Clinical Sanctuary',
    industry: 'Dentista',
    design: 'Clinical Serenity · Manrope',
    color: '#003e6f',
    accent: '#005696',
    dark: false,
    image: 'https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-mudanzas',
    name: 'Kinetic Editorial Moving',
    industry: 'Mudanzas',
    design: 'Kinetic Editorial · Manrope',
    color: '#002046',
    accent: '#552b00',
    dark: false,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-academia',
    name: 'Scholarly Academy',
    industry: 'Academia',
    design: 'Authoritative Academic · Manrope',
    color: '#001944',
    accent: '#2a6b2c',
    dark: false,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-aire',
    name: 'ArcticStream',
    industry: 'Aire Acondicionado',
    design: 'Thermal Architect · Manrope',
    color: '#8d4b00',
    accent: '#b15f00',
    dark: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-barberia',
    name: 'The Noir Atelier',
    industry: 'Barbería',
    design: 'Noir Editorial · Newsreader',
    color: '#131313',
    accent: '#e9c176',
    dark: true,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-canina',
    name: 'The Tailored Sanctuary',
    industry: 'Peluquería Canina',
    design: 'Organic Atelier · Plus Jakarta Sans',
    color: '#4c6456',
    accent: '#cee9d6',
    dark: false,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-cerrajero',
    name: 'THE SENTINEL',
    industry: 'Cerrajero',
    design: 'Tactical Editorial · Space Grotesk',
    color: '#131313',
    accent: '#ffd700',
    dark: true,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-limpieza',
    name: 'PureLinen',
    industry: 'Limpieza',
    design: 'Clinical Editorial · Manrope',
    color: '#0059bb',
    accent: '#0070ea',
    dark: false,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94aca24b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-jardineria',
    name: 'The Botanical Editorial',
    industry: 'Jardinería',
    design: 'Botanical Editorial · Newsreader',
    color: '#283827',
    accent: '#3e4f3c',
    dark: false,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-estetica',
    name: 'AESTHETIC',
    industry: 'Estética',
    design: 'Premium Beauty · Custom',
    color: '#1a1a1a',
    accent: '#d4af37',
    dark: true,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-fontaneria',
    name: 'FLUID ARCHITECT',
    industry: 'Fontanería',
    design: 'Technical Authority · Custom',
    color: '#1e3a5f',
    accent: '#0ea5e9',
    dark: true,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-gimnasio',
    name: 'KINETIC',
    industry: 'Gimnasio',
    design: 'Power Editorial · Custom',
    color: '#0a0a0a',
    accent: '#ef4444',
    dark: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-pintor',
    name: 'The Architectural Canvas',
    industry: 'Pintor',
    design: 'Artistic Editorial · Custom',
    color: '#2c2416',
    accent: '#d97706',
    dark: true,
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'template-arquitectura',
    name: 'ARCHI STUDIO',
    industry: 'Arquitectura',
    design: 'Editorial Minimal · Noto Serif',
    color: '#2e3430',
    accent: '#5f5e5e',
    dark: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TemplateAll() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', fontFamily: "'Manrope', sans-serif", color: '#f1f1f1' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{ padding: '48px 32px 0', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '64px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>
              LeadFlow Templates
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f9fafb' }}>
              Template Library
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginTop: '12px', maxWidth: '500px', lineHeight: 1.6 }}>
              {templates.length} templates de alta fidelidad para negocios locales. Cada uno con 5 paginas, diseno de sistema propio y WhatsApp integrado.
            </p>
          </div>
          <div style={{ textAlign: 'right', display: 'none' }}>
            <p style={{ fontSize: '48px', fontWeight: 800, color: '#6366f1' }}>{templates.length}</p>
            <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Templates</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { num: templates.length.toString(), label: 'Templates' },
            { num: (templates.length * 5).toString() + '+', label: 'Paginas' },
            { num: '21', label: 'Industrias' },
            { num: '100%', label: 'TypeScript' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#a5b4fc' }}>{s.num}</span>
              <span style={{ fontSize: '11px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Grid */}
      <main style={{ padding: '0 32px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {templates.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', background: '#111111', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${t.accent}22`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Hero image */}
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
                />
                {/* Accent bar */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: t.accent }} />
                {/* Industry badge */}
                <div
                  style={{
                    position: 'absolute', top: '12px', left: '12px',
                    padding: '4px 10px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '4px',
                    fontSize: '10px', fontWeight: 700, color: '#f9fafb',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}
                >
                  {t.industry}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '20px 20px 20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f9fafb', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                  {t.name}
                </h3>
                <p style={{ fontSize: '11px', color: '#4b5563', letterSpacing: '0.05em', marginBottom: '16px' }}>
                  {t.design}
                </p>

                {/* Color preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.color }} />
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.accent }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#6366f1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Ver template
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '32px', borderTop: '1px solid #1f2937' }}>
        <p style={{ fontSize: '11px', color: '#374151', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Made by{' '}
          <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>
            Nexifydev.com
          </a>
          {' '}— LeadFlow Template System
        </p>
      </footer>
    </div>
  );
}
