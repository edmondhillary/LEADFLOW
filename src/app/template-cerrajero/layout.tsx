'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateCerrajeroLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-cerrajero';
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
    <div className="min-h-screen flex flex-col bg-[#131313] text-[#e5e2e1]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 24px 24px rgba(255,215,0,0.08)' }}>
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link href={`${baseHref}`} style={{ textDecoration: 'none' }}>
            <span className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: '#ffd700' }}>
                <path d="M12 1C8.676 1 6 3.676 6 7v2H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 9a2 2 0 0 1 1 3.732V17a1 1 0 0 1-2 0v-1.268A2 2 0 0 1 12 12z" fill="currentColor" />
              </svg>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 800, color: '#ffd700', letterSpacing: '-0.04em', fontStyle: 'italic' }}>
                {business_.name}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors duration-300 hover:text-[#ffd700]"
                style={{ fontSize: '11px', fontWeight: 500, color: '#d0c6ab', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={`tel:${business_.phoneIntl}`}
            className="hidden md:inline-block transition-all active:scale-[0.98] rounded-lg"
            style={{ fontSize: '11px', fontWeight: 700, background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', padding: '11px 24px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em' }}
          >
            CALL NOW
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#e5e2e1', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#e5e2e1', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#e5e2e1', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in menu */}
      <div
        className="fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col transition-transform duration-300"
        style={{ backgroundColor: '#1c1b1b', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}
      >
        <nav className="flex flex-col px-8 gap-1">
          {navLinks.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 py-4 hover:text-[#ffd700] transition-colors"
              style={{ borderBottom: '1px solid rgba(255,215,0,0.08)', textDecoration: 'none', color: '#e5e2e1' }}
            >
              <span style={{ fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <a
            href={`tel:${business_.phoneIntl}`}
            className="block w-full text-center py-4 rounded-lg"
            style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none' }}
          >
            CALL NOW
          </a>
          <p className="mt-4 text-center" style={{ fontSize: '10px', color: '#d0c6ab', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{business_.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* Footer */}
      <footer className="w-full pt-20 pb-12 bg-[#0e0e0e]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-8 max-w-[1920px] mx-auto">
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 800, fontStyle: 'italic', color: '#ffd700', marginBottom: '16px', letterSpacing: '-0.03em' }}>
              {business_.name}
            </p>
            <p style={{ fontSize: '11px', color: '#d0c6ab', lineHeight: 1.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {business_.tagline}<br />{business_.city}, {business_.country}
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Legal</h4>
            <div className="flex flex-col gap-3">
              <span style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Política de Privacidad</span>
              <span style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Aviso Legal</span>
              <span style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Cookies</span>
            </div>
          </div>

          {/* SEO Cities */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Zonas de Servicio</h4>
            <div className="flex flex-col gap-2">
              {['Madrid Centro', 'Salamanca', 'Chamberí', 'Retiro', 'Vallecas', 'Carabanchel'].map(z => (
                <span key={z} style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{z}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#e5e2e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Contacto</h4>
            <div style={{ fontSize: '11px', lineHeight: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <a href={`tel:${business_.phoneIntl}`} style={{ color: '#ffd700', display: 'block', textDecoration: 'none', fontWeight: 700 }}>{business_.phone}</a>
              <p style={{ color: '#d0c6ab' }}>{business_.email}</p>
              <p style={{ color: '#d0c6ab' }}>{business_.address}</p>
            </div>
          </div>
        </div>

        <div
          className="mt-16 px-6 md:px-8 max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,215,0,0.08)' }}
        >
          <p style={{ fontSize: '10px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            &copy; {new Date().getFullYear()} {business_.legalName}. Todos los derechos reservados.{' '}
            <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>
              Made by Nexifydev.com
            </a>
          </p>
          <p style={{ fontSize: '10px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em', fontStyle: 'italic' }}>
            Cerrajero Urgente Madrid 24h
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
