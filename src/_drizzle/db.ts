import { config } from 'dotenv';
import {
  type NodePgDatabase,
  drizzle as drizzlePg
} from 'drizzle-orm/node-postgres';
import {
  type NeonHttpDatabase,
  drizzle as drizzleNeon
} from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { neon } from '@neondatabase/serverless';
import * as schema from './schemas';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment');
}

type PgDB = NodePgDatabase<typeof schema>;
type NeonDB = NeonHttpDatabase<typeof schema>;
export type DB = PgDB | NeonDB;

const createDb = (): DB => {
  if (process.env.NODE_ENV === 'production') {
    const sql = neon(process.env.DATABASE_URL!);
    return drizzleNeon<typeof schema>(sql, { schema });
  } else {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
    return drizzlePg<typeof schema>(pool, { schema });
  }
};

export const db = createDb();
