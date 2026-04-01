'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, images } from '../data';

const categories = ['Todos', 'Ansiedad', 'Duelo', 'Relaciones', 'Autoestima', 'Terapia Online'];

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  const blogImages: Record<string, string> = {
    'entender-la-ansiedad': images.blog1,
    'duelo-y-perdida': images.blog2,
    'comunicacion-de-pareja': images.blog3,
    'autoestima-y-autocritica': images.blog4,
    'terapia-online-eficaz': images.blog5,
  };

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  }

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ===== EDITORIAL HERO HEADER ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-3xl">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#586152', display: 'block', marginBottom: '12px' }}>Recursos & Reflexiones</span>
            <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Artículos para tu <span style={{ fontStyle: 'italic', color: '#586152' }}>bienestar</span>.
            </h1>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: '#454841', maxWidth: '560px' }}>
              Reflexiones, herramientas y evidencia científica para acompañarte en el camino hacia una vida más plena y consciente.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES FILTER (static display) ===== */}
      <section className="px-6 md:px-8 py-6" style={{ backgroundColor: '#f9f9f7', borderBottom: '1px solid #e2e3e1' }}>
        <div className="max-w-[1920px] mx-auto flex flex-wrap gap-3">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="px-5 py-2 rounded-full text-sm font-medium cursor-default"
              style={{
                backgroundColor: idx === 0 ? '#586152' : '#eeeeec',
                color: idx === 0 ? '#ffffff' : '#454841',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.05em',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FEATURED ARTICLE ===== */}
      {featured && (
        <section className="py-16 md:py-20 px-6 md:px-8" style={{ backgroundColor: '#f9f9f7' }}>
          <div className="max-w-[1920px] mx-auto">
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#a7b19f', marginBottom: '16px' }}>Artículo Destacado</p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-0 rounded-2xl md:rounded-none overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(26,28,27,0.06)' }}>
              <div className="md:col-span-6 lg:col-span-7">
                <img
                  src={images.blogFeatured}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '320px', maxHeight: '480px' }}
                />
              </div>
              <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center p-6 md:p-10">
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#dce6d2', color: '#586152', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.25 }}>
                  {featured.title}
                </h2>
                <p className="mb-6 leading-[1.7]" style={{ fontSize: '15px', color: '#454841' }}>{featured.excerpt}</p>
                <div className="flex items-center gap-4 mb-8">
                  <span style={{ fontSize: '11px', color: '#a7b19f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{featured.readTime} de lectura</span>
                </div>
                <Link
                  href={`/template-psicologo/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 transition-all"
                  style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#586152', textDecoration: 'none', borderBottom: '1.5px solid #a7b19f', paddingBottom: '4px', alignSelf: 'flex-start' }}
                >
                  Leer Artículo →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== 4-CARD GRID ===== */}
      <section className="py-16 md:py-20 px-6 md:px-8" style={{ backgroundColor: '#f4f4f2' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((post, idx) => (
              <article key={idx} className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(26,28,27,0.04)' }}>
                <div className="overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={blogImages[post.slug] || images.blog1}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#dce6d2', color: '#586152', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#a7b19f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{post.readTime}</span>
                  </div>
                  <h3 className="text-base mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b', lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p className="mb-4" style={{ fontSize: '13px', color: '#454841', lineHeight: 1.7 }}>{post.excerpt}</p>
                  <Link
                    href={`/template-psicologo/blog/${post.slug}`}
                    className="inline-flex items-center gap-1"
                    style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#586152', textDecoration: 'none' }}
                  >
                    Leer más →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 md:py-28 px-6 md:px-8" style={{ backgroundColor: '#536066' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-2xl mx-auto text-center p-12 rounded-[2rem]" style={{ backgroundColor: '#ffffff' }}>
            {subscribed ? (
              <div>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6" style={{ backgroundColor: '#dce6d2' }}>✓</div>
                <h2 className="text-2xl mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>¡Suscripción confirmada!</h2>
                <p style={{ fontSize: '14px', color: '#454841', lineHeight: 1.7 }}>
                  Recibirás nuestros artículos de bienestar y recursos terapéuticos directamente en tu bandeja de entrada.
                </p>
              </div>
            ) : (
              <>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#a7b19f', display: 'block', marginBottom: '12px' }}>Newsletter</span>
                <h2 className="text-3xl mb-3" style={{ fontFamily: "'Noto Serif', serif", fontWeight: 700, color: '#1a1c1b' }}>
                  Recursos en tu bandeja
                </h2>
                <p className="mb-8 leading-[1.7]" style={{ fontSize: '14px', color: '#454841' }}>
                  Artículos mensuales sobre bienestar emocional, técnicas de gestión del estrés y reflexiones terapéuticas. Sin spam, sin presiones.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 px-5 py-4 rounded-lg outline-none"
                    style={{ border: '1.5px solid #c5c7bf', fontSize: '14px', color: '#1a1c1b', backgroundColor: '#f9f9f7' }}
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-lg font-semibold transition-all active:scale-[0.98]"
                    style={{ background: 'linear-gradient(135deg, #586152, #a7b19f)', color: '#ffffff', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}
                  >
                    Suscribirme
                  </button>
                </form>
                <p className="mt-4" style={{ fontSize: '11px', color: '#a7b19f' }}>Nunca compartiremos tu email. Puedes darte de baja cuando quieras.</p>
              </>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
