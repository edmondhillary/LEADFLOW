/**
 * Script: pipeline-metrics.ts
 * Muestra telemetría reciente del pipeline + resumen de coste/eficiencia.
 * Uso: npm run pipeline-metrics
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB, PipelineRun } from '../src/lib/mongodb';

function fmtUsd(value: number): string {
  return `$${(value || 0).toFixed(4)}`;
}

async function main() {
  await connectDB();

  const runs = await PipelineRun.find({})
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  if (!runs.length) {
    console.log('📭 No hay telemetría del pipeline todavía.');
    process.exit(0);
  }

  console.log(`\n📈 PIPELINE METRICS (${runs.length} ejecuciones recientes)\n`);
  console.log('═'.repeat(110));

  let totalRuns = 0;
  let totalApifyRuns = 0;
  let totalCandidates = 0;
  let totalWebs = 0;
  let totalErrors = 0;
  let totalCost = 0;

  for (const run of runs as any[]) {
    totalRuns++;
    totalApifyRuns += Number(run.apifyRuns || 0);
    totalCandidates += Number(run.candidateLeads || 0);
    totalWebs += Number(run.generatedWebs || 0);
    totalErrors += Number(run.failedWebs || 0);
    totalCost += Number(run.estimatedCostUsd || 0);

    const createdAt = run.createdAt ? new Date(run.createdAt).toISOString().replace('T', ' ').slice(0, 19) : 'n/a';
    console.log(`\n🕒 ${createdAt} | ${run.status?.toUpperCase() || 'N/A'} | ${run.sector}/${run.city}/${run.country}`);
    console.log(
      `   apify_runs=${run.apifyRuns || 0}` +
      ` | candidatos=${run.candidateLeads || 0}` +
      ` | webs=${run.generatedWebs || 0}` +
      ` | errores=${run.failedWebs || 0}`,
    );
    console.log(
      `   coste_est=${fmtUsd(Number(run.estimatedCostUsd || 0))}` +
      ` | coste/web=${fmtUsd(Number(run.estimatedCostPerWebUsd || 0))}` +
      ` | duracion_ms=${run.durationMs || 0}`,
    );
    if (run.notes?.length) {
      console.log(`   notes: ${run.notes.slice(0, 5).join(', ')}`);
    }
    if (run.error) {
      console.log(`   error: ${String(run.error).slice(0, 180)}`);
    }
  }

  console.log(`\n${'═'.repeat(110)}`);
  const avgCostPerRun = totalRuns > 0 ? totalCost / totalRuns : 0;
  const avgCostPerWeb = totalWebs > 0 ? totalCost / totalWebs : 0;

  console.log('📊 RESUMEN GLOBAL (últimas 30 ejecuciones):');
  console.log(`   Runs: ${totalRuns}`);
  console.log(`   Apify runs: ${totalApifyRuns}`);
  console.log(`   Candidatos válidos: ${totalCandidates}`);
  console.log(`   Webs generadas: ${totalWebs}`);
  console.log(`   Errores de generación: ${totalErrors}`);
  console.log(`   Coste estimado total: ${fmtUsd(totalCost)}`);
  console.log(`   Coste estimado medio/run: ${fmtUsd(avgCostPerRun)}`);
  console.log(`   Coste estimado medio/web: ${fmtUsd(avgCostPerWeb)}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error leyendo métricas de pipeline:', err?.message || String(err));
  process.exit(1);
});
