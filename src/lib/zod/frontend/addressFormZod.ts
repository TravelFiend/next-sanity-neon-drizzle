import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { addressesTable } from '@/db/schemas';

const addressFormSchema = createInsertSchema(addressesTable, {
  city: schema =>
    schema
      .min(1, 'City is required')
      .max(100, 'City must not exceed 100 characters')
      .regex(/^[A-Za-z\s'-]+$/, {
        error: 'City may only contain letters, spaces, hyphens, or apostrophes'
      }),
  state: schema =>
    schema.length(2, { error: 'State must be a valid US state abbreviation' }),
  ZIPCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
  })
});

type AddressForm = z.infer<typeof addressFormSchema>;

export { addressFormSchema, type AddressForm };
