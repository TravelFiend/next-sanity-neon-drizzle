import { addressesTable } from '@/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const addressInsertSchema = createInsertSchema(addressesTable, {
  recipientFirstName: schema =>
    schema.min(2, 'First name must be at least 2 characters'),
  recipientLastName: schema =>
    schema.min(2, 'Last name must be at least 2 characters'),
  streetAddress: schema =>
    schema
      .min(1, 'Address is required')
      .max(255, 'Address cannot exceed 255 characters'),
  secondaryAddress: schema =>
    schema
      .max(255, 'Address cannot exceed 255 characters')
      .transform(val => (val === '' ? null : val)) // Convert empty string to null for DB
      .optional(),
  city: schema =>
    schema
      .min(1, 'City is required')
      .max(100, 'City must not exceed 100 characters')
      .regex(/^[A-Za-z\s'-]+$/, {
        error: 'City may only contain letters, spaces, hyphens, or apostrophes'
      }),
  state: schema =>
    schema
      .length(2, { error: 'State must be a 2-letter abbreviation' })
      .transform(val => val.toUpperCase()),
  ZIPCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
  }),
  phoneNumber: z
    .string()
    .optional()
    .transform(val => (val === '' ? null : val))
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
