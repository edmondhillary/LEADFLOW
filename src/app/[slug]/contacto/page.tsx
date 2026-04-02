import { connectDB, Lead, WebsiteContent } from '@/lib/mongodb';
import { notFound } from 'next/navigation';
import { getSectorImages } from '@/lib/images';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { hasTemplate, loadTemplateSubpage } from '@/lib/template-registry';
import { getTemplateName } from '@/config/sectors';

export const revalidate = 3600;

/* ─── Inline SVG icons (no emojis) ─────────────────────────────────── */
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

/* ─── WhatsApp SVG logo ─────────────────────────────────────────────── */
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export default async function ContactoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();

  const lead = await Lead.findOne({ slug });
  if (!lead) notFound();

  const overrides = await getLeadOverrides(slug);
  const templateName = lead.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead.sector);
  const TemplateContacto = overrides ? await loadTemplateSubpage(templateName, 'contacto') : null;
  if (TemplateContacto) {
    return <TemplateContacto overrides={overrides || undefined} />;
  }

  const content = await WebsiteContent.findById(lead.contentRef);
  const contacto = content?.pages?.contacto;
  const design = content?.design || {};
  const images = getSectorImages(lead.sector);

  const primary = design.primaryColor || '#2563eb';
  const primaryDark = design.primaryDark || '#1d4ed8';

  const schedule = content?.schedule || {
    weekdays: 'Lunes a Viernes: 8:00 - 20:00',
    saturday: 'Sábados: 9:00 - 14:00',
    emergency: 'Urgencias: 24 horas',
  };

  const whatsappNumber = lead.phone?.replace(/\D/g, '') || '';
  const whatsappMsg = encodeURIComponent(
    `Hola, me gustaría solicitar información sobre sus servicios en ${lead.city}.`
  );

  return (
    <main>
      {/* ── Page hero ───────────────────────────────────────────────── */}
      <section
        className="relative h-56 sm:h-72 flex items-end overflow-hidden"
        aria-label="Cabecera contacto"
      >
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt={`Contacta con ${lead.businessName}`}
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
            Estamos a tu disposición
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {contacto?.title || 'Contacta con nosotros'}
          </h1>
        </div>
      </section>

      {/* ── Main contact grid ───────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ─ Contact form ───────────────────────────────────────── */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Envíanos un mensaje
              </h2>
              <p className="text-gray-500 mb-8">
                {contacto?.subtitle ||
                  `Cuéntanos qué necesitas y te respondemos en menos de 2 horas.`}
              </p>

              {/* NOTE: This form is static (demo). Real implementation needs API route. */}
              <form
                className="space-y-5"
                aria-label="Formulario de contacto"
                onSubmit={undefined}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ ['--tw-ring-color' as any]: primary }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Teléfono
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      placeholder="6xx xxx xxx"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tipo de servicio
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 appearance-none"
                  >
                    <option value="">Selecciona un servicio...</option>
                    {(content?.pages?.servicios?.items || []).map((s: any, i: number) => (
                      <option key={i} value={s.name}>{s.name}</option>
                    ))}
                    {(!content?.pages?.servicios?.items || content.pages.servicios.items.length === 0) && (
                      <option value="otro">Otro</option>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Describe brevemente lo que necesitas..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </div>

                {/* Trust note */}
                <p className="text-xs text-gray-400 flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: primary }}>
                    <CheckCircle />
                  </span>
                  Tus datos están seguros. No los compartimos con terceros ni enviamos spam.
                </p>

                <button
                  type="submit"
                  className="w-full text-white font-bold py-3.5 rounded-xl hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: primary, ['--tw-ring-color' as any]: primary }}
                >
                  Enviar mensaje
                </button>
              </form>
            </div>

            {/* ─ Contact info sidebar ───────────────────────────────── */}
            <div className="space-y-8">

              {/* Direct channels */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contacto directo
                </h2>
                <div className="space-y-4">
                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ ['--tw-ring-color' as any]: primary }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${primary}15`, color: primary }}
                      >
                        <PhoneIcon />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Teléfono</div>
                        <div className="font-semibold text-gray-900">{lead.phone}</div>
                      </div>
                    </a>
                  )}

                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${primary}15`, color: primary }}
                      >
                        <MailIcon />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Email</div>
                        <div className="font-semibold text-gray-900 break-all">{lead.email}</div>
                      </div>
                    </a>
                  )}

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${primary}15`, color: primary }}
                    >
                      <MapPinIcon />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Ubicación</div>
                      <div className="font-semibold text-gray-900">
                        {lead.address || lead.city}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: `${primary}08` }}
              >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span style={{ color: primary }}><ClockIcon /></span>
                  Horario de atención
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {schedule.weekdays && (
                    <li className="flex justify-between">
                      <span className="text-gray-500">Lun – Vie</span>
                      <span className="font-medium text-gray-800">
                        {schedule.weekdays.split(':')[1]?.trim() || '8:00 – 20:00'}
                      </span>
                    </li>
                  )}
                  {schedule.saturday && (
                    <li className="flex justify-between">
                      <span className="text-gray-500">Sábado</span>
                      <span className="font-medium text-gray-800">
                        {schedule.saturday.split(':')[1]?.trim() || '9:00 – 14:00'}
                      </span>
                    </li>
                  )}
                  <li className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span className="text-gray-500">Urgencias</span>
                    <span className="font-medium" style={{ color: primary }}>24h</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp CTA */}
              {lead.phone && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                  aria-label={`Contactar por WhatsApp con ${lead.businessName}`}
                >
                  <WhatsAppIcon />
                  Escribir por WhatsApp
                </a>
              )}

              {/* Response time guarantee */}
              <div className="flex items-start gap-3 text-sm text-gray-500">
                <span className="flex-shrink-0 mt-0.5" style={{ color: primary }}>
                  <MessageCircleIcon />
                </span>
                Respondemos en menos de 2 horas en horario laboral. Para urgencias, disponibilidad 24h.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Maps embed ───────────────────────────────────────── */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <section aria-label="Ubicación en el mapa" className="h-72 sm:h-96">
          <iframe
            title={`Ubicación de ${lead.businessName} en ${lead.city}`}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(contacto?.mapQuery || `${lead.businessName} ${lead.city}`)}&language=es`}
          />
        </section>
      )}

      {/* Fallback: map image if no API key */}
      {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
        <section aria-label="Zona de servicio" className="bg-gray-100 py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `${primary}15`, color: primary }}
            >
              <MapPinIcon />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Servicio en {lead.city} y alrededores
            </h3>
            <p className="text-gray-500 text-sm">
              Cubrimos toda la zona de {lead.city}. Consulta si llegamos a tu ubicación.
            </p>
          </div>
        </section>
      )}

      {/* ── Trust strip ─────────────────────────────────────────────── */}
      <section
        className="py-10 border-t border-gray-100"
        style={{ backgroundColor: `${primary}06` }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <PhoneIcon />, text: 'Respuesta en 2h' },
              { icon: <CheckCircle />,  text: 'Presupuesto gratis' },
              { icon: <ClockIcon />,  text: 'Urgencias 24h' },
              { icon: <MapPinIcon />, text: lead.city },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span style={{ color: primary }}>{item.icon}</span>
                <span className="text-sm text-gray-600 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
