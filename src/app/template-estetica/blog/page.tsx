import Link from 'next/link';
import { blogPosts, images } from '../data';

const categories = ['Todos los Temas', 'Seguridad Clinica', 'Armonia Facial', 'Inyectables', 'Prevencion'];

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-estetica';
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative py-28 overflow-hidden">
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f5f4ef 0%, #fbf9f5 50%, #eeeee8 100%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-4 py-2 mb-8">
            Educacion Estetica
          </span>
          <h1
            className="text-5xl md:text-7xl font-medium text-[#30332e] leading-tight mb-6"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Conocimiento<br />
            <span className="text-[#6c5c4a]">al Servicio</span><br />
            de tu Belleza
          </h1>
          <p className="text-[#5d605a] text-lg leading-relaxed max-w-xl mx-auto">
            Articulos clinicos, guias de tratamiento y consejos de especialistas para tomar decisiones informadas sobre tu salud estetica.
          </p>
        </div>
      </section>

      {/* ─── FEATURED ARTICLE ─── */}
      {featured && (
        <section className="bg-[#f5f4ef] py-0">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row gap-0 overflow-hidden">
              {/* Image — 3/5 */}
              <div className="w-full md:w-3/5 relative overflow-hidden h-64 md:h-auto min-h-[320px]">
                <img
                  src={images.blogDestacado}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, transparent 60%, rgba(245,244,239,0.8) 100%)' }}
                />
                <div className="absolute top-6 left-6">
                  <span className="text-xs tracking-widest uppercase text-white bg-[#6c5c4a] px-3 py-1.5">
                    Articulo Destacado
                  </span>
                </div>
              </div>

              {/* Text — 2/5 */}
              <div className="w-full md:w-2/5 bg-[#f5f4ef] p-10 flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-2 py-0.5">
                      {featured.category}
                    </span>
                    <span className="text-xs text-[#5d605a]">{featured.readTime} de lectura</span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-medium text-[#30332e] leading-snug"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[#5d605a] text-sm leading-relaxed">{featured.excerpt}</p>
                </div>
                <Link
                  href={`/template-estetica/blog/${featured.slug}`}
                  className="text-[#6c5c4a] text-sm tracking-widest uppercase hover:text-[#5f503f] transition-colors mt-6"
                >
                  Leer articulo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORY FILTER ─── */}
      <section className="bg-[#fbf9f5] py-10 border-b border-[#b1b3ab]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`text-xs tracking-widest uppercase px-4 py-2 transition-colors duration-200 ${
                  i === 0
                    ? 'bg-[#6c5c4a] text-[#fff6f0]'
                    : 'bg-[#eeeee8] text-[#5d605a] hover:bg-[#e2e3db]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTICLE GRID ─── */}
      <section className="py-16 bg-[#fbf9f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Horizontal card — col 8 */}
            {rest[0] && (
              <div className="md:col-span-8 bg-white overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative overflow-hidden h-48 md:h-full">
                    <img
                      src={images.blog1}
                      alt={rest[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-2 py-0.5">
                          {rest[0].category}
                        </span>
                        <span className="text-xs text-[#5d605a]">{rest[0].readTime}</span>
                      </div>
                      <h3
                        className="text-lg font-medium text-[#30332e] leading-snug"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        {rest[0].title}
                      </h3>
                      <p className="text-sm text-[#5d605a] leading-relaxed">{rest[0].excerpt}</p>
                    </div>
                    <Link
                      href={`/template-estetica/blog/${rest[0].slug}`}
                      className="text-[#6c5c4a] text-xs tracking-widest uppercase hover:text-[#5f503f] transition-colors mt-4"
                    >
                      Leer &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Text-only sidebar card — col 4 */}
            {rest[1] && (
              <div className="md:col-span-4 bg-[#eeeee8] p-8 flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-2 py-0.5 w-fit">
                    {rest[1].category}
                  </span>
                  <h3
                    className="text-xl font-medium text-[#30332e] leading-snug"
                    style={{ fontFamily: "'Noto Serif', serif" }}
                  >
                    {rest[1].title}
                  </h3>
                  <p className="text-sm text-[#5d605a] leading-relaxed">{rest[1].excerpt}</p>
                  <p className="text-xs text-[#5d605a]">{rest[1].readTime} de lectura</p>
                </div>
                <Link
                  href={`/template-estetica/blog/${rest[1].slug}`}
                  className="text-[#6c5c4a] text-xs tracking-widest uppercase hover:text-[#5f503f] transition-colors mt-4"
                >
                  Leer articulo &rarr;
                </Link>
              </div>
            )}

            {/* Vertical image card — col 4 */}
            {rest[2] && (
              <div className="md:col-span-4 overflow-hidden bg-white flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={images.blog2}
                    alt={rest[2].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tracking-widest uppercase text-[#6c5c4a] border border-[#6c5c4a]/30 px-2 py-0.5">
                        {rest[2].category}
                      </span>
                      <span className="text-xs text-[#5d605a]">{rest[2].readTime}</span>
                    </div>
                    <h3
                      className="text-base font-medium text-[#30332e] leading-snug"
                      style={{ fontFamily: "'Noto Serif', serif" }}
                    >
                      {rest[2].title}
                    </h3>
                    <p className="text-sm text-[#5d605a] leading-relaxed">{rest[2].excerpt}</p>
                  </div>
                  <Link
                    href={`/template-estetica/blog/${rest[2].slug}`}
                    className="text-[#6c5c4a] text-xs tracking-widest uppercase hover:text-[#5f503f] transition-colors"
                  >
                    Leer &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Philosophy quote card — col 8 */}
            <div className="md:col-span-8 bg-[#f5dfc8]/20 border border-[#f5dfc8] p-10 md:p-14 flex flex-col justify-between">
              <span
                className="text-6xl leading-none font-bold text-[#eeda7b] mb-2"
                style={{ fontFamily: "'Noto Serif', serif" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote
                className="text-xl md:text-2xl font-medium text-[#30332e] leading-relaxed -mt-4"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                La educacion es el primer paso hacia una decision estetica responsable. Cada articulo que publicamos es una herramienta para que tomes el control de tu bienestar.
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-semibold text-[#30332e]">Equipo Medico AESTHETIC</p>
                <p className="text-xs text-[#6c5c4a] tracking-wide mt-1">Especialistas en Medicina Estetica</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PATIENT PORTAL CTA ─── */}
      <section className="py-16 bg-[#f5f4ef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#6c5c4a] mb-3 block">Portal del Paciente</span>
              <h2
                className="text-2xl md:text-3xl font-medium text-[#30332e]"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Listo para dar el siguiente paso?
              </h2>
              <p className="text-[#5d605a] text-sm leading-relaxed mt-2 max-w-md">
                Reserva tu consulta privada y recibe un plan de tratamiento personalizado de nuestros especialistas.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href={`${baseHref}/contacto`}
                className="bg-[#6c5c4a] text-[#fff6f0] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#5f503f] transition-colors duration-200"
              >
                RESERVAR CONSULTA
              </Link>
              <Link
                href={`${baseHref}/servicios`}
                className="border border-[#6c5c4a] text-[#6c5c4a] tracking-widest uppercase text-sm px-8 py-4 hover:bg-[#6c5c4a] hover:text-[#fff6f0] transition-colors duration-200"
              >
                VER TRATAMIENTOS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
