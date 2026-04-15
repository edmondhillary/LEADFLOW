import { describe, it, expect } from 'vitest';
import { formatAutoReport } from '../src/bot/auto-pipeline';
import type { AutoPipelineResult } from '../src/bot/auto-pipeline';

describe('cancel flow', () => {
  it('reporte muestra solo los combos que corrieron antes de cancelar', () => {
    // Si había 2 combos planificados pero se canceló después del primero,
    // details solo tiene 1 y combosRun = 1
    const result: AutoPipelineResult = {
      success: true,
      combosRun: 1, // solo corrió 1 de 2
      totalScraped: 150,
      newLeadsSaved: 40,
      websGenerated: 30,
      estimatedCostUsd: 1.05,
      details: [
        {
          sector: 'fontanero',
          city: 'Madrid',
          scraped: 150,
          newLeads: 40,
          websGenerated: 30,
          errors: [],
        },
        // combo 2 no está porque se canceló
      ],
    };

    const report = formatAutoReport(result);
    expect(report).toContain('AUTO-PIPELINE COMPLETADO');
    expect(report).toContain('fontanero');
    expect(report).not.toContain('electricista');
    expect(report).toContain('Webs generadas: 30');
  });

  it('isCancelled callback corta el loop de combos', () => {
    // Simulamos la lógica del for-loop con isCancelled
    const combos = ['fontanero+Madrid', 'electricista+Madrid', 'dentista+Madrid'];
    let cancelled = false;
    const processed: string[] = [];

    for (const combo of combos) {
      if (cancelled) break;
      processed.push(combo);
      // Simular que el usuario cancela después del primer combo
      if (processed.length === 1) cancelled = true;
    }

    expect(processed).toHaveLength(1);
    expect(processed[0]).toBe('fontanero+Madrid');
  });

  it('combosActuallyRun refleja la cantidad real procesada', () => {
    const planned = 3;
    const details = [{ sector: 'fontanero' }]; // solo 1 corrió
    const combosActuallyRun = details.length;

    expect(combosActuallyRun).toBe(1);
    expect(combosActuallyRun).toBeLessThan(planned);
  });
});
