import { db } from '@/_drizzle/db';
import {
  OAuthProvider,
  userOAuthAccountsTable,
  usersTable
} from '@/_drizzle/schemas';
import { oAuthProvidersZodEnum } from '@/_zodSchemas/authZod';
import { getOAuthClient } from '@/auth/oAuth/oAuthBase';
import { createUserSessionAndRedirect } from '@/auth/session.server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) => {
  const { provider: rawProvider } = await params;

  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const provider = oAuthProvidersZodEnum.parse(rawProvider);

  if (typeof code !== 'string' || typeof state !== 'string') {
    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again'
      )}`
    );
  }

  const oAuthClient = getOAuthClient(provider);

  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state);

    const user = await connectUserToAccount(oAuthUser, provider);
    return await createUserSessionAndRedirect(user, `/account/${user.id}`);
  } catch (err) {
    console.error(err);

    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again'
      )}`
    );
  }
};

const connectUserToAccount = (
  {
    id,
    email,
    username,
    firstName,
    lastName
  }: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  },
  provider: OAuthProvider
) => {
  return db.transaction(async trx => {
    let user = await trx.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: { id: true, role: true }
    });

    if (!user) {
      const [newUser] = await trx
        .insert(usersTable)
        .values({
          email,
          username,
          firstName: firstName ?? null,
          lastName: lastName ?? null
        })
        .returning({
          id: usersTable.id,
          role: usersTable.role
        });

      user = newUser;
    }

    await trx
      .insert(userOAuthAccountsTable)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id
      })
      .onConflictDoNothing();

    return user;
  });
};

export { GET };
