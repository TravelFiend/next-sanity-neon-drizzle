'use server';

//  Functions in this file CAN be used in middleware/api routes
import { cache } from 'react';
import { cookies } from 'next/headers';
import { sessionSchema } from '@/_zodSchemas/authZod';
import { redis } from '@/redis/redis';

const COOKIE_SESSION_KEY = 'session-id';

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

export { getSessionUser, getSessionUserById, removeSessionUser };
