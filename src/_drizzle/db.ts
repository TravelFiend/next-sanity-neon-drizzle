// src/_drizzle/db.ts
import { config } from 'dotenv';
import { Pool } from 'pg';
import { neon } from '@neondatabase/serverless';
import {
  type NodePgDatabase,
  drizzle as drizzlePg
} from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import * as schema from './schemas';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment');
}

let db: NodePgDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzleNeon<typeof schema>(sql, { schema }) as unknown as NodePgDatabase<
    typeof schema
  >;
  console.warn('NODE_ENV:', process.env.NODE_ENV);
} else {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  db = drizzlePg<typeof schema>(pool, { schema });
}

export { db };
export type DB = typeof db;
