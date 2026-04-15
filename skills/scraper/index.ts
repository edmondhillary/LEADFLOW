/**
 * SKILL 1: LeadFlow Scraper
 *
 * Encuentra negocios locales en Google Maps usando Apify.
 * Guarda los leads en MongoDB con status 'scraped'.
 *
 * Uso: npx tsx skills/scraper/index.ts --sector fontanero --city Madrid --country ES --limit 10
 */

import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { connectDB, Lead } from '../../src/lib/mongodb';
import { SECTORS, getSector, getSearchTerm } from '../../src/config/sectors';

interface ApifyMapResult {
  title: string;
  price?: string;
  categoryName?: string;
  categories?: string[];
  address?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  state?: string;
  countryCode?: string;
  website?: string;
  phone?: string;
  phoneUnformatted?: string;
  location?: { lat: number; lng: number };
  totalScore?: number;
  reviewsCount?: number;
  placeId?: string;
  cid?: string;
  fid?: string;
  openingHours?: Array<{ day: string; hours: string }>;
  additionalInfo?: Record<string, unknown>;
  imageUrl?: string;
  imagesCount?: number;
  url?: string;
  rank?: number;
  isAdvertisement?: boolean;
  permanentlyClosed?: boolean;
  temporarilyClosed?: boolean;
  scrapedAt?: string;
}

function apifyActorPathId(actorId: string): string {
  if (!actorId) return 'apify~google-maps-scraper';
  if (actorId.includes('~')) return actorId;
  return actorId.replace('/', '~');
}

function apifyActorCandidates(): string[] {
  const fromEnv = process.env.APIFY_GOOGLE_MAPS_ACTOR_ID || '';
  const candidates = [
    fromEnv,
    'apify/google-maps-scraper',
    'compass/google-maps-extractor',
    'compass/crawler-google-places',
  ]
    .map(apifyActorPathId)
    .filter(Boolean);

  return [...new Set(candidates)];
}

function apifyLanguage(country: string): string {
  if (country === 'ES' || country === 'AR' || country === 'UY') return 'es';
  return 'en';
}

function apifyCountryCode(country: string): string {
  return (country || 'ES').toLowerCase();
}

async function searchGoogleMapsWithApify(
  query: string,
  apiKey: string,
  country: string,
  limit: number,
): Promise<{ items: ApifyMapResult[]; actorId: string }> {
  const input = {
    searchStringsArray: [query],
    maxCrawledPlacesPerSearch: Math.max(limit, 1),
    language: apifyLanguage(country),
    countryCode: apifyCountryCode(country),
  };

  const attempted: string[] = [];
  for (const actorId of apifyActorCandidates()) {
    attempted.push(actorId);
    const runResponse = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${apiKey}&waitForFinish=180`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (runResponse.status === 404) {
      continue;
    }

    if (!runResponse.ok) {
      throw new Error(`Apify run error (${actorId}): ${runResponse.status} ${runResponse.statusText}`);
    }

    const runPayload = await runResponse.json();
    const runData = runPayload?.data || runPayload;
    const datasetId = runData?.defaultDatasetId;
    if (!datasetId) {
      throw new Error(`Apify run (${actorId}) sin defaultDatasetId`);
    }

    const itemsUrl = new URL(`https://api.apify.com/v2/datasets/${datasetId}/items`);
    itemsUrl.searchParams.set('token', apiKey);
    itemsUrl.searchParams.set('clean', 'true');
    itemsUrl.searchParams.set('format', 'json');
    itemsUrl.searchParams.set('limit', String(Math.max(limit, 1)));

    const itemsResponse = await fetch(itemsUrl.toString());
    if (!itemsResponse.ok) {
      throw new Error(`Apify dataset error (${actorId}): ${itemsResponse.status} ${itemsResponse.statusText}`);
    }

    const items = await itemsResponse.json();
    return {
      items: Array.isArray(items) ? items as ApifyMapResult[] : [],
      actorId,
    };
  }

  throw new Error(`No se encontró actor de Google Maps en Apify. Probados: ${attempted.join(', ')}. Configura APIFY_GOOGLE_MAPS_ACTOR_ID en .env.local`);
}

const NON_BUSINESS_WEBSITE_HOSTS = [
  /(^|\.)google\./,
  /(^|\.)g\.page$/,
  /(^|\.)goo\.gl$/,
  /(^|\.)facebook\.com$/,
  /(^|\.)instagram\.com$/,
  /(^|\.)wa\.me$/,
  /(^|\.)whatsapp\.com$/,
  /(^|\.)tiktok\.com$/,
  /(^|\.)youtube\.com$/,
  /(^|\.)x\.com$/,
  /(^|\.)twitter\.com$/,
  /(^|\.)linkedin\.com$/,
  /(^|\.)linktr\.ee$/,
  /(^|\.)tripadvisor\./,
  /(^|\.)yelp\./,
];

function getHostname(url: string): string {
  if (!url) return '';
  try {
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(normalized).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

function isBusinessWebsite(url: string | undefined): boolean {
  if (!url) return false;
  const host = getHostname(url.trim());
  if (!host) return false;
  return !NON_BUSINESS_WEBSITE_HOSTS.some((rx) => rx.test(host));
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

function normalizeGeo(value: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cityMatchesTarget(result: ApifyMapResult, targetCity: string): boolean {
  const target = normalizeGeo(targetCity);
  if (!target) return true;

  const resultCity = normalizeGeo(result.city || '');
  const resultAddress = normalizeGeo(result.address || '');

  if (resultCity) {
    if (resultCity === target) return true;
    if (resultCity.includes(target) || target.includes(resultCity)) return true;
    return false;
  }

  if (resultAddress) {
    return resultAddress.includes(target);
  }

  // Si no hay señales geográficas, no descartamos.
  return true;
}

function buildDedupeKey(
  result: ApifyMapResult,
  city: string,
  country: string,
  sector: string,
): string {
  if (result.placeId) return `gmaps:place:${result.placeId}`;
  if (result.cid) return `gmaps:cid:${result.cid}`;
  if (result.fid) return `gmaps:fid:${result.fid}`;
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
  if (country === 'US') {
    let national = digits;
    if (national.startsWith('1') && national.length === 11) national = national.slice(1);
    return national.length === 10;
  }
  return digits.length >= 8; // fallback conservador para países no soportados aún
}

// Normaliza teléfono a formato internacional para Twilio/WhatsApp
function normalizePhone(phone: string, country: string): string {
  const clean = phone.replace(/[\s\-().]/g, '');
  const prefixes: Record<string, string> = { ES: '+34', AR: '+54', UY: '+598', US: '+1' };
  const prefix = prefixes[country] || '';

  if (clean.startsWith('+')) return clean;
  if (country === 'ES' && clean.startsWith('34')) return '+' + clean;
  if (country === 'ES') return prefix + clean;
  if (country === 'AR' && clean.startsWith('54')) return '+' + clean;
  if (country === 'AR') return prefix + clean;
  if (country === 'UY' && clean.startsWith('598')) return '+' + clean;
  if (country === 'UY') return prefix + clean;
  if (country === 'US' && clean.startsWith('1')) return '+' + clean;
  if (country === 'US') return prefix + clean;
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

export async function runScraper(options: {
  sector: string;
  city: string;
  country: 'ES' | 'AR' | 'UY' | 'US';
  limit: number;
  apiKey: string;
}) {
  const { sector, city, country, limit, apiKey } = options;

  const ecoMode = process.env.SCRAPE_ECO_MODE !== '0';
  const strictCityFilter = process.env.SCRAPE_STRICT_CITY === '1';
  const maxPerQuery = Math.max(
    1,
    parseInt(process.env.SCRAPE_MAX_RESULTS_PER_QUERY || '200', 10),
  );
  const effectiveLimit = Math.min(limit, maxPerQuery);

  getSector(sector); // valida que exista
  const term = getSearchTerm(sector, country);
  const query = `${term} ${city}`;
  const locale = country === 'ES' ? 'es-ES' : country === 'US' ? 'en-US' : 'es-AR';
  const currency = country === 'ES' ? 'EUR' : 'USD';
  const price = 25;

  console.log(`\n🔍 Buscando: "${query}"`);
  console.log(`📍 País: ${country} | Sector: ${sector} | Límite solicitado: ${limit} | Límite query: ${effectiveLimit}`);
  console.log(`⚙️  Eco mode: ${ecoMode ? 'ON' : 'OFF'} | Filtro ciudad estricto: ${strictCityFilter ? 'ON' : 'OFF'}\n`);

  await connectDB();

  if (!apiKey) {
    throw new Error('Falta APIFY_KEY para ejecutar scraper');
  }

  let found = 0;
  let saved = 0;
  const savedIds: string[] = [];
  const seenThisRun = new Set<string>();

  let withWeb = 0;
  let withoutWeb = 0;
  let withMobile = 0;
  let withoutMobile = 0;
  let skippedByGeo = 0;

  const { items: results, actorId: sourceActor } = await searchGoogleMapsWithApify(query, apiKey, country, effectiveLimit);
  if (results.length === 0) {
    console.log('No hay resultados en Apify para esta búsqueda');
  }

  for (const result of results) {
    if (saved >= limit) break;
    if (!result?.title) continue;
    if (result.isAdvertisement) continue;
    if (result.permanentlyClosed || result.temporarilyClosed) continue;
    if (strictCityFilter && !cityMatchesTarget(result, city)) {
      skippedByGeo++;
      continue;
    }

    found++;

    const phone = result.phoneUnformatted || result.phone;
    const website = result.website || '';
    const slug = generateSlug(result.title, city, sector);
    const dedupeKey = buildDedupeKey(result, city, country, sector);

    const rawWebsite = website?.trim() || '';
    const hasWebsite = isBusinessWebsite(rawWebsite);
    const isMobile = isMobileNumber(phone, country);
    const websiteStatus = hasWebsite ? 'con_web' : 'sin_web';

    if (hasWebsite) withWeb++; else withoutWeb++;
    if (isMobile) withMobile++; else withoutMobile++;

    const normalizedPhone = phone ? normalizePhone(phone, country) : undefined;
    const providerId = result.cid || result.fid;
    const queryOr: any[] = [{ dedupeKey }, { slug }];
    if (result.placeId) queryOr.push({ 'source.placeId': result.placeId });
    if (providerId) queryOr.push({ 'source.providerId': providerId });
    const exists = await Lead.findOne({ $or: queryOr }).select('_id');

    // Guardar o actualizar lead sin duplicar
    try {
      const setData: any = {
        businessName: result.title,
        sector,
        city,
        country,
        address: result.address || result.street || null,
        googleMapsUrl: result.url || null,
        locale,
        currency,
        price,
        reviewCount: result.reviewsCount || 0,
        reviewRating: result.totalScore || 0,
        hasWebsite,
        websiteStatus,
        websiteUrl: hasWebsite ? rawWebsite : null,
        websiteCheckedAt: new Date(),
        hasMobile: isMobile,
        hasWhatsApp: isMobile,
        whatsAppValidatedAt: new Date(),
        isGenerationCandidate: !hasWebsite && isMobile,
        contactPriority: !hasWebsite && isMobile ? 'alta' : !hasWebsite ? 'media' : 'baja',
        source: {
          engine: 'google_maps_apify',
          placeId: result.placeId,
          providerId,
        },
        dedupeKey,
        rawScrapeData: {
          ...result,
          phoneResolved: phone || null,
          websiteResolved: rawWebsite || null,
          websiteDiscardedAsNonCorporate: rawWebsite && !hasWebsite ? rawWebsite : null,
          normalized: {
            openingHours: result.openingHours || null,
            additionalInfo: result.additionalInfo || null,
            categories: result.categories || (result.categoryName ? [result.categoryName] : []),
            imageUrl: result.imageUrl || null,
            imagesCount: result.imagesCount || 0,
            coords: result.location || null,
            sourceActor,
          },
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
      console.log(`   🌐 ${hasWebsite ? 'CON WEB' : 'SIN WEB'}${rawWebsite ? ` (${rawWebsite})` : ''}`);
      if (rawWebsite && !hasWebsite) {
        console.log(`   ℹ️  URL descartada como web corporativa: ${rawWebsite}`);
      }
      if (phone) console.log(`   📞 ${phone}`);
      if (result.address) console.log(`   📍 ${result.address}`);

    } catch (err: any) {
      console.error(`❌ Error guardando ${result.title}:`, err.message);
    }
  }

  console.log(`\n📊 RESUMEN:`);
  console.log(`   Negocios encontrados: ${found}`);
  console.log(`   Leads guardados/actualizados únicos: ${saved}`);
  console.log(`   Con web: ${withWeb} | Sin web: ${withoutWeb}`);
  console.log(`   Con móvil: ${withMobile} | Sin móvil: ${withoutMobile}`);
  if (strictCityFilter) console.log(`   Filtrados por ciudad objetivo: ${skippedByGeo}`);
  console.log(`   Sector: ${sector} | Ciudad: ${city} | País: ${country}`);

  return {
    found,
    saved,
    leadIds: savedIds,
    meta: {
      apifyRuns: 1,
      effectiveLimit,
      requestedLimit: limit,
      strictCityFilter,
      skippedByGeo,
      sourceActor,
    },
  };
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
    country: (getArg('country', 'ES') as 'ES' | 'AR' | 'UY' | 'US'),
    limit:   parseInt(getArg('limit', '10')),
    apiKey:  process.env.APIFY_KEY || '',
  };

  if (!options.apiKey) {
    console.error('❌ Falta APIFY_KEY en .env.local');
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
