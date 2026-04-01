import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, images, business } from '../../data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const heroImg = 'image' in post
    ? (images as Record<string, string>)[(post as { image: string }).image]
    : null;

  return (
    <article>
      <section style={{ backgroundColor: '#121416', padding: '72px 0 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', marginBottom: '28px', fontFamily: "'Manrope', sans-serif" }}>
            <Link href="/template-mecanico" style={{ color: '#ffb599', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <Link href="/template-mecanico/blog" style={{ color: '#ffb599', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#9ca3af' }}>{post.title.slice(0, 40)}</span>
          </nav>
          {'category' in post && (
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#ff5f00', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px', fontFamily: "'Manrope', sans-serif" }}>
              {(post as { category: string }).category}
              {'readTime' in post && <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: '16px' }}>{(post as { readTime: string }).readTime} de lectura</span>}
            </p>
          )}
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#e2e2e5', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '24px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '19px', lineHeight: 1.7, color: '#c4c6cc', fontFamily: "'Manrope', sans-serif", marginBottom: '48px' }}>
            {post.excerpt}
          </p>
        </div>
        {heroImg && (
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <img src={heroImg} alt={post.title} style={{ width: '100%', height: '460px', objectFit: 'cover' }} />
          </div>
        )}
      </section>

      <section style={{ backgroundColor: '#1a1c1e', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          {[
            post.excerpt,
            'Comprender bien este tema es fundamental para tomar decisiones informadas. La experiencia practica demuestra que los mejores resultados provienen de un enfoque metodico y profesional.',
            'Los detalles marcan la diferencia. La calidad de los materiales y la precision en la ejecucion son factores que distinguen a los verdaderos profesionales del sector.',
            'La comunicacion con el cliente es igualmente clave. Explicar el proceso, establecer expectativas claras y cumplir los plazos genera confianza duradera.',
            `En ${business.name} llevamos anos aplicando estas mejores practicas con resultados excelentes. Si deseas una consulta personalizada, contactanos hoy mismo.`,
          ].map((para, i) => (
            <p key={i} style={{ fontSize: '17px', lineHeight: 1.85, color: '#e2e2e5', fontFamily: "'Manrope', sans-serif", marginBottom: '28px', opacity: i === 0 ? 0.95 : 0.82 }}>
              {para}
            </p>
          ))}

          <div style={{ borderLeft: '3px solid #ff5f00', margin: '48px 0', backgroundColor: '#222428', padding: '20px 20px 20px 24px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#e2e2e5', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>Hablemos de tu vehiculo</p>
            <p style={{ fontSize: '13px', color: '#c4c6cc', fontFamily: "'Manrope', sans-serif", marginBottom: '16px' }}>El equipo de {business.name} esta listo para ayudarte.</p>
            <Link href="/template-mecanico/contacto" style={{ display: 'inline-block', padding: '10px 20px', background: 'linear-gradient(135deg, #ffb599 0%, #ff5f00 100%)', color: '#531a00', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Manrope', sans-serif" }}>
              Contactar
            </Link>
          </div>

          <Link href="/template-mecanico/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffb599', fontFamily: "'Manrope', sans-serif", fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Volver al Blog
          </Link>
        </div>
      </section>
    </article>
  );
}
