type OverrideSubpage = 'contacto' | 'nosotros' | 'blog' | 'blogPost';

function envEnabled(name: string, defaultOn: boolean): boolean {
  const raw = process.env[name];
  if (raw == null || raw === '') return defaultOn;
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
}

/**
 * Phase rollout control:
 * - defaults ON (v2 active) to prioritize dynamic, data-driven pages
 * - can be disabled per page type with env flags for quick rollback
 */
export function shouldUseOverrideV2(subpage: OverrideSubpage): boolean {
  if (!envEnabled('LF_OVERRIDE_V2_ENABLED', true)) return false;

  switch (subpage) {
    case 'contacto':
      return envEnabled('LF_OVERRIDE_V2_CONTACTO', true);
    case 'nosotros':
      return envEnabled('LF_OVERRIDE_V2_NOSOTROS', true);
    case 'blog':
      return envEnabled('LF_OVERRIDE_V2_BLOG', true);
    case 'blogPost':
      return envEnabled('LF_OVERRIDE_V2_BLOG_POST', true);
    default:
      return true;
  }
}
