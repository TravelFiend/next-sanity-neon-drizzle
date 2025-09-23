import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  date,
  timestamp,
  pgEnum,
  uuid,
  text,
  primaryKey,
  integer,
  uniqueIndex
} from 'drizzle-orm/pg-core';

// DRIZZLE USERS
export const rolesEnum = pgEnum('role', ['customer', 'artist', 'musician']);

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }),
  username: varchar({ length: 255 }).unique(),
  firstName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  birthday: date(),
  role: rolesEnum().notNull().default('customer'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// DRIZZLE OAUTH
export const userRelations = relations(users, ({ many }) => ({
  oAuthAccounts: many(userOAuthAccounts),
  userAddresses: many(usersToAddresses)
}));

const oAuthProviders = ['google', 'facebook', 'discord', 'github'] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProvidersEnum = pgEnum('oauth_providers', oAuthProviders);

export const userOAuthAccounts = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: oAuthProvidersEnum().notNull(),
    providerAccountId: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => [primaryKey({ columns: [table.providerAccountId, table.provider] })]
);

export type InsertUserOAuth = typeof userOAuthAccounts.$inferInsert;
export type SelectUserOAuth = typeof userOAuthAccounts.$inferSelect;

export const userOAuthAccountRelations = relations(
  userOAuthAccounts,
  ({ one }) => ({
    user: one(users, {
      fields: [userOAuthAccounts.userId],
      references: [users.id]
    })
  })
);

// DRIZZLE ADDRESSES
export const addresses = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    address1: varchar({ length: 255 }).notNull(),
    address2: varchar({ length: 255 }),
    city: varchar({ length: 50 }).notNull(),
    state: varchar({ length: 2 }).notNull(),
    zipCode: varchar({ length: 15 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    uniqueIndex('unique_full_address').on(
      t.address1,
      sql`COALESCE(${t.address2}, '')`,
      t.city,
      t.state,
      t.zipCode
    )
  ]
);

export const addressesRelations = relations(addresses, ({ many }) => ({
  userAddresses: many(usersToAddresses)
}));

export type InsertAddress = typeof addresses.$inferInsert;
export type SelectAddresses = typeof addresses.$inferSelect;

// DRIZZLE USERS_TO_ADDRESSES
export const addressTypeEnum = pgEnum('address_type', ['shipping', 'billing']);

export const usersToAddresses = pgTable(
  'users_to_addresses',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    addressId: integer()
      .notNull()
      .references(() => addresses.id, { onDelete: 'cascade' }),
    addressType: addressTypeEnum().notNull().default('shipping'),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [primaryKey({ columns: [t.userId, t.addressId, t.addressType] })]
);

export type InsertUsersToAddress = typeof usersToAddresses.$inferInsert;
export type SelectUsersToAddresses = typeof usersToAddresses.$inferSelect;

export const usersToAddressesRelations = relations(
  usersToAddresses,
  ({ one }) => ({
    address: one(addresses, {
      fields: [usersToAddresses.addressId],
      references: [addresses.id]
    }),
    user: one(users, {
      fields: [usersToAddresses.userId],
      references: [users.id]
    })
  })
);
