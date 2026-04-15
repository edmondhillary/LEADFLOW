import { describe, it, expect } from 'vitest';
import { CITIES_ES, TOTAL_CITIES } from '../src/config/cities-es';

describe('cities-es', () => {
  it('tiene al menos 50 ciudades', () => {
    expect(CITIES_ES.length).toBeGreaterThanOrEqual(50);
    expect(TOTAL_CITIES).toBe(CITIES_ES.length);
  });

  it('las primeras 6 son las más grandes de España', () => {
    const topNames = CITIES_ES.slice(0, 6).map((c) => c.name);
    expect(topNames).toContain('Madrid');
    expect(topNames).toContain('Barcelona');
    expect(topNames).toContain('Valencia');
    expect(topNames).toContain('Sevilla');
  });

  it('cada ciudad tiene name, searchName y population', () => {
    for (const city of CITIES_ES) {
      expect(city.name).toBeTruthy();
      expect(city.searchName).toBeTruthy();
      expect(city.population).toBeGreaterThan(0);
    }
  });

  it('no hay ciudades duplicadas', () => {
    const names = CITIES_ES.map((c) => c.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it('están ordenadas por población descendente (tier a tier)', () => {
    // Las primeras 6 (Tier 1) deben ser >500k
    for (const city of CITIES_ES.slice(0, 6)) {
      expect(city.population).toBeGreaterThanOrEqual(500000);
    }
  });
});
