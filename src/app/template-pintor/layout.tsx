'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateLayout(props: any = {}) {
  const { children } = props as { children: React.ReactNode };
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pintor';
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
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#2d3435]" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header — glass nav */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href={`${baseHref}`} className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <span className="text-xl font-bold tracking-tight text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{business_.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(n => (
              <Link key={n.href} href={n.href} className="text-zinc-600 hover:text-teal-900 transition-all duration-300 text-sm font-medium" style={{ textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <a href={`tel:${business_.phoneIntl}`} className="hidden md:inline-block bg-[#3d6565] hover:bg-[#315959] text-[#d9fffe] px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-300 active:scale-95 shadow-sm" style={{ textDecoration: 'none' }}>
            Pedir Presupuesto
          </a>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <span className="block w-6 h-[1.5px] bg-teal-900 transition-all duration-300" style={{ transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] bg-teal-900 transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] bg-teal-900 transition-all duration-300" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && <div className="fixed inset-0 z-[70] md:hidden bg-black/20" onClick={() => setMenuOpen(false)} />}

      {/* Mobile slide-in */}
      <div className="fixed top-0 right-0 z-[80] h-full w-72 md:hidden flex flex-col bg-[#f9f9f9] shadow-2xl transition-transform duration-300" style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}>
        <nav className="flex flex-col px-6 gap-1">
          {navLinks.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-4 text-zinc-600 hover:text-teal-900 transition-all" style={{ borderBottom: '1px solid rgba(173,179,180,0.15)', textDecoration: 'none' }}>
              <span className="material-symbols-outlined text-[#5a6061]" style={{ fontSize: '20px' }}>{n.icon}</span>
              <span className="text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-6 pb-8">
          <a href={`tel:${business_.phoneIntl}`} className="block w-full text-center py-3 rounded-md text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)', color: '#d9fffe', textDecoration: 'none' }}>
            Pedir Presupuesto
          </a>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-100 w-full" style={{ borderTop: '1px solid rgba(228,233,234,0.5)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-10 py-16 max-w-7xl mx-auto">
          <div className="space-y-4">
            <span className="font-bold text-teal-800 text-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>{business_.name}</span>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Definiendo el estándar en acabados arquitectónicos y pintura de alta gama desde 2010.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-teal-900 font-semibold text-sm mb-2">Navegación</h5>
            {navLinks.map(n => (
              <Link key={n.href} href={n.href} className="text-zinc-500 hover:text-teal-600 transition-colors text-sm" style={{ textDecoration: 'none' }}>{n.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-teal-900 font-semibold text-sm mb-2">Contacto</h5>
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span> {business_.email}
            </p>
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">call</span> {business_.phone}
            </p>
            <p className="text-zinc-500 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span> {business_.city}, {business_.country}
            </p>
          </div>
        </div>
        <div className="px-10 py-6 text-center" style={{ borderTop: '1px solid rgba(228,233,234,0.3)' }}>
          <p className="text-zinc-500 text-xs">&copy; {new Date().getFullYear()} {business_.legalName}. Todos los derechos reservados.{' · '}<a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>Made by Nexifydev.com</a></p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${business_.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-[0_12px_32px_rgba(45,52,53,0.15)] flex items-center justify-center transition-all hover:scale-105" style={{ backgroundColor: '#25d366' }}>
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
      </a>
    </div>
  );
}
