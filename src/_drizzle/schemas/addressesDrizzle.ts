import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uuid,
  primaryKey,
  integer,
  uniqueIndex,
  unique
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersDrizzle';

// STATES
const statesTable = pgTable('states', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  code: varchar({ length: 2 }).notNull().unique()
});

type InsertStates = typeof statesTable.$inferInsert;
type SelectStates = typeof statesTable.$inferSelect;

const statesRelations = relations(statesTable, ({ many }) => ({
  cities: many(citiesTable)
}));

// CITIES
const citiesTable = pgTable(
  'cities',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    stateId: integer()
      .notNull()
      .references(() => statesTable.id)
  },
  t => [unique('unique_city_per_state').on(t.name, t.stateId)]
);

type InsertCities = typeof citiesTable.$inferInsert;
type SelectCities = typeof citiesTable.$inferSelect;

const citiesRelations = relations(citiesTable, ({ one, many }) => ({
  state: one(statesTable, {
    fields: [citiesTable.stateId],
    references: [statesTable.id]
  }),
  cities: many(citiesToZipCodesTable)
}));

// ZIP CODES
const zipCodesTable = pgTable('zip_codes', {
  id: serial().primaryKey(),
  zipCode: varchar({ length: 15 }).notNull().unique()
});

type InsertZipCodes = typeof zipCodesTable.$inferInsert;
type SelectZipCodes = typeof zipCodesTable.$inferSelect;

const zipCodeRelations = relations(zipCodesTable, ({ many }) => ({
  cities: many(citiesToZipCodesTable)
}));

// CITIES TO ZIP_CODES
const citiesToZipCodesTable = pgTable(
  'cities_to_zip_codes',
  {
    cityId: integer()
      .notNull()
      .references(() => citiesTable.id, { onDelete: 'cascade' }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodesTable.id, { onDelete: 'cascade' })
  },
  t => [
    primaryKey({
      name: 'cities_to_zip_codes_pk',
      columns: [t.cityId, t.zipCodeId]
    })
  ]
);

export const citiesToZipCodesRelations = relations(
  citiesToZipCodesTable,
  ({ one }) => ({
    city: one(citiesTable, {
      fields: [citiesToZipCodesTable.cityId],
      references: [citiesTable.id]
    }),
    zipCode: one(zipCodesTable, {
      fields: [citiesToZipCodesTable.zipCodeId],
      references: [zipCodesTable.id]
    })
  })
);

// ADDRESSES
export const addressesTable = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    address1: varchar({ length: 255 }).notNull(),
    address2: varchar({ length: 255 }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodesTable.id, { onDelete: 'restrict' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    uniqueIndex('unique_full_address').on(
      t.address1,
      sql`COALESCE(${t.address2}, '')`,
      t.zipCodeId
    )
  ]
);

export const addressesRelations = relations(addressesTable, ({ many }) => ({
  userAddresses: many(usersToAddressesTable)
}));

export type InsertAddress = typeof addressesTable.$inferInsert;
export type SelectAddresses = typeof addressesTable.$inferSelect;

// DRIZZLE USERS_TO_ADDRESSES
export const usersToAddressesTable = pgTable(
  'users_to_addresses',
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    addressId: integer()
      .notNull()
      .references(() => addressesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    primaryKey({
      name: 'users_to_addresses_pk',
      columns: [t.userId, t.addressId]
    })
  ]
);

type InsertUsersToAddress = typeof usersToAddressesTable.$inferInsert;
type SelectUsersToAddress = typeof usersToAddressesTable.$inferSelect;

const usersToAddressesRelations = relations(
  usersToAddressesTable,
  ({ one }) => ({
    address: one(addressesTable, {
      fields: [usersToAddressesTable.addressId],
      references: [addressesTable.id]
    }),
    user: one(usersTable, {
      fields: [usersToAddressesTable.userId],
      references: [usersTable.id]
    })
  })
);

export {
  // tables
  statesTable,
  citiesTable,
  zipCodesTable,
  citiesToZipCodesTable,
  // relations
  statesRelations,
  citiesRelations,
  zipCodeRelations,
  usersToAddressesRelations,
  // types
  type InsertStates,
  type SelectStates,
  type InsertCities,
  type SelectCities,
  type InsertZipCodes,
  type SelectZipCodes,
  type InsertUsersToAddress,
  type SelectUsersToAddress
};
