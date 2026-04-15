import { describe, it, expect } from 'vitest';
import { formatAutoReport } from '../src/bot/auto-pipeline';
import type { AutoPipelineResult } from '../src/bot/auto-pipeline';

describe('auto-pipeline — formatAutoReport', () => {
  it('muestra mensaje de pausa cuando skippedReason', () => {
    const result: AutoPipelineResult = {
      success: false,
      combosRun: 0,
      totalScraped: 0,
      newLeadsSaved: 0,
      websGenerated: 0,
      estimatedCostUsd: 0,
      details: [],
      skippedReason: 'Presupuesto diario agotado',
    };

    const report = formatAutoReport(result);
    expect(report).toContain('pausado');
    expect(report).toContain('Presupuesto diario agotado');
  });

  it('muestra totales cuando success', () => {
    const result: AutoPipelineResult = {
      success: true,
      combosRun: 2,
      totalScraped: 300,
      newLeadsSaved: 80,
      websGenerated: 45,
      estimatedCostUsd: 2.1,
      details: [
        {
          sector: 'fontanero',
          city: 'Madrid',
          scraped: 180,
          newLeads: 50,
          websGenerated: 25,
          errors: [],
        },
        {
          sector: 'electricista',
          city: 'Madrid',
          scraped: 120,
          newLeads: 30,
          websGenerated: 20,
          errors: ['Negocio X: timeout'],
        },
      ],
    };

    const report = formatAutoReport(result);
    expect(report).toContain('AUTO-PIPELINE COMPLETADO');
    expect(report).toContain('fontanero');
    expect(report).toContain('electricista');
    expect(report).toContain('Madrid');
    expect(report).toContain('Leads scrapeados: 300');
    expect(report).toContain('Leads nuevos: 80');
    expect(report).toContain('Webs generadas: 45');
    expect(report).toContain('$2.10');
  });

  it('marca con ✅ combo sin errores', () => {
    const result: AutoPipelineResult = {
      success: true,
      combosRun: 1,
      totalScraped: 100,
      newLeadsSaved: 40,
      websGenerated: 30,
      estimatedCostUsd: 1.05,
      details: [
        {
          sector: 'dentista',
          city: 'Barcelona',
          scraped: 100,
          newLeads: 40,
          websGenerated: 30,
          errors: [],
        },
      ],
    };

    const report = formatAutoReport(result);
    expect(report).toContain('✅');
    expect(report).not.toContain('❌ Errores');
  });

  it('marca con ⚠️ combo con errores parciales', () => {
    const result: AutoPipelineResult = {
      success: true,
      combosRun: 1,
      totalScraped: 100,
      newLeadsSaved: 40,
      websGenerated: 20,
      estimatedCostUsd: 1.05,
      details: [
        {
          sector: 'dentista',
          city: 'Barcelona',
          scraped: 100,
          newLeads: 40,
          websGenerated: 20,
          errors: ['Error parcial'],
        },
      ],
    };

    const report = formatAutoReport(result);
    expect(report).toContain('⚠️');
  });

  it('marca con ❌ combo donde todos fallaron', () => {
    const result: AutoPipelineResult = {
      success: true,
      combosRun: 1,
      totalScraped: 100,
      newLeadsSaved: 40,
      websGenerated: 0,
      estimatedCostUsd: 1.05,
      details: [
        {
          sector: 'dentista',
          city: 'Barcelona',
          scraped: 100,
          newLeads: 40,
          websGenerated: 0,
          errors: ['Error total'],
        },
      ],
    };

    const report = formatAutoReport(result);
    expect(report).toContain('❌');
  });
});
