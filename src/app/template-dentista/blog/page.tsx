'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-dentista';
  const [email, setEmail] = useState('');
  const [subscribed, setSuscribirmed] = useState(false);

  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  function handleSuscribirme(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSuscribirmed(true);
      setEmail('');
    }
  }

  const categoryColors: Record<string, { bg: string; color: string }> = {
    'Urgencias': { bg: '#fee2e2', color: '#991b1b' },
    'Implantes': { bg: '#d2e4ff', color: '#003e6f' },
    'Ortodoncia': { bg: '#c4e3ff', color: '#48667d' },
    'Estetica': { bg: '#fef3c7', color: '#92400e' },
    'Prevencion': { bg: '#d1fae5', color: '#065f46' },
  };

  function getCategoryStyle(cat: string) {
    return categoryColors[cat] || { bg: '#eceef0', color: '#414750' };
  }

  const blogImages = [images.blog1, images.blog2, images.blog3, images.blog4, images.blog5];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f7f9fb' }}>

      {/* Editorial Header */}
      <section className="py-20" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eceef0' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#446279', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Revista Clinica</p>
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Salud Bucodental
              </h1>
            </div>
            <p style={{ fontSize: '16px', color: '#414750', maxWidth: '420px', lineHeight: 1.6 }}>
              Articulos, consejos y novedades de nuestro equipo de especialistas para cuidar tu sonrisa.
            </p>
          </div>
        </div>
      </section>

      {/* Artículo destacado — 2 col */}
      {featured && (
        <section className="py-16" style={{ backgroundColor: '#f2f4f6' }}>
          <div className="max-w-[1920px] mx-auto px-6 md:px-8">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 20px 40px rgba(25,28,30,0.08)' }}
            >
              {/* Image */}
              <div style={{ aspectRatio: '16/10', position: 'relative' }}>
                <img
                  src={images.blog1}
                  alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.05))' }} />
              </div>
              {/* Content */}
              <div
                className="flex flex-col justify-center p-10 md:p-14"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="rounded-full px-3 py-1"
                    style={{ fontSize: '11px', fontWeight: 700, ...getCategoryStyle(featured.category), textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {featured.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#727781' }}>{featured.readTime} de lectura</span>
                  <span
                    className="rounded-full px-3 py-1"
                    style={{ fontSize: '11px', fontWeight: 600, backgroundColor: '#003e6f', color: '#ffffff' }}
                  >
                    Destacado
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.2 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: '16px', color: '#414750', lineHeight: 1.7, marginBottom: '32px' }}>
                  {featured.excerpt}
                </p>
                <Link
                  href={`/template-dentista/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 self-start transition-opacity hover:opacity-70"
                  style={{ fontSize: '15px', fontWeight: 600, color: '#003e6f', textDecoration: 'none' }}
                >
                  Leer articulo completo
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4-card grid */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((post, i) => (
              <article
                key={post.slug}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(25,28,30,0.06)', border: '1px solid #eceef0' }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src={blogImages[i + 1] || blogImages[0]}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="rounded-full px-3 py-1"
                      style={{ fontSize: '10px', fontWeight: 700, ...getCategoryStyle(post.category), textTransform: 'uppercase', letterSpacing: '0.08em' }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#727781' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#191c1e', marginBottom: '10px', lineHeight: 1.4, flex: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#414750', lineHeight: 1.6, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/template-dentista/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
                    style={{ fontSize: '13px', fontWeight: 600, color: '#003e6f', textDecoration: 'none' }}
                  >
                    Leer mas
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Boletín */}
      <section className="py-20" style={{ backgroundColor: '#f2f4f6' }}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-8">
          <div
            className="rounded-3xl px-8 md:px-16 py-14 text-center max-w-2xl mx-auto"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,30,0.06)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#d2e4ff' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#003e6f' }}>mail</span>
            </div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, color: '#191c1e', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Consejos de salud dental en tu bandeja
            </h2>
            <p style={{ fontSize: '15px', color: '#414750', lineHeight: 1.6, marginBottom: '28px' }}>
              Suscribete a nuestra newsletter mensual y recibe articulos escritos por nuestros especialistas.
            </p>

            {subscribed ? (
              <div
                className="rounded-xl p-4 flex items-center justify-center gap-3"
                style={{ backgroundColor: '#d1fae5', color: '#065f46' }}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>Suscripcion confirmada. Gracias por unirte.</span>
              </div>
            ) : (
              <form onSubmit={handleSuscribirme} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 rounded-xl px-5 py-3 outline-none transition-all"
                  style={{ border: '1.5px solid #c1c7d2', fontSize: '15px', color: '#191c1e', backgroundColor: '#f7f9fb' }}
                />
                <button
                  type="submit"
                  className="rounded-xl px-6 py-3 transition-all hover:opacity-90 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #003e6f 0%, #005696 100%)', color: '#ffffff', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Suscribirse
                </button>
              </form>
            )}
            <p style={{ fontSize: '11px', color: '#727781', marginTop: '12px' }}>
              Sin spam. Puedes cancelar en cualquier momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
