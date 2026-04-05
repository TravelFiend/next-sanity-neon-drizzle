 
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { seedAddresses } from './location/addressesSeed';
import { seedUserOAuthAccounts } from './user/userOAuthAccountsSeed';
import { seedUsers } from './user/usersSeed';

const truncateAll = async () => {
  // truncate in order respecting foreign key dependencies
  await db.execute(sql`
    TRUNCATE TABLE user_oauth_accounts RESTART IDENTITY CASCADE;
    TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    TRUNCATE TABLE addresses RESTART IDENTITY CASCADE;
  `);
  console.log('🗑️  All tables truncated!');
};

const seedAll = async () => {
  try {
    await truncateAll();

    await seedUsers();
    await seedAddresses();
    await seedUserOAuthAccounts();

    console.log('🎉 All seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (
  !process.env.DATABASE_URL?.includes('aws.neon.tech') &&
  process.env.DB_SEEDING === 'true'
) {
  seedAll();
}
