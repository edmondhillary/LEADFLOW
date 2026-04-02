'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business as defaultBusiness, nav as defaultNav } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function TemplateYogaLayout({ children, overrides }: { children: React.ReactNode; overrides?: LeadOverrides }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const ov = overrides;
  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const base = ov?.baseHref ?? '/template-yoga';
  const nav = defaultNav.map(n => ({ ...n, href: n.href.replace('/template-yoga', base) }));

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fbf9f4', color: '#1b1c19' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* Header */}
      <header
        className="fixed top-0 w-full z-50"
        style={{
          background: 'rgba(251,249,244,0.70)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 12px 40px rgba(105,92,78,0.04)',
        }}
      >
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-[1920px] mx-auto">
          <Link
            href={base}
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: '20px',
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#566342',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            {business.name}
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {nav.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors duration-300"
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#45483f',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link
            href={`${base}/contacto`}
            className="hidden md:inline-block transition-all active:scale-[0.98]"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
              color: '#ffffff',
              padding: '11px 26px',
              borderRadius: '12px',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            Reservar Clase
          </Link>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#1b1c19', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#1b1c19', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#1b1c19', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in menu */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col transition-transform duration-300"
        style={{
          backgroundColor: '#fbf9f4',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          paddingTop: '80px',
        }}
      >
        <nav className="flex flex-col px-8 gap-1">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 py-4"
              style={{ borderBottom: '1px solid rgba(198,200,187,0.3)', textDecoration: 'none', color: '#1b1c19' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#566342' }}>{n.icon}</span>
              <span style={{ fontFamily: "'Noto Serif', serif", fontSize: '14px', fontWeight: 400 }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <Link
            href={`${base}/contacto`}
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center py-4"
            style={{
              background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '12px',
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            Reservar Clase
          </Link>
          <p className="mt-4 text-center" style={{ fontSize: '11px', color: '#45483f', letterSpacing: '0.05em' }}>{business.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* Footer */}
      <footer
        className="w-full pt-20 pb-12"
        style={{ backgroundColor: '#1b1c19', borderRadius: '2rem 2rem 0 0' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-8 max-w-[1920px] mx-auto">
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '20px', fontStyle: 'italic', fontWeight: 700, color: '#a3b18a', marginBottom: '16px' }}>
              {business.name}
            </p>
            <p style={{ fontSize: '12px', color: '#c6c8bb', lineHeight: 1.8 }}>
              {business.tagline}<br />
              {business.address}
            </p>
          </div>

          {/* Studio */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e4e2dd', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Studio</h4>
            <nav className="flex flex-col gap-3">
              {nav.map(n => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="transition-colors duration-300"
                  style={{ fontSize: '12px', color: '#c6c8bb', textDecoration: 'none' }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e4e2dd', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Connect</h4>
            <div style={{ fontSize: '12px', color: '#c6c8bb', lineHeight: 2.2 }}>
              <p>{business.email}</p>
              <p>{business.phone}</p>
              <p>{business.scheduleInfo}</p>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e4e2dd', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Policies</h4>
            <div className="flex flex-col gap-3">
              <span style={{ fontSize: '12px', color: '#c6c8bb' }}>Privacy Policy</span>
              <span style={{ fontSize: '12px', color: '#c6c8bb' }}>Cancellation Policy</span>
              <span style={{ fontSize: '12px', color: '#c6c8bb' }}>Terms of Service</span>
            </div>
          </div>
        </div>

        <div
          className="mt-16 px-6 md:px-8 max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(198,200,187,0.15)' }}
        >
          <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            &copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.
            {' · '}
            <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>
              Made by Nexifydev.com
            </a>
          </p>
          <p style={{ fontSize: '11px', color: '#45483f', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic' }}>
            Notting Hill, London
          </p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${business.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105"
        style={{ backgroundColor: '#25d366' }}
      >
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  );
}
