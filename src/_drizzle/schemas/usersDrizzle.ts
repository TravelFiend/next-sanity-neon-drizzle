import {
  pgTable,
  integer,
  serial,
  varchar,
  date,
  timestamp,
  pgEnum
} from 'drizzle-orm/pg-core';

// DRIZZLE USER
export const rolesEnum = pgEnum('role', ['customer', 'artist', 'musician']);

export const usersTable = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  birthday: date('birthday'),
  role: rolesEnum().notNull().default('customer'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// DRIZZLE USER ADDRESS
export const addressTypeEnum = pgEnum('address_type', ['shipping', 'billing']);

export const userAddressesTable = pgTable('user_addresses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => usersTable.id)
    .notNull(),
  addressType: addressTypeEnum('address_type').notNull().default('shipping'),
  address1: varchar('address_1', { length: 255 }).notNull(),
  address2: varchar('address_2', { length: 255 }),
  city: varchar('city', { length: 50 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zipCode: varchar('zip_code', { length: 15 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export type InsertUserAddress = typeof userAddressesTable.$inferInsert;
export type SelectUserAddresses = typeof userAddressesTable.$inferSelect;
