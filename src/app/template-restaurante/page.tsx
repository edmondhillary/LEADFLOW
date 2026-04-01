import Link from 'next/link';
import { hero, images, menuItems, trust, founder, testimonials } from './data';

export default function RestauranteHome() {
  const featuredDishes = menuItems.slice(0, 3);
  const dishImages = [images.dish1, images.dish2, images.dish3];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen bg-[#1B1D0E] flex items-center justify-center overflow-hidden">
        <img
          src={images.heroBg}
          alt="The Culinary Editorial interior"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(27,29,14,0.3) 0%, rgba(27,29,14,0.6) 100%)' }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#FED65B] border border-[#FED65B]/40 px-5 py-2 mb-8">
            {hero.badge}
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight text-white mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {hero.title}
            <span className="block italic text-[#FED65B] mt-2">{hero.titleAccent}</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/template-restaurante/contacto"
              className="bg-[#FED65B] text-[#745C00] uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#f5cb4a] transition-colors duration-200"
            >
              {hero.ctaPrimary}
            </Link>
            <Link
              href="/template-restaurante/servicios"
              className="border border-white/40 text-white uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:border-[#FED65B] hover:text-[#FED65B] transition-colors duration-200"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        {/* Bounce arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── FEATURED MENU ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] border border-[#735C00]/30 px-4 py-2">
              Seleccion de Temporada
            </span>
          </div>
          <div className="flex items-baseline gap-6 mb-16">
            <span
              className="text-7xl font-bold text-[#E4E4CC] leading-none"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              01
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1B1D0E] leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Nuestra Carta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDishes.map((dish, i) => (
              <div key={dish.name} className={`group ${i === 1 ? 'md:translate-y-12' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden bg-[#E4E4CC] mb-5">
                  <img
                    src={dishImages[i]}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-xl font-bold text-[#1B1D0E] leading-snug"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {dish.name}
                  </h3>
                  <span
                    className="text-lg font-bold text-[#735C00] ml-4 shrink-0"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {dish.price}&euro;
                  </span>
                </div>
                <p className="text-[#444748] text-sm leading-relaxed">{dish.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/template-restaurante/servicios"
              className="inline-block border border-[#1B1D0E] text-[#1B1D0E] uppercase tracking-[0.15em] text-sm font-bold px-10 py-4 hover:bg-[#1B1D0E] hover:text-[#FBFBE2] transition-colors duration-200"
            >
              VER CARTA COMPLETA
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="py-32 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: overlapping images */}
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                <img
                  src={images.interior}
                  alt="The Culinary Editorial sala"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[3/4] overflow-hidden border-4 border-[#FBFBE2]">
                <img
                  src={images.chef}
                  alt="Chef Julian Vance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: text */}
            <div className="md:pl-12 mt-12 md:mt-0">
              <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-6">Nuestra Historia</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1B1D0E] leading-tight mb-6"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Una cocina que
                <span className="block italic text-[#735C00]"> cuenta historias</span>
              </h2>
              <p className="text-[#444748] text-base leading-relaxed mb-6">
                Nació en Madrid como un manifiesto culinario. Diez años después, The Culinary Editorial sigue siendo el lugar donde los ingredientes tienen nombre y apellido.
              </p>
              <p className="text-[#444748] text-base leading-relaxed mb-8">
                Julian Vance lidera una propuesta de autor donde la temporalidad es dogma y el producto, protagonista absoluto de cada plato.
              </p>
              <Link
                href="/template-restaurante/nosotros"
                className="inline-flex items-center gap-2 text-[#735C00] text-sm tracking-[0.1em] uppercase font-bold hover:gap-4 transition-all duration-200"
              >
                Conocer nuestra historia
                <span className="w-6 h-px bg-[#FED65B] inline-block align-middle" />
                &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY / TRUST ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1B1D0E] leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Nuestra Filosofia
            </h2>
          </div>
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

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-12">Que dicen nuestros comensales</span>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`${i > 0 ? 'hidden md:block' : ''}`}>
              <span className="material-symbols-outlined text-[#735C00] text-5xl block mb-6" aria-hidden="true">format_quote</span>
              <blockquote
                className="text-2xl md:text-3xl font-medium italic text-[#1B1D0E] leading-relaxed mb-8"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <p className="text-sm font-bold text-[#1B1D0E] uppercase tracking-[0.15em]">{t.name}</p>
              <p className="text-xs text-[#735C00] tracking-wide mt-1">{t.role}</p>
            </div>
          ))}
          {/* Mobile: show all stacked */}
          <div className="md:hidden mt-12 flex flex-col gap-12">
            {testimonials.slice(1).map((t) => (
              <div key={t.name}>
                <span className="material-symbols-outlined text-[#735C00] text-4xl block mb-4" aria-hidden="true">format_quote</span>
                <blockquote
                  className="text-xl font-medium italic text-[#1B1D0E] leading-relaxed mb-6"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <p className="text-sm font-bold text-[#1B1D0E] uppercase tracking-[0.15em]">{t.name}</p>
                <p className="text-xs text-[#735C00] tracking-wide mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP & LOCATION ─── */}
      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Black info panel */}
            <div className="bg-[#1C1B1B] p-10 flex flex-col gap-8 justify-center">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#FED65B] mb-2">Direccion</p>
                <p className="text-white text-base leading-relaxed" style={{ fontFamily: "'Noto Serif', serif" }}>
                  Calle del Gastronomo, 8<br />28001 Madrid
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#FED65B] mb-2">Telefono</p>
                <a href="tel:+34910000000" className="text-white text-base hover:text-[#FED65B] transition-colors" style={{ fontFamily: "'Noto Serif', serif" }}>
                  910 000 000
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#FED65B] mb-2">Horario</p>
                <p className="text-white text-sm leading-relaxed">
                  Martes a Sabado<br />
                  13:30 — 16:00<br />
                  20:30 — 23:30
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#FED65B] mb-2">Reservas</p>
                <a href="mailto:reservas@culinaryeditorial.es" className="text-white text-sm hover:text-[#FED65B] transition-colors">
                  reservas@culinaryeditorial.es
                </a>
              </div>
            </div>
            {/* Map image spans 2 cols */}
            <div className="md:col-span-2 overflow-hidden h-64 md:h-auto">
              <img
                src={images.contactMap}
                alt="Ubicacion The Culinary Editorial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-40 bg-[#FBFBE2] relative overflow-hidden">
        {/* Decorative large text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-bold leading-none text-[#1B1D0E] whitespace-nowrap"
            style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(80px, 15vw, 200px)', opacity: 0.03 }}
          >
            Editorial
          </span>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-6">Reserve su Experiencia</span>
          <h2
            className="text-4xl md:text-6xl font-bold text-[#1B1D0E] leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Una mesa en
            <span className="block italic text-[#735C00]"> The Culinary Editorial</span>
          </h2>
          <p className="text-[#444748] text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Cada servicio es una edicion limitada. Asegure su lugar en la proxima.
          </p>
          <Link
            href="/template-restaurante/contacto"
            className="inline-block bg-[#3C0610] text-white uppercase tracking-[0.15em] text-sm font-bold px-12 py-5 hover:bg-[#2d0409] transition-colors duration-200"
          >
            RESERVAR AHORA
          </Link>
        </div>
      </section>
    </>
  );
}
