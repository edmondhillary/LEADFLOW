import Link from 'next/link';
import { about, founder, trust, images } from '../data';

export default function NosotrosPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left — 7 cols */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#735C00] border border-[#735C00]/30 px-5 py-2 w-fit">
                Nuestra Historia
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1B1D0E] leading-none tracking-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {about.heroTitle}
                <span className="block italic text-[#735C00]">{about.heroTitleAccent}</span>
              </h1>
              <p className="text-[#444748] text-lg leading-relaxed max-w-lg">
                {about.heroSubtitle}
              </p>
            </div>

            {/* Right — 5 cols */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={images.interior}
                  alt="The Culinary Editorial sala principal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: image with gold decorative square */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#FED65B] opacity-30" aria-hidden="true" />
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={images.kitchen}
                  alt="La cocina de The Culinary Editorial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: text */}
            <div className="flex flex-col gap-8">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1B1D0E] leading-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {about.philosophyTitle}
              </h2>
              {about.philosophy.map((para, i) => (
                <p key={i} className="text-[#444748] text-base leading-relaxed">
                  {para}
                </p>
              ))}
              {/* Italic serif quote in gold */}
              <blockquote
                className="text-xl italic font-medium leading-relaxed text-[#735C00] border-l-2 border-[#FED65B] pl-6"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                &ldquo;La cocina honesta no necesita explicacion. El sabor habla solo.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY CARDS ─── */}
      <section className="py-32 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-4">Por que existimos</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1B1D0E] leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Nuestros Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.values.map((val, i) => (
              <div
                key={val.title}
                className={`bg-[#FBFBE2] p-10 flex flex-col gap-4 ${i === 1 ? 'border-t-4 border-[#FED65B]' : ''}`}
              >
                <span className="material-symbols-outlined text-[#735C00] text-3xl">
                  {i === 0 ? 'eco' : i === 1 ? 'schedule' : 'bakery_dining'}
                </span>
                <h3
                  className="text-xl font-bold text-[#1B1D0E]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {val.title}
                </h3>
                <p className="text-[#444748] text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY NUMBERED ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {trust.map((item) => (
              <div key={item.num} className="flex flex-col gap-4">
                <span
                  className="text-6xl font-bold text-[#E4E4CC] leading-none"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {item.num}
                </span>
                <h3
                  className="text-xl font-bold text-[#1B1D0E]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#444748] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHEF ─── */}
      <section className="py-0 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto overflow-hidden">
              <img
                src={images.chef}
                alt={founder.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Text */}
            <div className="p-12 md:p-16 flex flex-col justify-center gap-6">
              <span className="inline-block bg-[#3C0610] text-white text-xs tracking-[0.2em] uppercase px-4 py-2 w-fit">
                {founder.role}
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1B1D0E] leading-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {founder.name}
              </h2>
              <blockquote
                className="text-xl italic font-medium leading-relaxed text-[#735C00]"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
              <p className="text-[#444748] text-sm leading-relaxed">{founder.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 bg-[#FBFBE2] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1B1D0E] mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Vivalo en primera persona
          </h2>
          <p className="text-[#444748] mb-10 leading-relaxed">
            Cada servicio es una oportunidad de experimentar la filosofia editorial en el plato. Reserve su mesa hoy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/template-restaurante/contacto"
              className="bg-[#3C0610] text-white uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#2d0409] transition-colors"
            >
              RESERVAR MESA
            </Link>
            <Link
              href="/template-restaurante/servicios"
              className="border border-[#FED65B] text-[#735C00] uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#FED65B] hover:text-[#745C00] transition-colors"
            >
              VER CARTA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
