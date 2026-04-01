import Link from 'next/link';
import { business, nav } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${business.name} | Fontanero Urgente 24h`,
  description: `${business.name} - Servicios profesionales de fontanería en ${business.city}. Urgencias 24h, presupuesto gratis.`,
};

export default function TemplateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Google Fonts + Material Symbols */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Desktop Header */}
      <header className="fixed top-0 w-full z-50 shadow-sm" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/template-fontaneria" className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl" style={{ color: '#002045' }}>waves</span>
            <span className="text-xl tracking-tighter" style={{ fontFamily: 'Manrope', fontWeight: 900, color: '#002045' }}>{business.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.filter(n => n.label !== 'Blog').map(n => (
              <Link
                key={n.href}
                href={n.href}
                className="font-medium transition-colors hover:text-[#0061a5]"
                style={{ color: '#64748b' }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={`tel:${business.phoneIntl}`}
            className="px-6 py-2 rounded-xl font-bold tracking-tight text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#e88532' }}
          >
            LLAMAR AHORA
          </a>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 pt-20 pb-20 md:pb-0" style={{ color: '#191c1e' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-32 md:pb-16" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl" style={{ color: '#002045' }}>waves</span>
              <span style={{ fontFamily: 'Manrope', fontWeight: 900, color: '#002045' }} className="text-xl tracking-tighter">{business.name}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#64748b' }}>
              Ingeniería de fluidos y soluciones de fontanería premium para el hogar moderno.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: '#002045' }}>Páginas</h4>
            <div className="flex flex-col gap-3">
              {nav.map(n => (
                <Link key={n.href} href={n.href} className="text-sm underline underline-offset-4 transition-all hover:text-[#0061a5]" style={{ color: '#64748b' }}>
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-xs uppercase tracking-widest" style={{ color: '#002045' }}>Contacto</h4>
            <p className="text-sm" style={{ color: '#64748b' }}>Disponible 24 Horas / 365 Días</p>
            <a href={`tel:${business.phoneIntl}`} className="text-2xl font-black transition-colors hover:opacity-80" style={{ color: '#e88532' }}>
              {business.phone}
            </a>
            <p className="text-xs" style={{ color: '#94a3b8' }}>&copy; {new Date().getFullYear()} {business.legalName} | {business.tagline.toUpperCase()}{' · '}<a href="https://nexifydev.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', opacity: 0.7 }}>Made by Nexifydev.com</a></p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 z-50 rounded-t-2xl"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        {nav.filter(n => n.label !== 'Blog').map(n => (
          <Link
            key={n.href}
            href={n.href}
            className="flex flex-col items-center justify-center px-3 py-1 active:scale-90 transition-transform"
            style={{ color: '#94a3b8' }}
          >
            <span className="material-symbols-outlined mb-0.5">{n.icon}</span>
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: 'Inter' }}>{n.label}</span>
          </Link>
        ))}
      </nav>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${business.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors hover:opacity-90"
        style={{ backgroundColor: '#25d366', touchAction: 'manipulation' }}
      >
        <svg aria-hidden="true" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.059 23.57a.5.5 0 00.611.611l5.713-1.473A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 01-5.068-1.38l-.362-.215-3.748.965.985-3.607-.235-.374A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
      </a>
    </div>
  );
}
