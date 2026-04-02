'use client';

import Link from 'next/link';
import { useState } from 'react';
import { business, nav } from './data';

export default function VeterinarioLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-veterinario';
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
  const [alertOpen, setAlertOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f4] text-[#38312b]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {/* ─── STICKY NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f4]/80 backdrop-blur-xl shadow-sm shadow-[#38312b]/5">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
          {/* Logo */}
          <Link
            href={`${baseHref}`}
            className="text-2xl font-bold text-[#166875] tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {business_.name}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#665e56] hover:text-[#166875] font-medium tracking-tight transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={`${baseHref}/contacto`}
              className="hidden lg:block px-6 py-2.5 rounded-full border border-[#827971]/20 text-[#166875] font-semibold hover:bg-[#fcf2eb] transition-all duration-300 text-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Emergency Care
            </Link>
            <Link
              href={`${baseHref}/contacto`}
              className="px-6 py-2.5 rounded-full bg-[#166875] text-[#edfcff] font-semibold hover:bg-[#005c68] transition-all duration-300 text-sm shadow-sm scale-95 active:scale-90"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Reservar cita
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-[#38312b] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#38312b] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#38312b] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 bg-[#38312b]/40 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[80] w-72 bg-[#fff8f4] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-4 text-[#38312b] hover:text-[#166875] border-b border-[#bbb0a7]/20 text-base font-medium transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={`${baseHref}/contacto`}
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-[#166875] text-[#edfcff] rounded-full font-semibold px-6 py-3 hover:bg-[#005c68] transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Reservar cita
          </Link>
          <a
            href={`tel:${business_.emergency}`}
            className="block w-full text-center border border-[#ac3434]/20 text-[#ac3434] rounded-full font-semibold px-6 py-3 hover:bg-[#ac3434]/5 transition-colors text-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Emergency: {business_.emergency}
          </a>
        </div>
        <div className="mt-auto">
          <p className="text-xs text-[#827971] tracking-wide">{business_.phone}</p>
          <p className="text-xs text-[#827971] mt-1">{business_.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#fcf2eb] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#827971]/10">
            {/* Brand */}
            <div>
              <div
                className="text-xl font-bold text-[#166875] mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {business_.name}
              </div>
              <p className="text-[#827971] text-sm leading-relaxed mb-6">
                {business_.description}
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href={`tel:${business_.phoneIntl}`}
                  className="text-sm text-[#166875] font-semibold hover:text-[#005c68] transition-colors"
                >
                  {business_.phone}
                </a>
                <a
                  href={`mailto:${business_.email}`}
                  className="text-sm text-[#827971] hover:text-[#166875] transition-colors"
                >
                  {business_.email}
                </a>
              </div>
            </div>

            {/* Clinic */}
            <div>
              <h5
                className="font-bold text-[#166875] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Clinic
              </h5>
              <ul className="flex flex-col gap-3 text-sm text-[#827971]">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-[#166875] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li><Link href={`${baseHref}/nosotros`} className="hover:text-[#166875] transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5
                className="font-bold text-[#166875] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Legal
              </h5>
              <ul className="flex flex-col gap-3 text-sm text-[#827971]">
                <li><Link href="#" className="hover:text-[#166875] transition-colors">Política de privacidad</Link></li>
                <li><Link href="#" className="hover:text-[#166875] transition-colors">Términos del servicio</Link></li>
                <li><Link href="#" className="hover:text-[#166875] transition-colors">Accessibility</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5
                className="font-bold text-[#166875] mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Visit Us
              </h5>
              <div className="flex flex-col gap-2 text-sm text-[#827971]">
                <p>{business_.address}</p>
                <p>{business_.city}, {business_.state} {business_.zip}</p>
                <a
                  href={`tel:${business_.phoneIntl}`}
                  className="text-[#166875] font-semibold hover:text-[#005c68] transition-colors mt-2"
                >
                  {business_.phone}
                </a>
                <p className="text-[#ac3434] font-semibold text-xs uppercase tracking-widest mt-1">
                  Emergency 24/7: {business_.emergency}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-[#827971] text-xs">
              &copy; {new Date().getFullYear()} {business_.legalName}. High-End Medical Empathy.
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5c] transition-colors duration-200"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ─── CARE-GLASS ALERT ─── */}
      {alertOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-sm w-80 bg-[#f6ece4]/90 backdrop-blur-2xl p-5 rounded-2xl shadow-2xl border border-white/30 hidden md:block">
          <div className="flex items-start gap-4">
            <div className="bg-[#41684a] text-[#e8ffe8] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest font-bold text-[#41684a] mb-1">Clinic Update</p>
              <p className="text-sm font-bold text-[#38312b]">Now offering Mobile Vaccinations!</p>
              <p className="text-xs text-[#665e56] mt-1 leading-relaxed">Schedule a house-call vaccine visit for your companion.</p>
            </div>
            <button
              onClick={() => setAlertOpen(false)}
              className="text-[#827971] hover:text-[#38312b] transition-colors shrink-0"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
