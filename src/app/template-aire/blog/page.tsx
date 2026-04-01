'use client';

import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, images } from '../data';

const categories = ['Installation', 'Energy', 'Maintenance'];

const blogImages: Record<string, string> = {
  'ac-installation-tips-austin': images.blog1,
  'energy-saving-hvac-2026': images.blog2,
  'ac-maintenance-checklist': images.blog3,
  'choosing-hvac-system-guide': images.blog4,
  'indoor-air-quality-austin': images.blog5,
};

export default function BlogPage() {
  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <section className="py-24" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(141,75,0,0.1)', border: '1px solid rgba(141,75,0,0.2)' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expert Cooling Advice</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '20px', lineHeight: 1.1 }}>
            The ArcticStream Blog
          </h1>
          <p style={{ fontSize: '16px', color: '#414754', lineHeight: 1.7, maxWidth: '560px', marginBottom: '32px' }}>
            Practical guides, energy-saving strategies, and technical insights for Austin homeowners and property managers.
          </p>
          {/* Category tags */}
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full transition-colors hover:bg-[#eae7ea]"
                style={{ fontSize: '12px', fontWeight: 600, color: '#414754', backgroundColor: '#ffffff', border: '1px solid #c1c6d7' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="py-20" style={{ backgroundColor: '#fcf8fb' }}>
          <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Featured Article</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}>
              <div className="relative" style={{ minHeight: '400px' }}>
                <Image
                  src={images.blogFeatured}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-10 md:p-14" style={{ backgroundColor: '#ffffff' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full"
                    style={{ fontSize: '11px', fontWeight: 700, backgroundColor: 'rgba(5,100,126,0.08)', color: '#05647e' }}
                  >
                    {featured.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#717786' }}>{featured.readTime} read</span>
                </div>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, marginBottom: '32px' }}>
                  {featured.excerpt}
                </p>
                <Link
                  href={`/template-aire/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-md transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '14px', fontWeight: 600, padding: '12px 28px', textDecoration: 'none', alignSelf: 'flex-start' }}
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4-card grid */}
      <section className="py-20" style={{ backgroundColor: '#f6f3f5' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px' }}>More Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map(post => (
              <div
                key={post.slug}
                className="rounded-xl overflow-hidden flex flex-col"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 12px 40px rgba(27,27,29,0.05)' }}
              >
                <div className="relative" style={{ height: '200px' }}>
                  <Image
                    src={blogImages[post.slug] ?? images.blog1}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full"
                      style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(5,100,126,0.08)', color: '#05647e' }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#717786' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '15px', fontWeight: 700, color: '#1b1b1d', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                  <Link
                    href={`/template-aire/blog/${post.slug}`}
                    style={{ fontSize: '13px', fontWeight: 600, color: '#3a5f94', textDecoration: 'none', marginTop: '4px' }}
                  >
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="px-6 md:px-8 max-w-[1920px] mx-auto">
          <div
            className="rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{ backgroundColor: '#eae7ea', border: '1px solid #c1c6d7' }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#8d4b00', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Stay Informed</p>
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1b1b1d', letterSpacing: '-0.03em', marginBottom: '8px' }}>
                Austin cooling tips in your inbox
              </h2>
              <p style={{ fontSize: '14px', color: '#414754' }}>Seasonal maintenance reminders and efficiency guides. No spam.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  );
}

function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="px-4 py-3 rounded-md outline-none flex-1 min-w-[240px]"
        style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#1b1b1d', backgroundColor: '#ffffff' }}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-md transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg, #8d4b00 0%, #b15f00 100%)', color: '#ffffff', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}
      >
        Subscribe
      </button>
    </form>
  );
}
