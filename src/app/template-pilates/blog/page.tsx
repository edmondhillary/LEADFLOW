import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-pilates';
  const categories = ['Todos', 'Método', 'Principiantes', 'Respiración', 'Bienestar', 'Anatomía'];
  const featuredPost = blogPosts.find(p => p.featured);
  const gridPosts = blogPosts.filter(p => !p.featured).slice(0, 4);

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== EDITORIAL HEADER ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto pt-8 md:pt-16 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '16px' }}>
              Nuestro blog
            </span>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.1 }}
            >
              Notas sobre<br />
              <span style={{ fontStyle: 'italic', color: '#536257' }}>movimiento y práctica.</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p style={{ fontSize: '15px', color: '#5c605c', lineHeight: 1.7, maxWidth: '400px' }}>
              Artículos, reflexiones y guías prácticas de nuestros instructores — explorando pilates, respiración y el arte de habitar tu cuerpo.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12" style={{ borderTop: '1px solid rgba(175,179,174,0.3)' }} />
      </section>

      {/* ===== CATEGORY FILTER CHIPS (static) ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <span
              key={cat}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '7px 18px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                backgroundColor: i === 0 ? '#536257' : 'transparent',
                color: i === 0 ? '#ebfced' : '#5c605c',
                border: i === 0 ? '1px solid #536257' : '1px solid rgba(175,179,174,0.4)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      {featuredPost && (
        <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-20 md:mb-28">
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-0 rounded-xl overflow-hidden"
            style={{ boxShadow: '0px 24px 48px rgba(47,52,48,0.08)' }}
          >
            {/* Image */}
            <div className="md:col-span-7 overflow-hidden" style={{ minHeight: '420px' }}>
              <img
                src={images[featuredPost.image as keyof typeof images] as string}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                style={{ minHeight: '420px' }}
              />
            </div>
            {/* Content */}
            <div
              className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center"
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#ebfced', backgroundColor: '#536257', padding: '4px 12px', borderRadius: '9999px' }}
                >
                  Destacado
                </span>
                <span style={{ fontSize: '11px', color: '#5c605c', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{featuredPost.category}</span>
              </div>
              <h2
                className="text-2xl md:text-3xl mb-4"
                style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.3 }}
              >
                {featuredPost.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#5c605c', lineHeight: 1.7, marginBottom: '24px' }}>
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: '11px', color: '#5c605c', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {featuredPost.readTime} de lectura
                </span>
                <Link
                  href={`/template-pilates/blog/${featuredPost.slug}`}
                  style={{ fontSize: '12px', fontWeight: 600, color: '#536257', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid #536257', paddingBottom: '2px' }}
                >
                  Leer artículo
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 4-CARD GRID ===== */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-24">
        <div className="mb-10">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '8px' }}>Artículos recientes</span>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#536257' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridPosts.map((post) => {
            const imgSrc = images[post.image as keyof typeof images] as string;
            return (
              <article
                key={post.slug}
                className="group flex flex-col rounded-xl overflow-hidden"
                style={{ backgroundColor: '#ffffff', boxShadow: '0px 16px 32px rgba(47,52,48,0.05)', border: '1px solid rgba(175,179,174,0.12)' }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={imgSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#536257' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '10px', color: '#afb3ae', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-lg mb-3 flex-1"
                    style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430', lineHeight: 1.35 }}
                  >
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#5c605c', lineHeight: 1.7, marginBottom: '16px' }}>
                    {post.excerpt.substring(0, 100)}...
                  </p>
                  <Link
                    href={`/template-pilates/blog/${post.slug}`}
                    style={{ fontSize: '11px', fontWeight: 600, color: '#536257', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #d6e7d8', paddingBottom: '2px', alignSelf: 'flex-start' }}
                  >
                    Leer más
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===== NEWSLETTER SIGNUP ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="max-w-2xl mx-auto text-center">
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#5c605c', display: 'block', marginBottom: '12px' }}>
            Nuestro boletín
          </span>
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "'Noto Serif', serif", fontWeight: 300, color: '#2f3430' }}
          >
            Notas de movimiento, <span style={{ fontStyle: 'italic' }}>cada mes.</span>
          </h2>
          <p style={{ fontSize: '14px', color: '#5c605c', lineHeight: 1.7, marginBottom: '32px' }}>
            Actualizaciones de horarios, nuevos artículos, consejos de práctica y novedades del estudio. Sin ruido — solo lo importante.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 py-3 px-4 text-sm"
              style={{ backgroundColor: '#ffffff', border: '1px solid rgba(175,179,174,0.4)', outline: 'none', color: '#2f3430', borderRadius: '8px' }}
              readOnly
            />
            <button
              style={{
                backgroundColor: '#536257',
                color: '#ebfced',
                fontSize: '11px',
                fontWeight: 600,
                padding: '12px 28px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                whiteSpace: 'nowrap',
              }}
            >
              Suscribirme
            </button>
          </div>
          <p className="mt-4" style={{ fontSize: '11px', color: '#afb3ae' }}>
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </section>
    </main>
  );
}
