import Link from 'next/link';
import { business, images, founder, philosophyValues } from '../data';

export default function NosotrosPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-peluqueria';
  const iconMap: Record<string, string> = {
    content_cut: 'content_cut',
    favorite: 'favorite',
    spa: 'spa',
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-24 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left — text */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <span className="text-xs tracking-widest uppercase text-[#785a1a] block">
                El Atelier
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2d3435] leading-none"
                style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
              >
                El arte de la
                <span className="block italic text-[#785a1a]">transformación</span>
              </h1>
              <p className="text-[#5a6061] text-lg leading-relaxed max-w-lg">
                L&apos;Artiste Coiffure nació en 2018 como un manifiesto: la haute coiffure no debía ser exclusiva de París o Milán. Buenos Aires merecía un espacio donde el cabello se trate con la seriedad de un atelier de moda.
              </p>
            </div>

            {/* Right — image */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-[#ebeeef]">
                <img
                  src={images.salonInterior}
                  alt="Interior L'Artiste Coiffure"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="py-0 bg-[#f2f4f4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto overflow-hidden bg-[#dde4e5]">
              <img
                src={images.founder}
                alt={founder.name}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>

            {/* Text */}
            <div className="p-12 md:p-16 flex flex-col justify-center gap-6 bg-[#f2f4f4]">
              <span className="inline-block bg-[#785a1a] text-[#fff8f1] text-xs tracking-widest uppercase px-4 py-2 w-fit">
                {founder.role}
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#2d3435] leading-tight"
                style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
              >
                {founder.name}
              </h2>
              <blockquote
                className="text-lg md:text-xl italic font-bold text-[#785a1a] leading-relaxed border-l-2 border-[#785a1a] pl-6"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
              <p className="text-[#5a6061] text-sm leading-relaxed">
                {founder.bio}
              </p>
              <p className="text-xs tracking-widest uppercase text-[#adb3b4]">{founder.experience}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY VALUES ─── */}
      <section className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-[#785a1a] block mb-4">Filosofía</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#2d3435] leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Los Principios del Atelier
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#ebeeef]">
            {philosophyValues.map((value) => (
              <div key={value.title} className="px-10 py-12 first:pl-0 last:pr-0 flex flex-col gap-5">
                <span className="material-symbols-outlined text-[#785a1a] text-3xl">
                  {iconMap[value.icon] || value.icon}
                </span>
                <h3
                  className="text-xl font-bold text-[#2d3435]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-[#5a6061] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ATELIER INTERIOR STRIP ─── */}
      <section className="py-0 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <div className="aspect-square overflow-hidden bg-[#ebeeef] col-span-2">
              <img
                src={images.salonInterior}
                alt="El atelier"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
            <div className="aspect-square overflow-hidden bg-[#dde4e5]">
              <img
                src={images.haircut}
                alt="Detalle de corte"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
            <div className="aspect-square overflow-hidden bg-[#ebeeef]">
              <img
                src={images.treatment}
                alt="Ritual de tratamiento"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── INFO STRIP ─── */}
      <section className="bg-[#2d3435] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#5f5e5e]/40">
            <div className="px-8 py-8 first:pl-0 last:pr-0">
              <p className="text-xs tracking-widest uppercase text-[#ffdea5] mb-3">Dirección</p>
              <p className="text-white text-sm leading-relaxed">{business.address}</p>
              <p className="text-white/60 text-sm">{business.city}</p>
            </div>
            <div className="px-8 py-8">
              <p className="text-xs tracking-widest uppercase text-[#ffdea5] mb-3">Horarios</p>
              <p className="text-white text-sm leading-relaxed">{business.hours}</p>
              <p className="text-white/60 text-sm mt-1">Dom y Lun, cerrado</p>
            </div>
            <div className="px-8 py-8 last:pr-0">
              <p className="text-xs tracking-widest uppercase text-[#ffdea5] mb-3">Contacto</p>
              <a href={`tel:${business.phoneIntl}`} className="text-white text-sm block hover:text-[#ffdea5] transition-colors">
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`} className="text-white/60 text-sm block mt-1 hover:text-white transition-colors">
                {business.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-[#f9f9f9] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2d3435] mb-6"
            style={{ fontFamily: "'Noto Serif', serif", letterSpacing: '-0.02em' }}
          >
            Visítenos en Recoleta
          </h2>
          <p className="text-[#5a6061] mb-10 leading-relaxed">
            El primer paso hacia una nueva versión de sí mismo comienza con una consulta. Sin compromiso, con total atención.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#785a1a] text-[#fff8f1] uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:bg-[#6b4e0e] transition-colors"
            >
              RESERVAR TURNO
            </a>
            <Link
              href={`${baseHref}/servicios`}
              className="border border-[#adb3b4] text-[#2d3435] uppercase tracking-widest text-xs font-semibold px-10 py-4 hover:border-[#785a1a] hover:text-[#785a1a] transition-colors"
            >
              VER SERVICIOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
