/**
 * Reset completo de la base de datos LeadFlow
 * Uso: npx tsx scripts/reset-db.ts
 */
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

async function reset() {
  console.log('🔌 Conectando a MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Conectado\n');

  const collections = ['leads', 'competitors', 'websitecontents'];

  for (const col of collections) {
    try {
      const result = await mongoose.connection.collection(col).deleteMany({});
      console.log(`🗑️  ${col}: ${result.deletedCount} documentos eliminados`);
    } catch {
      console.log(`⚠️  ${col}: no existe o ya está vacía`);
    }
  }

  await mongoose.disconnect();
  console.log('\n✅ Base de datos reseteada. Lista para empezar de cero.');
}

reset().catch(console.error);
