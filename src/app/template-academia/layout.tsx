'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateAcademiaLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 shadow-sm" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-[1440px] mx-auto">
          <Link href="/template-academia" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#001944', letterSpacing: '-0.04em', textDecoration: 'none' }}>
            {business.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <Link key={n.href} href={n.href} className="transition-colors duration-200 hover:text-[#001944]" style={{ fontSize: '14px', fontWeight: 500, color: '#454652', textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/template-academia/contacto" style={{ fontSize: '14px', fontWeight: 500, color: '#454652', textDecoration: 'none' }}>
              Login
            </Link>
            <Link href="/template-academia/contacto" className="rounded-xl transition-all hover:opacity-90" style={{ fontSize: '14px', fontWeight: 600, background: 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', padding: '10px 22px', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>

          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#001944', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#001944', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#001944', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && <div className="fixed inset-0 z-40 md:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-in menu */}
      <div className="fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col transition-transform duration-300" style={{ backgroundColor: '#ffffff', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}>
        <nav className="flex flex-col px-8 gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-4" style={{ borderBottom: '1px solid rgba(198,197,212,0.3)', textDecoration: 'none', color: '#191c1d' }}>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8 flex flex-col gap-3">
          <Link href="/template-academia/contacto" className="block w-full text-center py-3 rounded-xl" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
          <p className="text-center" style={{ fontSize: '12px', color: '#454652' }}>{business.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[68px]">{children}</main>

      {/* Footer */}
      <footer className="w-full pt-20 pb-12" style={{ backgroundColor: '#001944' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-10 max-w-[1440px] mx-auto">
          {/* Brand + social */}
          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.04em', marginBottom: '12px' }}>{business.name}</p>
            <p style={{ fontSize: '13px', color: '#6b95f3', lineHeight: 1.8, marginBottom: '20px' }}>{business.tagline}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{business.address}<br />{business.postalCode} {business.city}</p>
            <div className="flex gap-4 mt-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                <span key={s} style={{ fontSize: '11px', color: '#6b95f3', cursor: 'pointer', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Quick Links</h4>
            <nav className="flex flex-col gap-3">
              {nav.map(n => (
                <Link key={n.href} href={n.href} className="transition-colors duration-200 hover:text-white" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{n.label}</Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>Resources</h4>
            <div className="flex flex-col gap-3">
              {['Blog', 'Guias Gratuitas', 'Webinars', 'Podcast', 'Comunidad'].map(r => (
                <span key={r} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>{r}</span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Newsletter</h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '16px', lineHeight: 1.7 }}>Recibe recursos exclusivos y novedades del sector cada semana.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}
              />
              <button className="rounded-xl px-4 py-2.5 transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                Suscribir
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 px-6 md:px-10 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>&copy; {new Date().getFullYear()} {business.legalName}. Todos los derechos reservados.{' '}
            <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>
              Made by Nexifydev.com
            </a>
          </p>
          <div className="flex gap-6">
            {['Politica de Privacidad', 'Aviso Legal', 'Cookies'].map(l => (
              <span key={l} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105" style={{ backgroundColor: '#25d366' }}>
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
      </a>
    </div>
  );
}
