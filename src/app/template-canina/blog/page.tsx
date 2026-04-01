'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, images } from '../data';

const categories = ['Todos', 'Cuidado', 'Razas', 'Salud'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = blogPosts.find(p => p.featured);
  const grid = blogPosts.filter(p => !p.featured);

  const filtered = activeCategory === 'Todos'
    ? grid
    : grid.filter(p => p.category === activeCategory);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  }

  const blogImages = [images.blog1, images.blog2, images.blog3, images.blog4, images.blog5];

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", backgroundColor: '#fafaf5', color: '#2f342e' }}>

      {/* Editorial Header */}
      <section className="px-6 md:px-10 py-20 md:py-28 max-w-[1920px] mx-auto">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: '#cee9d6', color: '#3f5749' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>article</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Grooming Tips and Guides</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#2f342e', lineHeight: 1.05, marginBottom: '20px' }}>
            The Sanctuary Journal
          </h1>
          <p style={{ fontSize: '16px', color: '#5c605a', lineHeight: 1.75 }}>
            Expert advice on dog grooming, breed care, and keeping your best friend looking and feeling their best.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="px-6 md:px-10 pb-20 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden" style={{ boxShadow: '0px 24px 48px rgba(47,52,46,0.08)', backgroundColor: '#ffffff' }}>
            <div className="overflow-hidden" style={{ minHeight: '400px' }}>
              <img src={images.blogFeatured} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="p-10 md:p-14 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#cee9d6', fontSize: '11px', fontWeight: 600, color: '#3f5749', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Featured</span>
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#edefe8', fontSize: '11px', fontWeight: 500, color: '#5c605a' }}>{featured.category}</span>
              </div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 800, color: '#2f342e', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75 }}>{featured.excerpt}</p>
              <div className="flex items-center gap-4">
                <span style={{ fontSize: '12px', color: '#5c605a' }}>{featured.readTime} read</span>
              </div>
              <Link href={`/template-canina/blog/${featured.slug}`} className="inline-flex items-center gap-2 rounded-full self-start" style={{ backgroundColor: '#4c6456', color: '#e6ffed', padding: '13px 28px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Read Article
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="px-6 md:px-10 pb-10 max-w-[1920px] mx-auto">
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full transition-all"
              style={{
                backgroundColor: activeCategory === cat ? '#4c6456' : '#e7e9e2',
                color: activeCategory === cat ? '#e6ffed' : '#2f342e',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4-Card Grid */}
      <section className="px-6 md:px-10 pb-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((post, i) => (
            <div key={post.slug} className="rounded-xl overflow-hidden flex flex-col" style={{ backgroundColor: '#ffffff', boxShadow: '0px 12px 32px rgba(47,52,46,0.06)' }}>
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <img src={blogImages[i + 1] || blogImages[0]} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#edefe8', fontSize: '10px', fontWeight: 600, color: '#5c605a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{post.category}</span>
                  <span style={{ fontSize: '11px', color: '#afb3ac' }}>{post.readTime} read</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#2f342e', letterSpacing: '-0.01em', lineHeight: 1.3, flex: 1 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#5c605a', lineHeight: 1.65 }}>{post.excerpt}</p>
                <Link href={`/template-canina/blog/${post.slug}`} className="inline-flex items-center gap-1 mt-auto" style={{ fontSize: '12px', fontWeight: 600, color: '#4c6456', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Read More
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-10 py-20" style={{ backgroundColor: '#f3f4ee' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#cee9d6', color: '#3f5749' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>mail</span>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Newsletter</span>
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#2f342e', marginBottom: '16px' }}>
            Grooming tips in your inbox
          </h2>
          <p style={{ fontSize: '15px', color: '#5c605a', lineHeight: 1.75, marginBottom: '32px' }}>
            Join our community of pet parents. Monthly grooming guides, seasonal care tips, and exclusive offers.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl" style={{ backgroundColor: '#cee9d6' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#3f5749', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#3f5749' }}>You are now subscribed. Thank you!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-full px-5 py-3"
                style={{ backgroundColor: '#e7e9e2', border: 'none', outline: 'none', fontSize: '14px', color: '#2f342e', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              />
              <button type="submit" className="rounded-full px-7 py-3 transition-all hover:opacity-90" style={{ backgroundColor: '#4c6456', color: '#e6ffed', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
