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
  place_id_search?: string;
  provider_id?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  reviews_original?: string;
  type?: string;
  links?: { website?: string; directions?: string };
  hours?: string;
  description?: string;
  gps_coordinates?: { latitude: number; longitude: number };
}

function cleanForKey(value: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildDedupeKey(
  result: SerpApiMapResult,
  city: string,
  country: string,
  sector: string,
): string {
  if (result.place_id) return `gmaps:place:${result.place_id}`;
  if (result.provider_id) return `gmaps:provider:${result.provider_id}`;
  const title = cleanForKey(result.title);
  const addr = cleanForKey(result.address || 'sin-direccion');
  return `gmaps:fallback:${country}:${cleanForKey(city)}:${cleanForKey(sector)}:${title}:${addr}`;
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
): Promise<{ phone?: string; website?: string; place?: any }> {
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
      place,
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

  getSector(sector); // valida que exista
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
  const seenThisRun = new Set<string>();

  let withWeb = 0;
  let withoutWeb = 0;
  let withMobile = 0;
  let withoutMobile = 0;

  while (saved < limit) {
    const results = await searchGoogleMaps(query, apiKey, start);
    if (results.length === 0) {
      console.log('No hay más resultados en Google Maps');
      break;
    }

    for (const result of results) {
      if (saved >= limit) break;
      found++;

      // Obtenemos detalles si hay place_id
      let phone = result.phone;
      let detailPlace: any = null;
      let website = result.website || result.links?.website || '';

      if (result.place_id) {
        const details = await getBusinessDetails(result.place_id, apiKey);
        if (!phone) phone = details.phone;
        detailPlace = details.place || null;
        website = website || details.website || detailPlace?.website || '';
      }

      const slug = generateSlug(result.title, city, sector);
      const dedupeKey = buildDedupeKey(result, city, country, sector);

      const hasWebsite = Boolean(website);
      const isMobile = isMobileNumber(phone, country);
      const websiteStatus = hasWebsite ? 'con_web' : 'sin_web';

      if (hasWebsite) withWeb++; else withoutWeb++;
      if (isMobile) withMobile++; else withoutMobile++;

      const normalizedPhone = phone ? normalizePhone(phone, country) : undefined;
      const queryOr: any[] = [{ dedupeKey }, { slug }];
      if (result.place_id) queryOr.push({ 'source.placeId': result.place_id });
      if (result.provider_id) queryOr.push({ 'source.providerId': result.provider_id });
      const exists = await Lead.findOne({ $or: queryOr }).select('_id');

      // Guardar o actualizar lead sin duplicar
      try {
        const setData: any = {
          businessName: result.title,
          sector,
          city,
          country,
          address: result.address || null,
          googleMapsUrl: result.links?.directions || result.place_id_search || null,
          locale,
          currency,
          price,
          reviewCount: result.reviews || 0,
          reviewRating: result.rating || 0,
          hasWebsite,
          websiteStatus,
          websiteUrl: website || null,
          websiteCheckedAt: new Date(),
          hasMobile: isMobile,
          hasWhatsApp: isMobile,
          whatsAppValidatedAt: new Date(),
          isGenerationCandidate: !hasWebsite && isMobile,
          contactPriority: !hasWebsite && isMobile ? 'alta' : !hasWebsite ? 'media' : 'baja',
          source: {
            engine: 'google_maps',
            placeId: result.place_id,
            providerId: result.provider_id,
          },
          dedupeKey,
          rawScrapeData: {
            ...result,
            websiteResolved: website || null,
            details: detailPlace,
          },
          lastScrapedAt: new Date(),
        };
        if (normalizedPhone) setData.phone = normalizedPhone;

        const lead = await Lead.findOneAndUpdate(
          { $or: queryOr },
          {
            $set: setData,
            $setOnInsert: {
              slug,
              status: 'scraped',
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        if (lead && !seenThisRun.has(String(lead._id))) {
          seenThisRun.add(String(lead._id));
          saved++;
          savedIds.push(String(lead._id));
        }

        console.log(`✅ [${saved}/${limit}] ${exists ? 'Actualizado' : 'Guardado'}: ${result.title}`);
        console.log(`   🌐 ${hasWebsite ? 'CON WEB' : 'SIN WEB'}${website ? ` (${website})` : ''}`);
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
  console.log(`   Leads guardados/actualizados únicos: ${saved}`);
  console.log(`   Con web: ${withWeb} | Sin web: ${withoutWeb}`);
  console.log(`   Con móvil: ${withMobile} | Sin móvil: ${withoutMobile}`);
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
      console.log(`\n🎉 Scraper finalizado. ${saved} leads guardados/actualizados en MongoDB.`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
