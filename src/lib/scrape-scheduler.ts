/**
 * Scrape Scheduler — Piloto automático de LeadFlow
 *
 * Rota por todas las combinaciones sector+ciudad de España,
 * controlando el presupuesto diario de Apify y el límite de leads/día.
 *
 * Usa MongoDB para persistir el cursor (qué combo toca siguiente).
 */

import { connectDB, Lead } from './mongodb';
import { CITIES_ES } from '../config/cities-es';
import { SECTOR_SLUGS } from '../config/sectors';
import mongoose from 'mongoose';

// ─── Config por env ─────────────────────────────────────────────────────────

/** Máximo de leads NUEVOS guardados por día (0 = sin límite) */
export const DAILY_LEAD_CAP = parseInt(process.env.DAILY_LEAD_CAP || '500', 10);

/** Presupuesto diario de Apify en USD (Bronze plan: $29 prepaid ÷ ~14 días) */
export const DAILY_APIFY_BUDGET_USD = parseFloat(process.env.DAILY_APIFY_BUDGET_USD || '5.00');

/** Costo estimado por run de Apify en USD (Bronze plan: $0.300/CU, ~1-2 CU/run) */
export const APIFY_COST_PER_RUN_USD = parseFloat(process.env.APIFY_COST_PER_RUN_USD || '0.40');

/** Leads por query de Apify (sin eco mode, full city) */
export const LEADS_PER_QUERY = parseInt(process.env.LEADS_PER_QUERY || '200', 10);

// ─── Schema: ScrapeSchedulerState ─────────────────────────────────────────

const SchedulerStateSchema = new mongoose.Schema({
  /** Siempre "main" — singleton */
  _id: { type: String, default: 'main' },
  /** Índice del combo actual en la lista sector×ciudad */
  comboIndex: { type: Number, default: 0 },
  /** Leads nuevos guardados HOY */
  dailyLeadsSaved: { type: Number, default: 0 },
  /** Gasto de Apify estimado HOY (USD) */
  dailyApifySpendUsd: { type: Number, default: 0 },
  /** Runs de Apify HOY */
  dailyApifyRuns: { type: Number, default: 0 },
  /** Webs generadas HOY */
  dailyWebsGenerated: { type: Number, default: 0 },
  /** Fecha del día actual (para resetear contadores) */
  currentDay: { type: String, default: '' },
  /** Última ejecución */
  lastRunAt: { type: Date },
}, { timestamps: true });

export const SchedulerState = mongoose.models.SchedulerState
  || mongoose.model('SchedulerState', SchedulerStateSchema);

// ─── Generar combos sector × ciudad ──────────────────────────────────────

export interface ScrapeCombo {
  sector: string;
  city: string;
  country: 'ES';
}

/**
 * Genera TODOS los combos sector × ciudad.
 * Orden: primero todas las ciudades del sector 1, luego sector 2, etc.
 * Así se maximiza la variedad geográfica antes de cambiar de sector.
 *
 * Pero para mejor distribución diaria, intercalamos: cada sector va
 * rotando por las ciudades (sector1+city1, sector2+city1, ... sectorN+city1,
 * sector1+city2, ...) para que cada día toque variedad de sectores.
 */
function generateCombos(): ScrapeCombo[] {
  const combos: ScrapeCombo[] = [];
  // Iterar primero por ciudad (para variedad de sector en cada ciclo)
  for (const city of CITIES_ES) {
    for (const sector of SECTOR_SLUGS) {
      combos.push({ sector, city: city.searchName, country: 'ES' });
    }
  }
  return combos;
}

/** Todos los combos posibles — se genera una vez */
const ALL_COMBOS = generateCombos();
export const TOTAL_COMBOS = ALL_COMBOS.length;

// ─── Helpers ──────────────────────────────────────────────────────────────

function todayKey(): string {
  // Día en zona Costa Rica (UTC-6)
  const now = new Date();
  const cr = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  return cr.toISOString().slice(0, 10);
}

// ─── Core: obtener siguiente batch de combos ─────────────────────────────

export interface SchedulerBatch {
  combos: ScrapeCombo[];
  dailyLeadsSaved: number;
  dailyApifySpendUsd: number;
  dailyApifyRuns: number;
  dailyWebsGenerated: number;
  budgetRemaining: number;
  leadCapRemaining: number;
  comboIndex: number;
}

/**
 * Devuelve el siguiente batch de combos para ejecutar.
 * Respeta presupuesto diario y cap de leads.
 * @param maxRuns cuántos runs de Apify queremos hacer en este batch (default 2)
 */
export async function getNextBatch(maxRuns = 2): Promise<SchedulerBatch> {
  await connectDB();
  const today = todayKey();

  let state = await SchedulerState.findById('main');
  if (!state) {
    state = await SchedulerState.create({
      _id: 'main',
      comboIndex: 0,
      dailyLeadsSaved: 0,
      dailyApifySpendUsd: 0,
      dailyApifyRuns: 0,
      dailyWebsGenerated: 0,
      currentDay: today,
    });
  }

  // Reset diario si cambió el día
  if (state.currentDay !== today) {
    state.dailyLeadsSaved = 0;
    state.dailyApifySpendUsd = 0;
    state.dailyApifyRuns = 0;
    state.dailyWebsGenerated = 0;
    state.currentDay = today;
    await state.save();
  }

  // Redondear a 2 decimales para evitar errores de punto flotante
  // (ej: 2.00 - 1.60 = 0.39999... en vez de 0.40)
  const budgetRemaining = Math.round((DAILY_APIFY_BUDGET_USD - state.dailyApifySpendUsd) * 100) / 100;
  const leadCapRemaining = DAILY_LEAD_CAP > 0 ? DAILY_LEAD_CAP - state.dailyLeadsSaved : Infinity;

  // ¿Cuántos runs podemos hacer con el presupuesto restante?
  const affordableRuns = Math.floor((budgetRemaining + 0.001) / APIFY_COST_PER_RUN_USD);
  const effectiveRuns = Math.min(maxRuns, affordableRuns);

  // Seleccionar combos
  const combos: ScrapeCombo[] = [];
  let idx = state.comboIndex;
  for (let i = 0; i < effectiveRuns; i++) {
    if (leadCapRemaining <= combos.length * LEADS_PER_QUERY) break;
    combos.push(ALL_COMBOS[idx % TOTAL_COMBOS]);
    idx++;
  }

  return {
    combos,
    dailyLeadsSaved: state.dailyLeadsSaved,
    dailyApifySpendUsd: state.dailyApifySpendUsd,
    dailyApifyRuns: state.dailyApifyRuns,
    dailyWebsGenerated: state.dailyWebsGenerated,
    budgetRemaining,
    leadCapRemaining: leadCapRemaining === Infinity ? -1 : leadCapRemaining,
    comboIndex: state.comboIndex,
  };
}

/**
 * Actualiza contadores después de un run.
 */
export async function recordRunResult(result: {
  newLeadsSaved: number;
  apifyCostUsd: number;
  websGenerated: number;
  combosProcessed: number;
}): Promise<void> {
  await connectDB();
  const today = todayKey();

  await SchedulerState.findByIdAndUpdate('main', {
    $inc: {
      comboIndex: result.combosProcessed,
      dailyLeadsSaved: result.newLeadsSaved,
      dailyApifySpendUsd: Math.round(result.apifyCostUsd * 100) / 100,
      dailyApifyRuns: result.combosProcessed,
      dailyWebsGenerated: result.websGenerated,
    },
    $set: {
      lastRunAt: new Date(),
      currentDay: today,
    },
  }, { upsert: true });
}

/**
 * Devuelve stats del día para el reporte de Telegram.
 */
export async function getDailyStats(): Promise<{
  leadsToday: number;
  websToday: number;
  apifySpend: number;
  apifyRuns: number;
  budgetRemaining: number;
  nextCombo: ScrapeCombo;
  comboIndex: number;
  totalCombos: number;
  progress: string;
}> {
  await connectDB();
  const state = await SchedulerState.findById('main');
  const idx = state?.comboIndex || 0;

  return {
    leadsToday: state?.dailyLeadsSaved || 0,
    websToday: state?.dailyWebsGenerated || 0,
    apifySpend: state?.dailyApifySpendUsd || 0,
    apifyRuns: state?.dailyApifyRuns || 0,
    budgetRemaining: Math.round((DAILY_APIFY_BUDGET_USD - (state?.dailyApifySpendUsd || 0)) * 100) / 100,
    nextCombo: ALL_COMBOS[idx % TOTAL_COMBOS],
    comboIndex: idx,
    totalCombos: TOTAL_COMBOS,
    progress: `${idx}/${TOTAL_COMBOS} (${((idx / TOTAL_COMBOS) * 100).toFixed(1)}%)`,
  };
}

/**
 * Verifica si el scheduler puede ejecutar (presupuesto + cap).
 * @param skipSundayCheck true para ignorar la restricción de domingo (usado por /run-now)
 */
export async function canRun(skipSundayCheck = false): Promise<{ allowed: boolean; reason?: string }> {
  await connectDB();
  const today = todayKey();
  const state = await SchedulerState.findById('main');

  if (!state || state.currentDay !== today) {
    return { allowed: true };
  }

  const spent = Math.round(state.dailyApifySpendUsd * 100) / 100;
  if (spent >= DAILY_APIFY_BUDGET_USD) {
    return { allowed: false, reason: `Presupuesto diario agotado: $${state.dailyApifySpendUsd.toFixed(2)}/$${DAILY_APIFY_BUDGET_USD.toFixed(2)}` };
  }

  if (DAILY_LEAD_CAP > 0 && state.dailyLeadsSaved >= DAILY_LEAD_CAP) {
    return { allowed: false, reason: `Cap diario alcanzado: ${state.dailyLeadsSaved}/${DAILY_LEAD_CAP} leads` };
  }

  // No ejecutar domingos (Costa Rica UTC-6) — salvo que se fuerce
  if (!skipSundayCheck) {
    const now = new Date();
    const crDay = new Date(now.getTime() - 6 * 60 * 60 * 1000).getDay();
    if (crDay === 0) {
      return { allowed: false, reason: 'Domingo — día de descanso' };
    }
  }

  return { allowed: true };
}

/**
 * Resetea los contadores diarios manualmente (comando /reset-daily).
 * NO mueve el comboIndex — solo limpia gasto, leads y runs del día.
 */
export async function resetDailyCounters(): Promise<{
  previousSpend: number;
  previousLeads: number;
  previousRuns: number;
}> {
  await connectDB();
  const state = await SchedulerState.findById('main');
  const prev = {
    previousSpend: state?.dailyApifySpendUsd || 0,
    previousLeads: state?.dailyLeadsSaved || 0,
    previousRuns: state?.dailyApifyRuns || 0,
  };

  await SchedulerState.findByIdAndUpdate('main', {
    $set: {
      dailyLeadsSaved: 0,
      dailyApifySpendUsd: 0,
      dailyApifyRuns: 0,
      dailyWebsGenerated: 0,
      currentDay: todayKey(),
    },
  }, { upsert: true });

  return prev;
}
