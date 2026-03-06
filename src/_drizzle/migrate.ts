/* eslint-disable no-console */
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import config from './drizzle.config';
import { db, neonPool, pgPool } from './db';

(async () => {
  if (process.env.DB_MIGRATING !== 'true') {
    throw new Error(
      '❌ Migration aborted: set DB_MIGRATING="true" before running this script.'
    );
  }

  console.log(`Running migrations from: ${config.out}`);

  try {
    await migrate(db, { migrationsFolder: config.out! });
    console.log('[✓] migrations applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    if (process.env.NODE_ENV === 'production') {
      await neonPool.end();
    } else {
      await pgPool.end();
    }
    console.log('🔒 Database connections closed');
  }
})();
