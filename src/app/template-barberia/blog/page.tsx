import Link from 'next/link';
import { blogPosts, images } from '../data';

const imageMap: Record<string, string> = {
  blogDestacado: images.blogDestacado,
  blog1: images.blog1,
  blog2: images.blog2,
  blog3: images.blog3,
  blog4: images.blog4,
  blog5: images.blog5,
};

const categories = ['All', 'Technique', 'Beard', 'Style', 'Culture'];

const featuredPost = blogPosts.find(p => p.featured);
const gridPosts = blogPosts.filter(p => !p.featured);

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-barberia';
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#131313', color: '#e5e2e1' }}>

      {/* EDITORIAL HEADER */}
      <section className="py-40 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-[1920px] mx-auto">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>The Journal</p>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '24px' }}>
            Craft. Culture.<br />
            <em style={{ fontStyle: 'italic', color: '#9a8f80' }}>Perspective.</em>
          </h1>
          <p style={{ fontSize: '16px', color: '#9a8f80', lineHeight: 1.8, maxWidth: '480px' }}>
            Dispatches on grooming technique, barbershop culture, and the considered details that define a gentleman.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featuredPost && (
        <section className="py-24 px-6 md:px-8" style={{ backgroundColor: '#131313' }}>
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={imageMap[featuredPost.image] ?? images.blogDestacado}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(0.2)' }}
              />
            </div>
            <div>
              <div className="flex gap-4 items-center mb-8">
                <span style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.2em', border: '1px solid #4e4639', padding: '4px 12px' }}>{featuredPost.category}</span>
                <span style={{ fontSize: '10px', color: '#4e4639', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{featuredPost.readTime} read</span>
              </div>
              <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '20px' }}>{featuredPost.title}</h2>
              <p style={{ fontSize: '15px', color: '#9a8f80', lineHeight: 1.8, marginBottom: '32px' }}>{featuredPost.excerpt}</p>
              <Link
                href={`/template-barberia/blog/${featuredPost.slug}`}
                style={{ display: 'inline-block', background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '10px', fontWeight: 700, padding: '12px 32px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.2em' }}
              >
                Leer artículo
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTERS */}
      <section className="px-6 md:px-8 py-12" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                style={{ fontSize: '10px', color: cat === 'All' ? '#412d00' : '#9a8f80', background: cat === 'All' ? 'linear-gradient(45deg, #e9c176, #c5a059)' : 'transparent', border: cat === 'All' ? 'none' : '1px solid #4e4639', padding: '8px 20px', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-6 md:px-8 pb-32" style={{ backgroundColor: '#131313' }}>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {gridPosts.map(post => (
            <article key={post.slug} style={{ backgroundColor: '#1c1b1b' }}>
              <div className="overflow-hidden" style={{ aspectRatio: '3/2' }}>
                <img
                  src={imageMap[post.image] ?? images.blog1}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(0.3)' }}
                />
              </div>
              <div className="p-6">
                <div className="flex gap-3 items-center mb-4">
                  <span style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{post.category}</span>
                  <span style={{ fontSize: '10px', color: '#4e4639' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', color: '#e5e2e1', lineHeight: 1.3, marginBottom: '12px' }}>{post.title}</h3>
                <p style={{ fontSize: '13px', color: '#9a8f80', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>
                <Link
                  href={`/template-barberia/blog/${post.slug}`}
                  style={{ fontSize: '10px', color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', borderBottom: '1px solid #e9c176', paddingBottom: '2px' }}
                >
                  Leer más
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-32 px-6 md:px-8" style={{ backgroundColor: '#0e0e0e' }}>
        <div className="max-w-xl mx-auto text-center">
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#e9c176', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '24px' }}>The Journal</p>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#e5e2e1', lineHeight: 1.1, marginBottom: '16px' }}>
            Refined Reading.<br />
            <em style={{ fontStyle: 'italic', color: '#9a8f80' }}>In Your Inbox.</em>
          </h2>
          <p style={{ fontSize: '14px', color: '#9a8f80', lineHeight: 1.7, marginBottom: '40px' }}>
            New articles on technique and culture, delivered infrequently and with intention.
          </p>
          <div className="flex gap-0">
            <input
              type="email"
              placeholder="Your email address"
              style={{ flex: 1, backgroundColor: '#1c1b1b', border: 'none', borderBottom: '1px solid #4e4639', color: '#e5e2e1', fontSize: '13px', padding: '14px 16px', outline: 'none' }}
            />
            <button
              style={{ background: 'linear-gradient(45deg, #e9c176, #c5a059)', color: '#412d00', fontSize: '10px', fontWeight: 700, padding: '14px 28px', textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              Suscribirme
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
