'use client';

import { useState } from 'react';
import { blogPosts, images } from '../data';

const categoryColors: Record<string, string> = {
  Seguridad: '#ffd700',
  Emergencias: '#ff6b35',
  Mantenimiento: '#4ade80',
  Instalación: '#60a5fa',
};

const postImages = [
  images.blogFeatured,
  images.blog1,
  images.blog2,
  images.blog3,
  images.blog4,
];

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ── EDITORIAL HEADER ── */}
      <section
        className="bg-[#131313] py-24"
        style={{ background: 'radial-gradient(circle at top left, rgba(255,215,0,0.06) 0%, transparent 50%), #131313' }}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 mb-8">
            <span className="animate-pulse w-2 h-2 bg-[#ffd700] rounded-full" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Guías y Consejos</span>
          </div>
          <h1
            className="max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1', lineHeight: 1 }}
          >
            Blog de Seguridad
          </h1>
          <div className="h-1 w-20 bg-[#ffd700] my-8" />
          <p className="max-w-xl" style={{ fontSize: '17px', color: '#d0c6ab', lineHeight: 1.8 }}>
            Guias practicas sobre cerraduras, seguridad del hogar y consejos de cerrajería para proteger lo que más importa.
          </p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      {featured && (
        <section className="bg-[#0e0e0e] py-20">
          <div className="max-w-[1920px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-[1.5rem] overflow-hidden bg-[#1c1b1b]" style={{ border: '1px solid #2a2a2a' }}>
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={postImages[0]}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(19,19,19,0.2)' }} />
              </div>
              {/* Content */}
              <div className="p-10 flex flex-col justify-center">
                <span
                  className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest self-start"
                  style={{ backgroundColor: categoryColors[featured.category] ?? '#ffd700', color: '#3a3000' }}
                >
                  {featured.category}
                </span>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#e5e2e1', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  {featured.title}
                </h2>
                <p className="mt-4" style={{ fontSize: '15px', color: '#d0c6ab', lineHeight: 1.7 }}>{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{featured.readTime} de lectura</span>
                </div>
                <button
                  className="mt-8 self-start rounded-lg px-6 py-3 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer' }}
                >
                  Leer Articulo
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLES GRID ── */}
      <section className="bg-[#131313] py-20">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((post, i) => (
              <article key={post.slug} className="rounded-[1.5rem] bg-[#1c1b1b] overflow-hidden group" style={{ border: '1px solid #2a2a2a' }}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={postImages[i + 1] ?? postImages[0]}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${categoryColors[post.category] ?? '#ffd700'}20`, color: categoryColors[post.category] ?? '#ffd700', border: `1px solid ${categoryColors[post.category] ?? '#ffd700'}40` }}
                  >
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px', fontWeight: 700, color: '#e5e2e1', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p className="mt-2" style={{ fontSize: '13px', color: '#d0c6ab', lineHeight: 1.6 }}>{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span style={{ fontSize: '11px', color: '#d0c6ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{post.readTime}</span>
                    <button
                      className="text-xs font-semibold uppercase tracking-widest transition-colors hover:text-[#ffd700]"
                      style={{ color: '#ffd700', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Leer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-[#0e0e0e] py-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="h-1 w-20 bg-[#ffd700] mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#e5e2e1' }}>
              Consejos de Seguridad
            </h2>
            <p className="mt-4 mb-8" style={{ fontSize: '15px', color: '#d0c6ab', lineHeight: 1.7 }}>
              Recibe guias practicas sobre seguridad del hogar directamente en tu bandeja de entrada.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-[#1c1b1b] p-8" style={{ border: '1px solid rgba(255,215,0,0.2)' }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,215,0,0.1)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#e5e2e1' }}>Te has suscrito!</p>
                <p className="mt-2" style={{ fontSize: '13px', color: '#d0c6ab' }}>Recibirás nuestras guias de seguridad en breve.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 rounded-lg px-5 py-4 outline-none transition-colors"
                  style={{ backgroundColor: '#2a2a2a', color: '#e5e2e1', fontSize: '14px', border: '1px solid #4d4732' }}
                />
                <button
                  type="submit"
                  className="rounded-lg px-6 py-4 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(to right, #fff6df, #ffd700)', color: '#3a3000', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
