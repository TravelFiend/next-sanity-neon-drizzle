import { config } from 'dotenv';
import { Pool as PgPool } from 'pg';
import { neonConfig, Pool as NeonPool } from '@neondatabase/serverless';
import {
  type NodePgDatabase,
  drizzle as drizzlePg
} from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import * as schema from './schemas';
import ws from 'ws';

config({ path: '.env.local' });
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment');
}

let db: NodePgDatabase<typeof schema>;

export const neonPool = new NeonPool({
  max: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined,
  connectionString: process.env.DATABASE_URL!
});

export const pgPool = new PgPool({
  max: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined,
  connectionString: process.env.DATABASE_URL!
});

if (process.env.NODE_ENV === 'production') {
  db = drizzleNeon<typeof schema>({
    client: neonPool,
    schema,
    casing: 'snake_case'
  });
} else {
  db = drizzlePg<typeof schema>(pgPool, { schema, casing: 'snake_case' });
}

export { db };
export type DB = typeof db;
