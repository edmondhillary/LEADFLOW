/**
 * Builder de queries Mongoose para broadcasts.
 * Función pura: recibe un filterSpec y devuelve un objeto query que se le pasa a Lead.find().
 * Sin side effects — fácil de unit-testear.
 */

export interface BroadcastFilterSpec {
  sector?: string;              // ej. 'fontaneria', case-insensitive
  city?: string;                // ej. 'Madrid', case-insensitive (regex)
  country?: 'ES' | 'AR' | 'UY' | 'US';
  status?: string | string[];   // ej. 'web_live' o ['web_live', 'email_sent']
  onlyUnsent?: boolean;         // excluye leads que ya recibieron WhatsApp (whatsappSentAt != null)
  hasWhatsApp?: boolean;        // requiere hasWhatsApp === true
  requirePhone?: boolean;       // requiere que phone exista y no sea vacío
  requireSlug?: boolean;        // requiere slug (necesario para templates como web_lista)
  limit?: number;               // tope duro — si se pasa, se aplica al cursor al iterar
}

export interface BuiltQuery {
  query: Record<string, unknown>;
  limit?: number;
}

export function buildLeadQuery(spec: BroadcastFilterSpec = {}): BuiltQuery {
  const q: Record<string, unknown> = {};

  if (spec.sector) {
    q.sector = spec.sector.trim().toLowerCase();
  }

  if (spec.city) {
    // city es free-text en el schema, mejor case-insensitive regex exact-match
    q.city = { $regex: `^${escapeRegex(spec.city.trim())}$`, $options: 'i' };
  }

  if (spec.country) {
    q.country = spec.country;
  }

  if (spec.status) {
    if (Array.isArray(spec.status)) {
      q.status = { $in: spec.status };
    } else {
      q.status = spec.status;
    }
  }

  if (spec.onlyUnsent) {
    q.whatsappSentAt = { $in: [null, undefined] as unknown as null[] };
  }

  if (spec.hasWhatsApp === true) {
    q.hasWhatsApp = true;
  }

  if (spec.requirePhone) {
    q.phone = { $exists: true, $nin: ['', null] };
  }

  if (spec.requireSlug) {
    q.slug = { $exists: true, $nin: ['', null] };
  }

  return {
    query: q,
    limit: spec.limit && spec.limit > 0 ? Math.floor(spec.limit) : undefined,
  };
}

/**
 * Describe un filterSpec de forma humana para mostrar en Telegram.
 * Ej: { sector: 'yoga', city: 'Valencia', onlyUnsent: true } → "sector=yoga · city=Valencia · solo no-enviados"
 */
export function describeFilter(spec: BroadcastFilterSpec): string {
  const parts: string[] = [];
  if (spec.sector) parts.push(`sector=${spec.sector}`);
  if (spec.city) parts.push(`city=${spec.city}`);
  if (spec.country) parts.push(`country=${spec.country}`);
  if (spec.status) {
    parts.push(`status=${Array.isArray(spec.status) ? spec.status.join('|') : spec.status}`);
  }
  if (spec.onlyUnsent) parts.push('solo no-enviados');
  if (spec.hasWhatsApp) parts.push('con WhatsApp');
  if (spec.requirePhone) parts.push('con teléfono');
  if (spec.requireSlug) parts.push('con slug');
  if (spec.limit) parts.push(`max=${spec.limit}`);
  return parts.length > 0 ? parts.join(' · ') : 'todos';
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
