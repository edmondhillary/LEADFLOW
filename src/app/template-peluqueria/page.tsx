import Link from 'next/link';
import { business, images, servicesCorte, instagramGallery } from './data';

export default function PeluqueriaHome() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen bg-[#2d3435] flex items-end overflow-hidden">
        <img
          src={images.heroBg}
          alt="L'Artiste Coiffure atelier"
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          style={{ opacity: 0.55 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(45,52,53,0.85) 0%, rgba(45,52,53,0.2) 60%, transparent 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="text-xs tracking-widest uppercase text-[#ffdea5] mb-6">
            Est. {business.foundedYear} — {business.city}
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-8"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            El arte de tu
            <span className="block italic text-[#ffdea5]">expresión.</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed">
            {business.tagline} — Haute coiffure donde cada corte es un acto de autoría.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:bg-[#6b4e0e] transition-colors duration-200"
            >
              RESERVAR TURNO
            </a>
            <Link
              href="/template-peluqueria/servicios"
              className="border border-white/40 text-white uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:border-[#ffdea5] hover:text-[#ffdea5] transition-colors duration-200"
            >
              VER SERVICIOS
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity="0.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── SERVICES BENTO GRID ─── */}
      <section className="py-0 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-14">
            <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-4">Servicios</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#2d3435] leading-none"
              style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
            >
              Atelier de autor
            </h2>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large image card — Corte */}
            <div className="md:col-span-8 group relative overflow-hidden h-80 md:h-[480px] bg-[#ebeeef]">
              <img
                src={images.haircut}
                alt="Corte y estilo"
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(45,52,53,0.7) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="material-symbols-outlined text-[#ffdea5] text-2xl block mb-2">content_cut</span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Corte & Estilo
                </h3>
                <p className="text-white/70 text-sm mt-2">Precisión arquitectónica en cada tijera</p>
              </div>
            </div>

            {/* Text card — Colorimetría */}
            <div className="md:col-span-4 bg-[#2d3435] p-8 md:p-10 flex flex-col justify-between h-64 md:h-[480px]">
              <div>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-6">
                  <circle cx="8" cy="8" r="3" fill="#ffdea5" />
                  <circle cx="16" cy="8" r="3" fill="#785a1a" />
                  <circle cx="8" cy="16" r="3" fill="#5f5e5e" />
                  <circle cx="16" cy="16" r="3" fill="#ffdea5" opacity="0.5" />
                </svg>
                <h3
                  className="text-2xl font-bold text-white leading-tight mb-4"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Colorimetría
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Balayage, gloss editorial y tratamientos de pigmento formulados para cada tono y tipo de fibra capilar.
                </p>
              </div>
              <Link
                href="/template-peluqueria/color"
                className="text-[#ffdea5] text-xs tracking-widest uppercase border-b border-[#785a1a] pb-1 hover:text-white transition-colors self-start"
              >
                Explorar Color
              </Link>
            </div>

            {/* Image card — Rituales */}
            <div className="md:col-span-4 group relative overflow-hidden h-64 md:h-72 bg-[#ebeeef]">
              <img
                src={images.treatment}
                alt="Rituales capilares"
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(45,52,53,0.6) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="material-symbols-outlined text-[#ffdea5] text-xl block mb-1">spa</span>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Rituales
                </h3>
              </div>
            </div>

            {/* Text + image split — La Experiencia */}
            <div className="md:col-span-8 bg-[#f2f4f4] flex flex-col md:flex-row h-auto md:h-72">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-4">La Experiencia</span>
                <p
                  className="text-xl md:text-2xl font-bold text-[#2d3435] leading-snug italic"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  &ldquo;Cada visita al atelier es el comienzo de una transformación silenciosa.&rdquo;
                </p>
                <Link
                  href="/template-peluqueria/nosotros"
                  className="text-[#785a1a] text-xs tracking-widest uppercase border-b border-[#785a1a] pb-1 mt-6 self-start hover:text-[#6b4e0e] transition-colors"
                >
                  Conocer el Atelier
                </Link>
              </div>
              <div className="w-full md:w-64 h-48 md:h-auto overflow-hidden shrink-0">
                <img
                  src={images.salonInterior}
                  alt="Interior L'Artiste"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-32 bg-[#ebeeef]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-6xl font-bold text-[#2d3435] leading-none mb-8"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Lista para tu
            <span className="block italic text-[#785a1a]"> transformación?</span>
          </h2>
          <p className="text-[#5a6061] text-base max-w-md mx-auto mb-12 leading-relaxed">
            Dos caminos hacia el atelier. El que prefieras, Marc Antoine y su equipo estarán esperando.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="w-10 h-10 border border-[#785a1a] flex items-center justify-center shrink-0 group-hover:bg-[#785a1a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#785a1a] group-hover:text-white transition-colors">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="text-sm text-[#2d3435] tracking-wide">Consultar por WhatsApp</span>
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="w-10 h-10 border border-[#785a1a] flex items-center justify-center shrink-0 group-hover:bg-[#785a1a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#785a1a] group-hover:text-white transition-colors">
                  <rect x="3" y="4" width="18" height="18" rx="0" />
                  <path d="M3 9h18M9 4v5" />
                </svg>
              </span>
              <span className="text-sm text-[#2d3435] tracking-wide">Reserva Online</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM GRID ─── */}
      <section className="bg-[#f9f9f9] pb-24 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <span className="text-xs tracking-widest uppercase text-[#5a6061]">{business.instagram}</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-[#785a1a] border-b border-[#785a1a] pb-0.5 hover:text-[#6b4e0e] transition-colors"
            >
              Seguir
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {instagramGallery.map((item) => (
              <div key={item.key} className="group aspect-square overflow-hidden bg-[#ebeeef]">
                <img
                  src={images[item.key as keyof typeof images]}
                  alt={item.alt}
                  className="w-full h-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE PREVIEW STRIP ─── */}
      <section className="bg-[#2d3435] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#5f5e5e]/40">
            {servicesCorte.map((service) => (
              <div key={service.name} className="px-8 py-8 first:pl-0 last:pr-0">
                <p className="text-xs tracking-widest uppercase text-[#ffdea5] mb-3">{service.technique}</p>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                <p
                  className="text-[#ffdea5] text-xl font-bold mt-4"
                  style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic' }}
                >
                  {service.price}&euro;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
