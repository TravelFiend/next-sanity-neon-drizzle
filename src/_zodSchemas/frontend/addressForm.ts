import { z } from 'zod';
import { addressInsertSchema } from '../addressZod';
import { userInsertSchema } from '../userZod';
import { recipientInsertSchema } from '../recipientZod';

const addressFormSchema = z
  .object({
    city: z
      .string()
      .min(1, 'City is required')
      .max(255, 'City must not exceed 255 characters')
      .regex(
        /^[A-Za-z\s'-]+$/,
        'City may only contain letters, spaces, hyphens, or apostrophes'
      ),
    state: z.string().length(2, 'State must be a valid US state abbreviation'),
    ZIPCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
      error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
    })
  })
  .extend({
    streetAddress: addressInsertSchema.shape.streetAddress,
    secondaryAddress: addressInsertSchema.shape.secondaryAddress,
    firstName: userInsertSchema.shape.firstName,
    lastName: userInsertSchema.shape.firstName,
    email: userInsertSchema.shape.email,
    phoneNumber: recipientInsertSchema.shape.phoneNumber
  });

type AddressForm = z.infer<typeof addressFormSchema>;

export { addressFormSchema, type AddressForm };
