import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export const DATABASE_URL = process.env.DATABASE_URL!;

export default defineConfig({
  schema: './src/drizzle/schemas/index.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL
  },
  verbose: true,
  strict: true
});
