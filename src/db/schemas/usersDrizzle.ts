import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  date,
  timestamp,
  pgEnum,
  uuid,
  text,
  primaryKey
} from 'drizzle-orm/pg-core';
import { usersToAddressesTable } from './addressesDrizzle';

// DRIZZLE USERS
const rolesEnum = pgEnum('role', ['customer', 'artist', 'musician']);

const usersTable = pgTable('users', {
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

type InsertUser = typeof usersTable.$inferInsert;
type SelectUser = typeof usersTable.$inferSelect;

// DRIZZLE OAUTH
const userRelations = relations(usersTable, ({ many }) => ({
  oAuthAccounts: many(userOAuthAccountsTable),
  addresses: many(usersToAddressesTable)
}));

const oAuthProviders = ['google', 'facebook', 'discord', 'github'] as const;
type OAuthProvider = (typeof oAuthProviders)[number];
const oAuthProvidersEnum = pgEnum('oauth_providers', oAuthProviders);

const userOAuthAccountsTable = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    provider: oAuthProvidersEnum().notNull(),
    providerAccountId: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => [
    primaryKey({
      name: 'user_oauth_accounts_pk',
      columns: [table.providerAccountId, table.provider]
    })
  ]
);

type InsertUserOAuth = typeof userOAuthAccountsTable.$inferInsert;
type SelectUserOAuth = typeof userOAuthAccountsTable.$inferSelect;

const userOAuthAccountRelations = relations(
  userOAuthAccountsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userOAuthAccountsTable.userId],
      references: [usersTable.id]
    })
  })
);

export {
  // enums
  rolesEnum,
  oAuthProvidersEnum,
  // tables
  usersTable,
  userOAuthAccountsTable,
  usersToAddressesTable,
  // relations
  userRelations,
  userOAuthAccountRelations,
  // types
  type InsertUser,
  type SelectUser,
  type OAuthProvider,
  type InsertUserOAuth,
  type SelectUserOAuth
};
