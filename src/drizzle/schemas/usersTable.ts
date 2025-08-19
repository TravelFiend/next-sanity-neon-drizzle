import { date, integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['customer', 'artist', 'musician']);

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  birthday: date('birthday'),
  address1: varchar('address_1', { length: 255 }),
  address2: varchar('address_2', { length: 255 }),
  city: varchar('city', { length: 50 }),
  state: varchar('state_abbreviation', { length: 2 }),
  zipCode: varchar('zip_code', { length: 15 }),
  role: roleEnum().notNull().default('customer')
});
