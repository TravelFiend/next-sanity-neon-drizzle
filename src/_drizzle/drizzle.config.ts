import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export default defineConfig({
  schema: './src/_drizzle/schemas/index.ts',
  out: './src/_drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL
  },
  verbose: true,
  strict: true,
  casing: 'snake_case'
});
