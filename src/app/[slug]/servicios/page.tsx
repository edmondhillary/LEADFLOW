import React from 'react';
import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { getSectorImages } from '@/lib/images';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { hasTemplate, loadTemplateSubpage } from '@/lib/template-registry';
import { getTemplateName } from '@/config/sectors';

export const revalidate = 3600;

/* ─── Inline SVG icons (no emojis) ─────────────────────────────────── */
const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const Phone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ─── Icon map for Lucide-style names from content gen ─────────────── */
function ServiceIcon({ name }: { name?: string }): React.ReactElement {
  const icons: Record<string, React.ReactElement> = {
    wrench: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    zap: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    scissors: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
        <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
    tooth: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 5.5C10.5 3.5 8 3 6 4S3 8 4 10c.5 1 1 2 1 4 0 3 1 6 2.5 6s2-2 2.5-3.5c.5 1.5 1 3.5 2.5 3.5s2.5-3 2.5-6c0-2 .5-3 1-4 1-2 .5-5.5-1.5-6.5s-4 .5-5.5 2.5z"/>
      </svg>
    ),
    utensils: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="3" y1="2" x2="3" y2="22"/><path d="M7 2v6a4 4 0 0 1-4 4"/>
        <path d="M21 2v20M21 2a5 5 0 0 0-5 5v6h5"/>
      </svg>
    ),
    dumbbell: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6.5 6.5h11M6.5 17.5h11M3 10h4v4H3zM17 10h4v4h-4z"/>
        <line x1="7" y1="12" x2="17" y2="12"/>
      </svg>
    ),
    car: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
        <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
    droplets: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </svg>
    ),
    shield: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    clock: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    tool: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    home: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  };
  const key = name?.toLowerCase() || '';
  return icons[key] || icons['wrench'];
}

export default async function ServiciosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const overrides = await getLeadOverrides(slug);
  const templateName = lead.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead.sector);
  const TemplateServicios = overrides ? await loadTemplateSubpage(templateName, 'servicios') : null;
  if (TemplateServicios) {
    return <TemplateServicios overrides={overrides || undefined} />;
  }

  const content = await WebsiteContent.findById(lead.contentRef);
  const servicios = content?.pages?.servicios;
  const design = content?.design || {};
  const images = getSectorImages(lead.sector);

  const primary = design.primaryColor || '#2563eb';
  const primaryDark = design.primaryDark || '#1d4ed8';

  const items: any[] = servicios?.items || [];
  const features: string[] = servicios?.features || [
    'Presupuesto sin compromiso',
    'Garantía en todos los trabajos',
    'Atención personalizada',
    'Disponibilidad 24h urgencias',
  ];

  return (
    <main>
      {/* ── Page hero ───────────────────────────────────────────────── */}
      <section
        className="relative h-64 sm:h-80 flex items-end overflow-hidden"
        aria-label="Cabecera servicios"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt={`Servicios de ${lead.sector} en ${lead.city}`}
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
            {lead.businessName}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {servicios?.title || `Servicios de ${lead.sector} en ${lead.city}`}
          </h1>
        </div>
      </section>

      {/* ── Intro + features ────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {servicios?.intro ||
                  `En ${lead.businessName} ofrecemos soluciones completas y profesionales en ${lead.city}. Cada trabajo se realiza con materiales de primera calidad y respetando los plazos acordados.`}
              </p>

              <ul className="space-y-3" role="list">
                {features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0" style={{ color: primary }}>
                      <CheckCircle />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats card */}
            <div
              className="rounded-2xl p-8 text-white text-center"
              style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)` }}
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: `+${(content?.stats?.clientsServed) || '200'}`, label: 'Clientes satisfechos' },
                  { value: `+${(content?.stats?.yearsExperience) || '10'}`, label: 'Años de experiencia' },
                  { value: `+${(content?.stats?.projectsDone) || '500'}`, label: 'Trabajos realizados' },
                  { value: '5', label: 'Estrellas valoración' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold mb-1">{s.value}</div>
                    <div className="text-white/75 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Stars row */}
              <div className="flex justify-center gap-1 mt-8 text-yellow-300">
                {[...Array(5)].map((_, i) => <Star key={i} />)}
              </div>
              <p className="text-white/80 text-sm mt-2">Basado en reseñas de Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services grid ───────────────────────────────────────────── */}
      {items.length > 0 && (
        <section className="bg-gray-50 py-14 sm:py-20" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="services-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Todo lo que necesitas
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Soluciones adaptadas a cada situación, con garantía y transparencia en el precio.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((service: any, i: number) => (
                <article
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-2"
                  style={{ ['--tw-ring-color' as any]: primary }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ backgroundColor: `${primary}15`, color: primary }}
                  >
                    <ServiceIcon name={service.icon} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{service.description}</p>

                  {service.price && (
                    <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: primary }}
                      >
                        {service.price}
                      </span>
                      <span
                        className="text-sm font-medium flex items-center gap-1"
                        style={{ color: primary }}
                      >
                        Solicitar <ArrowRight />
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Process steps ───────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20" aria-labelledby="process-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Cómo trabajamos
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Un proceso sencillo y transparente para que siempre sepas en qué punto estamos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Contacto', desc: 'Nos llamas o escribes y recogemos todos los detalles de tu proyecto.' },
              { step: '02', title: 'Visita', desc: 'Si es necesario, acudimos a valorar el trabajo sin coste alguno.' },
              { step: '03', title: 'Presupuesto', desc: 'Te enviamos un presupuesto cerrado y detallado. Sin sorpresas.' },
              { step: '04', title: 'Ejecución', desc: 'Realizamos el trabajo en el plazo acordado con total garantía.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: primary }}
                >
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)` }}
        aria-labelledby="cta-services-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="cta-services-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Presupuesto gratuito y sin compromiso. Respondemos en menos de 2 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${slug}/contacto`}
              className="inline-flex items-center justify-center gap-2 bg-white font-bold py-3 px-8 rounded-xl hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ color: primary }}
            >
              Pedir presupuesto
            </a>
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold py-3 px-8 rounded-xl hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone />
                Llamar ahora
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
