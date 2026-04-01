import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, images, business } from '../../data';

// Generate static routes at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Hero */}
      <section style={{ backgroundColor: '#fbf9f4', padding: '80px 0 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '12px', fontFamily: "'Manrope', sans-serif" }}>
            <Link href="/template-yoga" style={{ color: '#566342', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <Link href="/template-yoga/blog" style={{ color: '#566342', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#6b7280' }}>{post.title}</span>
          </div>

          {/* Category + read time */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#566342', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: "'Manrope', sans-serif" }}>
              {post.category}
            </span>
            {'readTime' in post && (
              <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: "'Manrope', sans-serif" }}>
                {(post as { readTime: string }).readTime} de lectura
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1b1c19', fontFamily: "'Noto Serif', serif", marginBottom: '24px' }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{ fontSize: '20px', lineHeight: 1.65, color: '#6b7280', fontFamily: "'Manrope', sans-serif", maxWidth: '640px', marginBottom: '48px' }}>
            {post.excerpt}
          </p>
        </div>

        {/* Hero image */}
        {'image' in post && (images as Record<string, string>)[(post as { image: string }).image] && (
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 0' }}>
            <img
              src={(images as Record<string, string>)[(post as { image: string }).image]}
              alt={post.title}
              style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        )}
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: '#f0eee9', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          {/* Simulated article content */}
          {[
            post.excerpt,
            'Comprender los fundamentos es esencial para cualquier profesional del sector. La experiencia acumulada durante anos de practica nos demuestra que los mejores resultados siempre provienen de un enfoque metodico y bien estructurado.',
            'Uno de los aspectos mas importantes a considerar es la calidad de los materiales y el cuidado en la ejecucion. Sin este compromiso fundamental, incluso las mejores estrategias pueden verse comprometidas por deficiencias tecnicas.',
            'La atencion al cliente juega un papel igualmente crucial. Una comunicacion transparente, el establecimiento de expectativas claras y el seguimiento constante son elementos que distinguen a los profesionales de excelencia del resto del mercado.',
            'En conclusion, la combinacion de experiencia tecnica, materiales de calidad y un servicio al cliente excepcional es la formula que garantiza los mejores resultados a largo plazo. Si tienes preguntas adicionales o deseas una consulta personalizada, no dudes en contactarnos.',
          ].map((paragraph, i) => (
            <p key={i} style={{ fontSize: '17px', lineHeight: 1.8, color: '#1b1c19', fontFamily: "'Manrope', sans-serif", marginBottom: '28px', opacity: i === 0 ? 1 : 0.85 }}>
              {paragraph}
            </p>
          ))}

          {/* CTA block */}
          <div style={{ borderLeft: '4px solid #566342', marginTop: '48px', marginBottom: '48px', backgroundColor: '#f5f3ee', padding: '24px 24px 24px 28px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#1b1c19', fontFamily: "'Noto Serif', serif", marginBottom: '8px' }}>
              ¿Necesitas ayuda profesional?
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', fontFamily: "'Manrope', sans-serif", marginBottom: '16px' }}>
              Nuestro equipo de {business.name} esta disponible para resolver cualquier duda y ofrecerte una solucion personalizada.
            </p>
            <Link
              href="/template-yoga/contacto"
              style={{ display: 'inline-block', padding: '10px 24px', backgroundColor: '#566342', color: '#ffffff', fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 700, textDecoration: 'none', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              Contactar ahora
            </Link>
          </div>

          {/* Back to blog */}
          <div style={{ paddingTop: '32px', borderTop: '1px solid #f0eee9' }}>
            <Link
              href="/template-yoga/blog"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#566342', fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Volver al Blog
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
