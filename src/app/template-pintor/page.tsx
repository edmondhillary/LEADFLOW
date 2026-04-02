'use client';
import Link from 'next/link';
import { business as defaultBusiness, hero as defaultHero, finishes, trust, testimonials as defaultTestimonials, images, about } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function HomePage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length ? ov.testimonials : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-pintor';
  return (
    <main style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[700px] md:min-h-[750px] flex items-center overflow-hidden px-6 lg:px-12">
        <div className="absolute inset-0 z-0">
          <img src={images.heroBg} alt="Premium Wall Finish" className="w-full h-full object-cover opacity-90 brightness-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9f9f9]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-[#3d6565] border-l-2 border-[#3d6565] bg-[#c0ebea]/30">
            {hero.badge}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-teal-900 leading-[1.1] tracking-tight mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
            {hero.title} <span className="text-[#315959]">{hero.titleAccent}</span>.
          </h2>
          <p className="text-lg md:text-xl text-[#5a6061] max-w-xl mb-10 leading-relaxed font-light">{hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${business.phoneIntl}`} className="text-[#d9fffe] px-8 py-4 rounded-md font-semibold text-lg shadow-xl transition-all duration-300 active:scale-95 text-center" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)', textDecoration: 'none' }}>
              {hero.ctaPrimary}
            </a>
            <Link href={`${base}/servicios`} className="bg-white text-[#3d6565] px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 text-center shadow-sm" style={{ border: '1px solid rgba(173,179,180,0.15)', textDecoration: 'none' }}>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FINISHES BENTO ===== */}
      <section className="py-24 bg-[#f2f4f4] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-bold text-teal-900 mb-4 tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Acabados que definen ambientes.</h3>
              <p className="text-[#5a6061] text-lg">No es solo pintura, es la piel de su arquitectura.</p>
            </div>
            <span className="material-symbols-outlined text-6xl text-[#adb3b4]/20 select-none hidden md:block">format_paint</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-white shadow-sm">
              <img src={images.finish1} alt={finishes[0].name} className="w-full h-[350px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-lg shadow-lg">
                <h4 className="font-bold text-xl text-teal-900" style={{ fontFamily: "'Manrope', sans-serif" }}>{finishes[0].name}</h4>
                <p className="text-[#5a6061] text-sm mt-1">{finishes[0].desc}</p>
              </div>
            </div>
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-white shadow-sm">
              <img src={images.finish2} alt={finishes[1].name} className="w-full h-full min-h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent flex flex-col justify-end p-8">
                <h4 className="font-bold text-xl text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{finishes[1].name}</h4>
                <p className="text-white/80 text-sm mt-1">{finishes[1].desc}</p>
              </div>
            </div>
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-white shadow-sm">
              <img src={images.finish3} alt={finishes[2].name} className="w-full h-full min-h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-6 right-6">
                <span className="bg-[#3d6565] text-[#d9fffe] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Precisión</span>
              </div>
            </div>
            <div className="md:col-span-8 rounded-xl bg-white shadow-sm">
              <div className="p-10 md:p-12">
                <span className="material-symbols-outlined text-[#3d6565] text-5xl mb-6">verified</span>
                <h4 className="font-bold text-2xl md:text-3xl text-teal-900 mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Garantía de Durabilidad</h4>
                <p className="text-[#5a6061] text-lg leading-relaxed max-w-md">Cada proyecto incluye una inspección técnica post-aplicación para asegurar que el sellado y la pigmentación cumplan con los estándares más exigentes.</p>
                <div className="mt-8 flex gap-4">
                  <div className="w-12 h-1 bg-[#3d6565]" />
                  <div className="w-12 h-1 bg-[#c0ebea]" />
                  <div className="w-12 h-1 bg-[#dde4e5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COLOR CURATION ===== */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square bg-[#ebeeef] rounded-full overflow-hidden shadow-2xl max-w-[450px] mx-auto">
              <img src={images.paintSwatch} alt="Paint Swatch" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-0 md:-right-8 p-6 bg-white shadow-2xl rounded-xl max-w-[250px]" style={{ border: '1px solid rgba(173,179,180,0.1)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-[#3d6565]" />
                <span className="font-bold text-teal-900 tracking-tight text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>Mineral Spruce</span>
              </div>
              <p className="text-xs text-[#5a6061]">REF: ARCH-042 | LRV: 14%</p>
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(173,179,180,0.1)' }}>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#3d6565]">Satin Finish Collection</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-bold text-teal-900 mb-6 leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Curaduría de Color Profesional.</h3>
            <p className="text-[#5a6061] text-lg mb-8 leading-relaxed">No solo pintamos; asesoramos en la psicología del color y la interacción con la luz natural de sus espacios.</p>
            <ul className="space-y-4">
              {trust.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#3d6565] text-xl mt-1">{t.icon}</span>
                  <span className="text-[#2d3435] font-medium">{t.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-6 lg:px-12 bg-[#f2f4f4]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-teal-900 mb-12 text-center" style={{ fontFamily: "'Manrope', sans-serif" }}>Lo que dicen nuestros clientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[#3d6565] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-[#2d3435] text-base leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-teal-900 text-sm">{t.name}</p>
                  <p className="text-[#5a6061] text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-2xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)' }}>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-[#d9fffe] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>{about.cta.title}</h3>
            <p className="text-[#d9fffe]/80 text-lg mb-10 max-w-2xl mx-auto font-light">{about.cta.desc}</p>
            <Link href={`${base}/contacto`} className="inline-block bg-white text-teal-900 px-10 py-4 rounded-md font-bold text-lg hover:bg-teal-50 transition-all duration-300 shadow-lg active:scale-95" style={{ textDecoration: 'none' }}>
              Solicitar Presupuesto Gratis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
