import Link from 'next/link';
import { blogPosts, images } from '../data';

const categories = ['All', 'Moving Tips', 'Packing Guide', 'Office Relocation', 'Long Distance', 'Storage'];

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  const blogImages: Record<string, string> = {
    'moving-tips-san-francisco': images.blog1,
    'packing-guide-fragile-items': images.blog2,
    'office-relocation-guide': images.blog3,
    'long-distance-moving-checklist': images.blog4,
    'storage-solutions-guide': images.blog5,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* ── EDITORIAL HEADER ─────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10"
          style={{ borderBottom: '2px solid #191c1d' }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                color: '#44474e',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '10px',
              }}
            >
              Kinetic Journal
            </p>
            <h1
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#191c1d',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              Moving Intelligence
            </h1>
          </div>
          <p
            className="max-w-xs"
            style={{
              fontSize: '14px',
              color: '#44474e',
              lineHeight: 1.65,
            }}
          >
            Practical guides, industry insights, and expert tips from our team of certified moving professionals.
          </p>
        </div>

        {/* Category filters — static */}
        <div className="flex flex-wrap gap-3 mt-8">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full cursor-default"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: i === 0 ? '#002046' : '#edeeef',
                color: i === 0 ? '#ffffff' : '#44474e',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ── FEATURED ARTICLE ─────────────────────────────────────── */}
      {featured && (
        <section className="pb-16 px-6 md:px-10 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ backgroundColor: '#ffffff', boxShadow: '0 8px 40px rgba(0,32,70,0.08)' }}>
            {/* Image */}
            <div className="relative min-h-[320px]">
              <img
                src={images.blogFeatured}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: '#552b00',
                    color: '#ffffff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Featured
                </span>
                <span style={{ fontSize: '12px', color: '#44474e' }}>{featured.category}</span>
                <span style={{ fontSize: '12px', color: '#44474e' }}>&middot; {featured.readTime} read</span>
              </div>

              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  color: '#191c1d',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                {featured.title}
              </h2>

              <p style={{ fontSize: '14px', color: '#44474e', lineHeight: 1.7, marginBottom: '28px' }}>
                {featured.excerpt}
              </p>

              <Link
                href={`/template-mudanzas/blog/${featured.slug}`}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#002046',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                className="hover:opacity-70 transition-opacity"
              >
                Read Article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ─────────────────────────────────────────── */}
      <section className="pb-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.05)' }}
            >
              {/* Image */}
              <div className="relative" style={{ paddingBottom: '62%' }}>
                <img
                  src={blogImages[post.slug] || images.blog1}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#44474e',
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                    }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: '10px', color: '#44474e' }}>&middot; {post.readTime}</span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#191c1d',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    marginBottom: '10px',
                    flex: 1,
                  }}
                >
                  {post.title}
                </h3>

                <p style={{ fontSize: '12px', color: '#44474e', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>

                <Link
                  href={`/template-mudanzas/blog/${post.slug}`}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#002046',
                    textDecoration: 'none',
                  }}
                  className="hover:opacity-70 transition-opacity mt-auto"
                >
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#f3f4f5' }}>
        <div className="px-6 md:px-10 max-w-[1440px] mx-auto">
          <div
            className="rounded-2xl px-10 py-14 flex flex-col md:flex-row items-center gap-10"
            style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,32,70,0.06)' }}
          >
            <div className="flex-1">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#44474e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '10px',
                }}
              >
                Stay Informed
              </p>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#191c1d',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                }}
              >
                Moving tips delivered<br />to your inbox.
              </h2>
            </div>
            <div className="flex-1 w-full">
              <p style={{ fontSize: '13px', color: '#44474e', marginBottom: '16px', lineHeight: 1.6 }}>
                Subscribe to get our best moving guides, seasonal checklists, and SF Bay Area moving news.
              </p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  readOnly
                  className="flex-1 rounded-xl px-4 py-3"
                  style={{
                    fontSize: '14px',
                    fontFamily: "'Inter', sans-serif",
                    border: '1px solid rgba(0,32,70,0.15)',
                    backgroundColor: '#f8f9fa',
                    color: '#191c1d',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  className="rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: '#002046',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </button>
              </div>
              <p style={{ fontSize: '11px', color: '#44474e', marginTop: '8px' }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
