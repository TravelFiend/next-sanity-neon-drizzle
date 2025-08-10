import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

const USER = process.env.DB_USERNAME;
const PW = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

export const DATABASE_URL = `postgresql://${USER}:${PW}@${HOST}:${PORT}/${DB_NAME}`;

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL
  }
});
