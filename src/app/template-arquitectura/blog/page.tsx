import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage() {
  const blogImages = [images.blogFeatured, images.blog1, images.blog2, images.blog3, images.blog4, images.blog5];

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Featured Article */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0" style={{ backgroundColor: '#f3f4f0' }}>
          <div className="lg:col-span-7 overflow-hidden">
            <img
              src={blogImages[0]}
              alt={blogPosts[0].title}
              className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-1000"
              style={{ minHeight: '400px', maxHeight: '700px' }}
            />
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#635e57', display: 'block', marginBottom: '16px' }}>{blogPosts[0].category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#2e3430', lineHeight: 1.15 }}>
              {blogPosts[0].title}
            </h1>
            <p className="text-base mb-8 max-w-md" style={{ color: '#5a615c', lineHeight: 1.7 }}>{blogPosts[0].excerpt}</p>
            <span className="group flex items-center gap-3 w-fit" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: '#2e3430' }}>
              Leer el Artículo
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontSize: '18px' }}>arrow_right_alt</span>
            </span>
          </div>
        </div>
      </section>

      {/* Category Nav */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-12 md:mb-16">
        <div className="flex flex-wrap items-center gap-8 pb-6" style={{ borderBottom: '1px solid rgba(118,124,119,0.15)' }}>
          {['Todas', 'Planificación', 'Estética', 'Materiales', 'Casos de Estudio'].map((cat, i) => (
            <button
              key={cat}
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: i === 0 ? '#2e3430' : '#635e57',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                paddingBottom: '4px',
                borderBottom: i === 0 ? '2px solid #5f5e5e' : '2px solid transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
          {blogPosts.slice(1, 4).map((post, idx) => (
            <article key={post.slug} className="flex flex-col" style={{ marginTop: idx === 1 ? '0' : undefined }}>
              <div className="overflow-hidden mb-6 md:mb-8" style={{ aspectRatio: '4/5', backgroundColor: '#ecefea' }}>
                <img
                  src={blogImages[idx + 1]}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', marginBottom: '12px' }}>
                {post.category} &middot; {post.readTime}
              </span>
              <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430', lineHeight: 1.3 }}>
                {post.title}
              </h3>
              <p className="text-sm mb-5" style={{ color: '#5a615c', lineHeight: 1.7 }}>{post.excerpt}</p>
              <span className="w-fit pb-1" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid rgba(118,124,119,0.3)', color: '#2e3430', cursor: 'pointer' }}>
                Ver Artículo
              </span>
            </article>
          ))}

          {/* Quote Break */}
          <div className="lg:col-span-3 py-16 md:py-24 my-4 flex flex-col items-center text-center" style={{ borderTop: '1px solid rgba(118,124,119,0.1)', borderBottom: '1px solid rgba(118,124,119,0.1)' }}>
            <span className="material-symbols-outlined text-4xl mb-6" style={{ color: '#5f5e5e' }}>format_quote</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl max-w-3xl" style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', color: '#2e3430', lineHeight: 1.5 }}>
              &ldquo;La arquitectura es el juego sabio, correcto y magnífico de los volúmenes ensamblados bajo la luz.&rdquo;
            </h2>
            <span className="mt-6" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#635e57' }}>— Le Corbusier</span>
          </div>

          {/* Large Article */}
          <article className="md:col-span-2 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-3/5 overflow-hidden" style={{ aspectRatio: '16/10', backgroundColor: '#ecefea' }}>
              <img src={blogImages[4]} alt={blogPosts[4].title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="md:w-2/5">
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#635e57', marginBottom: '12px', display: 'block' }}>
                {blogPosts[4].category} &middot; {blogPosts[4].readTime}
              </span>
              <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430', lineHeight: 1.2 }}>
                {blogPosts[4].title}
              </h3>
              <p className="text-sm mb-6" style={{ color: '#5a615c', lineHeight: 1.7 }}>{blogPosts[4].excerpt}</p>
              <span className="inline-block px-6 py-3" style={{ backgroundColor: '#2e3430', color: '#f9f9f6', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>
                Leer Guía Completa
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-8 max-w-[1920px] mx-auto mb-16 md:mb-24">
        <div className="p-12 md:p-20 flex flex-col items-center text-center" style={{ backgroundColor: '#e5e9e4' }}>
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Noto Serif', serif", color: '#2e3430' }}>El Journal del Estudio</h2>
          <p className="max-w-xl mb-8" style={{ color: '#5a615c' }}>
            Suscríbete a nuestra publicación mensual de teoría arquitectónica, exploración de materiales y recorridos exclusivos por proyectos.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="flex-grow px-4 py-3 text-sm"
              style={{ backgroundColor: '#f9f9f6', border: 'none', borderBottom: '1px solid rgba(118,124,119,0.3)', outline: 'none' }}
            />
            <button className="px-8 py-3 transition-all active:scale-[0.98]" style={{ backgroundColor: '#5f5e5e', color: '#faf7f6', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer' }}>
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
