'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: '#0f0f0f', fontFamily: "'Manrope', sans-serif" }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* 404 number */}
        <div
          className="select-none leading-none mb-4"
          style={{
            fontSize: 'clamp(120px, 20vw, 220px)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-8"
          style={{
            width: '48px', height: '2px',
            background: 'linear-gradient(90deg, #6366f1, #ec4899)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
            transformOrigin: 'center',
          }}
        />

        {/* Headline */}
        <h1
          className="mb-4"
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 700,
            color: '#f1f1f1',
            letterSpacing: '-0.02em',
          }}
        >
          Esta pagina no existe
        </h1>

        {/* Subtext */}
        <p
          className="max-w-md mx-auto mb-12"
          style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: 1.7,
          }}
        >
          La ruta que buscas no se encuentra. Puede que haya sido movida, eliminada
          o que simplemente nunca existio.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al inicio
          </Link>
          <Link
            href="/template-all"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#a5b4fc',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
          >
            Ver todos los templates
          </Link>
        </div>

        {/* Animated dots decoration */}
        <div className="flex justify-center gap-2 mt-16">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: i === 0 ? '#6366f1' : i === 1 ? '#a855f7' : '#ec4899',
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer attribution */}
      <div
        className="absolute bottom-8 text-center"
        style={{ fontSize: '11px', color: '#374151', letterSpacing: '0.1em', textTransform: 'uppercase' }}
      >
        Made by{' '}
        <a
          href="https://nexifydev.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#6366f1', textDecoration: 'none' }}
        >
          Nexifydev.com
        </a>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
