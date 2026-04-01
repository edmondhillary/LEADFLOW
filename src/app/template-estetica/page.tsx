import Link from 'next/link';
import { hero, images, treatments, trust, founder, testimonials } from './data';

export default function EsteticaHome() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="min-h-screen bg-[#fbf9f5] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left col — 7 */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-4 py-2 w-fit">
                {hero.badge}
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-8xl font-medium leading-none tracking-tight text-[#30332e]"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {hero.title}
                <span className="block text-[#6c5c4a]">{hero.titleAccent}</span>
              </h1>
              <p className="text-[#5d605a] text-lg leading-relaxed max-w-lg">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href="/template-estetica/contacto"
                  className="bg-[#6c5c4a] text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#5f503f] transition-colors duration-200"
                >
                  {hero.ctaPrimary}
                </Link>
                <Link
                  href="/template-estetica/servicios"
                  className="border border-[#6c5c4a] text-[#6c5c4a] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#6c5c4a] hover:text-[#fff6f0] transition-colors duration-200"
                >
                  {hero.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Right col — 5 */}
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={images.heroPortrait}
                  alt="Aesthetic clinic portrait"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.3) 0%, transparent 60%)' }}
                />
              </div>
              {/* Floating quote card */}
              <div className="absolute -bottom-8 -left-8 bg-[#fff6f0] p-6 max-w-xs shadow-md z-10">
                <p
                  className="text-[#30332e] text-sm leading-relaxed"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  "Resultados que susurran la belleza natural de quien eres."
                </p>
                <p className="text-[#6c5c4a] text-xs tracking-widest uppercase mt-3">AESTHETIC CLINIC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED TREATMENTS (Asymmetric Bento) ─── */}
      <section className="py-32 bg-[#f5f4ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline gap-6 mb-12">
            <span
              className="text-7xl font-medium text-[#e2e3db] leading-none"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              01
            </span>
            <h2
              className="text-3xl md:text-4xl font-medium text-[#30332e]"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Tratamientos Destacados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:h-[800px]">
            {/* Large main image — col 8 */}
            <div className="md:col-span-8 relative overflow-hidden h-64 md:h-full">
              <img
                src={images.treatment1}
                alt="Featured treatment"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.7) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-2 block">Facial Premier</span>
                <h3
                  className="text-2xl font-medium text-white mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {treatments[0].name}
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed">{treatments[0].desc}</p>
              </div>
            </div>

            {/* Right stack — col 4 */}
            <div className="md:col-span-4 flex flex-col gap-3">
              {/* Top: image */}
              <div className="flex-1 relative overflow-hidden h-48 md:h-auto">
                <img
                  src={images.treatment2}
                  alt="Skin quality treatment"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(48,51,46,0.6) 0%, transparent 50%)' }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className="text-lg font-medium text-white mb-1"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {treatments[1].name}
                  </h3>
                  <p className="text-stone-300 text-xs">{treatments[1].desc}</p>
                </div>
              </div>

              {/* Bottom: primary bg card */}
              <div className="flex-1 bg-[#6c5c4a] p-8 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-[#fff6f0]/60 text-4xl">{treatments[3].icon}</span>
                  <h3
                    className="text-xl font-medium text-[#fff6f0] mt-4 mb-3"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {treatments[3].name}
                  </h3>
                  <p className="text-[#fff6f0]/70 text-sm leading-relaxed">{treatments[3].desc}</p>
                </div>
                <Link
                  href="/template-estetica/servicios"
                  className="text-[#eeda7b] text-xs tracking-widest uppercase mt-4 hover:text-white transition-colors"
                >
                  Ver protocolo &rarr;
                </Link>
              </div>
            </div>

            {/* Bottom horizontal strip — col 12 */}
            <div className="md:col-span-12 h-40 md:h-64 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
              <div className="bg-[#eeeee8] flex flex-col justify-center px-10">
                <h3
                  className="text-xl font-medium text-[#30332e] mb-2"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {treatments[2].name}
                </h3>
                <p className="text-[#5d605a] text-sm">{treatments[2].desc}</p>
                <Link
                  href="/template-estetica/servicios"
                  className="text-[#6c5c4a] text-xs tracking-widest uppercase mt-4 hover:text-[#5f503f] transition-colors"
                >
                  Explorar &rarr;
                </Link>
              </div>
              <div className="relative overflow-hidden h-40 md:h-auto">
                <img
                  src={images.treatment3}
                  alt="Body contouring treatment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-32 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: image with decorative border */}
            <div className="bg-[#f5f4ef] p-8 md:p-12 relative">
              <div className="absolute top-4 left-4 right-12 bottom-12 border border-[#b1b3ab]/40 pointer-events-none z-10" />
              <img
                src={images.clinicDetail}
                alt="Clinic detail"
                className="w-full aspect-[4/3] object-cover relative z-0"
              />
            </div>

            {/* Right: numbered values */}
            <div className="flex flex-col gap-12">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-4 block">Por que elegirnos</span>
                <h2
                  className="text-3xl md:text-4xl font-medium text-[#30332e] leading-snug"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  Donde la Ciencia<br />
                  <span className="text-[#6c5c4a]">Honra la Belleza</span>
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                {trust.map((item) => (
                  <div key={item.num} className="flex gap-6">
                    <span
                      className="text-4xl font-medium text-[#e2e3db] leading-none shrink-0 pt-1"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#30332e] mb-2 tracking-wide">{item.title}</h3>
                      <p className="text-[#5d605a] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALIST PREVIEW ─── */}
      <section className="py-32 bg-[#eeeee8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
            {/* Portrait — 1/3 */}
            <div className="w-full md:w-1/3 shrink-0">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images.founder}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio — 2/3 */}
            <div className="flex-1 flex flex-col gap-6">
              <span className="text-xs tracking-widest uppercase text-[#6c5c4a]">Conoce a Nuestra Especialista</span>
              <h2
                className="text-3xl md:text-4xl font-medium text-[#30332e]"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {founder.name}
              </h2>
              <p className="text-[#5d605a] text-sm tracking-widest uppercase">{founder.role}</p>
              <blockquote
                className="text-[#30332e] text-lg leading-relaxed border-l-2 border-[#6c5c4a] pl-6"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                "{founder.quote}"
              </blockquote>
              <p className="text-[#5d605a] text-sm leading-relaxed">{founder.bio}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {founder.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-xs tracking-wide border border-[#b1b3ab]/60 text-[#5d605a] px-3 py-1"
                  >
                    {cred}
                  </span>
                ))}
              </div>
              <Link
                href="/template-estetica/nosotros"
                className="text-[#6c5c4a] text-sm tracking-widest uppercase hover:text-[#5f503f] transition-colors mt-2"
              >
                Conoce al equipo &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE/AFTER PHILOSOPHY ─── */}
      <section className="py-32 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-4 block">Nuestra Filosofia</span>
            <h2
              className="text-3xl md:text-5xl font-medium text-[#30332e] max-w-2xl mx-auto leading-tight"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              El Arte de la Discrecion Natural
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image with hover effect */}
            <div className="relative overflow-hidden group">
              <img
                src={images.aboutPhilosophy}
                alt="Natural results philosophy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                style={{ background: 'linear-gradient(to right, rgba(251,249,245,0.4) 0%, transparent 100%)' }}
              />
            </div>

            {/* Text description */}
            <div className="flex flex-col gap-8 md:pl-8">
              <p
                className="text-[#30332e] text-xl leading-relaxed"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                "Rechazamos la estetica que grita. Cada procedimiento es disenado para que te veas como tu misma, solo mas descansada, mas luminosa."
              </p>
              <p className="text-[#5d605a] text-sm leading-relaxed">
                Nuestros especialistas estudian la estructura osea, el volumen de tejido y la dinamica muscular facial antes de trazar cualquier plan de tratamiento. Esto asegura que cada resultado se integre organicamente con tu anatomia unica.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-t border-[#b1b3ab]/40 pt-4">
                  <p className="text-2xl font-medium text-[#6c5c4a]" style={{ fontFamily: "'Noto Serif', serif" }}>98%</p>
                  <p className="text-xs text-[#5d605a] mt-1">Satisfaccion del paciente</p>
                </div>
                <div className="border-t border-[#b1b3ab]/40 pt-4">
                  <p className="text-2xl font-medium text-[#6c5c4a]" style={{ fontFamily: "'Noto Serif', serif" }}>2,400+</p>
                  <p className="text-xs text-[#5d605a] mt-1">Procedimientos realizados</p>
                </div>
              </div>
              <Link
                href="/template-estetica/nosotros"
                className="text-[#6c5c4a] text-sm tracking-widest uppercase hover:text-[#5f503f] transition-colors"
              >
                Nuestra historia &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-32 bg-[#f5f4ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-4 block">Testimonios</span>
            <h2
              className="text-3xl md:text-4xl font-medium text-[#30332e]"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Lo Que Dicen Nuestros Pacientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`bg-white p-8 flex flex-col gap-4 ${i === 1 ? 'md:mt-8' : ''} ${i === 2 ? 'md:mt-4' : ''}`}
              >
                <span
                  className="text-5xl leading-none font-bold text-[#eeda7b]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  &ldquo;
                </span>
                <p className="text-[#30332e] text-sm leading-relaxed -mt-6">{t.text}</p>
                <div className="mt-auto pt-4 border-t border-[#b1b3ab]/30">
                  <p className="text-sm font-semibold text-[#30332e]">{t.name}</p>
                  <p className="text-xs text-[#6c5c4a] tracking-wide mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 bg-[#6c5c4a] relative overflow-hidden">
        {/* Decorative large letter */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-[#5f503f] font-bold leading-none"
            style={{ fontFamily: "'Noto Serif', serif", fontSize: 'clamp(200px, 40vw, 500px)', opacity: 0.4 }}
          >
            A
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs tracking-widest uppercase text-[#eeda7b] mb-6 block">Tu Transformacion</span>
          <h2
            className="text-4xl md:text-6xl font-medium text-[#fff6f0] max-w-2xl mx-auto leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Comienza Tu Viaje
          </h2>
          <p className="text-[#fff6f0]/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Una consulta privada con nuestros especialistas. Sin presiones, solo posibilidades.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/template-estetica/contacto"
              className="bg-[#fff6f0] text-[#6c5c4a] tracking-widest uppercase text-sm px-8 py-4 hover:bg-white transition-colors duration-200"
            >
              RESERVAR CONSULTA
            </Link>
            <Link
              href="/template-estetica/servicios"
              className="border border-[#fff6f0]/40 text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:border-[#fff6f0] transition-colors duration-200"
            >
              VER TRATAMIENTOS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
