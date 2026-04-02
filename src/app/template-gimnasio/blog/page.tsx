import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-gimnasio';
  const blogImages = [images.blogDestacado, images.blog1, images.blog2, images.blog3, images.blog4];

  return (
    <main style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Destacado */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0" style={{ backgroundColor: '#131313' }}>
          <div className="lg:col-span-7 overflow-hidden">
            <img src={blogImages[0]} alt={blogPosts[0].title} className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-1000" style={{ minHeight: '400px', maxHeight: '650px', filter: 'brightness(0.7)' }} />
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 w-fit" style={{ backgroundColor: '#842133', color: '#ffc0c4', letterSpacing: '0.1em' }}>
              {blogPosts[0].category}
            </span>
            <h1 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {blogPosts[0].title}
            </h1>
            <p className="text-base mb-8" style={{ color: '#ababab', lineHeight: 1.7 }}>{blogPosts[0].excerpt}</p>
            <span className="group flex items-center gap-3 w-fit font-bold uppercase text-sm" style={{ color: '#eb0000', letterSpacing: '0.05em' }}>
              Leer Artículo
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" style={{ fontSize: '18px' }}>arrow_forward</span>
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, idx) => (
            <article key={post.slug} className="flex flex-col group">
              <div className="overflow-hidden mb-6" style={{ aspectRatio: '16/10', backgroundColor: '#191919' }}>
                <img src={blogImages[idx + 1]} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" style={{ filter: 'brightness(0.6)' }} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: '#842133', color: '#ffc0c4', letterSpacing: '0.1em' }}>
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: '#757575' }}>{post.readTime}</span>
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {post.title}
              </h3>
              <p className="text-sm mb-5 flex-grow" style={{ color: '#ababab', lineHeight: 1.7 }}>{post.excerpt}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase w-fit group-hover:gap-3 transition-all" style={{ color: '#eb0000', letterSpacing: '0.1em' }}>
                Leer Más <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 max-w-4xl mx-auto mb-16 md:mb-24 py-16 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="material-symbols-outlined text-4xl mb-6" style={{ color: '#eb0000' }}>format_quote</span>
        <h2 className="text-2xl md:text-3xl max-w-2xl mx-auto" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 800, fontStyle: 'italic', color: '#ababab', lineHeight: 1.4 }}>
          &ldquo;El cuerpo logra lo que la mente cree.&rdquo;
        </h2>
      </section>

      {/* Boletín */}
      <section className="px-6 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="p-12 md:p-16 text-center" style={{ backgroundColor: '#1f1f1f' }}>
          <h2 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
            NEWSLETTER <span style={{ color: '#eb0000' }}>KINETIC</span>
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: '#ababab' }}>
            Recibe entrenamientos, consejos de nutrición y novedades del gym directo en tu bandeja.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-lg mx-auto gap-3">
            <input type="email" placeholder="TU EMAIL" className="flex-grow px-4 py-3 text-xs font-bold" style={{ backgroundColor: '#0e0e0e', border: 'none', color: '#fff', outline: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }} />
            <button className="px-6 py-3 flex items-center justify-center transition-all active:scale-95" style={{ backgroundColor: '#eb0000', border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ color: '#000' }}>arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
