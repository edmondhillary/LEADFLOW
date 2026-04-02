'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, images } from '../data';
import type { LeadOverrides } from '@/lib/lead-template-data';

const categories = ['Todos', 'Meditación', 'Movimiento', 'Bienestar', 'Principiantes'];

const postImages: Record<string, string> = {
  'morning-yoga-routine': images.blogDestacado,
  'meditation-for-beginners': images.blog1,
  'breathwork-science': images.blog2,
  'yin-vs-restorative': images.blog3,
  'finding-balance': images.blog4,
};

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as LeadOverrides | undefined;
  const baseHref = ov?.baseHref || '/template-yoga';
  const posts = ov?.blogPosts?.length
    ? ov.blogPosts.map((p, i) => ({ ...p, category: 'Blog', readTime: `${6 + i} min`, featured: i === 0 }))
    : blogPosts;

  const [email, setEmail] = useState('');
  const [subscribed, setSuscribirmed] = useState(false);

  const featuredPost = posts.find((p: any) => p.featured) as any;
  const regularPosts = (posts as any[]).filter((p) => !p.featured);

  function handleSuscribirme(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSuscribirmed(true);
    }
  }

  return (
    <>
      {/* Editorial Header */}
      <section className="w-full pt-20 pb-14 px-6 md:px-16" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: '11px',
                  fontStyle: 'italic',
                  color: '#566342',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Nuestro blog
              </p>
              <h1
                style={{
                  fontFamily: "'Noto Serif', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  color: '#1b1c19',
                  fontWeight: 700,
                  lineHeight: 1.05,
                }}
              >
                El Diario{' '}
                <em style={{ fontStyle: 'italic', color: '#566342' }}>del Silencio</em>
              </h1>
            </div>
            <p style={{ fontSize: '14px', color: '#45483f', maxWidth: '340px', lineHeight: 1.7 }}>
              Ideas útiles, prácticas y consejos reales para mejorar tu bienestar día a día.
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                className="transition-all"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '7px 18px',
                  borderRadius: '20px',
                  border: '1px solid #c6c8bb',
                  backgroundColor: cat === 'Todos' ? '#566342' : 'transparent',
                  color: cat === 'Todos' ? '#ffffff' : '#45483f',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artículo destacado */}
      {featuredPost && (
        <section className="w-full px-6 md:px-16 pb-16" style={{ backgroundColor: '#fbf9f4' }}>
          <div className="max-w-[1920px] mx-auto">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden"
              style={{ borderRadius: '16px', border: '1px solid #e4e2dd' }}
            >
              <div className="relative" style={{ height: '480px', minHeight: '320px' }}>
                <Image
                  src={postImages[featuredPost.slug] ?? images.blogDestacado}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="flex flex-col justify-center p-12"
                style={{ backgroundColor: '#f0eee9' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#566342',
                      backgroundColor: '#dae8be',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {featuredPost.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#45483f' }}>{featuredPost.readTime} de lectura</span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Noto Serif', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 700,
                    color: '#1b1c19',
                    lineHeight: 1.2,
                    marginBottom: '16px',
                  }}
                >
                  {featuredPost.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#45483f', lineHeight: 1.7, marginBottom: '28px' }}>
                  {featuredPost.excerpt}
                </p>
                <Link
                  href={`${baseHref}/blog/${featuredPost.slug}`}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '13px 28px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    letterSpacing: '0.03em',
                    alignSelf: 'flex-start',
                  }}
                >
                  Leer artículo →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4 Regular Articles */}
      <section className="w-full px-6 md:px-16 pb-24" style={{ backgroundColor: '#fbf9f4' }}>
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {regularPosts.map(post => (
              <article
                key={post.slug}
                className="group transition-all duration-500 hover:-translate-y-2"
                style={{ backgroundColor: '#f5f3ee', borderRadius: '14px', overflow: 'hidden' }}
              >
                <div className="relative w-full" style={{ height: '220px' }}>
                  <Image
                    src={postImages[post.slug] ?? images.blog1}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#566342',
                        backgroundColor: '#dae8be',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#45483f' }}>{post.readTime}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Noto Serif', serif",
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1b1c19',
                      lineHeight: 1.35,
                      marginBottom: '10px',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#45483f', lineHeight: 1.6, marginBottom: '14px' }}>
                    {post.excerpt.substring(0, 100)}...
                  </p>
                  <Link
                      href={`${baseHref}/blog/${post.slug}`}
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#566342',
                      textDecoration: 'none',
                      borderBottom: '1px solid #a3b18a',
                      paddingBottom: '2px',
                    }}
                  >
                      Leer →
                    </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Boletín Signup */}
      <section className="w-full py-24 px-6 md:px-16" style={{ backgroundColor: '#f0eee9' }}>
        <div className="max-w-xl mx-auto text-center">
          <span
            className="inline-block mb-4 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#dae8be', color: '#566342', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            The Weekly Breath
          </span>
          <h2
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#1b1c19',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            Words for the{' '}
            <em style={{ fontStyle: 'italic', color: '#566342' }}>Quiet Mind</em>
          </h2>
          <p style={{ fontSize: '14px', color: '#45483f', lineHeight: 1.7, marginBottom: '32px' }}>
            Monthly reflections on practice, movement, and stillness. No noise. No spam.
          </p>

          {subscribed ? (
            <div
              style={{
                backgroundColor: '#dae8be',
                borderRadius: '12px',
                padding: '24px',
                color: '#566342',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Welcome to the community. 🌿 Your first letter arrives soon.
            </div>
          ) : (
            <form onSubmit={handleSuscribirme} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1"
                style={{
                  padding: '13px 18px',
                  borderRadius: '10px',
                  border: '1px solid #c6c8bb',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  color: '#1b1c19',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #566342 0%, #a3b18a 100%)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '13px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.03em',
                }}
              >
                Suscribirme
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
