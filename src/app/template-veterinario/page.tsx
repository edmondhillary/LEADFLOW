'use client';
import Link from 'next/link';
import { hero as defaultHero, images, homeServices, whyUs, testimonials as defaultTestimonials, business as defaultBusiness } from './data';
import type { LeadOverrides } from '@/lib/lead-template-data';

export default function VeterinarioHome(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;

  const business = ov
    ? { ...defaultBusiness, name: ov.businessName, city: ov.city, phone: ov.phone, phoneIntl: ov.phoneIntl, address: ov.address }
    : defaultBusiness;

  const hero = ov
    ? { ...defaultHero, subtitle: ov.heroSubtitle, ctaPrimary: ov.heroCTA || defaultHero.ctaPrimary }
    : defaultHero;

  const testimonials = ov?.testimonials?.length
    ? ov.testimonials.map((t, i) => ({ ...t, image: defaultTestimonials[i % defaultTestimonials.length]?.image ?? defaultTestimonials[0]?.image }))
    : defaultTestimonials;

  const base = ov?.baseHref ?? '/template-veterinario';
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center pt-12 pb-24 overflow-hidden bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-6 z-10">
            <span
              className="inline-block py-1 px-4 bg-[#a4ebf9] text-[#005964] rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {hero.badge}
            </span>
            <h1
              className="text-5xl lg:text-7xl font-extrabold text-[#38312b] leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {hero.title}{' '}
              <span className="text-[#166875] italic">{hero.titleAccent}</span>{' '}
              {hero.titleSuffix}
            </h1>
            <p className="text-xl text-[#665e56] leading-relaxed mb-10 max-w-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${base}/contacto`}
                className="px-8 py-4 bg-[#166875] text-[#edfcff] rounded-full font-bold text-lg hover:bg-[#005c68] transition-all shadow-md active:scale-95 text-center"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {hero.ctaPrimary}
              </Link>
              <a
                href={`tel:${business.phoneIntl}`}
                className="px-8 py-4 border border-[#827971]/20 text-[#38312b] rounded-full font-bold text-lg hover:bg-[#fcf2eb] transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="material-symbols-outlined text-xl">call</span>
                {hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right — photo with glow orbs */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl" style={{ transform: 'rotate(1deg)' }}>
              <img
                src={images.heroPet}
                alt="Compassionate veterinarian with a golden retriever puppy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#cffcd5] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#a4ebf9] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
          </div>
        </div>

        {/* Decorative bg shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fcf2eb] -z-10 rounded-l-[5rem]" />
      </section>

      {/* ─── SERVICES BENTO ─── */}
      <section className="py-24 bg-[#fcf2eb]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span
                className="text-[#166875] font-bold tracking-widest uppercase text-sm mb-4 block"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Nuestra experiencia
              </span>
              <h2
                className="text-4xl lg:text-5xl font-bold tracking-tight text-[#38312b]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Advanced Care for Every Need
              </h2>
            </div>
            <p className="text-[#665e56] max-w-sm">
              From routine wellness to life-saving surgery, our facility is equipped with the latest diagnostic technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Small cards */}
            {homeServices.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-2xl hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[280px]"
                style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: service.iconBg }}
                  >
                    <span className="material-symbols-outlined" style={{ color: service.iconColor }}>{service.icon}</span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 text-[#38312b]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#665e56] text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}

            {/* Destacado Surgery card — spans 2 cols */}
            <div
              className="bg-[#166875] p-8 rounded-2xl md:col-span-2 flex flex-col lg:flex-row gap-8 items-center text-[#edfcff]"
              style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}
            >
              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Precision Surgery
                </h3>
                <p className="opacity-90 mb-6 text-sm leading-relaxed">
                  State-of-the-art surgical suites equipped for both routine and complex soft-tissue or orthopedic procedures.
                </p>
                <Link
                  href={`${base}/servicios`}
                  className="text-[#edfcff] font-bold flex items-center gap-2 group text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Learn about our surgical care
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-base">arrow_forward</span>
                </Link>
              </div>
              <div className="w-full lg:w-1/3 aspect-square rounded-2xl overflow-hidden">
                <img
                  src={images.surgeryRoom}
                  alt="Modern veterinary surgical suite"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 overflow-hidden bg-[#fff8f4]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image with floating quote */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}>
              <img
                src={images.clinicInterior}
                alt="Luxury modern veterinary clinic interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-10 -right-10 bg-[#ece0d7] p-8 rounded-2xl max-w-[280px]"
              style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}
            >
              <p
                className="font-bold text-[#166875] italic text-lg leading-snug"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                "A place where medical excellence meets genuine human warmth."
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span
              className="text-[#166875] font-bold tracking-widest uppercase text-sm mb-4 block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              The Kindred Difference
            </span>
            <h2
              className="text-4xl font-bold tracking-tight mb-8 text-[#38312b]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Why Owners Trust Us
            </h2>
            <div className="flex flex-col gap-10">
              {whyUs.map((item) => (
                <div key={item.title} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-[#166875]/20 flex items-center justify-center text-[#166875]">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h4
                      className="text-xl font-bold mb-2 text-[#38312b]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[#665e56] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EMERGENCY BANNER ─── */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-[#f56965]/10 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ac3434]/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="relative z-10 flex items-start gap-6">
            <div className="w-16 h-16 bg-[#ac3434] rounded-2xl flex items-center justify-center text-[#fff7f6] shrink-0 shadow-lg">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
            </div>
            <div>
              <h2
                className="text-2xl lg:text-3xl font-bold text-[#ac3434] mb-2 tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Emergency &amp; Urgent Care
              </h2>
              <p className="text-[#665e56] max-w-xl text-lg">
                In critical moments, speed and expertise matter. Our emergency team is ready to provide immediate triage and stabilization for your pet.
              </p>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4 shrink-0">
            <span
              className="text-[#665e56] font-bold text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Available 24/7
            </span>
            <a
              href={`tel:${business.phoneIntl}`}
              className="px-8 py-4 bg-[#ac3434] text-white rounded-full font-bold text-xl hover:bg-[#70030f] transition-all shadow-md active:scale-95 flex items-center gap-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="material-symbols-outlined">call</span>
              {business.emergency}
            </a>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-[#f6ece4]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span
              className="text-[#166875] font-bold tracking-widest uppercase text-sm mb-4 block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Historias de clientes
            </span>
            <h2
              className="text-4xl font-bold tracking-tight text-[#38312b]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kind Words from Kindred Families
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-10 rounded-2xl"
                style={{ boxShadow: '0 40px 60px -15px rgba(56,49,43,0.06)' }}
              >
                {/* Stars */}
                <div className="flex gap-1 text-[#166875] mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-[#38312b] italic text-lg leading-relaxed mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e4d8cd] shrink-0">
                    <img
                      src={(images as Record<string, string>)[t.image]}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-bold text-[#38312b]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-[#665e56] uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 relative overflow-hidden bg-[#166875]">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -ml-64 -mb-64" />
        </div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#edfcff] mb-8 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Ready to Experience the Sanctuary?
          </h2>
          <p className="text-[#edfcff]/80 text-xl mb-12 max-w-2xl mx-auto">
            Join the Kindred Paws family today. We are currently accepting new patients for all clinical services.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`${base}/contacto`}
              className="px-10 py-5 bg-[#edfcff] text-[#166875] rounded-full font-bold text-xl hover:bg-[#a4ebf9] transition-all active:scale-95 shadow-xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Book Your First Appointment
            </Link>
            <Link
              href={`${base}/nosotros`}
              className="px-10 py-5 border border-[#edfcff]/20 text-[#edfcff] rounded-full font-bold text-xl hover:bg-[#edfcff]/10 transition-all active:scale-95"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Meet Nuestro equipo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
