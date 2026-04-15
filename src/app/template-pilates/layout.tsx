'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplatePilatesLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pilates';
const business_ = ov ? {
    ...business,
    name: ov.businessName || business.name,
    fullName: ov.businessName || (business as any).fullName || business.name,
    legalName: ov.businessName || (business as any).legalName || (business as any).fullName || business.name,
    phone: ov.phone || business.phone,
    phoneIntl: ov.phoneIntl || business.phoneIntl,
    email: ov.email || business.email,
    address: ov.address || business.address,
    city: ov.city || business.city,
    whatsapp: String((ov.phoneIntl || (business as any).whatsapp || '')).replace(/\D/g, ''),
  } : business;
const navLinks = Array.isArray(nav) ? nav.map((n: any) => ({ ...n, href: n.href.replace(/^\/template-[^/]+/, baseHref) })) : [];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#faf9f6', color: '#2f3430' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(250,249,246,0.70)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(175,179,174,0.12)' }}>
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-[1920px] mx-auto">
          <Link href={`${baseHref}`} style={{ fontFamily: "'Noto Serif', serif", fontSize: '18px', fontWeight: 300, color: '#536257', letterSpacing: '0.2em', textDecoration: 'none', textTransform: 'uppercase' }}>
            {business_.name}
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="hover:text-[#536257] transition-colors duration-300"
                style={{ fontSize: '11px', fontWeight: 400, fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#5c605c', textDecoration: 'none', letterSpacing: '0.05em' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <a
            href={`/template-pilates/contacto`}
            className="hidden md:inline-block transition-all active:scale-[0.98]"
            style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#536257', color: '#ebfced', padding: '11px 28px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', borderRadius: '9999px' }}
          >
            Reservar ahora
          </a>

          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#2f3430', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#2f3430', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#2f3430', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[70] md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in menu */}
      <div
        className="fixed top-0 right-0 z-[80] h-full w-72 md:hidden flex flex-col transition-transform duration-300"
        style={{ backgroundColor: '#faf9f6', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}
      >
        <nav className="flex flex-col px-8 gap-1">
          {navLinks.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 py-4"
              style={{ borderBottom: '1px solid rgba(83,98,87,0.1)', textDecoration: 'none', color: '#2f3430' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#536257' }}>{n.icon}</span>
              <span style={{ fontSize: '12px', fontFamily: "'Noto Serif', serif", fontStyle: 'italic', letterSpacing: '0.05em' }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <a
            href={`${baseHref}/contacto`}
            className="block w-full text-center py-4"
            style={{ backgroundColor: '#536257', color: '#ebfced', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', borderRadius: '9999px' }}
          >
            Reservar sesión
          </a>
          <p className="mt-4 text-center" style={{ fontSize: '10px', color: '#5c605c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{business_.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* Footer */}
      <footer className="w-full pt-20 pb-12" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-8 max-w-[1920px] mx-auto">
          <div>
            <p style={{ fontFamily: "'Noto Serif', serif", fontSize: '16px', fontWeight: 300, fontStyle: 'italic', color: '#536257', marginBottom: '16px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{business_.name}</p>
            <p style={{ fontSize: '12px', color: '#5c605c', lineHeight: 1.8 }}>{business_.tagline}<br />{business_.city}, {business_.state}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#2f3430', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Estudio</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map(n => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="hover:text-[#536257] transition-colors duration-300"
                  style={{ fontSize: '12px', color: '#5c605c', textDecoration: 'none', fontFamily: "'Noto Serif', serif", fontStyle: 'italic' }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#2f3430', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Contacto</h4>
            <div style={{ fontSize: '12px', color: '#5c605c', lineHeight: 2 }}>
              <p>{business_.email}</p>
              <p>{business_.phone}</p>
              <p>{business_.address}</p>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#2f3430', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Boletín</h4>
            <p style={{ fontSize: '12px', color: '#5c605c', lineHeight: 1.7, marginBottom: '16px' }}>Novedades del estudio, horarios y consejos de movimiento — cada mes en tu correo.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 py-2 px-3 text-sm"
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(175,179,174,0.4)', outline: 'none', color: '#2f3430', borderRadius: '4px' }}
                readOnly
              />
              <button
                style={{ backgroundColor: '#536257', color: '#ebfced', fontSize: '10px', fontWeight: 600, padding: '8px 16px', border: 'none', cursor: 'pointer', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                Suscribir
              </button>
            </div>
          </div>
        </div>
        <div
          className="mt-16 px-6 md:px-8 max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(83,98,87,0.15)' }}
        >
          <p style={{ fontSize: '10px', color: '#5c605c', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            &copy; {new Date().getFullYear()} {business_.fullName}. Todos los derechos reservados.
            {' · '}
            <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>
              Made by Nexifydev.com
            </a>
          </p>
          <p style={{ fontSize: '10px', color: '#5c605c', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic' }}>
            {business_.city}, {business_.state}
          </p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${business_.whatsapp}`}
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
