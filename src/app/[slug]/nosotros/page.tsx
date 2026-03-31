import React from 'react';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { getSectorImages } from '@/lib/images';

export const revalidate = 3600;

/* ─── Inline SVG icons (no emojis) ─────────────────────────────────── */
const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const Award = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const Users = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Heart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Target = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const Leaf = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 8C8 10 5.9 16.17 3.82 22M9.04 9.36A9 9 0 0 1 21 3c0 4.97-4 9-9 9A9 9 0 0 1 3 12c0-4.97 4-9 9-9"/>
  </svg>
);

const valueIcons: Record<string, React.ReactElement> = {
  calidad: <Award />,
  equipo: <Users />,
  compromiso: <Heart />,
  precision: <Target />,
  sostenibilidad: <Leaf />,
};

function ValueIcon({ title }: { title: string }) {
  const key = title?.toLowerCase().split(' ')[0] || '';
  return valueIcons[key] || <Award />;
}

const Phone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

export default async function NosotrosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const content = await WebsiteContent.findById(lead.contentRef);
  const nosotros = content?.pages?.nosotros;
  const design = content?.design || {};
  const images = getSectorImages(lead.sector);

  const primary = design.primaryColor || '#2563eb';
  const primaryDark = design.primaryDark || '#1d4ed8';

  const values: any[] = nosotros?.values || [
    { title: 'Calidad', description: 'Utilizamos los mejores materiales y técnicas para asegurar resultados duraderos.' },
    { title: 'Compromiso', description: 'Cumplimos plazos y presupuestos sin sorpresas. Nuestra palabra vale.' },
    { title: 'Equipo', description: 'Profesionales certificados con formación continua y experiencia contrastada.' },
    { title: 'Precisión', description: 'Cada detalle importa. Revisamos el trabajo hasta que todo queda perfecto.' },
  ];

  return (
    <main>
      {/* ── Page hero ───────────────────────────────────────────────── */}
      <section
        className="relative h-64 sm:h-80 flex items-end overflow-hidden"
        aria-label="Cabecera sobre nosotros"
      >
        <div className="absolute inset-0">
          <img
            src={images.about}
            alt={`Equipo de ${lead.businessName} en ${lead.city}`}
            className="w-full h-full object-cover"
            width="1920"
            height="400"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${primary}ee 0%, ${primary}88 40%, transparent 100%)` }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
          <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-2">
            Conoce a nuestro equipo
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {nosotros?.title || `Sobre ${lead.businessName}`}
          </h1>
        </div>
      </section>

      {/* ── Story section ───────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Nuestra historia
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {nosotros?.story ||
                    `${lead.businessName} nació de la pasión por hacer bien las cosas. Con más de ${nosotros?.yearsExperience || '10'} años sirviendo a los clientes de ${lead.city} y la zona, hemos construido una reputación basada en la confianza y los resultados.`}
                </p>
                {nosotros?.mission && (
                  <p>{nosotros.mission}</p>
                )}
                {!nosotros?.mission && (
                  <p>
                    Cada proyecto, grande o pequeño, lo tratamos con el mismo nivel de dedicación y profesionalidad. Nuestro objetivo es que quedes 100% satisfecho con el resultado.
                  </p>
                )}
              </div>

              {/* Highlights */}
              <ul className="mt-8 space-y-3" role="list">
                {[
                  `Más de ${nosotros?.yearsExperience || '10'} años de experiencia en ${lead.city}`,
                  'Presupuesto cerrado, sin sorpresas',
                  'Garantía en todos los trabajos',
                  'Disponibles para emergencias',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span style={{ color: primary }} className="flex-shrink-0">
                      <CheckCircle />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image with floating badge */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={images.about}
                  alt={`Instalaciones de ${lead.businessName}`}
                  className="w-full h-full object-cover"
                  width="800"
                  height="600"
                />
              </div>

              {/* Floating experience badge */}
              <div
                className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 text-white rounded-2xl p-5 shadow-xl"
                style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)` }}
              >
                <div className="text-4xl font-bold leading-none">
                  +{nosotros?.yearsExperience || '10'}
                </div>
                <div className="text-white/80 text-sm mt-1">años de<br/>experiencia</div>
              </div>

              {/* Google rating badge */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-white rounded-xl p-3 shadow-lg flex items-center gap-2">
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} />)}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">5.0</div>
                  <div className="text-xs text-gray-400">Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16"
        style={{ backgroundColor: `${primary}08` }}
        aria-label="Estadísticas"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: `+${content?.stats?.clientsServed || '200'}`, label: 'Clientes satisfechos' },
              { value: `+${nosotros?.yearsExperience || '10'}`, label: 'Años de experiencia' },
              { value: `+${content?.stats?.projectsDone || '500'}`, label: 'Trabajos realizados' },
              { value: '100%', label: 'Satisfacción garantizada' },
            ].map((s, i) => (
              <div key={i}>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: primary }}
                >
                  {s.value}
                </div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values grid ─────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20" aria-labelledby="values-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="values-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Nuestros valores
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Los principios que guían cada decisión y cada trabajo que realizamos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any, i: number) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${primary}15`, color: primary }}
                >
                  <ValueIcon title={v.title} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team section (if team data exists) ──────────────────────── */}
      {nosotros?.team && nosotros.team.length > 0 && (
        <section className="bg-gray-50 py-14 sm:py-20" aria-labelledby="team-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="team-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Nuestro equipo
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Profesionales apasionados, comprometidos con la excelencia en cada proyecto.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {nosotros.team.map((member: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  {/* Avatar placeholder */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold"
                    style={{ backgroundColor: primary }}
                  >
                    {member.name?.charAt(0) || 'P'}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: primary }}>{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Certificates / Certifications ───────────────────────────── */}
      {nosotros?.certifications && nosotros.certifications.length > 0 && (
        <section className="bg-white py-12" aria-labelledby="certs-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="certs-heading" className="text-xl font-bold text-gray-900 mb-6 text-center">
              Certificaciones y seguros
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {nosotros.certifications.map((cert: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600"
                >
                  <span style={{ color: primary }}>
                    <CheckCircle />
                  </span>
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA band ────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)` }}
        aria-labelledby="nosotros-cta-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="nosotros-cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Trabajemos juntos
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Cuéntanos tu proyecto y te damos solución. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${slug}/contacto`}
              className="inline-flex items-center justify-center gap-2 bg-white font-bold py-3 px-8 rounded-xl hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ color: primary }}
            >
              Contactar ahora
            </a>
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold py-3 px-8 rounded-xl hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone />
                {lead.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
