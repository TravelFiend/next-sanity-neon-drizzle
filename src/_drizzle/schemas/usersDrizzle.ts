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
import { usersToAddresses } from './addressesDrizzle';

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
