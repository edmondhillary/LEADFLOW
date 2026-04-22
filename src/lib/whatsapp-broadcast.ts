/**
 * Motor de broadcast por WhatsApp.
 *
 * Itera un filtro de Leads y envía un template a cada uno con:
 *   - Throttle: 80 msg/min (750ms entre envíos). Configurable.
 *   - Cancel: callback isCancelled() se consulta entre cada envío.
 *   - DRY_RUN: respeta WHATSAPP_DRY_RUN. En dry-run NO marca Lead.whatsappSentAt.
 *   - Skip policy: si buildParams devuelve null (lead incompleto), se skipea.
 *   - Error handling: reintenta 1 vez con backoff 2s en errores de red; falla silencioso en errores de Meta.
 *   - Progreso: callback onProgress(stats) cada N envíos.
 *
 * NO aborta el batch por errores individuales. Solo /broadcast_cancel lo frena.
 */

import { Lead, WhatsAppMessage, BroadcastRun } from './mongodb';
import { sendTemplate, cleanPhone, type WhatsAppResult } from './whatsapp';
import { buildLeadQuery, describeFilter, type BroadcastFilterSpec } from './broadcast-filters';

export interface BroadcastProgress {
  totalTargets: number;
  processed: number;
  sent: number;
  skipped: number;
  failed: number;
  currentLead?: string;
  etaSeconds?: number;
}

export interface BroadcastOpts {
  /** Spec de filtro — se convierte en query Mongo */
  filter: BroadcastFilterSpec;
  /** Nombre del template aprobado en Meta (ej. 'web_lista') */
  template: string;
  /** Idioma del template (ej. 'es') */
  templateLang?: string;
  /**
   * Devuelve los params del template para un lead concreto, o null si hay que skipear.
   * Ej. para web_lista: (lead) => lead.slug ? [lead.businessName, lead.businessName, url] : null
   */
  buildParams: (lead: LeadDoc) => string[] | null;
  /** Tope de msg/min. Default 80. */
  ratePerMinute?: number;
  /** Callback de progreso — se llama cada `progressEvery` leads procesados. */
  onProgress?: (p: BroadcastProgress) => Promise<void> | void;
  progressEvery?: number;
  /** Callback que indica si hay que cancelar. Se consulta entre envíos. */
  isCancelled?: () => boolean;
  /** Iniciador del broadcast (solo telemetría). */
  initiator?: string;
}

export interface BroadcastResult {
  runId: string;
  status: 'done' | 'cancelled' | 'error';
  totalTargets: number;
  sent: number;
  skipped: number;
  failed: number;
  errors: Array<{ leadId: string; businessName: string; reason: string }>;
  dryRun: boolean;
  durationMs: number;
}

// Tipo mínimo del documento de Lead que el engine necesita ver
type LeadDoc = {
  _id: { toString(): string };
  businessName?: string;
  phone?: string;
  slug?: string;
  sector?: string;
  city?: string;
};

export async function countTargets(filter: BroadcastFilterSpec): Promise<number> {
  const { query, limit } = buildLeadQuery(filter);
  const n = await Lead.countDocuments(query);
  return limit ? Math.min(n, limit) : n;
}

export async function previewTargets(filter: BroadcastFilterSpec, size = 5): Promise<Array<{ _id: string; businessName?: string; city?: string; sector?: string }>> {
  const { query, limit } = buildLeadQuery(filter);
  const docs = await Lead.find(query)
    .select('_id businessName city sector')
    .limit(Math.min(size, limit || size))
    .lean<Array<{ _id: unknown; businessName?: string; city?: string; sector?: string }>>();
  return docs.map((d) => ({
    _id: String(d._id),
    businessName: d.businessName,
    city: d.city,
    sector: d.sector,
  }));
}

export async function runBroadcast(opts: BroadcastOpts): Promise<BroadcastResult> {
  const startedAt = new Date();
  const t0 = Date.now();
  const isDryRun = process.env.WHATSAPP_DRY_RUN !== 'false';
  const dryRunNumber = process.env.WHATSAPP_DRY_RUN_NUMBER || '+34617680026';
  const ratePerMinute = opts.ratePerMinute ?? 80;
  const throttleMs = Math.ceil(60_000 / ratePerMinute);
  const progressEvery = opts.progressEvery ?? 5;

  const { query, limit } = buildLeadQuery(opts.filter);
  const totalTargets = await countTargets(opts.filter);

  const run = await BroadcastRun.create({
    template: opts.template,
    templateLang: opts.templateLang || 'es',
    filter: opts.filter,
    totalTargets,
    dryRun: isDryRun,
    status: 'running',
    startedAt,
    initiator: opts.initiator || 'telegram',
  });
  const runId = String(run._id);

  const stats: BroadcastProgress = {
    totalTargets,
    processed: 0,
    sent: 0,
    skipped: 0,
    failed: 0,
  };
  const errors: BroadcastResult['errors'] = [];

  console.log(
    `[broadcast] run=${runId} template=${opts.template} dryRun=${isDryRun} ` +
    `filter=${describeFilter(opts.filter)} targets=${totalTargets} rate=${ratePerMinute}/min`
  );

  const cursor = Lead.find(query).cursor();
  let cancelled = false;
  let processedInCursor = 0;

  try {
    for (let leadDoc = await cursor.next(); leadDoc; leadDoc = await cursor.next()) {
      if (limit && processedInCursor >= limit) break;
      processedInCursor++;

      if (opts.isCancelled?.()) {
        cancelled = true;
        break;
      }

      const lead = leadDoc as unknown as LeadDoc;
      const leadId = lead._id.toString();
      const businessName = lead.businessName || '(sin nombre)';
      stats.currentLead = businessName;
      const sendStart = Date.now();

      try {
        // Gate 1 — teléfono
        if (!lead.phone) {
          stats.skipped++;
          errors.push({ leadId, businessName, reason: 'sin teléfono' });
          continue;
        }

        // Gate 2 — params del template
        const params = opts.buildParams(lead);
        if (params === null) {
          stats.skipped++;
          errors.push({ leadId, businessName, reason: 'lead incompleto (params null)' });
          continue;
        }

        const targetPhone = isDryRun ? dryRunNumber : lead.phone;
        const result = await sendWithRetry({
          to: targetPhone,
          templateName: opts.template,
          languageCode: opts.templateLang || 'es',
          params,
        });

        if (!result.success) {
          stats.failed++;
          errors.push({ leadId, businessName, reason: result.error || 'error desconocido' });
          continue;
        }

        // Log outbound
        try {
          await WhatsAppMessage.create({
            leadId,
            wamid: result.messageId,
            phone: cleanPhone(targetPhone),
            direction: 'outbound',
            type: 'text',
            template: opts.template,
            params,
            status: 'sent',
            broadcastRunId: run._id,
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn(`[broadcast] no pude guardar WhatsAppMessage outbound leadId=${leadId}: ${msg}`);
        }

        // En producción marcamos el lead. En dry-run NO — así el mismo lead puede recibir el broadcast real después.
        if (!isDryRun && result.messageId) {
          try {
            await Lead.findByIdAndUpdate(leadId, {
              whatsappMessageId: result.messageId,
              whatsappSentAt: new Date(),
            });
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            console.warn(`[broadcast] no pude actualizar lead ${leadId}: ${msg}`);
          }
        }

        stats.sent++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        stats.failed++;
        errors.push({ leadId, businessName, reason: msg });
        console.error(`[broadcast] excepción leadId=${leadId}: ${msg}`);
      } finally {
        stats.processed++;

        // Progreso + persistencia en BroadcastRun
        if (stats.processed % progressEvery === 0 || stats.processed === totalTargets) {
          const elapsedMs = Date.now() - t0;
          const msPerLead = elapsedMs / Math.max(stats.processed, 1);
          const remaining = Math.max(totalTargets - stats.processed, 0);
          stats.etaSeconds = Math.round((remaining * msPerLead) / 1000);

          await BroadcastRun.findByIdAndUpdate(run._id, {
            sent: stats.sent,
            skipped: stats.skipped,
            failed: stats.failed,
          }).catch(() => { /* non-fatal */ });

          try { await opts.onProgress?.({ ...stats }); } catch { /* non-fatal */ }
        }

        // Throttle — medido sobre el envío completo (incluye retries + I/O)
        const elapsed = Date.now() - sendStart;
        if (elapsed < throttleMs) {
          await sleep(throttleMs - elapsed);
        }
      }
    }
  } finally {
    await cursor.close().catch(() => { /* ignore */ });
  }

  const finishedAt = new Date();
  const finalStatus: BroadcastResult['status'] = cancelled ? 'cancelled' : 'done';

  await BroadcastRun.findByIdAndUpdate(run._id, {
    status: finalStatus,
    sent: stats.sent,
    skipped: stats.skipped,
    failed: stats.failed,
    finishedAt,
    errorLog: errors.slice(0, 50), // cap a 50 errores guardados
    cancelRequestedAt: cancelled ? new Date() : undefined,
  }).catch((e) => console.error('[broadcast] failed to update final state:', e?.message || e));

  return {
    runId,
    status: finalStatus,
    totalTargets,
    sent: stats.sent,
    skipped: stats.skipped,
    failed: stats.failed,
    errors,
    dryRun: isDryRun,
    durationMs: finishedAt.getTime() - t0,
  };
}

async function sendWithRetry(opts: {
  to: string;
  templateName: string;
  languageCode: string;
  params: string[];
}): Promise<WhatsAppResult> {
  const first = await sendTemplate(opts);
  if (first.success) return first;

  // Solo retry para errores probables de red/transient
  const transientHints = ['fetch', 'network', 'timeout', 'ECONN', 'ENOTFOUND', 'socket'];
  const err = (first.error || '').toLowerCase();
  if (!transientHints.some((h) => err.includes(h.toLowerCase()))) {
    return first;
  }

  await sleep(2000);
  return sendTemplate(opts);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Builder de params default para web_lista ────────────────────────────────
// Exportado para que el bot lo reuse sin duplicar lógica.

export function webListaParams(lead: LeadDoc): string[] | null {
  if (!lead.businessName || !lead.slug) return null;
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://leadflow.es';
  const url = `${base}/${lead.slug}`;
  return [lead.businessName, lead.businessName, url];
}
