/**
 * SKILL 1: LeadFlow Scraper
 *
 * Encuentra negocios locales SIN web en Google Maps usando SerpAPI.
 * Guarda los leads en MongoDB con status 'scraped'.
 *
 * Uso: npx tsx skills/scraper/index.ts --sector fontanero --city Madrid --country ES --limit 10
 */

import { connectDB, Lead } from '../../src/lib/mongodb';
import { SECTORS, getSector, getSearchTerm } from '../../src/config/sectors';

interface SerpApiMapResult {
  title: string;
  place_id?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  type?: string;
  gps_coordinates?: { latitude: number; longitude: number };
}

// Valida si un número es móvil (muy probable que tenga WhatsApp)
function isMobileNumber(phone: string | undefined, country: string): boolean {
  if (!phone) return false;

  // Quitamos todo excepto dígitos
  const digits = phone.replace(/\D/g, '');

  if (country === 'ES') {
    // Extraemos los 9 dígitos nacionales (quitando prefijo +34 o 34 si viene)
    let national = digits;
    if (national.startsWith('34') && national.length === 11) national = national.slice(2);
    // España: móviles empiezan SOLO por 6 o 7 — nunca 9 (fijo), 8, 5...
    return national.length === 9 && /^[67]/.test(national);
  }
  if (country === 'AR') {
    // Argentina: quitamos prefijo 54 si existe
    let national = digits;
    if (national.startsWith('54')) national = national.slice(2);
    // Móviles: empiezan por 9, 11, 15
    return /^(9|11|15)/.test(national) && national.length >= 10;
  }
  if (country === 'UY') {
    let national = digits;
    if (national.startsWith('598')) national = national.slice(3);
    // Uruguay móviles: empiezan por 09
    return /^09/.test(national) && national.length === 9;
  }
  return false; // Si no reconocemos el país, descartamos
}

// Normaliza teléfono a formato internacional para Twilio/WhatsApp
function normalizePhone(phone: string, country: string): string {
  const clean = phone.replace(/[\s\-().]/g, '');
  const prefixes: Record<string, string> = { ES: '+34', AR: '+54', UY: '+598' };
  const prefix = prefixes[country] || '';

  if (clean.startsWith('+')) return clean;
  if (country === 'ES' && clean.startsWith('34')) return '+' + clean;
  if (country === 'ES') return prefix + clean;
  if (country === 'AR' && clean.startsWith('54')) return '+' + clean;
  if (country === 'AR') return prefix + clean;
  if (country === 'UY' && clean.startsWith('598')) return '+' + clean;
  if (country === 'UY') return prefix + clean;
  return clean.startsWith('+') ? clean : '+' + clean;
}

function generateSlug(businessName: string, city: string, sector: string): string {
  const clean = (str: string) => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${clean(businessName)}-${clean(city)}-${clean(sector)}`;
}

async function searchGoogleMaps(
  query: string,
  apiKey: string,
  start: number = 0
): Promise<SerpApiMapResult[]> {
  const params = new URLSearchParams({
    engine: 'google_maps',
    q: query,
    type: 'search',
    api_key: apiKey,
    hl: 'es',
    start: start.toString(),
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  if (!response.ok) {
    throw new Error(`SerpAPI error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.local_results || [];
}

async function getBusinessDetails(
  placeId: string,
  apiKey: string
): Promise<{ phone?: string; website?: string }> {
  try {
    const params = new URLSearchParams({
      engine: 'google_maps',
      place_id: placeId,
      api_key: apiKey,
    });
    const response = await fetch(`https://serpapi.com/search?${params}`);
    const data = await response.json();
    const place = data.place_results || {};
    return {
      phone: place.phone,
      website: place.website,
    };
  } catch {
    return {};
  }
}

export async function runScraper(options: {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY';
  limit: number;
  apiKey: string;
}) {
  const { sector, city, country, limit, apiKey } = options;

  const sectorConfig = getSector(sector); // lanza error si no existe
  const term = getSearchTerm(sector, country);
  const query = `${term} ${city}`;
  const locale = country === 'ES' ? 'es-ES' : 'es-AR';
  const currency = country === 'ES' ? 'EUR' : 'USD';
  const price = 25;

  console.log(`\n🔍 Buscando: "${query}"`);
  console.log(`📍 País: ${country} | Sector: ${sector} | Límite: ${limit}\n`);

  await connectDB();

  let found = 0;
  let saved = 0;
  let start = 0;
  const savedIds: string[] = [];

  while (saved < limit) {
    const results = await searchGoogleMaps(query, apiKey, start);
    if (results.length === 0) {
      console.log('No hay más resultados en Google Maps');
      break;
    }

    for (const result of results) {
      if (saved >= limit) break;
      found++;

      // Saltamos los que ya tienen web
      if (result.website) {
        console.log(`⏭️  Tiene web: ${result.title}`);
        continue;
      }

      // Obtenemos detalles si hay place_id
      let phone = result.phone;
      if (!phone && result.place_id) {
        const details = await getBusinessDetails(result.place_id, apiKey);
        phone = details.phone;
        // Si detalles dice que tiene web, saltamos
        if (details.website) {
          console.log(`⏭️  Tiene web (detalles): ${result.title}`);
          continue;
        }
      }

      const slug = generateSlug(result.title, city, sector);

      // Verificar si ya existe en BD
      const exists = await Lead.findOne({ slug });
      if (exists) {
        console.log(`🔄 Ya existe: ${result.title}`);
        continue;
      }

      // Validar que tiene número de móvil (posible WhatsApp)
      const isMobile = isMobileNumber(phone, country);
      if (!phone || !isMobile) {
        console.log(`⏭️  Sin móvil WhatsApp: ${result.title} (${phone || 'sin teléfono'})`);
        continue;
      }

      // Guardar lead
      try {
        const lead = await Lead.create({
          slug,
          businessName: result.title,
          sector,
          city,
          country,
          phone: normalizePhone(phone, country),
          address: result.address || null,
          locale,
          currency,
          price,
          status: 'scraped',
        });

        saved++;
        savedIds.push(lead._id.toString());
        console.log(`✅ [${saved}/${limit}] Guardado: ${result.title}`);
        if (phone) console.log(`   📞 ${phone}`);
        if (result.address) console.log(`   📍 ${result.address}`);

      } catch (err: any) {
        console.error(`❌ Error guardando ${result.title}:`, err.message);
      }
    }

    start += 20; // Siguiente página de resultados
    // Pequeña pausa para no saturar la API
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n📊 RESUMEN:`);
  console.log(`   Negocios encontrados: ${found}`);
  console.log(`   Leads guardados: ${saved}`);
  console.log(`   Sector: ${sector} | Ciudad: ${city} | País: ${country}`);

  return { found, saved, leadIds: savedIds };
}

// Ejecución directa desde CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (name: string, def = '') => {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 ? args[idx + 1] : def;
  };

  const options = {
    sector:  getArg('sector', 'fontanero'),
    city:    getArg('city', 'Madrid'),
    country: (getArg('country', 'ES') as 'ES' | 'AR' | 'UY'),
    limit:   parseInt(getArg('limit', '10')),
    apiKey:  process.env.SERPAPI_KEY || '',
  };

  if (!options.apiKey) {
    console.error('❌ Falta SERPAPI_KEY en .env.local');
    process.exit(1);
  }

  runScraper(options)
    .then(({ saved }) => {
      console.log(`\n🎉 Scraper finalizado. ${saved} leads nuevos en MongoDB.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
