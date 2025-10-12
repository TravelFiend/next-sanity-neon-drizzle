import { addressesTable } from '@/_drizzle/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const addressInsertSchema = createInsertSchema(addressesTable, {
  address1: schema =>
    schema
      .min(1, 'Address is required')
      .max(255, 'Address cannot exceed 255 characters'),
  address2: schema =>
    schema.max(255, 'Address cannot exceed 255 characters').optional(),
  zipCodeId: schema => schema.int().positive('Must select a valid zip code'),
  recipientId: schema => schema.int().positive('Must select a valid recipient')
});

const addressSelectSchema = createSelectSchema(addressesTable);

type AddressInsert = z.infer<typeof addressInsertSchema>;
type AddressSelect = z.infer<typeof addressSelectSchema>;

export {
  addressInsertSchema,
  addressSelectSchema,
  type AddressInsert,
  type AddressSelect
};
