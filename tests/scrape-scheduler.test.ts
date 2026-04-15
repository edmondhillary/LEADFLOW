import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock mongoose y MongoDB antes de importar el scheduler
vi.mock('mongoose', async () => {
  const actual = await vi.importActual<typeof import('mongoose')>('mongoose');
  return {
    ...actual,
    default: {
      ...actual.default,
      models: {},
      model: vi.fn().mockReturnValue({
        findById: vi.fn(),
        findByIdAndUpdate: vi.fn(),
        create: vi.fn(),
        countDocuments: vi.fn(),
      }),
      Schema: actual.default.Schema,
    },
  };
});

vi.mock('../src/lib/mongodb', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
  Lead: {
    countDocuments: vi.fn().mockResolvedValue(0),
    find: vi.fn().mockReturnValue({ sort: vi.fn().mockReturnValue({ limit: vi.fn().mockResolvedValue([]) }) }),
  },
  PipelineRun: {},
  WebsiteContent: {},
}));

describe('scrape-scheduler — unit logic', () => {
  describe('combo generation', () => {
    it('genera combos sector × ciudad con todos los sectores', async () => {
      // Importamos dinámicamente para que los mocks se apliquen
      const { TOTAL_COMBOS } = await import('../src/lib/scrape-scheduler');
      const { SECTOR_SLUGS } = await import('../src/config/sectors');
      const { TOTAL_CITIES } = await import('../src/config/cities-es');

      expect(TOTAL_COMBOS).toBe(SECTOR_SLUGS.length * TOTAL_CITIES);
    });

    it('TOTAL_COMBOS es > 1000 (22 sectores × 60+ ciudades)', async () => {
      const { TOTAL_COMBOS } = await import('../src/lib/scrape-scheduler');
      expect(TOTAL_COMBOS).toBeGreaterThan(1000);
    });
  });

  describe('config defaults', () => {
    it('DAILY_LEAD_CAP default es 500', async () => {
      const { DAILY_LEAD_CAP } = await import('../src/lib/scrape-scheduler');
      expect(DAILY_LEAD_CAP).toBe(500);
    });

    it('DAILY_APIFY_BUDGET_USD default es 2.00', async () => {
      const { DAILY_APIFY_BUDGET_USD } = await import('../src/lib/scrape-scheduler');
      expect(DAILY_APIFY_BUDGET_USD).toBe(2.00);
    });

    it('LEADS_PER_QUERY default es 200', async () => {
      const { LEADS_PER_QUERY } = await import('../src/lib/scrape-scheduler');
      expect(LEADS_PER_QUERY).toBe(200);
    });
  });
});
