'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Design', 'Maintenance', 'Planting', 'Irrigation', 'Sustainability'];
  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  const blogImages: Record<string, string> = {
    'principles-of-garden-design': images.blogFeatured,
    'seasonal-maintenance-guide': images.blog1,
    'plant-selection-for-structure': images.blog2,
    'smart-irrigation-systems': images.blog3,
    'sustainable-landscaping-practices': images.blog4,
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#fafaf5' }}>

      {/* Editorial Header */}
      <section className="w-full py-24 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span
                className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#56642b' }}
              >
                The Journal
              </span>
              <h1
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: '#1a1c19',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                }}
              >
                The Botanical Journal
              </h1>
            </div>
            <p style={{ fontSize: '15px', fontWeight: 300, color: '#444842', lineHeight: 1.75, maxWidth: '380px' }}>
              Horticultural insight, design thinking, and seasonal guidance from the studio.
            </p>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? '#283827' : 'transparent',
                  color: activeCategory === cat ? '#ffffff' : '#444842',
                  border: activeCategory === cat ? '1.5px solid #283827' : '1.5px solid #c4c8bf',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="w-full py-20 px-6 md:px-10 max-w-[1920px] mx-auto">
          <span className="inline-block mb-8 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            Featured
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden" style={{ minHeight: '480px' }}>
              <img
                src={blogImages[featured.slug] || images.blogFeatured}
                alt={featured.title}
                className="w-full h-full object-cover"
                style={{ minHeight: '480px' }}
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{ backgroundColor: '#d6e7a1', color: '#5a682f' }}
                >
                  {featured.category}
                </span>
                <span style={{ fontSize: '11px', color: '#444842', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {featured.readTime} read
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Newsreader', serif",
                  fontSize: 'clamp(2rem, 3vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#1a1c19',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}
              >
                {featured.title}
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 300, color: '#444842', lineHeight: 1.8, marginBottom: '32px' }}>
                {featured.excerpt}
              </p>
              <Link
                href={`/template-jardineria/blog/${featured.slug}`}
                className="inline-block rounded-xl transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
                  color: '#ffffff',
                  padding: '14px 32px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                Read Article
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4-card grid */}
      <section className="w-full py-12 px-6 md:px-10 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/template-jardineria/blog/${post.slug}`}
              className="group block rounded-3xl overflow-hidden no-underline"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 20px 40px rgba(40,56,39,0.06)', textDecoration: 'none' }}
            >
              <div className="overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={blogImages[post.slug] || images.blog1}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: '#f4f4ef', color: '#56642b' }}
                  >
                    {post.category}
                  </span>
                  <span style={{ fontSize: '10px', color: '#444842', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {post.readTime}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Newsreader', serif",
                    fontSize: '18px',
                    fontWeight: 400,
                    color: '#1a1c19',
                    lineHeight: 1.3,
                    marginBottom: '10px',
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontSize: '12px', fontWeight: 300, color: '#444842', lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-20 px-6 md:px-10" style={{ backgroundColor: '#f4f4ef' }}>
        <div className="max-w-[720px] mx-auto text-center">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#56642b' }}>
            The Journal
          </span>
          <h2
            style={{
              fontFamily: "'Newsreader', serif",
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#1a1c19',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Seasonal notes from the studio.
          </h2>
          <p style={{ fontSize: '15px', fontWeight: 300, color: '#444842', lineHeight: 1.75, marginBottom: '36px' }}>
            Subscribe for quarterly dispatches on planting, design, and horticultural practice.
          </p>
          {subscribed ? (
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: '#d6e7a1', border: '1px solid #adc0a8' }}
            >
              <p style={{ fontFamily: "'Newsreader', serif", fontSize: '18px', fontStyle: 'italic', fontWeight: 300, color: '#283827' }}>
                Thank you. You will hear from us each season.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 rounded-xl px-5 py-4 outline-none"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #c4c8bf',
                  fontSize: '14px',
                  color: '#1a1c19',
                  fontFamily: "'Manrope', sans-serif",
                }}
              />
              <button
                type="submit"
                className="rounded-xl px-7 py-4 transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(145deg, #283827 0%, #3e4f3c 100%)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
