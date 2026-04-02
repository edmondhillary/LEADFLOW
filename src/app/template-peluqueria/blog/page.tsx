import Link from 'next/link';
import { business, images } from '../data';

const placeholderPosts = [
  {
    slug: 'tendencias-corte-2026',
    title: 'Las tendencias de corte que definen 2026.',
    category: 'Tendencias',
    readTime: '6 min',
    excerpt: 'Un recorrido por las siluetas, texturas y tecnicas que los mejores estilistas de Paris y Nueva York estan llevando a sus colecciones esta temporada.',
    featured: true,
  },
  {
    slug: 'cuidado-cabello-teñido',
    title: 'Como mantener el color vibrante semana tras semana.',
    category: 'Cuidado Capilar',
    readTime: '5 min',
    excerpt: 'Productos, rutinas y habitos que alargan la vida de tu coloracion y mantienen el brillo editorial.',
    featured: false,
  },
  {
    slug: 'balayage-vs-highlights',
    title: 'Balayage vs Highlights: cual es el adecuado para ti.',
    category: 'Colorimetria',
    readTime: '7 min',
    excerpt: 'Analizamos las diferencias tecnicas, los resultados visuales y como elegir la mejor opcion segun tu tono natural.',
    featured: false,
  },
];

export default function BlogPage(props: any = {}) {
  const ov = props.overrides as any;
  const baseHref = ov?.baseHref || '/template-peluqueria';
  const featured = placeholderPosts.find(p => p.featured);
  const rest = placeholderPosts.filter(p => !p.featured);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <section style={{ backgroundColor: '#f9f9f9', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>
            Journal
          </p>
          <h1 style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#2d3435', marginBottom: '16px', letterSpacing: '-0.01em' }}>
            El Atelier en Palabras
          </h1>
          <p style={{ fontSize: '16px', color: '#5a6061', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Inspiracion, tecnica y tendencias desde el corazon de {business.name}.
          </p>
        </div>
      </section>

      {featured && (
        <section style={{ backgroundColor: '#ffffff', padding: '64px 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Link href={`/template-peluqueria/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
                <div>
                  <img src={images.salonInterior} alt={featured.title} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px' }}>
                    Articulo Destacado — {featured.category}
                  </p>
                  <h2 style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '28px', fontWeight: 400, color: '#2d3435', marginBottom: '16px', lineHeight: 1.3 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: '#5a6061', lineHeight: 1.7, marginBottom: '24px' }}>
                    {featured.excerpt}
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid #785a1a', paddingBottom: '2px' }}>
                    Leer articulo
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: '#f9f9f9', padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {rest.map(post => (
              <Link key={post.slug} href={`/template-peluqueria/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article>
                  <img src={images.haircut} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover', marginBottom: '20px' }} />
                  <p style={{ fontSize: '10px', fontWeight: 700, color: '#785a1a', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>
                    {post.category} · {post.readTime}
                  </p>
                  <h3 style={{ fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontSize: '20px', fontWeight: 400, color: '#2d3435', marginBottom: '10px', lineHeight: 1.3 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#5a6061', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
