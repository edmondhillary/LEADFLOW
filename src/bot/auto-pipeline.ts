/**
 * AUTO-PIPELINE — Ejecución automática del pipeline LeadFlow
 *
 * Se llama desde el cron del telegram-runner.
 * 1. Obtiene el siguiente batch de combos sector+ciudad
 * 2. Ejecuta scrape + generación de webs
 * 3. Envía reporte a Telegram
 * 4. Actualiza contadores del scheduler
 */

import { runPipeline } from '../../skills/generate';
import { connectDB, Lead, PipelineRun } from '../lib/mongodb';
import {
  getNextBatch,
  recordRunResult,
  getDailyStats,
  canRun,
  APIFY_COST_PER_RUN_USD,
} from '../lib/scrape-scheduler';

export interface AutoPipelineResult {
  success: boolean;
  combosRun: number;
  totalScraped: number;
  newLeadsSaved: number;
  websGenerated: number;
  estimatedCostUsd: number;
  details: Array<{
    sector: string;
    city: string;
    scraped: number;
    newLeads: number;
    websGenerated: number;
    errors: string[];
  }>;
  skippedReason?: string;
}

/**
 * Ejecuta combos hasta alcanzar el target de webs o agotar presupuesto.
 * @param targetWebs Webs objetivo por run (default 50)
 * @param maxCombos Máximo de combos a intentar para alcanzar el target (default 10)
 * @param isCancelled Callback que devuelve true si el usuario pidió cancelar
 * @param skipSundayCheck true para ignorar la restricción de domingo
 */
export async function runAutoPipeline(
  targetWebs = 50,
  maxCombos = 10,
  isCancelled: () => boolean = () => false,
  skipSundayCheck = false,
): Promise<AutoPipelineResult> {
  // 1. Verificar si podemos ejecutar
  const check = await canRun(skipSundayCheck);
  if (!check.allowed) {
    return {
      success: false,
      combosRun: 0,
      totalScraped: 0,
      newLeadsSaved: 0,
      websGenerated: 0,
      estimatedCostUsd: 0,
      details: [],
      skippedReason: check.reason,
    };
  }

  let totalScraped = 0;
  let totalNewLeads = 0;
  let totalWebsGenerated = 0;
  let totalCost = 0;
  const details: AutoPipelineResult['details'] = [];
  let combosAttempted = 0;

  // 2. Seguir procesando combos hasta alcanzar el target de webs
  while (totalWebsGenerated < targetWebs && combosAttempted < maxCombos) {
    // Check cancelación entre combos
    if (isCancelled()) {
      break;
    }

    // Check presupuesto antes de cada combo
    const midCheck = await canRun(skipSundayCheck);
    if (!midCheck.allowed) {
      break;
    }

    // Obtener siguiente combo
    const batch = await getNextBatch(1);
    if (batch.combos.length === 0) {
      break;
    }

    const combo = batch.combos[0];
    combosAttempted++;
    const comboDetail: AutoPipelineResult['details'][0] = {
      sector: combo.sector,
      city: combo.city,
      scraped: 0,
      newLeads: 0,
      websGenerated: 0,
      errors: [],
    };

    let comboNewLeads = 0;
    let comboCost = 0;
    let comboWebs = 0;

    try {
      // Contar leads ANTES para saber cuántos son nuevos
      await connectDB();
      const beforeCount = await Lead.countDocuments({
        sector: combo.sector,
        city: { $regex: new RegExp(combo.city, 'i') },
        country: combo.country,
      });

      // Pipeline unificado: scrape + filtro + generación de webs
      // (runPipeline ya hace runScraper internamente — no duplicar)
      const websRemaining = targetWebs - totalWebsGenerated;
      const pipelineResults = await runPipeline({
        sector: combo.sector,
        city: combo.city,
        country: combo.country,
        limit: Math.max(websRemaining, 1),
        skipDesignScraper: true,
      });

      // Contar cuántos NUEVOS (diferencia)
      const afterCount = await Lead.countDocuments({
        sector: combo.sector,
        city: { $regex: new RegExp(combo.city, 'i') },
        country: combo.country,
      });
      comboNewLeads = afterCount - beforeCount;
      comboDetail.newLeads = comboNewLeads;
      totalNewLeads += comboNewLeads;

      // Métricas REALES de Apify desde la telemetría del pipeline
      const latestRun = await PipelineRun.findOne({
        sector: combo.sector,
        city: combo.city,
        country: combo.country,
      }).sort({ finishedAt: -1 }).lean() as any;

      const actualApifyRuns = latestRun?.apifyRuns || 1;
      comboDetail.scraped = latestRun?.totalScraped || 0;
      totalScraped += comboDetail.scraped;

      const successWebs = pipelineResults.filter((r) => !r.error).length;
      const failedWebs = pipelineResults.filter((r) => r.error);
      comboDetail.websGenerated = successWebs;
      comboDetail.errors = failedWebs.map((r) => `${r.businessName}: ${r.error}`);
      comboWebs = successWebs;
      totalWebsGenerated += successWebs;

      // Costo REAL basado en runs reales de Apify (no 1 fijo)
      comboCost = actualApifyRuns * APIFY_COST_PER_RUN_USD;
      totalCost += comboCost;
    } catch (err: any) {
      comboDetail.errors.push(err.message || String(err));
      comboCost = APIFY_COST_PER_RUN_USD;
      totalCost += comboCost;
    }

    details.push(comboDetail);

    // Registrar DESPUÉS de cada combo para que getNextBatch() y canRun()
    // lean el estado actualizado en la siguiente iteración
    await recordRunResult({
      newLeadsSaved: comboNewLeads,
      apifyCostUsd: comboCost,
      websGenerated: comboWebs,
      combosProcessed: 1,
    });
  }

  return {
    success: true,
    combosRun: details.length,
    totalScraped,
    newLeadsSaved: totalNewLeads,
    websGenerated: totalWebsGenerated,
    estimatedCostUsd: totalCost,
    details,
  };
}

/**
 * Formatea el resultado del auto-pipeline para Telegram (Markdown).
 */
export function formatAutoReport(result: AutoPipelineResult): string {
  if (!result.success) {
    return `⏸️ *Auto-Pipeline pausado*\n\n${result.skippedReason}`;
  }

  const lines: string[] = [
    `🤖 *AUTO-PIPELINE COMPLETADO*`,
    '',
  ];

  for (const d of result.details) {
    const status = d.errors.length === 0 ? '✅' : d.errors.length < d.websGenerated ? '⚠️' : '❌';
    lines.push(`${status} *${d.sector}* · ${d.city}`);
    lines.push(`   📊 Scraped: ${d.scraped} | Nuevos: ${d.newLeads} | Webs: ${d.websGenerated}`);
    if (d.errors.length > 0) {
      lines.push(`   ❌ Errores: ${d.errors.length}`);
    }
  }

  lines.push('');
  lines.push(`📈 *TOTALES*`);
  lines.push(`   Leads scrapeados: ${result.totalScraped}`);
  lines.push(`   Leads nuevos: ${result.newLeadsSaved}`);
  lines.push(`   Webs generadas: ${result.websGenerated}`);
  lines.push(`   Costo Apify: ~$${result.estimatedCostUsd.toFixed(2)}`);

  return lines.join('\n');
}

/**
 * Formatea el reporte diario completo.
 */
export async function formatDailyReport(): Promise<string> {
  const stats = await getDailyStats();

  const lines = [
    `📊 *REPORTE DIARIO LEADFLOW*`,
    '',
    `🔍 Leads hoy: *${stats.leadsToday}*`,
    `🌐 Webs generadas: *${stats.websToday}*`,
    `💸 Gasto Apify: *$${stats.apifySpend.toFixed(2)}* / $${(stats.budgetRemaining + stats.apifySpend).toFixed(2)}`,
    `🔁 Runs Apify: *${stats.apifyRuns}*`,
    `💰 Budget restante: *$${stats.budgetRemaining.toFixed(2)}*`,
    '',
    `📍 Próximo combo: *${stats.nextCombo.sector}* · ${stats.nextCombo.city}`,
    `📈 Progreso total: ${stats.progress}`,
  ];

  return lines.join('\n');
}
