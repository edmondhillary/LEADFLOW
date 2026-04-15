import { describe, it, expect } from 'vitest';

describe('sunday bypass — canRun(skipSundayCheck)', () => {
  // Testeamos la lógica de decisión sin MongoDB

  interface CanRunState {
    dailyApifySpendUsd: number;
    dailyLeadsSaved: number;
    isSunday: boolean;
  }

  const BUDGET = 5.50;
  const CAP = 200;

  function canRunLogic(state: CanRunState, skipSundayCheck = false): { allowed: boolean; reason?: string } {
    if (state.dailyApifySpendUsd >= BUDGET) {
      return { allowed: false, reason: `Presupuesto diario agotado` };
    }
    if (state.dailyLeadsSaved >= CAP) {
      return { allowed: false, reason: `Cap diario alcanzado` };
    }
    if (!skipSundayCheck && state.isSunday) {
      return { allowed: false, reason: 'Domingo — día de descanso' };
    }
    return { allowed: true };
  }

  it('bloquea domingo sin skipSundayCheck', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 0, dailyLeadsSaved: 0, isSunday: true });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Domingo');
  });

  it('permite domingo CON skipSundayCheck=true (/run-now)', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 0, dailyLeadsSaved: 0, isSunday: true }, true);
    expect(result.allowed).toBe(true);
  });

  it('bloquea presupuesto agotado INCLUSO con skipSundayCheck', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 6.00, dailyLeadsSaved: 0, isSunday: true }, true);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Presupuesto');
  });

  it('bloquea cap de leads INCLUSO con skipSundayCheck', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 0, dailyLeadsSaved: 200, isSunday: true }, true);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Cap');
  });

  it('permite lunes sin problemas', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 2.0, dailyLeadsSaved: 50, isSunday: false });
    expect(result.allowed).toBe(true);
  });

  it('permite sábado con presupuesto parcial', () => {
    const result = canRunLogic({ dailyApifySpendUsd: 4.0, dailyLeadsSaved: 150, isSunday: false });
    expect(result.allowed).toBe(true);
  });
});
