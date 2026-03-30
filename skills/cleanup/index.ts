/**
 * SKILL 6: LeadFlow Cleanup
 *
 * Expira leads que no han convertido después de 48 horas.
 * Marca como 'expired' los leads en estado 'email_sent' o 'visited'
 * que superaron el tiempo límite.
 *
 * También limpia leads 'scraped' muy antiguos (>30 días sin procesar).
 *
 * Uso: npx tsx skills/cleanup/index.ts
 * Cron: cada hora via n8n
 */

import { connectDB, Lead } from '../../src/lib/mongodb';

export async function runCleanup(): Promise<{
  expired: number;
  cleaned: number;
}> {
  await connectDB();

  const now = new Date();
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  console.log('\n🧹 Iniciando cleanup de LeadFlow...');
  console.log(`   Hora actual: ${now.toISOString()}`);

  // 1. Expirar leads que han pasado 48h sin convertir
  const expiredResult = await Lead.updateMany(
    {
      status: { $in: ['email_sent', 'visited'] },
      emailSentAt: { $lt: fortyEightHoursAgo },
    },
    {
      $set: { status: 'expired' },
    }
  );

  console.log(`⏰ Leads expirados (48h): ${expiredResult.modifiedCount}`);

  // 2. Limpiar leads scraped muy antiguos sin procesar (>30 días)
  const cleanedResult = await Lead.deleteMany({
    status: 'scraped',
    createdAt: { $lt: thirtyDaysAgo },
  });

  console.log(`🗑️  Leads scrapeados eliminados (>30 días): ${cleanedResult.deletedCount}`);

  // 3. Estadísticas del pipeline
  const stats = await Lead.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  console.log('\n📊 Estado del pipeline:');
  const statusEmojis: Record<string, string> = {
    scraped: '📋',
    analyzing: '🔍',
    generating: '🤖',
    web_live: '🌐',
    email_sent: '📧',
    visited: '👀',
    contacted: '📞',
    client: '🎉',
    expired: '⏰',
  };

  let total = 0;
  for (const stat of stats) {
    const emoji = statusEmojis[stat._id] || '❓';
    console.log(`   ${emoji} ${stat._id}: ${stat.count}`);
    total += stat.count;
  }
  console.log(`   📊 Total: ${total} leads`);

  // 4. Notificar a Telegram si hay leads expirados
  if (expiredResult.modifiedCount > 0 && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: `🧹 *Cleanup completado*\n\n⏰ Expirados: ${expiredResult.modifiedCount}\n🗑️ Limpiados: ${cleanedResult.deletedCount}\n📊 Total activos: ${total}`,
          parse_mode: 'Markdown',
        }),
      }
    );
  }

  return {
    expired: expiredResult.modifiedCount,
    cleaned: cleanedResult.deletedCount,
  };
}

// Ejecución directa desde CLI
if (require.main === module) {
  runCleanup()
    .then(({ expired, cleaned }) => {
      console.log(`\n🎉 Cleanup finalizado. Expirados: ${expired}, Limpiados: ${cleaned}`);
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}
