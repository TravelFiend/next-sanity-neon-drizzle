/* eslint-disable no-console */
import { db } from '../db';
import { sql } from 'drizzle-orm';
import { seedAddresses } from './location/addresses';
import { seedStatesAndCities } from './location/statesAndCities';
import { seedZipCodes } from './location/zipCodes';
import { seedUserOAuthAccounts } from './user/userOAuthAccounts';
import { seedUsers } from './user/users';
import { seedUsersToAddresses } from './user/usersToAddresses';

const truncateAll = async () => {
  // truncate in order respecting foreign key dependencies
  await db.execute(sql`
    TRUNCATE TABLE user_oauth_accounts RESTART IDENTITY CASCADE;
    TRUNCATE TABLE users_to_addresses RESTART IDENTITY CASCADE;
    TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    TRUNCATE TABLE addresses RESTART IDENTITY CASCADE;
    TRUNCATE TABLE cities_to_zip_codes RESTART IDENTITY CASCADE;
    TRUNCATE TABLE zip_codes RESTART IDENTITY CASCADE;
    TRUNCATE TABLE cities RESTART IDENTITY CASCADE;
    TRUNCATE TABLE states RESTART IDENTITY CASCADE;
  `);
  console.log('🗑️  All tables truncated!');
};

const seedAll = async () => {
  try {
    await truncateAll();

    await seedStatesAndCities();
    await seedZipCodes();
    await seedAddresses();
    await seedUsers();
    await seedUsersToAddresses();
    await seedUserOAuthAccounts();

    console.log('🎉 All seeding complete!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.env.NODE_ENV === 'development') seedAll();
