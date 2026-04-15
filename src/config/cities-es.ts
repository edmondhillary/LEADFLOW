/**
 * Ciudades de España ordenadas por población (INE 2024).
 * El scheduler itera primero las grandes y va bajando.
 */

export interface CityEntry {
  name: string;
  /** Nombre normalizado para búsquedas en Google Maps */
  searchName: string;
  population: number;
}

export const CITIES_ES: CityEntry[] = [
  // Tier 1 — Grandes (+500k)
  { name: 'Madrid', searchName: 'Madrid', population: 3400000 },
  { name: 'Barcelona', searchName: 'Barcelona', population: 1660000 },
  { name: 'Valencia', searchName: 'Valencia', population: 800000 },
  { name: 'Sevilla', searchName: 'Sevilla', population: 690000 },
  { name: 'Zaragoza', searchName: 'Zaragoza', population: 680000 },
  { name: 'Málaga', searchName: 'Málaga', population: 580000 },

  // Tier 2 — Medianas-grandes (250k-500k)
  { name: 'Murcia', searchName: 'Murcia', population: 460000 },
  { name: 'Palma de Mallorca', searchName: 'Palma de Mallorca', population: 420000 },
  { name: 'Las Palmas de Gran Canaria', searchName: 'Las Palmas de Gran Canaria', population: 380000 },
  { name: 'Bilbao', searchName: 'Bilbao', population: 350000 },
  { name: 'Alicante', searchName: 'Alicante', population: 340000 },
  { name: 'Córdoba', searchName: 'Córdoba', population: 325000 },
  { name: 'Valladolid', searchName: 'Valladolid', population: 300000 },
  { name: 'Vigo', searchName: 'Vigo', population: 295000 },
  { name: 'Gijón', searchName: 'Gijón', population: 270000 },

  // Tier 3 — Medianas (150k-250k)
  { name: 'Vitoria-Gasteiz', searchName: 'Vitoria-Gasteiz', population: 255000 },
  { name: 'A Coruña', searchName: 'A Coruña', population: 245000 },
  { name: 'Granada', searchName: 'Granada', population: 232000 },
  { name: 'Elche', searchName: 'Elche', population: 230000 },
  { name: 'Oviedo', searchName: 'Oviedo', population: 220000 },
  { name: 'Santa Cruz de Tenerife', searchName: 'Santa Cruz de Tenerife', population: 210000 },
  { name: 'Badalona', searchName: 'Badalona', population: 225000 },
  { name: "L'Hospitalet de Llobregat", searchName: "L'Hospitalet de Llobregat", population: 265000 },
  { name: 'Cartagena', searchName: 'Cartagena', population: 218000 },
  { name: 'Terrassa', searchName: 'Terrassa', population: 225000 },
  { name: 'Jerez de la Frontera', searchName: 'Jerez de la Frontera', population: 213000 },
  { name: 'Sabadell', searchName: 'Sabadell', population: 215000 },
  { name: 'Móstoles', searchName: 'Móstoles', population: 210000 },
  { name: 'Alcalá de Henares', searchName: 'Alcalá de Henares', population: 197000 },
  { name: 'Pamplona', searchName: 'Pamplona', population: 205000 },
  { name: 'Fuenlabrada', searchName: 'Fuenlabrada', population: 195000 },
  { name: 'Almería', searchName: 'Almería', population: 200000 },
  { name: 'Leganés', searchName: 'Leganés', population: 190000 },
  { name: 'San Sebastián', searchName: 'San Sebastián', population: 188000 },
  { name: 'Getafe', searchName: 'Getafe', population: 185000 },
  { name: 'Burgos', searchName: 'Burgos', population: 178000 },
  { name: 'Santander', searchName: 'Santander', population: 173000 },
  { name: 'Albacete', searchName: 'Albacete', population: 175000 },
  { name: 'Castellón de la Plana', searchName: 'Castellón de la Plana', population: 172000 },
  { name: 'Alcorcón', searchName: 'Alcorcón', population: 170000 },

  // Tier 4 — Pequeñas-medianas (100k-150k)
  { name: 'San Cristóbal de La Laguna', searchName: 'San Cristóbal de La Laguna', population: 160000 },
  { name: 'Logroño', searchName: 'Logroño', population: 150000 },
  { name: 'Badajoz', searchName: 'Badajoz', population: 150000 },
  { name: 'Salamanca', searchName: 'Salamanca', population: 145000 },
  { name: 'Huelva', searchName: 'Huelva', population: 143000 },
  { name: 'Marbella', searchName: 'Marbella', population: 142000 },
  { name: 'Tarragona', searchName: 'Tarragona', population: 135000 },
  { name: 'León', searchName: 'León', population: 124000 },
  { name: 'Cádiz', searchName: 'Cádiz', population: 116000 },
  { name: 'Lleida', searchName: 'Lleida', population: 140000 },
  { name: 'Jaén', searchName: 'Jaén', population: 112000 },
  { name: 'Ourense', searchName: 'Ourense', population: 105000 },
  { name: 'Girona', searchName: 'Girona', population: 103000 },
  { name: 'Lugo', searchName: 'Lugo', population: 99000 },
  { name: 'Santiago de Compostela', searchName: 'Santiago de Compostela', population: 98000 },
  { name: 'Cáceres', searchName: 'Cáceres', population: 96000 },
  { name: 'Torrejón de Ardoz', searchName: 'Torrejón de Ardoz', population: 131000 },
  { name: 'Parla', searchName: 'Parla', population: 130000 },
  { name: 'Mataró', searchName: 'Mataró', population: 129000 },
  { name: 'Algeciras', searchName: 'Algeciras', population: 123000 },
  { name: 'Dos Hermanas', searchName: 'Dos Hermanas', population: 135000 },
  { name: 'Torrevieja', searchName: 'Torrevieja', population: 102000 },
  { name: 'Reus', searchName: 'Reus', population: 107000 },
  { name: 'Telde', searchName: 'Telde', population: 103000 },
];

/** Total de ciudades disponibles */
export const TOTAL_CITIES = CITIES_ES.length;
