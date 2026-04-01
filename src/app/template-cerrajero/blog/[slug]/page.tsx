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

  if (!post) {
    notFound();
  }

  const heroImg = 'image' in post
    ? (images as Record<string, string>)[(post as { image: string }).image]
    : null;

  return (
    <article>
      {/* Hero */}
      <section style={{ backgroundColor: '#131313', padding: '72px 0 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', marginBottom: '28px', fontFamily: "'Inter', sans-serif" }}>
            <Link href="/template-cerrajero" style={{ color: '#ffd700', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <Link href="/template-cerrajero/blog" style={{ color: '#ffd700', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#9ca3af' }}>{post.title.slice(0, 40)}{post.title.length > 40 ? '...' : ''}</span>
          </nav>

          {'category' in post && (
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#ffd700', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>
              {(post as { category: string }).category}
              {'readTime' in post && <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: '16px' }}>{(post as { readTime: string }).readTime} de lectura</span>}
            </p>
          )}

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#e5e2e1', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '24px' }}>
            {post.title}
          </h1>

          <p style={{ fontSize: '19px', lineHeight: 1.7, color: '#9ca3af', fontFamily: "'Inter', sans-serif", marginBottom: '48px' }}>
            {post.excerpt}
          </p>
        </div>

        {heroImg && (
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <img
              src={heroImg}
              alt={post.title}
              style={{ width: '100%', height: '460px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0' }}
            />
          </div>
        )}
      </section>

      {/* Body */}
      <section style={{ backgroundColor: '#20201f', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          {[
            post.excerpt,
            'Profundizar en este tema nos permite entender mejor los desafios y las oportunidades que presenta el sector. La experiencia practica y el conocimiento tecnico son dos pilares fundamentales que deben trabajarse de manera conjunta.',
            'Uno de los errores mas comunes es subestimar la importancia de los detalles. La excelencia en el trabajo se construye a traves de una serie de pequenas decisiones que, acumuladas, marcan una diferencia significativa en el resultado final.',
            'Ademas, la comunicacion constante con el cliente es clave para garantizar su satisfaccion. Explicar cada paso del proceso, establecer expectativas claras y cumplir los plazos acordados son elementos que generan confianza y fidelizan.',
            `En ${business.name}, llevamos anos aplicando estas mejores practicas. El resultado es una trayectoria de excelencia que nuestros clientes valoran. Si deseas obtener mas informacion o solicitar nuestros servicios, no dudes en contactarnos.`,
          ].map((para, i) => (
            <p key={i} style={{ fontSize: '17px', lineHeight: 1.85, color: '#e5e2e1', fontFamily: "'Inter', sans-serif", marginBottom: '28px', opacity: i === 0 ? 0.95 : 0.8 }}>
              {para}
            </p>
          ))}

          {/* CTA */}
          <div style={{ borderLeft: '3px solid #ffd700', paddingLeft: '20px', margin: '48px 0', backgroundColor: '#1c1b1b', padding: '20px 20px 20px 24px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#e5e2e1', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>
              Hablemos de tu proyecto
            </p>
            <p style={{ fontSize: '13px', color: '#9ca3af', fontFamily: "'Inter', sans-serif", marginBottom: '16px' }}>
              El equipo de {business.name} esta listo para ayudarte con una solucion a medida.
            </p>
            <Link href="/template-cerrajero/contacto" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#ffd700', color: '#3a3000', fontSize: '12px', fontWeight: 700, textDecoration: 'none', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif" }}>
              Contactar
            </Link>
          </div>

          <Link href="/template-cerrajero/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ffd700', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Volver al Blog
          </Link>
        </div>
      </section>
    </article>
  );
}
