import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const recipientsTable = pgTable('recipients', {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phoneNumber: varchar({ length: 20 }).notNull()
});
