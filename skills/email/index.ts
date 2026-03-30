/**
 * SKILL 4: LeadFlow Email
 *
 * Envía el email de preview de la web al lead usando Brevo.
 * El email incluye:
 * - Preview visual de la web generada
 * - Timer de 48h de urgencia
 * - CTA para ver la web completa
 * - Pixel de tracking invisible para detectar apertura
 *
 * Uso: npx tsx skills/email/index.ts --leadId <mongoId>
 */

import { connectDB, Lead, WebsiteContent } from '../../src/lib/mongodb';

const BREVO_API_URL = 'https://api.brevo.com/v3';

interface BrevoEmailPayload {
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  subject: string;
  htmlContent: string;
  tags?: string[];
}

function getEmailCopy(country: string) {
  if (country === 'AR' || country === 'UY') {
    return {
      subject: (businessName: string) => `${businessName} — Tu web está lista para ver 🌐`,
      greeting: (name: string) => `¡Hola! Buscamos ${name} en Google Maps`,
      noWebsite: 'y vimos que todavía no tenés página web.',
      created: 'Te creamos una demo profesional completamente gratis para que la veas:',
      viewBtn: 'Ver mi web gratis →',
      urgency: '⏰ Esta demo estará disponible solo por 48 horas',
      included: 'Tu web incluye:',
      features: ['Diseño profesional adaptado a tu sector', 'Tus servicios y precios', 'Página de contacto con mapa', 'Blog para posicionarte en Google'],
      price: 'Si te gusta, podés tenerla por solo $25/mes. Sin contratos, sin sorpresas.',
      reply: '¿Tenés preguntas? Respondé este email o escribime directamente.',
      signature: 'Eduardo González\nLeadFlow — Webs para negocios locales',
    };
  }

  return {
    subject: (businessName: string) => `${businessName} — Tu web está lista para ver 🌐`,
    greeting: (name: string) => `¡Hola! Buscamos ${name} en Google Maps`,
    noWebsite: 'y vimos que todavía no tienes página web.',
    created: 'Te hemos creado una demo profesional completamente gratis para que la veas:',
    viewBtn: 'Ver mi web gratis →',
    urgency: '⏰ Esta demo estará disponible solo durante 48 horas',
    included: 'Tu web incluye:',
    features: ['Diseño profesional adaptado a tu sector', 'Tus servicios y precios', 'Página de contacto con mapa', 'Blog para posicionarte en Google'],
    price: 'Si te gusta, puedes tenerla por solo 25€/mes. Sin permanencia, sin sorpresas.',
    reply: '¿Tienes preguntas? Responde este email o escríbeme directamente.',
    signature: 'Eduardo González\nLeadFlow — Webs para negocios locales',
  };
}

function generateEmailHtml(options: {
  businessName: string;
  webUrl: string;
  trackingPixelUrl: string;
  heroTitle: string;
  heroCTA: string;
  services: string[];
  primaryColor: string;
  country: string;
  expiresAt: Date;
}): string {
  const {
    businessName, webUrl, trackingPixelUrl,
    heroTitle, heroCTA, services,
    primaryColor, country, expiresAt,
  } = options;

  const copy = getEmailCopy(country);
  const expiresFormatted = expiresAt.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${copy.subject(businessName)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">

<!-- Pixel de tracking -->
<img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" alt="">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">

        <!-- HEADER -->
        <tr>
          <td style="background:${primaryColor};padding:32px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;letter-spacing:1px;text-transform:uppercase;">LeadFlow</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">Tu web está lista</h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;">

            <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
              ${copy.greeting(businessName)}
            </p>
            <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
              ${copy.noWebsite}
            </p>
            <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
              ${copy.created}
            </p>

            <!-- PREVIEW BOX -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,${primaryColor}15,${primaryColor}05);border:2px solid ${primaryColor}30;border-radius:12px;overflow:hidden;margin-bottom:24px;">
              <tr>
                <td style="padding:32px;text-align:center;">
                  <div style="background:${primaryColor};display:inline-block;padding:6px 16px;border-radius:20px;margin-bottom:16px;">
                    <span style="color:white;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">DEMO GRATUITA</span>
                  </div>
                  <h2 style="margin:0 0 8px;color:#1f2937;font-size:28px;font-weight:800;">${businessName}</h2>
                  <p style="margin:0 0 24px;color:#6b7280;font-size:15px;">${heroTitle}</p>
                  <a href="${webUrl}"
                     style="display:inline-block;background:${primaryColor};color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:16px;">
                    ${copy.viewBtn}
                  </a>
                </td>
              </tr>
            </table>

            <!-- URGENCY -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:4px;margin-bottom:24px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0;color:#92400e;font-size:14px;font-weight:600;">${copy.urgency}</p>
                  <p style="margin:4px 0 0;color:#b45309;font-size:13px;">Expira el ${expiresFormatted}</p>
                </td>
              </tr>
            </table>

            <!-- FEATURES -->
            <p style="margin:0 0 16px;color:#1f2937;font-size:15px;font-weight:600;">${copy.included}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              ${services.slice(0, 4).map(feature => `
              <tr>
                <td style="padding:6px 0;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:12px;color:${primaryColor};font-size:18px;">✓</td>
                      <td style="color:#374151;font-size:14px;">${feature}</td>
                    </tr>
                  </table>
                </td>
              </tr>`).join('')}
            </table>

            <!-- PRICE -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;margin-bottom:32px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${copy.price}</p>
                </td>
              </tr>
            </table>

            <!-- CTA FINAL -->
            <div style="text-align:center;margin-bottom:32px;">
              <a href="${webUrl}"
                 style="display:inline-block;background:${primaryColor};color:#ffffff;text-decoration:none;padding:16px 48px;border-radius:8px;font-weight:700;font-size:18px;">
                Ver mi web →
              </a>
            </div>

            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:24px;">
              ${copy.reply}
            </p>

            <p style="margin:0;color:#374151;font-size:14px;white-space:pre-line;">${copy.signature}</p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Este mensaje fue enviado porque tu negocio no tiene página web.<br>
              Si no deseas recibir más mensajes, <a href="mailto:edu14937@gmail.com?subject=Baja" style="color:#6b7280;">escríbenos aquí</a>.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

export async function sendPreviewEmail(options: {
  leadId: string;
}): Promise<boolean> {
  const { leadId } = options;

  await connectDB();

  const lead = await Lead.findById(leadId);
  if (!lead) {
    console.error(`❌ Lead no encontrado: ${leadId}`);
    return false;
  }

  if (!lead.email) {
    console.error(`❌ Lead sin email: ${lead.businessName}`);
    return false;
  }

  const content = await WebsiteContent.findOne({ leadId });
  if (!content) {
    console.error(`❌ Sin contenido generado para: ${lead.businessName}`);
    return false;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error('Falta BREVO_API_KEY');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.vercel.app';
  const webUrl = `${baseUrl}/${lead.slug}`;
  const trackingPixelUrl = `${baseUrl}/api/track/${leadId}`;

  // Fecha de expiración (48h desde ahora)
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  const copy = getEmailCopy(lead.country);
  const services = content.pages?.home?.featuredServices?.map((s: any) => s.name) || copy.features;

  const htmlContent = generateEmailHtml({
    businessName: lead.businessName,
    webUrl,
    trackingPixelUrl,
    heroTitle: content.pages?.home?.heroTitle || `${lead.sector} profesional en ${lead.city}`,
    heroCTA: content.pages?.home?.heroCTA || 'Ver mi web',
    services: [...services, ...copy.features].slice(0, 4),
    primaryColor: content.design?.primaryColor || '#2563eb',
    country: lead.country,
    expiresAt,
  });

  const payload: BrevoEmailPayload = {
    sender: {
      name: process.env.BREVO_SENDER_NAME || 'Eduardo — LeadFlow',
      email: process.env.BREVO_SENDER_EMAIL || 'edu14937@gmail.com',
    },
    to: [{ email: lead.email, name: lead.businessName }],
    subject: copy.subject(lead.businessName),
    htmlContent,
    tags: ['leadflow', 'preview', lead.country.toLowerCase(), lead.sector],
  };

  console.log(`📧 Enviando email a: ${lead.email}`);
  console.log(`   Asunto: ${payload.subject}`);

  const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Error Brevo:', error);
    return false;
  }

  // Actualizar lead
  await Lead.findByIdAndUpdate(leadId, {
    status: 'email_sent',
    emailSent: true,
    emailSentAt: new Date(),
  });

  console.log(`✅ Email enviado correctamente a ${lead.email}`);
  return true;
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const leadId = getArg('leadId');
  if (!leadId) {
    console.error('❌ Falta --leadId <mongoId>');
    process.exit(1);
  }

  sendPreviewEmail({ leadId })
    .then(ok => {
      console.log(ok ? '\n🎉 Email enviado.' : '\n❌ Email fallido.');
      process.exit(ok ? 0 : 1);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
