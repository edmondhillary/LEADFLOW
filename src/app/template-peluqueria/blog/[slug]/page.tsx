import Link from 'next/link';
import { notFound } from 'next/navigation';
import { images, business } from '../../data';

const placeholderPosts = [
  {
    slug: 'tendencias-corte-2026',
    title: 'Las tendencias de corte que definen 2026.',
    category: 'Tendencias',
    readTime: '6 min',
    excerpt: 'Un recorrido por las siluetas, texturas y tecnicas que los mejores estilistas de Paris y Nueva York estan llevando a sus colecciones esta temporada.',
    image: 'salonInterior',
  },
  {
    slug: 'cuidado-cabello-teñido',
    title: 'Como mantener el color vibrante semana tras semana.',
    category: 'Cuidado Capilar',
    readTime: '5 min',
    excerpt: 'Productos, rutinas y habitos que alargan la vida de tu coloracion y mantienen el brillo editorial.',
    image: 'hairColor',
  },
  {
    slug: 'balayage-vs-highlights',
    title: 'Balayage vs Highlights: cual es el adecuado para ti.',
    category: 'Colorimetria',
    readTime: '7 min',
    excerpt: 'Analizamos las diferencias tecnicas, los resultados visuales y como elegir la mejor opcion segun tu tono natural.',
    image: 'haircut',
  },
];

export function generateStaticParams() {
  return placeholderPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = placeholderPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const heroImg = (images as Record<string, string>)[post.image] ?? null;

  return (
    <article>
      <section style={{ backgroundColor: '#f9f9f9', padding: '72px 0 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', marginBottom: '28px', fontFamily: "'Inter', sans-serif" }}>
            <Link href="/template-peluqueria" style={{ color: '#785a1a', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <Link href="/template-peluqueria/blog" style={{ color: '#785a1a', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#9ca3af' }}>{post.title.slice(0, 40)}</span>
          </nav>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px', fontFamily: "'Inter', sans-serif" }}>
            {post.category}
            <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: '16px' }}>{post.readTime} de lectura</span>
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#2d3435', fontFamily: "'Noto Serif', serif", fontStyle: 'italic', marginBottom: '24px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '19px', lineHeight: 1.7, color: '#5a6061', fontFamily: "'Inter', sans-serif", marginBottom: '48px' }}>
            {post.excerpt}
          </p>
        </div>
        {heroImg && (
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <img src={heroImg} alt={post.title} style={{ width: '100%', height: '460px', objectFit: 'cover' }} />
          </div>
        )}
      </section>

      <section style={{ backgroundColor: '#ffffff', padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          {[
            post.excerpt,
            'Comprender bien este tema es fundamental para tomar decisiones informadas. La experiencia practica demuestra que los mejores resultados provienen de un enfoque metodico y profesional.',
            'Los detalles marcan la diferencia. La calidad de los materiales y la precision en la ejecucion son factores que distinguen a los verdaderos profesionales del sector.',
            'La comunicacion con el cliente es igualmente clave. Explicar el proceso, establecer expectativas claras y cumplir los plazos genera confianza duradera.',
            `En ${business.name} llevamos anos aplicando estas mejores practicas con resultados excelentes. Si deseas una consulta personalizada, contactanos hoy mismo.`,
          ].map((para, i) => (
            <p key={i} style={{ fontSize: '17px', lineHeight: 1.85, color: '#2d3435', fontFamily: "'Inter', sans-serif", marginBottom: '28px', opacity: i === 0 ? 0.95 : 0.82 }}>
              {para}
            </p>
          ))}

          <div style={{ borderLeft: '3px solid #785a1a', margin: '48px 0', backgroundColor: '#fdf8f2', padding: '20px 20px 20px 24px', borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#2d3435', fontFamily: "'Noto Serif', serif", fontStyle: 'italic', marginBottom: '8px' }}>Reserva tu cita</p>
            <p style={{ fontSize: '13px', color: '#5a6061', fontFamily: "'Inter', sans-serif", marginBottom: '16px' }}>El equipo de {business.name} esta listo para ayudarte.</p>
            <Link href="/template-peluqueria/contacto" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#785a1a', color: '#fff8f1', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif" }}>
              Contactar
            </Link>
          </div>

          <Link href="/template-peluqueria/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#785a1a', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Volver al Blog
          </Link>
        </div>
      </section>
    </article>
  );
}
