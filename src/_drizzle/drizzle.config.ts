import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/_drizzle/schemas/index.ts',
  out: './src/_drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true,
  strict: true
});
