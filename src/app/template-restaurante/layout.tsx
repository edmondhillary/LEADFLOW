'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, nav } from './data';

export default function RestauranteLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-restaurante';
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
    <div className="min-h-screen flex flex-col bg-[#FBFBE2] text-[#1B1D0E]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      {/* Fixed Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FBFBE2]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`${baseHref}`}
            className="tracking-[0.2em] uppercase text-2xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {business_.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#1A1A1A]/70 hover:text-[#722F37] text-sm tracking-wide transition-colors duration-200"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={`${baseHref}/contacto`}
              className="bg-[#FED65B] text-[#745C00] uppercase tracking-[0.1em] text-sm font-bold px-6 py-3 hover:bg-[#f5cb4a] transition-colors duration-200"
            >
              RESERVAR
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#1B1D0E] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#1B1D0E] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#1B1D0E] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 bg-[#1B1D0E]/40 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[80] w-72 bg-[#FBFBE2] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 text-[#1B1D0E] hover:text-[#735C00] border-b border-[#C4C7C7]/40 text-base tracking-wide transition-colors"
            >
              <span className="material-symbols-outlined text-[#735C00] text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Link
            href={`${baseHref}/contacto`}
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[#FED65B] text-[#745C00] uppercase tracking-[0.1em] text-sm font-bold px-6 py-3 hover:bg-[#f5cb4a] transition-colors"
          >
            RESERVAR MESA
          </Link>
        </div>
        <div className="mt-auto">
          <p className="text-xs text-[#1B1D0E]/40 tracking-[0.1em] uppercase">{business_.phone}</p>
          <p className="text-xs text-[#1B1D0E]/40 mt-1">{business_.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F5DC] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#C4C7C7]/40">
            {/* Brand */}
            <div className="md:col-span-1">
              <p
                className="tracking-[0.15em] uppercase text-xl font-bold text-[#1A1A1A] mb-3"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {business_.name}
              </p>
              <p className="text-sm text-[#444748] leading-relaxed">{business_.tagline}</p>
              <p className="text-xs text-[#1B1D0E]/40 mt-4">Est. {business_.foundedYear}</p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#444748] mb-4">Navegacion</p>
              <nav className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#444748] mb-4">Legal</p>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#444748]">{business_.legalName}</span>
                <Link href="#" className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors">Aviso Legal</Link>
                <Link href="#" className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors">Privacidad</Link>
                <Link href="#" className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors">Cookies</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#444748] mb-4">Contacto</p>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-[#444748]">{business_.address}</p>
                <p className="text-sm text-[#444748]">{business_.postalCode} {business_.city}</p>
                <a href={`tel:${business_.phoneIntl}`} className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors mt-2">{business_.phone}</a>
                <a href={`mailto:${business_.email}`} className="text-sm text-[#444748] hover:text-[#1B1D0E] transition-colors">{business_.email}</a>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-[#1A1A1A]/40 text-xs tracking-[0.1em] uppercase">
              &copy; {new Date().getFullYear()} {business_.legalName} — Todos los derechos reservados
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
        href={`https://wa.me/${business_.whatsapp}`}
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
