'use server';

import { z } from 'zod/v4';
import { sessionSchema } from '@/_zodSchemas/authZod';
import { redis } from '@/redis/redis';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { db } from '@/_drizzle/db';
import { usersTable } from '@/_drizzle/schemas';
import { eq } from 'drizzle-orm';

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

const getUserFromDb = (id: number) => {
  return db.query.usersTable.findFirst({
    columns: {
      id: true,
      role: true,
      email: true,
      firstName: true,
      lastName: true
    },
    where: eq(usersTable.id, id)
  });
};

const removeSessionUser = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  cookieStore.delete(COOKIE_SESSION_KEY);
};

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type User = Exclude<
  Awaited<ReturnType<typeof getSessionUser>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: false;
}): Promise<FullUser | null>;
function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: true;
}): Promise<User>;
function _getCurrentUser(options: {
  withFullUser: false;
  redirectIfNotFound: false;
}): Promise<User | null>;
async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false
} = {}) {
  const user = await getSessionUser();

  if (!user) {
    if (redirectIfNotFound) return redirect('/login');

    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);

    if (!fullUser) throw new Error('User not found in database');

    return fullUser;
  }

  return user;
}

export { createUserSession, _getCurrentUser, removeSessionUser };
