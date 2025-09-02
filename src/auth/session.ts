'use server';

import { z } from 'zod/v4';
import { sessionSchema } from '@/_zodSchemas/authZod';
import { redis } from '@/redis/redis';
import { cookies } from 'next/headers';
import { cache } from 'react';

const SESSION_EXPIRATION = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = 'session-id';

export type UserSession = z.infer<typeof sessionSchema>;

const createUserSession = async (user: UserSession) => {
  const sessionId = crypto.randomUUID();
  redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION
  });

  (await cookies()).set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION * 1000,
    path: '/'
  });
};

const getSessionUserById = async (sessionId: string) => {
  const rawUser = await redis.get(`session:${sessionId}`);
  const { success, data: user } = sessionSchema.safeParse(rawUser);
  return success ? user : null;
};

const getSessionUser = cache(async () => {
  const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  return getSessionUserById(sessionId);
});

const removeSessionUser = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  cookieStore.delete(COOKIE_SESSION_KEY);
};

export { createUserSession, getSessionUser, removeSessionUser };
