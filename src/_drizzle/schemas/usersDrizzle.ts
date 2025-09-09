import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  date,
  timestamp,
  pgEnum,
  uuid,
  text,
  primaryKey
} from 'drizzle-orm/pg-core';

// DRIZZLE USER
export const rolesEnum = pgEnum('role', ['customer', 'artist', 'musician']);

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  userName: varchar('user_name', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  birthday: date('birthday'),
  role: rolesEnum().notNull().default('customer'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// DRIZZLE OAUTH
export const userRelations = relations(usersTable, ({ many }) => ({
  oAuthAccounts: many(userOAuthAccountsTable)
}));

export const oAuthProviders = ['google', 'facebook', 'discord'] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProvidersEnum = pgEnum('oauth_providers', oAuthProviders);

export const userOAuthAccountsTable = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    provider: oAuthProvidersEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => [primaryKey({ columns: [table.providerAccountId, table.provider] })]
);

export const userOAuthAccountRelations = relations(
  userOAuthAccountsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userOAuthAccountsTable.userId],
      references: [usersTable.id]
    })
  })
);

// DRIZZLE USER ADDRESS
export const addressTypeEnum = pgEnum('address_type', ['shipping', 'billing']);

export const userAddressesTable = pgTable('user_addresses', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
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
