'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, nav } from './data';

export default function MecanicoLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#121416] text-[#e2e2e5]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Fixed Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: 'rgba(18,20,22,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(255,181,153,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/template-mecanico"
            className="text-xl font-black uppercase tracking-tighter text-[#e2e2e5] hover:text-[#ffb599] transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-[#ff5f00]">INDUSTRIAL</span>{' '}
            <span>AUTHORITY</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                className="text-[#c4c6cc] hover:text-[#ffb599] text-sm tracking-wide uppercase font-medium transition-colors duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${business.phoneIntl}`}
              className="text-[#ffb599] text-sm font-bold tracking-wide hover:text-[#ff5f00] transition-colors duration-200"
            >
              {business.phone}
            </a>
            <Link
              href="/template-mecanico/servicios"
              className="text-[#531a00] text-sm font-black uppercase tracking-widest px-6 py-3 transition-all duration-200 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
            >
              URGENCIAS
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#e2e2e5] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#e2e2e5] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#e2e2e5] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 bg-[#121416]/70 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-30 w-72 bg-[#1a1c1e] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-1">
          {nav.map((item, i) => (
            <Link
              key={`mobile-${item.href}-${i}`}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-4 text-[#c4c6cc] hover:text-[#ffb599] border-b border-[#5b4137]/20 text-base font-medium uppercase tracking-wider transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Link
            href="/template-mecanico/servicios"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center text-[#531a00] font-black uppercase tracking-widest px-6 py-3 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)' }}
          >
            URGENCIAS
          </Link>
        </div>
        <div className="mt-auto">
          <a href={`tel:${business.phoneIntl}`} className="text-sm text-[#ffb599] font-bold tracking-wide">
            {business.phone}
          </a>
          <p className="text-xs text-[#c4c6cc]/50 mt-1">{business.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#121416] border-t border-[#5b4137]/15 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#5b4137]/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <p
                className="text-xl font-black uppercase tracking-tighter text-[#e2e2e5] mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-[#ff5f00]">INDUSTRIAL</span> AUTHORITY
              </p>
              <p className="text-sm text-[#c4c6cc]/70 leading-relaxed">{business.tagline}</p>
              <p className="text-xs text-[#c4c6cc]/40 mt-4 uppercase tracking-widest">Est. {business.founded}</p>
            </div>

            {/* Navigation */}
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#ffb599] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Navegación
              </p>
              <nav className="flex flex-col gap-2">
                {nav.map((item, i) => (
                  <Link
                    key={`footer-${item.href}-${i}`}
                    href={item.href}
                    className="text-sm text-[#c4c6cc]/70 hover:text-[#ffb599] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#ffb599] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Legal
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#c4c6cc]/70">{business.legalName}</span>
                <Link href="#" className="text-sm text-[#c4c6cc]/70 hover:text-[#ffb599] transition-colors">Aviso Legal</Link>
                <Link href="#" className="text-sm text-[#c4c6cc]/70 hover:text-[#ffb599] transition-colors">Privacidad</Link>
                <Link href="#" className="text-sm text-[#c4c6cc]/70 hover:text-[#ffb599] transition-colors">Cookies</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#ffb599] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contacto
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#c4c6cc]/70">{business.address}</p>
                <p className="text-sm text-[#c4c6cc]/70">{business.postalCode} {business.city}</p>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="text-sm text-[#ffb599] font-bold hover:text-[#ff5f00] transition-colors mt-2"
                >
                  {business.phone}
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm text-[#c4c6cc]/70 hover:text-[#ffb599] transition-colors"
                >
                  {business.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-[#c4c6cc]/30 text-xs tracking-[0.1em] uppercase">
              &copy; {new Date().getFullYear()} {business.legalName} — Todos los derechos reservados
              {' · '}
              <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>
                Made by Nexifydev.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${business.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25d366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-200"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
