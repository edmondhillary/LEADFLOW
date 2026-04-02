import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { getSectorImages, unsplash } from '@/lib/images';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { hasTemplate, loadTemplateSubpage } from '@/lib/template-registry';
import { getTemplateName } from '@/config/sectors';

export const revalidate = 3600;

/* ─── Inline SVG icons (no emojis) ─────────────────────────────────── */
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

/* ─── Rotating blog Unsplash IDs ────────────────────────────────────── */
const BLOG_POOL: Record<string, string[]> = {
  electricista: [
    '1621905251189-08b1d44bfcc6',
    '1558618666-fcd25c85cd64',
    '1497366812353-ab38424fd44b',
    '1513828646384-d4b4a2723756',
  ],
  fontanero: [
    '1542013006-27d56b8cd421',
    '1504328345606-18bbc8c9d7d1',
    '1585771724684-38269d6639fd',
    '1584611740381-26426e7caaec',
  ],
  peluqueria: [
    '1522337913036-8408f5e11fa4',
    '1560066984-138dadb4c035',
    '1522337360826-074b8aca2a7c',
    '1595476589254-6bb04d76c7d2',
  ],
  dentista: [
    '1588776814546-1ffb600e1c89',
    '1606811841689-23dfddce3e95',
    '1559839734-2b71ea197ec2',
    '1579684385127-1ef15d508118',
  ],
  restaurante: [
    '1504674900247-0877df9cc836',
    '1414235077428-338989a2e8c0',
    '1517248135467-4c7edcad34c4',
    '1567620905732-2d1ec7ab7445',
  ],
  gimnasio: [
    '1517836357463-d25dfeac3438',
    '1571902943202-507ec2618e8f',
    '1534438327276-14e5300c3a48',
    '1476480862126-209bca49b096',
  ],
  taller: [
    '1492144534655-ae79c964c9d7',
    '1625047509249-de9a5e3f2bb0',
    '1486262322744-1aecb2edd945',
    '1558618047-f4c3e40af752',
  ],
};

const FALLBACK_POOL = [
  '1499750310107-5fef28a66643',
  '1497366216548-37526070297c',
  '1521791136064-7986c2920216',
  '1454165804606-c3d57bc86b40',
];

function getBlogImage(sector: string, index: number): string {
  const pool = BLOG_POOL[sector?.toLowerCase()] || FALLBACK_POOL;
  const id = pool[index % pool.length];
  return unsplash(id, 800, 450);
}

/* ─── Estimate read time ─────────────────────────────────────────────── */
function readTime(text: string): number {
  const words = (text || '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ─── Format a fake publish date (SEO-friendly) ──────────────────────── */
function fakeDate(index: number): string {
  const d = new Date();
  d.setDate(d.getDate() - index * 14); // every 2 weeks back
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const overrides = await getLeadOverrides(slug);
  const templateName = lead.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead.sector);
  const TemplateBlog = overrides ? await loadTemplateSubpage(templateName, 'blog') : null;
  if (TemplateBlog) {
    return <TemplateBlog overrides={overrides || undefined} />;
  }

  const content = await WebsiteContent.findById(lead.contentRef);
  const posts: any[] = content?.pages?.blog || [];
  const design = content?.design || {};
  const images = getSectorImages(lead.sector);

  const primary = design.primaryColor || '#2563eb';
  const primaryDark = design.primaryDark || '#1d4ed8';

  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  return (
    <main>
      {/* ── Page hero ───────────────────────────────────────────────── */}
      <section
        className="relative h-56 sm:h-72 flex items-end overflow-hidden"
        aria-label="Cabecera blog"
      >
        <div className="absolute inset-0">
          <img
            src={images.blog}
            alt={`Blog de ${lead.sector} — ${lead.businessName}`}
            className="w-full h-full object-cover"
            width="1920"
            height="350"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${primary}ee 0%, ${primary}88 40%, transparent 100%)` }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
          <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-2">
            Consejos y guías
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Blog de {lead.sector} en {lead.city}
          </h1>
        </div>
      </section>

      {posts.length === 0 ? (
        /* ── Empty state ──────────────────────────────────────────── */
        <section className="bg-white py-24 text-center">
          <div className="max-w-md mx-auto px-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${primary}15`, color: primary }}
            >
              <BookOpenIcon />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Próximamente
            </h2>
            <p className="text-gray-500 mb-8">
              Estamos preparando artículos con consejos sobre {lead.sector} en {lead.city}. Vuelve pronto.
            </p>
            <a
              href={`/${slug}/contacto`}
              className="inline-flex items-center gap-2 text-white font-bold py-3 px-8 rounded-xl hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: primary }}
            >
              Contactar ahora
            </a>
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ─ Featured article (first post, large card) ──────────── */}
            {featuredPost && (
              <article
                className="bg-white rounded-2xl overflow-hidden shadow-sm mb-10 lg:grid lg:grid-cols-2"
                aria-label={`Artículo destacado: ${featuredPost.title}`}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 lg:h-auto overflow-hidden">
                  <img
                    src={getBlogImage(lead.sector, 0)}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    width="800"
                    height="450"
                  />
                  <div
                    className="absolute top-4 left-4 text-xs font-bold text-white px-3 py-1.5 rounded-full uppercase tracking-wide"
                    style={{ backgroundColor: primary }}
                  >
                    Destacado
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon />
                      {fakeDate(0)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ClockIcon />
                      {readTime(featuredPost.content || featuredPost.excerpt)} min lectura
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                    {featuredPost.excerpt}
                  </p>

                  {/* Keywords */}
                  {featuredPost.keywords && featuredPost.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.keywords.slice(0, 4).map((kw: string, j: number) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ backgroundColor: `${primary}10`, color: primary }}
                        >
                          <TagIcon /> {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Article body (prose) */}
                  {featuredPost.content && (
                    <div
                      className="prose prose-sm prose-gray max-w-none text-gray-600 border-t border-gray-100 pt-6"
                      dangerouslySetInnerHTML={{ __html: featuredPost.content }}
                    />
                  )}
                </div>
              </article>
            )}

            {/* ─ Rest of posts grid ─────────────────────────────────── */}
            {restPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restPosts.map((post: any, i: number) => (
                  <article
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col hover:shadow-md"
                    aria-label={`Artículo: ${post.title}`}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getBlogImage(lead.sector, i + 1)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        width="800"
                        height="450"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1.5">
                          <CalendarIcon />
                          {fakeDate(i + 1)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ClockIcon />
                          {readTime(post.content || post.excerpt)} min
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Keywords */}
                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.keywords.slice(0, 3).map((kw: string, j: number) => (
                            <span
                              key={j}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${primary}10`, color: primary }}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Article body */}
                      {post.content && (
                        <div
                          className="prose prose-sm prose-gray max-w-none text-gray-500 border-t border-gray-100 pt-4 text-sm"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      )}

                      {/* Read more indicator */}
                      <div
                        className="flex items-center gap-1.5 text-sm font-medium mt-auto pt-4"
                        style={{ color: primary }}
                        aria-hidden="true"
                      >
                        Leer artículo <ArrowRight />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ─ CTA to contact ────────────────────────────────────── */}
            <div
              className="mt-14 rounded-2xl p-8 sm:p-12 text-center"
              style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)` }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                ¿Tienes alguna pregunta?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Nuestro equipo está disponible para resolver tus dudas y hacer un presupuesto sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`/${slug}/contacto`}
                  className="inline-flex items-center justify-center gap-2 bg-white font-bold py-3 px-8 rounded-xl hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ color: primary }}
                >
                  Solicitar presupuesto
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold py-3 px-8 rounded-xl hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <PhoneIcon />
                    Llamar ahora
                  </a>
                )}
              </div>
            </div>

          </div>
        </section>
      )}
    </main>
  );
}
