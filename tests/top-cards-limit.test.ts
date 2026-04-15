import { describe, it, expect } from 'vitest';

describe('top cards limit — lógica de selección', () => {
  const MAX_CARDS = 15;

  interface Lead {
    businessName: string;
    reviewRating: number;
    reviewCount: number;
  }

  function selectTopLeads(leads: Lead[]): { top: Lead[]; remaining: number } {
    const sorted = [...leads].sort((a, b) => {
      if (b.reviewRating !== a.reviewRating) return b.reviewRating - a.reviewRating;
      return b.reviewCount - a.reviewCount;
    });
    const top = sorted.slice(0, MAX_CARDS);
    return { top, remaining: Math.max(0, leads.length - MAX_CARDS) };
  }

  it('devuelve máximo 15 cards', () => {
    const leads = Array.from({ length: 50 }, (_, i) => ({
      businessName: `Lead ${i}`,
      reviewRating: Math.random() * 5,
      reviewCount: Math.floor(Math.random() * 200),
    }));

    const { top, remaining } = selectTopLeads(leads);
    expect(top).toHaveLength(15);
    expect(remaining).toBe(35);
  });

  it('devuelve todas si hay menos de 15', () => {
    const leads = Array.from({ length: 8 }, (_, i) => ({
      businessName: `Lead ${i}`,
      reviewRating: 4.5,
      reviewCount: 100,
    }));

    const { top, remaining } = selectTopLeads(leads);
    expect(top).toHaveLength(8);
    expect(remaining).toBe(0);
  });

  it('ordena por rating descendente, luego por reviews', () => {
    const leads: Lead[] = [
      { businessName: 'Bajo rating', reviewRating: 3.0, reviewCount: 500 },
      { businessName: 'Alto rating pocas reviews', reviewRating: 5.0, reviewCount: 10 },
      { businessName: 'Alto rating muchas reviews', reviewRating: 5.0, reviewCount: 200 },
      { businessName: 'Medio rating', reviewRating: 4.0, reviewCount: 100 },
    ];

    const { top } = selectTopLeads(leads);
    expect(top[0].businessName).toBe('Alto rating muchas reviews');
    expect(top[1].businessName).toBe('Alto rating pocas reviews');
    expect(top[2].businessName).toBe('Medio rating');
    expect(top[3].businessName).toBe('Bajo rating');
  });

  it('remaining es 0 cuando hay exactamente 15', () => {
    const leads = Array.from({ length: 15 }, (_, i) => ({
      businessName: `Lead ${i}`,
      reviewRating: 4.0,
      reviewCount: 50,
    }));

    const { top, remaining } = selectTopLeads(leads);
    expect(top).toHaveLength(15);
    expect(remaining).toBe(0);
  });

  it('remaining es 0 cuando no hay leads', () => {
    const { top, remaining } = selectTopLeads([]);
    expect(top).toHaveLength(0);
    expect(remaining).toBe(0);
  });
});
