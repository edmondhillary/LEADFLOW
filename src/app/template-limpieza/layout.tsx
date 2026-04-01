'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateLimpiezaLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-[1440px] mx-auto">
          <Link href="/template-limpieza" style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#0059bb', letterSpacing: '-0.04em', textDecoration: 'none' }}>
            {business.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <Link key={n.href} href={n.href} className="hover:text-[#0059bb] transition-colors duration-300" style={{ fontSize: '14px', fontWeight: 500, color: '#414754', textDecoration: 'none' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <a href={`tel:${business.phoneIntl}`} className="hidden md:inline-block transition-all hover:opacity-90 active:scale-[0.98] rounded-lg" style={{ fontSize: '14px', fontWeight: 600, background: 'linear-gradient(to right, #0059bb, #0070ea)', color: '#ffffff', padding: '10px 24px', textDecoration: 'none' }}>
            Request Quote
          </a>

          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1d', transform: menuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1d', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] transition-all duration-300" style={{ backgroundColor: '#191c1d', transform: menuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile slide-in menu */}
      <div className="fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col transition-transform duration-300" style={{ backgroundColor: '#ffffff', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px' }}>
        <nav className="flex flex-col px-8 gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-4" style={{ borderBottom: '1px solid rgba(193,198,215,0.3)', textDecoration: 'none', color: '#191c1d' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#414754' }}>{n.icon}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <a href={`tel:${business.phoneIntl}`} className="block w-full text-center py-3 rounded-lg" style={{ background: 'linear-gradient(to right, #0059bb, #0070ea)', color: '#ffffff', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            Call Now
          </a>
          <p className="mt-4 text-center" style={{ fontSize: '12px', color: '#414754' }}>{business.phone}</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 pt-[68px]">{children}</main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-10 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-8 max-w-[1440px] mx-auto">
          {/* Brand */}
          <div>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '20px', fontWeight: 800, color: '#0059bb', letterSpacing: '-0.04em', marginBottom: '12px' }}>{business.name}</p>
            <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.7 }}>{business.tagline}<br />{business.city}, {business.state}</p>
            <p style={{ fontSize: '12px', color: '#414754', marginTop: '12px' }}>Est. {business.foundedYear}</p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Services</h4>
            <nav className="flex flex-col gap-3">
              {['Residential', 'Commercial', 'Industrial', 'Post-Construction', 'Medical/Clinical', 'Move-In/Out'].map(s => (
                <Link key={s} href="/template-limpieza/servicios" className="hover:text-[#0059bb] transition-colors duration-300" style={{ fontSize: '13px', color: '#414754', textDecoration: 'none' }}>{s}</Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Company</h4>
            <nav className="flex flex-col gap-3">
              {nav.map(n => (
                <Link key={n.href} href={n.href} className="hover:text-[#0059bb] transition-colors duration-300" style={{ fontSize: '13px', color: '#414754', textDecoration: 'none' }}>{n.label}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#191c1d', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Contact</h4>
            <div style={{ fontSize: '13px', color: '#414754', lineHeight: 2 }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mail</span>
                <span>{business.email}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>phone</span>
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                <span>{business.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 px-6 md:px-8 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(193,198,215,0.4)' }}>
          <p style={{ fontSize: '12px', color: '#414754' }}>&copy; {new Date().getFullYear()} {business.legalName}. All rights reserved.{' ·  '}<a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>Made by Nexifydev.com</a></p>
          <div className="flex gap-6">
            <span style={{ fontSize: '12px', color: '#414754', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ fontSize: '12px', color: '#414754', cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Contact via WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105" style={{ backgroundColor: '#25d366' }}>
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
      </a>
    </div>
  );
}
