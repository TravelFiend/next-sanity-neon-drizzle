'use server';

//  Functions in this file will cause edge runtime errors if used in middleware/api routes
import { cookies } from 'next/headers';
import { redis } from '@/redis/redis';
import { sessionSchema, UserSession } from '@/_zodSchemas/authZod';
import { db } from '@/_drizzle/db';
import { eq } from 'drizzle-orm';
import { getSessionUser } from './session.edge';
import { users } from '@/_drizzle/schemas';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { NextResponse } from 'next/server';
import getSessionCookieOptions from './oAuth/sessionCookieOptions';

const COOKIE_SESSION_KEY = 'session-id';
const SESSION_EXPIRATION = 60 * 60 * 24 * 7;

const createSession = async (user: UserSession) => {
  const sessionId = crypto.randomUUID();
  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION
  });

  return sessionId;
};

export const createUserSession = async (user: UserSession) => {
  const sessionId = await createSession(user);
  (await cookies()).set(
    COOKIE_SESSION_KEY,
    sessionId,
    getSessionCookieOptions()
  );
};

export const createUserSessionAndRedirect = async (
  user: UserSession,
  redirectTo: string
) => {
  const sessionId = await createSession(user);
  const response = NextResponse.redirect(redirectTo);
  response.cookies.set(
    COOKIE_SESSION_KEY,
    sessionId,
    getSessionCookieOptions()
  );
  return response;
};

const getUserFromDb = (id: string) => {
  return db.query.users.findFirst({
    columns: {
      id: true,
      role: true,
      email: true,
      firstName: true,
      lastName: true
    },
    where: eq(users.id, id)
  });
};

export type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

export type User = Exclude<
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

export const getCurrentUser = cache(_getCurrentUser);
