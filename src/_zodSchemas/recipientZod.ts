import { z } from 'zod';
import { userInsertSchema } from './userZod';

const recipientInsertSchema = userInsertSchema
  .pick({
    email: true,
    firstName: true,
    lastName: true
  })
  .extend({
    phoneNumber: z
      .string()
      .regex(/^\+1 \(\d{3}\) \d{3}-\d{4}$/, {
        error: 'Phone number must match format +1 (XXX) XXX-XXXX'
      })
      .max(20, 'Phone number must be 20 characters or less')
  });

export { recipientInsertSchema };
