'use client';

import { useState, useEffect } from 'react';

const TEMPLATES = [
  { path: 'template-academia',           name: 'ACADEMIA ÉLITE',           tagline: 'Formación de Excelencia',     icon: 'school',             primary: '#1e3a5f', accent: '#f59e0b' },
  { path: 'template-aire-acondicionado', name: 'CLIMATECH PRO',            tagline: 'Climatización Avanzada',      icon: 'ac_unit',            primary: '#0369a1', accent: '#22c55e' },
  { path: 'template-arquitectura',       name: 'ARCHI STUDIO',             tagline: 'Arquitectura de Autor',       icon: 'architecture',       primary: '#1a1a2e', accent: '#c9a96e', isNew: true },
  { path: 'template-barberia',           name: 'THE BARBER CLUB',          tagline: 'Grooming Premium',            icon: 'content_cut',        primary: '#1c1917', accent: '#ca8a04', isNew: true },
  { path: 'template-canina-peluqueria',  name: 'PETS GLAMOUR',             tagline: 'Grooming Canino',             icon: 'pets',               primary: '#0f766e', accent: '#ec4899', isNew: true },
  { path: 'template-cerrajero',          name: 'LOCKMASTER',               tagline: 'Seguridad 24h',               icon: 'key',                primary: '#0f172a', accent: '#f59e0b' },
  { path: 'template-dentista',           name: 'DENTAL CLINIC PRO',        tagline: 'Salud Dental',                icon: 'medical_services',   primary: '#0891b2', accent: '#06b6d4' },
  { path: 'template-electricista',       name: 'VOLTEX PRO',               tagline: 'Electrical Engineering',      icon: 'bolt',               primary: '#1d4ed8', accent: '#f59e0b' },
  { path: 'template-estetica-clinica',   name: 'CLÍNICA ESTÉTICA LUXE',    tagline: 'Medicina Estética',           icon: 'spa',                primary: '#831843', accent: '#d4a853', isNew: true },
  { path: 'template-fisioterapia',       name: 'FISIO MOTION',             tagline: 'Rehabilitación Avanzada',     icon: 'self_improvement',   primary: '#0c4a6e', accent: '#10b981' },
  { path: 'template-fontaneria',         name: 'FLUID ARCHITECT',          tagline: 'Precision Engineering',       icon: 'waves',              primary: '#002045', accent: '#e88532' },
  { path: 'template-gimnasio',           name: 'IRON CLUB',                tagline: 'High Performance Fitness',    icon: 'fitness_center',     primary: '#111827', accent: '#ef4444' },
  { path: 'template-inmobiliaria',       name: 'INMOVISION',               tagline: 'Tu Propiedad Ideal',          icon: 'home_work',          primary: '#0f172a', accent: '#d97706', isNew: true },
  { path: 'template-jardineria',         name: 'JARDÍN ÉLITE',             tagline: 'Paisajismo Profesional',      icon: 'yard',               primary: '#14532d', accent: '#854d0e', isNew: true },
  { path: 'template-limpieza',           name: 'CLEAN MASTER PRO',         tagline: 'Limpieza Profesional',        icon: 'cleaning_services',  primary: '#0c4a6e', accent: '#22c55e' },
  { path: 'template-mecanico',           name: 'MOTO EXPERT',              tagline: 'Mecánica de Precisión',       icon: 'two_wheeler',        primary: '#292524', accent: '#f97316' },
  { path: 'template-mudanzas',           name: 'MUDANZA EXPRESS',          tagline: 'Tu Mudanza Perfecta',         icon: 'local_shipping',     primary: '#1e3a5f', accent: '#f97316', isNew: true },
  { path: 'template-peluqueria',         name: 'STUDIO HAIR',              tagline: 'Belleza Profesional',         icon: 'content_cut',        primary: '#7c3aed', accent: '#ec4899' },
  { path: 'template-pilates-studio',     name: 'PILATES CORE STUDIO',      tagline: 'Movimiento Consciente',       icon: 'sports_gymnastics',  primary: '#334155', accent: '#f43f5e', isNew: true },
  { path: 'template-pintor',             name: 'PINTURA ÉLITE',            tagline: 'Acabados Perfectos',          icon: 'format_paint',       primary: '#1e293b', accent: '#f59e0b' },
  { path: 'template-pintor-pro',         name: 'PINTURA PRO INDUSTRIAL',   tagline: 'Recubrimientos Industriales', icon: 'format_paint',       primary: '#0f172a', accent: '#f59e0b', isNew: true },
  { path: 'template-psicologo',          name: 'PSICOLOGÍA AVANZADA',      tagline: 'Tu Bienestar Mental',         icon: 'psychology',         primary: '#312e81', accent: '#0d9488', isNew: true },
  { path: 'template-restaurante',        name: 'SABOR & ALMA',             tagline: 'Alta Cocina',                 icon: 'restaurant_menu',    primary: '#7c1d1d', accent: '#d97706' },
  { path: 'template-taller',             name: 'AUTOTECH MADRID',          tagline: 'Mecánica Avanzada',           icon: 'build',              primary: '#374151', accent: '#f59e0b' },
  { path: 'template-veterinario',        name: 'VETCARE CLINIC',           tagline: 'Medicina Veterinaria',        icon: 'pets',               primary: '#14532d', accent: '#f97316' },
  { path: 'template-yogastudio',         name: 'ZEN YOGA STUDIO',          tagline: 'Yoga & Meditación',           icon: 'self_improvement',   primary: '#4c1d95', accent: '#fbbf24', isNew: true },
];

export default function TemplateAll() {
  const [baseUrl, setBaseUrl] = useState('');

  // Auto-detect origin on mount
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const href = (path: string) => `${baseUrl}/${path}`;

  return (
    <>
      {/* Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,1&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'Inter', sans-serif", background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0' }}>

        {/* ── Header ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              LeadFlow<span style={{ color: '#6366f1' }}>.</span>
            </span>
            <span style={{
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc', fontSize: 10, fontWeight: 700, letterSpacing: 1,
              textTransform: 'uppercase' as const, padding: '3px 9px', borderRadius: 20,
            }}>Templates</span>
          </div>

          {/* URL bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, flex: 1, maxWidth: 460,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '8px 14px',
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.8, whiteSpace: 'nowrap' as const }}>
              Base URL
            </span>
            <input
              value={baseUrl}
              onChange={e => setBaseUrl(e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#e2e8f0', fontFamily: 'monospace', fontSize: 13,
                fontWeight: 500, flex: 1, minWidth: 0,
              }}
              placeholder="https://tu-proyecto.vercel.app"
            />
          </div>

          {/* Count */}
          <span style={{ fontSize: 13, color: '#64748b' }}>
            <strong style={{ color: '#e2e8f0' }}>{TEMPLATES.length}</strong> templates listos
          </span>
        </header>

        {/* ── Grid ── */}
        <main style={{ padding: '36px 32px', maxWidth: 1400, margin: '0 auto' }}>

          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: '#475569' }}>
              Haz clic en cualquier tarjeta para previsualizar
            </span>
            <button
              onClick={() => TEMPLATES.forEach((t, i) => setTimeout(() => window.open(href(t.path), '_blank'), i * 200))}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                color: '#a5b4fc', fontSize: 12, fontWeight: 600, padding: '8px 16px',
                borderRadius: 10, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 15 }}>open_in_new</span>
              Abrir todos
            </button>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 14,
          }}>
            {TEMPLATES.map(t => (
              <a
                key={t.path}
                href={href(t.path)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textDecoration: 'none', color: 'inherit',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16, overflow: 'hidden', position: 'relative',
                  transition: 'transform 0.18s, border-color 0.18s, box-shadow 0.18s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Color bar */}
                <div style={{ height: 5, background: `linear-gradient(90deg, ${t.primary}, ${t.accent})` }} />

                {/* NEW badge */}
                {t.isNew && (
                  <span style={{
                    position: 'absolute', top: 14, right: 12,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)',
                    color: '#818cf8', fontSize: 9, fontWeight: 700, letterSpacing: 1,
                    textTransform: 'uppercase' as const, padding: '2px 7px', borderRadius: 6,
                  }}>NEW</span>
                )}

                <div style={{ padding: 20 }}>
                  {/* Icon + path */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff', fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
                    </div>
                    <span style={{
                      fontSize: 10, fontFamily: 'monospace', color: '#475569',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                      padding: '4px 8px', borderRadius: 6, whiteSpace: 'nowrap' as const,
                      alignSelf: 'flex-start',
                    }}>/{t.path}</span>
                  </div>

                  {/* Name & tagline */}
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px', marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{t.tagline}</div>

                  {/* Bottom row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: t.primary, border: '2px solid rgba(255,255,255,0.1)' }} title={t.primary} />
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: t.accent, border: '2px solid rgba(255,255,255,0.1)' }} title={t.accent} />
                      <span style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', marginLeft: 2 }}>{t.primary}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#475569' }}>
                      Ver <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
