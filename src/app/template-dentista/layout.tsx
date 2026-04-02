'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateDentistaLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-dentista';
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
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb', color: '#191c1e' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(193,199,210,0.3)' }}>
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link href={`${baseHref}`} className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>dentistry</span>
            </div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '17px', fontWeight: 800, color: '#003e6f', letterSpacing: '-0.02em' }}>
              {business_.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors duration-200"
                style={{ fontSize: '14px', fontWeight: 500, color: '#414750', textDecoration: 'none' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href={`tel:${business_.phoneIntl}`}
            className="hidden md:inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', padding: '10px 24px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>phone_in_talk</span>
            Cita Urgente
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1e', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1e', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1e', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
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
        style={{ backgroundColor: '#ffffff', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}
      >
        <nav className="flex flex-col px-8 gap-1">
          {navLinks.map(n => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 py-4"
              style={{ borderBottom: '1px solid rgba(193,199,210,0.2)', textDecoration: 'none', color: '#191c1e' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#446279' }}>{n.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <a
            href={`tel:${business_.phoneIntl}`}
            className="block w-full text-center py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            Llamar Ahora
          </a>
          <p className="mt-3 text-center" style={{ fontSize: '12px', color: '#727781' }}>{business_.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[68px]">{children}</main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-10" style={{ backgroundColor: '#f2f4f6', borderTop: '1px solid rgba(193,199,210,0.4)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-8 max-w-[1920px] mx-auto">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)' }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>dentistry</span>
              </div>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 800, color: '#003e6f' }}>{business_.name}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#414750', lineHeight: 1.8 }}>{business_.tagline}</p>
            <p style={{ fontSize: '13px', color: '#727781', marginTop: '4px' }}>{business_.city}, {business_.country}</p>
            <div className="flex items-center gap-4 mt-5">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#e6e8ea', color: '#414750' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>language</span>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#e6e8ea', color: '#414750' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>photo_camera</span>
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#191c1e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Servicios</h4>
            <nav className="flex flex-col gap-3">
              {['Implantes Dentales', 'Ortodoncia', 'Urgencias 24h', 'Limpieza Dental', 'Estetica Dental', 'Carillas'].map(s => (
                <Link
                  key={s}
                  href={`${baseHref}/servicios`}
                  className="transition-colors hover:text-[#003e6f]"
                  style={{ fontSize: '13px', color: '#414750', textDecoration: 'none' }}
                >
                  {s}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, color: '#191c1e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Contacto</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#446279' }}>phone</span>
                <span style={{ fontSize: '13px', color: '#414750' }}>{business_.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#446279' }}>mail</span>
                <span style={{ fontSize: '13px', color: '#414750' }}>{business_.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#446279', marginTop: '1px' }}>location_on</span>
                <span style={{ fontSize: '13px', color: '#414750', lineHeight: 1.6 }}>{business_.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 px-6 md:px-8 max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(193,199,210,0.3)' }}
        >
          <p style={{ fontSize: '12px', color: '#727781' }}>&copy; {new Date().getFullYear()} {business_.legalName}. Todos los derechos reservados.{' '}
            <a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>
              Made by Nexifydev.com
            </a>
          </p>
          <div className="flex gap-6">
            <span style={{ fontSize: '12px', color: '#727781', cursor: 'pointer' }}>Politica de Privacidad</span>
            <span style={{ fontSize: '12px', color: '#727781', cursor: 'pointer' }}>Aviso Legal</span>
          </div>
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
