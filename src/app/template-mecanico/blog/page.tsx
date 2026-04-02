import Link from 'next/link';
import { blogPosts, images, business } from '../data';

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-mecanico';
  const featured = blogPosts.find(p => 'featured' in p ? (p as { featured?: boolean }).featured : false) ?? blogPosts[0];
  const rest = blogPosts.filter(p => p !== featured);

  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", backgroundColor: '#121416' }}>
      <section style={{ backgroundColor: '#121416', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#ff5f00', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
            Technical Intelligence
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#e2e2e5', marginBottom: '16px', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {business.name}
            <span style={{ color: '#ff5f00' }}> BLOG</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#c4c6cc', maxWidth: '560px', lineHeight: 1.7 }}>
            Guias tecnicas, consejos de mantenimiento y analisis de diagnostico del equipo de {business.name}.
          </p>
        </div>
      </section>

      {featured && (
        <section style={{ backgroundColor: '#1a1c1e', padding: '0 24px 64px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <Link href={`/template-mecanico/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', padding: '48px', backgroundColor: '#222428' }}>
                <div>
                  <img src={(images as Record<string, string>)[(featured as { image?: string }).image ?? 'mechanicHands'] ?? images.mechanicHands} alt={featured.title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#ff5f00', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
                    Destacado — {(featured as { category?: string }).category}
                  </p>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '24px', fontWeight: 800, color: '#e2e2e5', marginBottom: '16px', lineHeight: 1.2 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: '#c4c6cc', lineHeight: 1.7, marginBottom: '24px' }}>
                    {featured.excerpt}
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffb599', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Leer articulo &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#121416', padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {rest.map(post => (
              <Link key={post.slug} href={`/template-mecanico/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ backgroundColor: '#1a1c1e', padding: '0 0 24px' }}>
                  <img src={(images as Record<string, string>)[(post as { image?: string }).image ?? 'engineParts'] ?? images.engineParts} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '20px' }} />
                  <div style={{ padding: '0 20px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#ff5f00', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>
                      {(post as { category?: string }).category} · {(post as { readTime?: string }).readTime}
                    </p>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#e2e2e5', marginBottom: '10px', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#c4c6cc', lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
