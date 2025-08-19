/* eslint-disable no-console */
import { db } from '../db';
import { usersTable } from '../schemas';
import { faker } from '@faker-js/faker';

(async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('❌ Seed script skipped in production!');
      return;
    }

    console.log('Seeding users table...');

    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(usersTable);

    const rolesEnum = ['customer', 'artist', 'musician'] as const;

    const users = Array.from({ length: 10 }).map(() => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthday: faker.date
        .birthdate({ min: 18, max: 100, mode: 'age' })
        .toISOString()
        .split('T')[0],
      address1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      role: rolesEnum[Math.floor(Math.random() * rolesEnum.length)]
    }));

    await db.insert(usersTable).values(users);

    console.log('✅ Users seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  } finally {
    if (db.$client?.end) await db.$client.end();
  }
})();
