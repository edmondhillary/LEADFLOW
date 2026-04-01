import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, images } from '../data';

const blogCategories = ['Todos', 'Programacion', 'Diseno UX', 'Marketing Digital', 'Data Science', 'Productividad'];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Programacion: { bg: '#d9e2ff', text: '#001944' },
  'Diseno UX': { bg: '#ffdbcf', text: '#370d00' },
  'Marketing Digital': { bg: '#acf4a4', text: '#0c5216' },
  'Data Science': { bg: '#d9e2ff', text: '#001944' },
  Productividad: { bg: '#e7e8e9', text: '#454652' },
};

const blogImages = [images.blog1, images.blog2, images.blog3, images.blog4, images.blog5];

export default function BlogPage() {
  const featured = blogPosts.find(p => p.featured)!;
  const rest = blogPosts.filter(p => !p.featured);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa', color: '#191c1d' }}>

      {/* Editorial Header */}
      <section className="w-full py-20 md:py-24" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e7e8e9' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#2a6b2c', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Recursos Academicos</p>
              <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.05 }}>
                Conocimiento que<br />transforma carreras.
              </h1>
            </div>
            <p style={{ fontSize: '15px', color: '#454652', lineHeight: 1.75, maxWidth: '360px' }}>
              Articulos, guias y recursos creados por nuestros mentores e instructores. Actualizado semanalmente.
            </p>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-10">
            {blogCategories.map((cat, i) => (
              <span key={cat} className="rounded-full px-4 py-2 cursor-pointer transition-all" style={{ fontSize: '13px', fontWeight: 600, backgroundColor: i === 0 ? '#001944' : '#f3f4f5', color: i === 0 ? '#ffffff' : '#454652', border: i === 0 ? 'none' : '1px solid #e7e8e9' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="w-full py-16" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-[2rem] overflow-hidden" style={{ height: '420px' }}>
              <Image src={images.blogFeatured} alt={featured.title} fill className="object-cover" priority />
              <div className="absolute top-5 left-5">
                <span className="rounded-full px-4 py-2" style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#001944', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Articulo Destacado
                </span>
              </div>
            </div>
            <div className="py-4">
              <span className="inline-block rounded-full px-3 py-1 mb-5" style={{ fontSize: '11px', fontWeight: 700, backgroundColor: categoryColors[featured.category]?.bg || '#e7e8e9', color: categoryColors[featured.category]?.text || '#454652', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {featured.category}
              </span>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', lineHeight: 1.15, marginBottom: '16px' }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: '16px', color: '#454652', lineHeight: 1.75, marginBottom: '28px' }}>
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <Link href={`/template-academia/blog/${featured.slug}`} className="inline-flex items-center gap-2 rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(to right, #001944, #002c6e)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '12px 24px', textDecoration: 'none' }}>
                  Leer articulo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <span style={{ fontSize: '13px', color: '#454652', fontWeight: 500 }}>{featured.readTime} de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-card grid */}
      <section className="w-full pb-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rest.map((post, i) => (
              <div key={post.slug} className="rounded-[2rem] overflow-hidden flex flex-col" style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(25,28,29,0.05)' }}>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={blogImages[i + 1]} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-block rounded-full px-3 py-1 mb-3 self-start" style={{ fontSize: '10px', fontWeight: 700, backgroundColor: categoryColors[post.category]?.bg || '#e7e8e9', color: categoryColors[post.category]?.text || '#454652', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 800, letterSpacing: '-0.025em', color: '#191c1d', lineHeight: 1.3, marginBottom: '8px', flex: 1 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#454652', lineHeight: 1.65, marginBottom: '16px' }}>
                    {post.excerpt.slice(0, 90)}...
                  </p>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #e7e8e9' }}>
                    <span style={{ fontSize: '11px', color: '#454652', fontWeight: 500 }}>{post.readTime}</span>
                    <Link href={`/template-academia/blog/${post.slug}`} style={{ fontSize: '12px', fontWeight: 600, color: '#001944', textDecoration: 'none' }}>
                      Leer &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter subscription */}
      <section className="w-full py-20" style={{ background: 'linear-gradient(to right, #001944, #002c6e)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 text-center">
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#6b95f3', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '14px' }}>Newsletter Semanal</p>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            El conocimiento que importa,<br />directo a tu bandeja.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '36px' }}>
            Mas de 12.000 profesionales ya suscritos. Sin spam, solo valor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded-xl px-5 py-4 outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
            />
            <button className="rounded-xl px-6 py-4 transition-all hover:opacity-90 flex-shrink-0" style={{ background: 'linear-gradient(to right, #2a6b2c, #307231)', color: '#ffffff', fontSize: '14px', fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
