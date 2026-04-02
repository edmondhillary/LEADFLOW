'use client';

import Link from 'next/link';
import {
  hero as defaultHero,
  images,
  benefits as defaultBenefits,
  statusConduit,
  business as defaultBusiness,
  homeServices as defaultHomeServices,
} from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

// ─── Props ───────────────────────────────────────────────────────────────────
export type ElectricistaPageProps = { overrides?: LeadOverrides };

export default function ElectricistaHome(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined; // shorthand

  // ── Merge data: si hay overrides usa datos reales, si no usa demo ────────
  const business = ov
    ? {
        ...defaultBusiness,
        name: ov.businessName,
        city: ov.city,
        phone: ov.phone,
        phoneIntl: ov.phoneIntl,
        address: ov.address,
      }
    : defaultBusiness;

  const hero = ov
    ? {
        ...defaultHero,
        badge: `Servicio 24 Horas ${ov.city}`,
        title: defaultHero.title,
        titleAccent: defaultHero.titleAccent,
        titleSuffix: `en ${ov.city}`,
        subtitle: ov.heroSubtitle,
        ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary,
      }
    : defaultHero;

  const benefits = ov ? defaultBenefits : defaultBenefits;

  // Base path for internal links
  const base = ov ? ov.baseHref : '/template-electricista';

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden bg-[#1c1b1b]">
        <div className="absolute inset-0 opacity-40">
          <img
            src={images.heroBg}
            alt="Panel eléctrico industrial de alta tensión"
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #1c1b1b 40%, #1c1b1b80 70%, transparent 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 w-full">
          <div className="lg:col-span-8">
            <div className="inline-block bg-[#ffd700] text-[#705e00] px-4 py-1 font-black uppercase tracking-widest text-xs mb-6">
              {hero.badge}
            </div>

            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              {hero.title}{' '}
              <span className="text-[#ffd700]">{hero.titleAccent}</span>{' '}
              {hero.titleSuffix}
            </h1>

            <p className="text-[#e5e2e1] text-xl md:text-2xl max-w-2xl font-light mb-12 border-l-4 border-[#ffd700] pl-6">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${business.phoneIntl}`}
                className="text-[#705e00] px-10 py-5 text-xl font-black uppercase tracking-tight flex items-center justify-center gap-3 hover:brightness-110 transition-all"
                style={{ background: 'linear-gradient(135deg, #705d00 0%, #ffd700 100%)' }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>phone_in_talk</span>
                {hero.ctaPrimary}
              </a>
              <Link
                href={`${base}/servicios`}
                className="border-2 border-white/20 text-white px-10 py-5 text-xl font-bold uppercase tracking-tight hover:bg-white hover:text-black transition-all text-center"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATUS CONDUIT ─── */}
      <div className="bg-[#eae7e7] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
          {statusConduit.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-2 w-16 bg-[#ffd700]" />
              <span className="text-xs font-black uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SERVICES BENTO ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="servicios">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-md leading-none">
            Soluciones de Alta{' '}
            <span className="text-[#705d00]">Precisión</span>
          </h2>
          <p className="text-[#5f5e5e] font-medium max-w-xs border-r-4 border-[#d0c6ab] pr-6 text-right">
            Ingeniería eléctrica aplicada a reparaciones domésticas e industriales con estándares de seguridad ISO.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Averías — large */}
          <div className="md:col-span-7 group relative overflow-hidden bg-[#f6f3f2] p-10 min-h-[400px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[9rem]" style={{ fontVariationSettings: "'wght' 700" }}>bolt</span>
            </div>
            <div className="relative z-10">
              <span className="text-[#705d00] font-black text-sm uppercase tracking-widest block mb-4">
                {ov?.services?.[0] ? `${ov.services[0].name}` : 'Urgencia 01'}
              </span>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                {ov?.services?.[0]?.name || 'Reparación de Averías'}
              </h3>
              <p className="text-[#5f5e5e] mb-8 max-w-md">
                {ov?.services?.[0]?.description || 'Localización de fallos a tierra, cortocircuitos y sobrecargas. Intervención inmediata con equipo de diagnóstico avanzado.'}
              </p>
              <Link
                href={`${base}/contacto`}
                className="text-[#705d00] font-black uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform"
              >
                Solicitar Técnico <span className="material-symbols-outlined">trending_flat</span>
              </Link>
            </div>
          </div>

          {/* Cuadros — dark */}
          <div className="md:col-span-5 bg-[#1c1b1b] text-white p-10 flex flex-col justify-between">
            <div>
              <span className="text-[#ffd700] font-black text-sm uppercase tracking-widest block mb-4">
                {ov?.services?.[1] ? `${ov.services[1].name}` : 'Sistemas 02'}
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                {ov?.services?.[1]?.name || 'Cuadros Eléctricos'}
              </h3>
            </div>
            <div className="bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-[#e5e2e1] text-sm mb-6">
                {ov?.services?.[1]?.description || 'Montaje y saneamiento de cuadros según normativa REBT. Protección magnetotérmica y diferencial de alta sensibilidad.'}
              </p>
              <div className="h-1 w-full bg-zinc-800">
                <div className="h-full w-3/4 bg-[#ffd700]" />
              </div>
            </div>
          </div>

          {/* Instalaciones */}
          <div className="md:col-span-5 bg-[#f0eded] p-10">
            <span className="text-[#705d00] font-black text-sm uppercase tracking-widest block mb-4">
              {ov?.services?.[2] ? `${ov.services[2].name}` : 'Proyectos 03'}
            </span>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">
              {ov?.services?.[2]?.name || 'Instalaciones & Boletines'}
            </h3>
            <img
              src={images.wiringInstall}
              alt="Electricista instalando cableado"
              className="w-full h-48 object-cover grayscale mb-6"
            />
            <p className="text-[#5f5e5e] text-sm">
              {ov?.services?.[2]?.description || 'Altas nuevas, aumentos de potencia y certificados de eficiencia energética para viviendas y locales.'}
            </p>
          </div>

          {/* Precio Cerrado — kinetic gradient */}
          <div
            className="md:col-span-7 p-10 flex flex-col md:flex-row items-center gap-8"
            style={{ background: 'linear-gradient(135deg, #705d00 0%, #ffd700 100%)' }}
          >
            <div className="text-[#705e00]">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Precio Cerrado</h3>
              <p className="font-bold uppercase tracking-tight text-sm opacity-80">
                Sin sorpresas en factura final. Presupuesto previo antes de cada intervención.
              </p>
            </div>
            <div className="bg-[#1c1b1b] text-[#ffd700] p-8 w-32 h-32 flex flex-col items-center justify-center text-center rounded-full shrink-0">
              <span className="text-3xl font-black leading-none">100%</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Garantizado</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {benefits.map((item) => (
              <div key={item.title} className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ffd700]">
                  <span className="material-symbols-outlined text-[#705e00]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h4>
                <p className="text-[#5f5e5e] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (solo si hay overrides con testimonios) ─── */}
      {ov?.testimonials && ov.testimonials.length > 0 && (
        <section className="py-24 bg-[#f6f3f2]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16">
              Lo que dicen <span className="text-[#705d00]">nuestros clientes</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ov.testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="bg-white p-8 border-t-4 border-[#ffd700]">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-[#ffd700] text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-[#5f5e5e] mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-black uppercase tracking-tighter text-sm">{t.name}</p>
                  <p className="text-xs text-[#705d00] uppercase tracking-widest">{t.role || 'Cliente'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CONTACT/MAP ASYMMETRIC ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#1c1b1b] text-white p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
            ¿Sin Luz?{' '}
            <br />
            <span className="text-[#ffd700]">Actuamos Ya.</span>
          </h2>
          <form className="space-y-8 max-w-md" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: 'Nombre del solicitante', placeholder: 'NOMBRE COMPLETO', type: 'text' },
              { label: 'Teléfono de contacto', placeholder: '+34 000 000 000', type: 'tel' },
              { label: 'Ubicación / Código Postal', placeholder: `ZONA DE ${(ov?.city || 'MADRID').toUpperCase()}`, type: 'text' },
            ].map((field) => (
              <div key={field.label} className="border-b-2 border-zinc-700 focus-within:border-[#ffd700] transition-colors py-2">
                <label className="block text-[10px] uppercase font-black tracking-widest text-zinc-500 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-transparent border-none p-0 w-full focus:ring-0 text-white placeholder-zinc-700 outline-none text-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-white text-black py-5 font-black uppercase tracking-widest hover:bg-[#ffd700] hover:text-[#705e00] transition-colors"
            >
              Enviar Alerta Técnica
            </button>
          </form>
        </div>

        <div className="min-h-[500px] relative grayscale">
          <img
            src={images.contactMap}
            alt={`Mapa ${ov?.city || 'Madrid'}`}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-[#705d00]/20 mix-blend-multiply" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1c1b1b] p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-[#ffd700] animate-pulse" />
              <span className="text-white font-black uppercase tracking-tighter text-sm">
                Unidades móviles activas en {ov?.city || 'Madrid'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
