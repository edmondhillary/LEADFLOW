import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLeadOverrides } from '@/lib/lead-template-data';
import { hasTemplate, loadTemplate } from '@/lib/template-registry';
import { connectDB, Lead } from '@/lib/mongodb';
import { getTemplateName } from '@/config/sectors';

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const lead = await Lead.findOne({ slug }).lean() as any;
  if (!lead) return {};
  return {
    title: lead.seoTitle || `${lead.businessName} | ${lead.sector} en ${lead.city}`,
    description: lead.seoDesc || `${lead.businessName} — servicios de ${lead.sector} en ${lead.city}.`,
  };
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;

  // Fetch centralizado: una sola llamada a MongoDB
  const overrides = await getLeadOverrides(slug);
  if (!overrides) notFound();

  // Buscar qué template usar
  await connectDB();
  const lead = await Lead.findOne({ slug }).lean() as any;
  const templateName = lead?.templateUsed && hasTemplate(lead.templateUsed)
    ? lead.templateUsed
    : getTemplateName(lead?.sector);

  const TemplateComponent = await loadTemplate(templateName);

  if (TemplateComponent) {
    return <TemplateComponent overrides={overrides} />;
  }

  notFound();
}
