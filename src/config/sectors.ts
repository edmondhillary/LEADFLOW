/**
 * FUENTE ÚNICA DE VERDAD — Sectores de LeadFlow
 *
 * Para añadir un sector nuevo:
 *   1. Añade una entrada en sectors.json
 *   2. Crea la carpeta src/app/template-<nombre>/
 *   3. Listo — scraper, pipeline y bot lo recogen automáticamente
 */

import rawSectors from './sectors.json';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface SectorDesign {
  primary: string;
  accent:  string;
  font:    string;
}

export interface SectorConfig {
  /** Slug interno (clave del JSON), ej: "aire-acondicionado" */
  slug:     string;
  /** Nombre para mostrar en el bot, ej: "Aire acondicionado" */
  display:  string;
  /** Emoji representativo */
  icon:     string;
  /** Nombre de la carpeta template en /src/app/, ej: "template-aire-acondicionado" */
  template: string;
  /** Colores y tipografía del template */
  design:   SectorDesign;
  /** Término de búsqueda en Google Maps por país */
  terms:    Record<string, string>;
  /** Servicios por defecto del sector */
  services: string[];
}

// ─── Mapa principal (todos los sectores) ─────────────────────────────────────

export const SECTORS: Record<string, SectorConfig> = Object.fromEntries(
  Object.entries(rawSectors).map(([slug, cfg]) => [
    slug,
    { slug, ...(cfg as Omit<SectorConfig, 'slug'>) },
  ])
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Lista de slugs: ["fontanero", "electricista", ...] */
export const SECTOR_SLUGS = Object.keys(SECTORS);

/** Obtiene un sector por slug. Lanza error si no existe. */
export function getSector(slug: string): SectorConfig {
  const s = SECTORS[slug];
  if (!s) {
    throw new Error(
      `Sector desconocido: "${slug}". Disponibles: ${SECTOR_SLUGS.join(', ')}`
    );
  }
  return s;
}

/** Devuelve el término de búsqueda localizado para un sector+país */
export function getSearchTerm(slug: string, country: string): string {
  const s = getSector(slug);
  return s.terms[country] ?? s.terms['ES'] ?? slug;
}

/** Devuelve el nombre del template para un sector */
export function getTemplateName(slug: string): string {
  return getSector(slug).template;
}

/** Devuelve los colores/fuente de diseño para un sector */
export function getDesign(slug: string): SectorDesign {
  return getSector(slug).design;
}

/**
 * Teclado Telegram: array de arrays (filas de 2) con { text, callback }
 * Listo para reply_markup.keyboard
 */
export function getSectorKeyboard(): Array<Array<{ text: string }>> {
  const entries = Object.values(SECTORS);
  const rows: Array<Array<{ text: string }>> = [];
  for (let i = 0; i < entries.length; i += 2) {
    const row = [{ text: `${entries[i].icon} ${entries[i].display}` }];
    if (entries[i + 1]) row.push({ text: `${entries[i + 1].icon} ${entries[i + 1].display}` });
    rows.push(row);
  }
  return rows;
}

/**
 * Dada la etiqueta que muestra el bot ("🔧 Fontanero") devuelve el slug ("fontanero")
 */
export function slugFromLabel(label: string): string | undefined {
  return Object.values(SECTORS).find(
    (s) => label === `${s.icon} ${s.display}` || label === s.display
  )?.slug;
}
