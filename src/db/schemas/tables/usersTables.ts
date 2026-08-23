import {
  pgTable,
  varchar,
  date,
  pgEnum,
  uuid,
  text,
  primaryKey,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core';
import { timestamps } from '../column.helpers';

const rolesEnum = pgEnum('role', ['customer', 'artist', 'musician']);

const usersTable = pgTable(
  'users',
  {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }),
    username: varchar({ length: 255 }).unique(),
    firstName: varchar({ length: 255 }),
    lastName: varchar({ length: 255 }),
    birthday: date(),
    role: rolesEnum().notNull().default('customer'),
    ...timestamps
  },
  t => [
    uniqueIndex('users_email_idx').on(t.email),
    uniqueIndex('users_username_idx').on(t.username),
    index('users_role_idx').on(t.role)
  ]
);

type InsertUser = typeof usersTable.$inferInsert;
type User = typeof usersTable.$inferSelect;

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
    ...timestamps
  },
  table => [
    primaryKey({
      name: 'user_oauth_accounts_pk',
      columns: [table.providerAccountId, table.provider]
    })
  ]
);

type InsertUserOAuth = typeof userOAuthAccountsTable.$inferInsert;
type UserOAuth = typeof userOAuthAccountsTable.$inferSelect;

export {
  // enums
  rolesEnum,
  oAuthProvidersEnum,
  // tables
  usersTable,
  userOAuthAccountsTable,
  // types
  type InsertUser,
  type User,
  type OAuthProvider,
  type InsertUserOAuth,
  type UserOAuth
};
