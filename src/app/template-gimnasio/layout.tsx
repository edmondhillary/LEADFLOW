'use client';

import { useState } from 'react';
import Link from 'next/link';
import { business, nav } from './data';

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#0e0e0e', color: '#ffffff' }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50" style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 0 50px rgba(235,0,0,0.08)' }}>
        <div className="flex justify-between items-center px-6 py-4 max-w-full">
          <Link href="/template-gimnasio" style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '24px', fontWeight: 900, fontStyle: 'italic', color: '#eb0000', letterSpacing: '-0.05em', textDecoration: 'none', textTransform: 'uppercase' }}>
            {business.name}
          </Link>

          <nav className="hidden md:flex gap-8 items-center">
            {nav.map(n => (
              <Link key={n.href} href={n.href} className="hover:text-white transition-colors duration-300" style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '13px', fontWeight: 700, color: '#737373', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <a href={`tel:${business.phoneIntl}`} className="hidden md:inline-block transition-all active:scale-95 hover:bg-red-600" style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '12px', fontWeight: 800, backgroundColor: '#eb0000', color: '#000000', padding: '10px 24px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            Prueba Gratis
          </a>

          <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ backgroundColor: menuOpen ? '#eb0000' : '#fff', transform: menuOpen ? 'rotate(45deg) translateY(5px)' : 'none' }} />
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ backgroundColor: '#fff', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[2px] transition-all duration-300" style={{ backgroundColor: menuOpen ? '#eb0000' : '#fff', transform: menuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {menuOpen && <div className="fixed inset-0 z-40 md:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={() => setMenuOpen(false)} />}

      <div className="fixed top-0 right-0 z-50 h-full w-72 md:hidden flex flex-col transition-transform duration-300" style={{ backgroundColor: '#131313', transform: menuOpen ? 'translateX(0)' : 'translateX(100%)', paddingTop: '80px', borderLeft: '2px solid #eb0000' }}>
        <nav className="flex flex-col px-8 gap-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none', color: '#fff' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#eb0000' }}>{n.icon}</span>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-8 pb-8">
          <a href={`tel:${business.phoneIntl}`} className="block w-full text-center py-4" style={{ backgroundColor: '#eb0000', color: '#000', fontFamily: "'Epilogue', sans-serif", fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>
            Prueba Gratis
          </a>
        </div>
      </div>

      <main className="flex-1 pt-[64px]">{children}</main>

      <footer className="w-full py-12 px-6" style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '20px', fontWeight: 900, fontStyle: 'italic', color: '#eb0000', textTransform: 'uppercase' }}>{business.name}</span>
            <p className="text-sm max-w-xs" style={{ color: '#525252', lineHeight: 1.7 }}>
              Construyendo la próxima generación de atletas a través de la disciplina, la ciencia y el sudor.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Gimnasio</h5>
              <nav className="flex flex-col gap-2">
                {nav.map(n => (
                  <Link key={n.href} href={n.href} className="hover:text-red-400 transition-colors" style={{ fontSize: '13px', color: '#525252', textDecoration: 'none' }}>{n.label}</Link>
                ))}
              </nav>
            </div>
            <div className="space-y-3">
              <h5 style={{ fontFamily: "'Epilogue', sans-serif", fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Social</h5>
              <nav className="flex flex-col gap-2">
                <span className="text-sm" style={{ color: '#525252' }}>Instagram</span>
                <span className="text-sm" style={{ color: '#525252' }}>TikTok</span>
              </nav>
            </div>
          </div>
          <div className="md:text-right space-y-4">
            <p className="text-sm" style={{ color: '#525252' }}>{business.email}</p>
            <p className="text-sm" style={{ color: '#525252' }}>{business.phone}</p>
            <p style={{ fontSize: '10px', color: '#404040', textTransform: 'uppercase', letterSpacing: '0.2em' }}>&copy; {new Date().getFullYear()} {business.legalName}.{' · '}<a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>Made by Nexifydev.com</a></p>
          </div>
        </div>
      </footer>

      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105" style={{ backgroundColor: '#25d366' }}>
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
      </a>
    </div>
  );
}
