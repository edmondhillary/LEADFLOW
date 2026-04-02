'use client';

import Link from 'next/link';
import { blogPosts, images } from '../data';

const blogImages: Record<string, string> = {
  blog1: images.blog1,
  blog2: images.blog2,
  blog3: images.blog3,
};

const categories = ['Todos', 'Producto de Temporada', 'Vinos y Maridaje', 'Tecnica Culinaria', 'Territorio y Origen'];

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-restaurante';
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-32 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            {/* Left — 8 cols */}
            <div className="md:col-span-8">
              <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-6">El Blog Editorial</span>
              <h1
                className="text-5xl md:text-6xl lg:text-8xl font-bold text-[#1B1D0E] leading-none tracking-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Ideas,
                <span className="block italic text-[#735C00]"> Recetas y Territorio</span>
              </h1>
            </div>
            {/* Right — 4 cols */}
            <div className="md:col-span-4">
              <p className="text-[#444748] text-base leading-relaxed">
                Reflexiones sobre cocina de autor, maridaje, productores y la filosofia que da sentido a cada plato que servimos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ─── */}
      <section className="bg-[#F5F5DC] border-b border-[#C4C7C7]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 px-6 py-5 text-xs tracking-[0.15em] uppercase font-bold transition-colors ${
                  i === 0
                    ? 'text-[#1B1D0E] border-b-2 border-[#1B1D0E]'
                    : 'text-[#747878] hover:text-[#1B1D0E] border-b-2 border-transparent hover:border-[#C4C7C7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ARTICLE ─── */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
            {/* Image — 7 cols */}
            <div className="md:col-span-7 aspect-[4/3] md:aspect-auto overflow-hidden">
              <img
                src={images.blogDestacado}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Text — 5 cols */}
            <div className="md:col-span-5 bg-[#FBFBE2] p-10 md:p-14 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-4">
                <span className="bg-[#3C0610] text-white text-xs tracking-[0.2em] uppercase px-3 py-1">
                  Destacado
                </span>
                <span className="text-xs tracking-[0.15em] uppercase text-[#735C00]">{featured.category}</span>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#1B1D0E] leading-tight"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {featured.title}
              </h2>
              <p className="text-[#444748] text-sm leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#747878] tracking-wide">{featured.readTime} de lectura</span>
                <Link
                  href={`/template-restaurante/blog/${featured.slug}`}
                  className="text-[#735C00] text-xs tracking-[0.15em] uppercase font-bold hover:text-[#1B1D0E] transition-colors"
                >
                  Leer articulo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE GRID ─── */}
      <section className="py-20 bg-[#FBFBE2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <article key={post.slug} className={`group ${i === 1 ? 'md:translate-y-8' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden bg-[#E4E4CC] mb-5">
                  <img
                    src={blogImages[post.image] || images.blog1}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#735C00] block mb-3">{post.category}</span>
                <h3
                  className="text-xl font-bold text-[#1B1D0E] leading-tight mb-3"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-[#444748] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#747878] tracking-wide">{post.readTime} de lectura</span>
                  <Link
                    href={`/template-restaurante/blog/${post.slug}`}
                    className="text-[#735C00] text-xs tracking-[0.15em] uppercase font-bold hover:text-[#1B1D0E] transition-colors"
                  >
                    Leer &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-24 bg-[#F5F5DC]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[#735C00] block mb-4">La Carta Editorial</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1B1D0E] mb-4"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Reciba nuestra newsletter
          </h2>
          <p className="text-[#444748] mb-10 leading-relaxed">
            Reflexiones de cocina, novedades de carta y eventos especiales. Una carta mensual que vale la pena leer.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Su correo electronico"
              className="flex-1 bg-transparent px-0 py-4 text-[#1B1D0E] placeholder-[#747878] text-sm outline-none border-b border-[#747878]/50 focus:border-[#1B1D0E] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#1B1D0E] text-[#FBFBE2] uppercase tracking-[0.15em] text-xs font-bold px-8 py-4 hover:bg-[#000000] transition-colors mt-4 sm:mt-0 sm:ml-4 shrink-0"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
