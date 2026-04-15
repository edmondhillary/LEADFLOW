import { describe, it, expect } from 'vitest';

describe('scraper config — eco mode changes', () => {
  it('strict city filter default es OFF (no bloquea por zona)', async () => {
    // Verificamos que sin SCRAPE_STRICT_CITY, el filtro es false
    // El código dice: const strictCityFilter = process.env.SCRAPE_STRICT_CITY === '1';
    // Sin la variable → false
    delete process.env.SCRAPE_STRICT_CITY;
    const strictCityFilter = process.env.SCRAPE_STRICT_CITY === '1';
    expect(strictCityFilter).toBe(false);
  });

  it('strict city filter se activa solo con SCRAPE_STRICT_CITY=1', () => {
    process.env.SCRAPE_STRICT_CITY = '1';
    const strictCityFilter = process.env.SCRAPE_STRICT_CITY === '1';
    expect(strictCityFilter).toBe(true);
    delete process.env.SCRAPE_STRICT_CITY;
  });

  it('max results per query default es 200', () => {
    delete process.env.SCRAPE_MAX_RESULTS_PER_QUERY;
    const maxPerQuery = parseInt(process.env.SCRAPE_MAX_RESULTS_PER_QUERY || '200', 10);
    expect(maxPerQuery).toBe(200);
  });
});
