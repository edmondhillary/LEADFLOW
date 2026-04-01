import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage() {
  const blogImages = [images.blogFeatured, images.blog1, images.blog2, images.blog3];

  return (
    <main style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {/* Featured */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#f2f4f4] rounded-xl overflow-hidden shadow-sm">
          <div className="lg:col-span-7 overflow-hidden">
            <img src={blogImages[0]} alt={blogPosts[0].title} className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-1000" style={{ minHeight: '400px', maxHeight: '600px' }} />
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#3d6565] mb-4">{blogPosts[0].category} &middot; {blogPosts[0].readTime}</span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-6 leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {blogPosts[0].title}
            </h1>
            <p className="text-[#5a6061] text-base mb-8 leading-relaxed">{blogPosts[0].excerpt}</p>
            <span className="group flex items-center gap-3 w-fit text-teal-800 font-bold text-sm uppercase tracking-tighter cursor-pointer" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Leer Artículo
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_right_alt</span>
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, idx) => (
            <article key={post.slug} className="flex flex-col group">
              <div className="overflow-hidden rounded-xl mb-6 shadow-sm" style={{ aspectRatio: '4/3', backgroundColor: '#ebeeef' }}>
                <img src={blogImages[idx + 1]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#3d6565] mb-3">{post.category} &middot; {post.readTime}</span>
              <h3 className="text-xl font-bold text-teal-900 mb-3 leading-snug" style={{ fontFamily: "'Manrope', sans-serif" }}>{post.title}</h3>
              <p className="text-sm text-[#5a6061] mb-5 leading-relaxed flex-grow">{post.excerpt}</p>
              <span className="group/link flex items-center gap-2 text-teal-800 font-bold text-sm uppercase tracking-tighter w-fit cursor-pointer" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Leer Más <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_right_alt</span>
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 max-w-5xl mx-auto mb-16 md:mb-24">
        <div className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #3d6565, #315959)' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#d9fffe] mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Consejos de Color y Acabados</h2>
          <p className="text-[#c0ebea] max-w-md mx-auto mb-8">Suscríbete para recibir tendencias de color, guías de acabados y consejos de mantenimiento.</p>
          <div className="flex flex-col sm:flex-row w-full max-w-lg mx-auto gap-3">
            <input type="email" placeholder="Tu correo electrónico" className="flex-grow px-4 py-3 rounded-md text-sm bg-white/10 text-white placeholder:text-[#c0ebea]/60 border-none outline-none backdrop-blur-sm" />
            <button className="px-6 py-3 rounded-md bg-white text-teal-900 font-bold text-sm transition-all hover:bg-teal-50 active:scale-95">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
