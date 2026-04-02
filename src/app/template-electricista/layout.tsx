'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, nav } from './data';

export default function ElectricistaLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-electricista';
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
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* ─── STICKY NAV ─── */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b-2 border-zinc-100 shadow-sm">
        <nav className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <Link
            href={`${baseHref}`}
            className="text-2xl font-black tracking-tighter text-zinc-900 uppercase"
          >
            {business_.name}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                className="text-zinc-600 hover:text-zinc-900 font-extrabold uppercase tracking-tighter transition-colors duration-150 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={`tel:${business_.phoneIntl}`}
            className="hidden md:block bg-[#ffd700] text-[#705e00] px-6 py-2 font-bold uppercase tracking-tight hover:bg-[#e9c400] active:scale-95 transition-all text-sm"
          >
            Llamar ahora
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 bg-[#1c1b1b]/60 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[80] w-72 bg-[#1c1b1b] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((item, i) => (
            <Link
              key={`${item.href}-m-${i}`}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center py-4 text-white hover:text-[#ffd700] border-b border-zinc-800 text-base font-extrabold uppercase tracking-tighter transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <a
            href={`tel:${business_.phoneIntl}`}
            className="block w-full text-center bg-[#ffd700] text-[#705e00] font-black uppercase tracking-tight px-6 py-3 hover:bg-[#e9c400] transition-colors"
          >
            Llamar ahora
          </a>
        </div>
        <div className="mt-auto">
          <p className="text-[#ffd700] font-black text-lg">{business_.phone}</p>
          <p className="text-zinc-500 text-xs mt-1">{business_.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-[72px] pb-16 md:pb-0">
        {children}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-zinc-900 w-full py-12 px-6 border-t-4 border-yellow-500 mb-16 md:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Brand */}
          <div>
            <div className="text-xl font-black text-white uppercase mb-6">{business_.name}</div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{business_.description}</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="text-white font-bold uppercase text-xs tracking-widest">Empresa</span>
              <nav className="flex flex-col gap-2">
                {navLinks.map((item, i) => (
                  <Link key={i} href={item.href} className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <span className="text-white font-bold uppercase text-xs tracking-widest">Legal</span>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">Aviso Legal</Link>
                <Link href="#" className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">Privacidad</Link>
                <Link href="#" className="text-zinc-500 hover:text-yellow-400 text-sm transition-colors">Cookies</Link>
              </nav>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="text-right">
              <a href={`tel:${business_.phoneIntl}`} className="text-yellow-400 font-black text-2xl hover:text-yellow-300 transition-colors">
                {business_.phone}
              </a>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">Línea de Urgencias 24h</p>
              <p className="text-zinc-500 text-sm mt-3">{business_.address}</p>
              <p className="text-zinc-500 text-sm">{business_.city}, {business_.country}</p>
            </div>
            <p className="text-zinc-400 text-xs mt-8">
              &copy; {new Date().getFullYear()} {business_.legalName}
              {' · '}
              <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>
                Made by Nexifydev.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ─── WHATSAPP FAB ─── */}
      <a
        href={`https://wa.me/${business_.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-20 right-6 z-50 md:bottom-6 w-14 h-14 bg-[#25d366] flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-200"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Bottom nav eliminado: navegación móvil unificada en menú desplegable */}
    </div>
  );
}
