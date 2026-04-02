import type { ComponentType, ReactNode } from 'react';
import type { LeadOverrides } from './lead-template-data';

type TemplateProps = { overrides?: LeadOverrides };
type PageLoader = () => Promise<{ default: ComponentType<TemplateProps> }>;
type LayoutLoader = () => Promise<{ default: ComponentType<{ children: ReactNode; overrides?: LeadOverrides }> }>;
type BlogPostLoader = () => Promise<{ default: ComponentType<{ params: Promise<{ slug: string }> }> }>;

const PAGES: Record<string, PageLoader> = {
  'template-academia': () => import('@/app/template-academia/page'),
  'template-aire': () => import('@/app/template-aire/page'),
  'template-arquitectura': () => import('@/app/template-arquitectura/page'),
  'template-barberia': () => import('@/app/template-barberia/page'),
  'template-canina': () => import('@/app/template-canina/page'),
  'template-cerrajero': () => import('@/app/template-cerrajero/page'),
  'template-dentista': () => import('@/app/template-dentista/page'),
  'template-electricista': () => import('@/app/template-electricista/page'),
  'template-estetica': () => import('@/app/template-estetica/page'),
  'template-fontaneria': () => import('@/app/template-fontaneria/page'),
  'template-gimnasio': () => import('@/app/template-gimnasio/page'),
  'template-jardineria': () => import('@/app/template-jardineria/page'),
  'template-limpieza': () => import('@/app/template-limpieza/page'),
  'template-mecanico': () => import('@/app/template-mecanico/page'),
  'template-mudanzas': () => import('@/app/template-mudanzas/page'),
  'template-peluqueria': () => import('@/app/template-peluqueria/page'),
  'template-pilates': () => import('@/app/template-pilates/page'),
  'template-pintor': () => import('@/app/template-pintor/page'),
  'template-psicologo': () => import('@/app/template-psicologo/page'),
  'template-restaurante': () => import('@/app/template-restaurante/page'),
  'template-veterinario': () => import('@/app/template-veterinario/page'),
  'template-yoga': () => import('@/app/template-yoga/page'),
};

const LAYOUTS: Record<string, LayoutLoader> = {
  'template-academia': () => import('@/app/template-academia/layout'),
  'template-aire': () => import('@/app/template-aire/layout'),
  'template-arquitectura': () => import('@/app/template-arquitectura/layout'),
  'template-barberia': () => import('@/app/template-barberia/layout'),
  'template-canina': () => import('@/app/template-canina/layout'),
  'template-cerrajero': () => import('@/app/template-cerrajero/layout'),
  'template-dentista': () => import('@/app/template-dentista/layout'),
  'template-electricista': () => import('@/app/template-electricista/layout'),
  'template-estetica': () => import('@/app/template-estetica/layout'),
  'template-fontaneria': () => import('@/app/template-fontaneria/layout'),
  'template-gimnasio': () => import('@/app/template-gimnasio/layout'),
  'template-jardineria': () => import('@/app/template-jardineria/layout'),
  'template-limpieza': () => import('@/app/template-limpieza/layout'),
  'template-mecanico': () => import('@/app/template-mecanico/layout'),
  'template-mudanzas': () => import('@/app/template-mudanzas/layout'),
  'template-peluqueria': () => import('@/app/template-peluqueria/layout'),
  'template-pilates': () => import('@/app/template-pilates/layout'),
  'template-pintor': () => import('@/app/template-pintor/layout'),
  'template-psicologo': () => import('@/app/template-psicologo/layout'),
  'template-restaurante': () => import('@/app/template-restaurante/layout'),
  'template-veterinario': () => import('@/app/template-veterinario/layout'),
  'template-yoga': () => import('@/app/template-yoga/layout'),
};

const SUBPAGES: Record<string, Partial<Record<'servicios' | 'contacto' | 'nosotros' | 'blog', PageLoader>>> = {
  'template-academia': {
    servicios: () => import('@/app/template-academia/servicios/page'),
    contacto: () => import('@/app/template-academia/contacto/page'),
    nosotros: () => import('@/app/template-academia/nosotros/page'),
    blog: () => import('@/app/template-academia/blog/page'),
  },
  'template-aire': {
    servicios: () => import('@/app/template-aire/servicios/page'),
    contacto: () => import('@/app/template-aire/contacto/page'),
    nosotros: () => import('@/app/template-aire/nosotros/page'),
    blog: () => import('@/app/template-aire/blog/page'),
  },
  'template-arquitectura': {
    servicios: () => import('@/app/template-arquitectura/servicios/page'),
    contacto: () => import('@/app/template-arquitectura/contacto/page'),
    nosotros: () => import('@/app/template-arquitectura/nosotros/page'),
    blog: () => import('@/app/template-arquitectura/blog/page'),
  },
  'template-barberia': {
    servicios: () => import('@/app/template-barberia/servicios/page'),
    contacto: () => import('@/app/template-barberia/contacto/page'),
    nosotros: () => import('@/app/template-barberia/nosotros/page'),
    blog: () => import('@/app/template-barberia/blog/page'),
  },
  'template-canina': {
    servicios: () => import('@/app/template-canina/servicios/page'),
    contacto: () => import('@/app/template-canina/contacto/page'),
    nosotros: () => import('@/app/template-canina/nosotros/page'),
    blog: () => import('@/app/template-canina/blog/page'),
  },
  'template-cerrajero': {
    servicios: () => import('@/app/template-cerrajero/servicios/page'),
    contacto: () => import('@/app/template-cerrajero/contacto/page'),
    nosotros: () => import('@/app/template-cerrajero/nosotros/page'),
    blog: () => import('@/app/template-cerrajero/blog/page'),
  },
  'template-dentista': {
    servicios: () => import('@/app/template-dentista/servicios/page'),
    contacto: () => import('@/app/template-dentista/contacto/page'),
    nosotros: () => import('@/app/template-dentista/nosotros/page'),
    blog: () => import('@/app/template-dentista/blog/page'),
  },
  'template-electricista': {
    servicios: () => import('@/app/template-electricista/servicios/page'),
    contacto: () => import('@/app/template-electricista/contacto/page'),
    nosotros: () => import('@/app/template-electricista/nosotros/page'),
  },
  'template-estetica': {
    servicios: () => import('@/app/template-estetica/servicios/page'),
    contacto: () => import('@/app/template-estetica/contacto/page'),
    nosotros: () => import('@/app/template-estetica/nosotros/page'),
    blog: () => import('@/app/template-estetica/blog/page'),
  },
  'template-fontaneria': {
    servicios: () => import('@/app/template-fontaneria/servicios/page'),
    contacto: () => import('@/app/template-fontaneria/contacto/page'),
    nosotros: () => import('@/app/template-fontaneria/nosotros/page'),
    blog: () => import('@/app/template-fontaneria/blog/page'),
  },
  'template-gimnasio': {
    servicios: () => import('@/app/template-gimnasio/servicios/page'),
    contacto: () => import('@/app/template-gimnasio/contacto/page'),
    nosotros: () => import('@/app/template-gimnasio/nosotros/page'),
    blog: () => import('@/app/template-gimnasio/blog/page'),
  },
  'template-jardineria': {
    servicios: () => import('@/app/template-jardineria/servicios/page'),
    contacto: () => import('@/app/template-jardineria/contacto/page'),
    nosotros: () => import('@/app/template-jardineria/nosotros/page'),
    blog: () => import('@/app/template-jardineria/blog/page'),
  },
  'template-limpieza': {
    servicios: () => import('@/app/template-limpieza/servicios/page'),
    contacto: () => import('@/app/template-limpieza/contacto/page'),
    nosotros: () => import('@/app/template-limpieza/nosotros/page'),
    blog: () => import('@/app/template-limpieza/blog/page'),
  },
  'template-mecanico': {
    servicios: () => import('@/app/template-mecanico/servicios/page'),
    contacto: () => import('@/app/template-mecanico/contacto/page'),
    nosotros: () => import('@/app/template-mecanico/nosotros/page'),
    blog: () => import('@/app/template-mecanico/blog/page'),
  },
  'template-mudanzas': {
    servicios: () => import('@/app/template-mudanzas/servicios/page'),
    contacto: () => import('@/app/template-mudanzas/contacto/page'),
    nosotros: () => import('@/app/template-mudanzas/nosotros/page'),
    blog: () => import('@/app/template-mudanzas/blog/page'),
  },
  'template-peluqueria': {
    servicios: () => import('@/app/template-peluqueria/servicios/page'),
    contacto: () => import('@/app/template-peluqueria/contacto/page'),
    nosotros: () => import('@/app/template-peluqueria/nosotros/page'),
    blog: () => import('@/app/template-peluqueria/blog/page'),
  },
  'template-pilates': {
    servicios: () => import('@/app/template-pilates/servicios/page'),
    contacto: () => import('@/app/template-pilates/contacto/page'),
    nosotros: () => import('@/app/template-pilates/nosotros/page'),
    blog: () => import('@/app/template-pilates/blog/page'),
  },
  'template-pintor': {
    servicios: () => import('@/app/template-pintor/servicios/page'),
    contacto: () => import('@/app/template-pintor/contacto/page'),
    nosotros: () => import('@/app/template-pintor/nosotros/page'),
    blog: () => import('@/app/template-pintor/blog/page'),
  },
  'template-psicologo': {
    servicios: () => import('@/app/template-psicologo/servicios/page'),
    contacto: () => import('@/app/template-psicologo/contacto/page'),
    nosotros: () => import('@/app/template-psicologo/nosotros/page'),
    blog: () => import('@/app/template-psicologo/blog/page'),
  },
  'template-restaurante': {
    servicios: () => import('@/app/template-restaurante/servicios/page'),
    contacto: () => import('@/app/template-restaurante/contacto/page'),
    nosotros: () => import('@/app/template-restaurante/nosotros/page'),
    blog: () => import('@/app/template-restaurante/blog/page'),
  },
  'template-veterinario': {
    servicios: () => import('@/app/template-veterinario/servicios/page'),
    contacto: () => import('@/app/template-veterinario/contacto/page'),
    nosotros: () => import('@/app/template-veterinario/nosotros/page'),
    blog: () => import('@/app/template-veterinario/blog/page'),
  },
  'template-yoga': {
    servicios: () => import('@/app/template-yoga/servicios/page'),
    contacto: () => import('@/app/template-yoga/contacto/page'),
    nosotros: () => import('@/app/template-yoga/nosotros/page'),
    blog: () => import('@/app/template-yoga/blog/page'),
  },
};

const BLOG_POSTS: Record<string, BlogPostLoader> = {
  'template-academia': () => import('@/app/template-academia/blog/[slug]/page'),
  'template-aire': () => import('@/app/template-aire/blog/[slug]/page'),
  'template-arquitectura': () => import('@/app/template-arquitectura/blog/[slug]/page'),
  'template-barberia': () => import('@/app/template-barberia/blog/[slug]/page'),
  'template-canina': () => import('@/app/template-canina/blog/[slug]/page'),
  'template-cerrajero': () => import('@/app/template-cerrajero/blog/[slug]/page'),
  'template-dentista': () => import('@/app/template-dentista/blog/[slug]/page'),
  'template-electricista': () => import('@/app/template-electricista/blog/[slug]/page'),
  'template-estetica': () => import('@/app/template-estetica/blog/[slug]/page'),
  'template-fontaneria': () => import('@/app/template-fontaneria/blog/[slug]/page'),
  'template-gimnasio': () => import('@/app/template-gimnasio/blog/[slug]/page'),
  'template-jardineria': () => import('@/app/template-jardineria/blog/[slug]/page'),
  'template-limpieza': () => import('@/app/template-limpieza/blog/[slug]/page'),
  'template-mecanico': () => import('@/app/template-mecanico/blog/[slug]/page'),
  'template-mudanzas': () => import('@/app/template-mudanzas/blog/[slug]/page'),
  'template-peluqueria': () => import('@/app/template-peluqueria/blog/[slug]/page'),
  'template-pilates': () => import('@/app/template-pilates/blog/[slug]/page'),
  'template-pintor': () => import('@/app/template-pintor/blog/[slug]/page'),
  'template-psicologo': () => import('@/app/template-psicologo/blog/[slug]/page'),
  'template-restaurante': () => import('@/app/template-restaurante/blog/[slug]/page'),
  'template-veterinario': () => import('@/app/template-veterinario/blog/[slug]/page'),
  'template-yoga': () => import('@/app/template-yoga/blog/[slug]/page'),
};

async function load<T>(
  registry: Record<string, () => Promise<{ default: T }>>,
  name: string,
  label: string,
): Promise<T | null> {
  const loader = registry[name];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default;
  } catch (err) {
    console.error(`[template-registry] Failed to load ${label} for ${name}:`, err);
    return null;
  }
}

export const AVAILABLE_TEMPLATE_NAMES = Object.keys(PAGES);
export const hasTemplate = (name: string) => Boolean(PAGES[name]);

export const loadTemplate = (name: string) => load(PAGES, name, 'page');
export const loadTemplateLayout = (name: string) => load(LAYOUTS, name, 'layout');
export const loadTemplateSubpage = (name: string, subpage: 'servicios' | 'contacto' | 'nosotros' | 'blog') =>
  load(SUBPAGES[name] ?? {}, subpage, `subpage:${subpage}`);
export const loadTemplateBlogPost = (name: string) => load(BLOG_POSTS, name, 'blog-post');
