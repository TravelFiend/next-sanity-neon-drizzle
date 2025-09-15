// src/_drizzle/db.ts
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

if (process.env.NODE_ENV === 'production') {
  const pool = new NeonPool({ connectionString: process.env.DATABASE_URL! });
  db = drizzleNeon<typeof schema>({
    client: pool,
    schema,
    casing: 'snake_case'
  });
} else {
  const pool = new PgPool({ connectionString: process.env.DATABASE_URL! });
  db = drizzlePg<typeof schema>(pool, { schema, casing: 'snake_case' });
}

export { db };
export type DB = typeof db;
