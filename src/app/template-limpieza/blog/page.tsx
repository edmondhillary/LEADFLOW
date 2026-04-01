'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, images } from '../data';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const featured = blogPosts.find(p => p.featured);
  const rest = blogPosts.filter(p => !p.featured);

  const postImages = [images.blog1, images.blog2, images.blog3, images.blog4, images.blog5];

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'Cleaning Tips': { bg: '#80f98b', text: '#007327' },
    'Commercial': { bg: '#edeeef', text: '#0059bb' },
    'Sustainability': { bg: '#80f98b', text: '#007327' },
    'Guides': { bg: '#edeeef', text: '#0059bb' },
    'Post-Construction': { bg: '#edeeef', text: '#414754' },
  };

  function getCategoryStyle(category: string) {
    return categoryColors[category] || { bg: '#edeeef', text: '#414754' };
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Editorial Header */}
      <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#80f98b] mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#007327' }}>article</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#007327' }}>Cleaning Intelligence</span>
          </div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '16px', lineHeight: 1.05 }}>
            The Clean Standard
          </h1>
          <p style={{ fontSize: '17px', color: '#414754', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            Expert tips, industry insights, and professional guides from the PureLinen team.
          </p>
        </div>
      </section>

      {/* Featured Article — 2-col */}
      {featured && (
        <section className="w-full bg-[#f3f4f5] py-16 px-6 md:px-8">
          <div className="max-w-[1440px] mx-auto">
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0059bb', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>Featured Article</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.08)' }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={images.blogFeatured} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getCategoryStyle(featured.category).bg, color: getCategoryStyle(featured.category).text }}>
                    {featured.category}
                  </span>
                  <span style={{ fontSize: '12px', color: '#414754' }}>{featured.readTime} read</span>
                </div>
                <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#191c1d', marginBottom: '16px', lineHeight: 1.15 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#414754', lineHeight: 1.7, marginBottom: '24px' }}>
                  {featured.excerpt}
                </p>
                <Link href={`/template-limpieza/blog/${featured.slug}`} className="flex items-center gap-2 w-fit transition-all hover:gap-3 duration-200" style={{ fontSize: '14px', fontWeight: 600, color: '#0059bb', textDecoration: 'none' }}>
                  Read Article
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4-card Grid */}
      <section className="w-full bg-[#f8f9fa] py-16 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((post, idx) => (
              <div key={post.slug} className="bg-white rounded-xl overflow-hidden group" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.06)' }}>
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={postImages[idx + 1]} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getCategoryStyle(post.category).bg, color: getCategoryStyle(post.category).text }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#414754' }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#191c1d', marginBottom: '8px', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: '13px', color: '#414754', lineHeight: 1.6, marginBottom: '12px' }}>{post.excerpt}</p>
                  <Link href={`/template-limpieza/blog/${post.slug}`} className="flex items-center gap-1 transition-all hover:gap-2 duration-200" style={{ fontSize: '13px', fontWeight: 600, color: '#0059bb', textDecoration: 'none' }}>
                    Read More
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full bg-[#f3f4f5] py-20 px-6 md:px-8">
        <div className="max-w-[600px] mx-auto text-center">
          <div className="bg-white rounded-2xl p-10" style={{ boxShadow: '0 10px 40px -10px rgba(25,28,29,0.08)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#80f98b' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '26px', color: '#007327' }}>mail</span>
            </div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', color: '#191c1d', marginBottom: '8px' }}>
              Stay in the Know
            </h2>
            <p style={{ fontSize: '14px', color: '#414754', lineHeight: 1.7, marginBottom: '24px' }}>
              Get professional cleaning tips, seasonal guides, and exclusive offers delivered to your inbox.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#80f98b' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#007327', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '16px', fontWeight: 700, color: '#006e25' }}>You are subscribed!</p>
                <p style={{ fontSize: '13px', color: '#414754' }}>Welcome to the PureLinen community. Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 rounded-lg px-4 py-3 outline-none transition-all"
                  style={{ border: '1px solid #c1c6d7', fontSize: '14px', color: '#191c1d', backgroundColor: '#f8f9fa' }}
                />
                <button
                  type="submit"
                  className="rounded-lg px-6 py-3 transition-all hover:opacity-90 active:scale-[0.98] whitespace-nowrap"
                  style={{ background: 'linear-gradient(to right, #0059bb, #0070ea)', color: '#ffffff', fontSize: '14px', fontWeight: 600 }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
