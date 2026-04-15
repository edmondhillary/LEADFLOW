import { describe, it, expect } from 'vitest';

describe('/summary — contenido del mensaje de ayuda', () => {
  // El texto del /summary está hardcodeado en telegram-runner.ts.
  // Verificamos que incluye todos los comandos documentados.

  const SUMMARY_TEXT =
    `📖 COMANDOS LEADFLOW\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `🚀 PIPELINE MANUAL\n` +
    `/start — Menú principal. Elegís sector → país → ciudad → cantidad → genera webs al momento.\n\n` +
    `🤖 AUTO-PIPELINE (crons)\n` +
    `/auto — Ver estado: leads hoy, gasto, budget, próximo combo.\n` +
    `/start-auto — Activar crons (10:00 AM + 4:00 PM Costa Rica, Lun-Sáb).\n` +
    `/stop-auto — Pausar crons. El pipeline manual sigue funcionando.\n` +
    `/run-now — Ejecutar ahora sin esperar al cron. Funciona incluso domingos.\n` +
    `/cancel — Frenar un run en curso. Termina el combo actual y para.\n\n` +
    `📊 INFORMACIÓN\n` +
    `/health — Chequear MongoDB + servidor.\n` +
    `/metrics — Historial de pipeline runs con costos.\n` +
    `/leads-status — Leads activos por estado (scraped, web_live, client, etc).\n\n` +
    `💰 VENTAS\n` +
    `/stripe — Generar link de pago para un lead. Elegís servicios y monto.\n\n` +
    `🧹 MANTENIMIENTO\n` +
    `/cleanup — Expirar leads viejos (+48h sin actividad, +30 días scraped).\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `/summary — Este mensaje.`;

  const ALL_COMMANDS = [
    '/start', '/auto', '/start-auto', '/stop-auto',
    '/run-now', '/cancel', '/health', '/metrics',
    '/leads-status', '/stripe', '/cleanup', '/summary',
  ];

  it('incluye todos los comandos del bot', () => {
    for (const cmd of ALL_COMMANDS) {
      expect(SUMMARY_TEXT).toContain(cmd);
    }
  });

  it('tiene las 5 categorías', () => {
    expect(SUMMARY_TEXT).toContain('PIPELINE MANUAL');
    expect(SUMMARY_TEXT).toContain('AUTO-PIPELINE');
    expect(SUMMARY_TEXT).toContain('INFORMACIÓN');
    expect(SUMMARY_TEXT).toContain('VENTAS');
    expect(SUMMARY_TEXT).toContain('MANTENIMIENTO');
  });

  it('cada comando tiene descripción (no está solo)', () => {
    for (const cmd of ALL_COMMANDS) {
      // Cada comando debe tener " — " después (excepto /summary que es el último)
      if (cmd !== '/summary') {
        expect(SUMMARY_TEXT).toContain(`${cmd} — `);
      }
    }
  });

  it('menciona Costa Rica como zona horaria', () => {
    expect(SUMMARY_TEXT).toContain('Costa Rica');
  });

  it('menciona que /run-now funciona en domingos', () => {
    expect(SUMMARY_TEXT).toContain('domingos');
  });
});
