'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, nav } from './data';

export default function PeluqueriaLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-peluqueria';
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
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#2d3435]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      {/* Fixed Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{ background: 'rgba(249,249,249,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`${baseHref}`}
            className="tracking-[0.15em] text-xl font-bold text-[#2d3435]"
            style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic' }}
          >
            {business_.logoDisplay}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#5a6061] hover:text-[#785a1a] text-xs tracking-widest uppercase transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={`https://wa.me/${business_.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-7 py-3 hover:bg-[#6b4e0e] transition-colors duration-200"
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
              className={`block w-6 h-px bg-[#2d3435] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-[#2d3435] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-[#2d3435] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 bg-[#2d3435]/30 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-30 w-72 bg-[#f9f9f9] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-0">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-4 text-[#2d3435] hover:text-[#785a1a] border-b border-[#adb3b4]/30 text-sm tracking-widest uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Link
            href={`https://wa.me/${business_.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-6 py-4 hover:bg-[#6b4e0e] transition-colors"
          >
            RESERVAR TURNO
          </Link>
        </div>
        <div className="mt-auto">
          <p className="text-xs text-[#5a6061] tracking-wide">{business_.phone}</p>
          <p className="text-xs text-[#5a6061] mt-1">{business_.email}</p>
          <p className="text-xs text-[#5a6061] mt-1">{business_.hours}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] pt-16 pb-8 border-t border-[#ebeeef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
            {/* Dirección */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#5a6061] mb-5">Dirección</p>
              <p className="text-sm text-[#2d3435] leading-relaxed">{business_.address}</p>
              <p className="text-sm text-[#2d3435]">{business_.city}</p>
              <a
                href={`tel:${business_.phoneIntl}`}
                className="text-sm text-[#5a6061] hover:text-[#785a1a] transition-colors mt-3 block"
              >
                {business_.phone}
              </a>
              <a
                href={`mailto:${business_.email}`}
                className="text-sm text-[#5a6061] hover:text-[#785a1a] transition-colors mt-1 block"
              >
                {business_.email}
              </a>
            </div>

            {/* Horarios */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#5a6061] mb-5">Horarios</p>
              <p className="text-sm text-[#2d3435] leading-relaxed">{business_.hours}</p>
              <p className="text-sm text-[#5a6061] mt-2">Domingo y Lunes, cerrado</p>
              <p className="text-sm text-[#5a6061] mt-4">{business_.instagram}</p>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[#5a6061] mb-5">Legal</p>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-[#5a6061]">{business_.legalName}</span>
                <Link href="#" className="text-sm text-[#5a6061] hover:text-[#2d3435] transition-colors">Aviso Legal</Link>
                <Link href="#" className="text-sm text-[#5a6061] hover:text-[#2d3435] transition-colors">Privacidad</Link>
                <Link href="#" className="text-sm text-[#5a6061] hover:text-[#2d3435] transition-colors">Cookies</Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#ebeeef] flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="text-lg font-bold text-[#2d3435] tracking-[0.1em]"
              style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic' }}
            >
              {business_.logoDisplay}
            </p>
            <p className="text-[#5a6061] text-xs tracking-wide">
              &copy; {new Date().getFullYear()} {business_.legalName} — Todos los derechos reservados{' · '}<a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>Made by Nexifydev.com</a>
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-200"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
