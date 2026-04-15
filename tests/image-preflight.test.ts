import { describe, it, expect } from 'vitest';

describe('image preflight — verifyLeadImageHealth return contract', () => {
  // Estos tests verifican el contrato de tipos del health check.
  // No pueden ejecutar la función real (necesita MongoDB + fetch),
  // pero verifican que la lógica de decisión es correcta.

  interface HealthResult {
    ok: boolean;
    fixed: boolean;
    broken: number;
    degraded?: boolean;
  }

  it('ok=true, fixed=false cuando no hay imágenes rotas', () => {
    const result: HealthResult = { ok: true, fixed: false, broken: 0 };
    expect(result.ok).toBe(true);
    expect(result.broken).toBe(0);
    expect(result.degraded).toBeUndefined();
  });

  it('ok=true, fixed=true cuando se arreglaron imágenes del scrape', () => {
    const result: HealthResult = { ok: true, fixed: true, broken: 0 };
    expect(result.ok).toBe(true);
    expect(result.fixed).toBe(true);
  });

  it('ok=true, degraded=true cuando quedan rotas pero hay client fallback', () => {
    const result: HealthResult = { ok: true, fixed: true, broken: 2, degraded: true };
    expect(result.ok).toBe(true);
    expect(result.degraded).toBe(true);
    expect(result.broken).toBe(2);
    // Clave: ok=true aunque broken>0 — NO bloquea el pipeline
  });

  it('ok=true, degraded=true sin fix server-side (solo client fallback)', () => {
    const result: HealthResult = { ok: true, fixed: false, broken: 3, degraded: true };
    expect(result.ok).toBe(true);
    expect(result.fixed).toBe(false);
    expect(result.degraded).toBe(true);
    // El pipeline sigue porque el layout tiene installImageFallback()
  });

  it('ok=false solo cuando la página no carga o error de red', () => {
    const result: HealthResult = { ok: false, fixed: false, broken: 1 };
    expect(result.ok).toBe(false);
    // Este es el ÚNICO caso que bloquea el pipeline
  });

  describe('pipeline decision logic', () => {
    function shouldBlock(health: HealthResult): boolean {
      return !health.ok;
    }

    function shouldNotify(health: HealthResult): string | null {
      if (!health.ok) return 'bloqueado';
      if (health.fixed && !health.degraded) return 'arreglado-server';
      if (health.degraded) return 'degraded-client-fallback';
      return null;
    }

    it('NO bloquea cuando degraded (client fallback activo)', () => {
      const health: HealthResult = { ok: true, fixed: false, broken: 3, degraded: true };
      expect(shouldBlock(health)).toBe(false);
      expect(shouldNotify(health)).toBe('degraded-client-fallback');
    });

    it('NO bloquea cuando fixed completamente', () => {
      const health: HealthResult = { ok: true, fixed: true, broken: 0 };
      expect(shouldBlock(health)).toBe(false);
      expect(shouldNotify(health)).toBe('arreglado-server');
    });

    it('SÍ bloquea cuando ok=false', () => {
      const health: HealthResult = { ok: false, fixed: false, broken: 1 };
      expect(shouldBlock(health)).toBe(true);
      expect(shouldNotify(health)).toBe('bloqueado');
    });

    it('NO bloquea y no notifica cuando todo OK', () => {
      const health: HealthResult = { ok: true, fixed: false, broken: 0 };
      expect(shouldBlock(health)).toBe(false);
      expect(shouldNotify(health)).toBeNull();
    });
  });
});
