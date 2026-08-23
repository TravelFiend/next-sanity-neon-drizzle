import { z } from 'zod';
import { rolesZodEnum } from './userZod';

const tokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional()
});

type TokenResponse = z.infer<typeof tokenSchema>;

const sessionSchema = z.object({
  id: z.string(),
  role: rolesZodEnum
});

type UserSession = z.infer<typeof sessionSchema>;

export { tokenSchema, sessionSchema, type UserSession, type TokenResponse };
