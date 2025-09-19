import { db } from '@/_drizzle/db';
import {
  OAuthProvider,
  userOAuthAccountsTable,
  usersTable
} from '@/_drizzle/schemas';
import { oAuthProvidersZodEnum } from '@/_zodSchemas/authZod';
import {
  getOAuthClient,
  InvalidStateError,
  InvalidUserError,
  MissingEmailError
} from '@/auth/oAuth/oAuthBase';
import { createUserSessionAndRedirect } from '@/auth/session.server';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) => {
  const { provider: rawProvider } = await params;
  let provider;
  try {
    provider = oAuthProvidersZodEnum.parse(rawProvider);
  } catch (err) {
    console.error('Invalid provider param', rawProvider, err);
    return NextResponse.redirect(
      new URL('/login?oauthError=Invalid%20provider', request.url)
    );
  }

  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');

  if (typeof code !== 'string' || typeof state !== 'string') {
    console.error('Missing code/state', { code, state });
    return NextResponse.redirect(
      new URL(
        `/login?oauthError=${encodeURIComponent('Failed to connect. Please try again')}`,
        request.url
      )
    );
  }

  const oAuthClient = getOAuthClient(provider);

  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state);
    if (!oAuthUser) {
      return NextResponse.redirect(
        new URL(
          `/login?oauthError=${encodeURIComponent('Failed to connect. Please try again')}`,
          request.url
        )
      );
    }

    const user = await connectUserToAccount(oAuthUser, provider);
    if (!user || !user.id) {
      console.error('connectUserToAccount failed or returned no user', user.id);
      return NextResponse.redirect(
        new URL(
          `/login?oauthError=${encodeURIComponent('Failed to connect. Please try again')}`,
          request.url
        )
      );
    }

    const redirectUrl = new URL(`/account/${user.id}`, request.url).toString();
    return await createUserSessionAndRedirect(user, redirectUrl);
  } catch (err) {
    if (err instanceof InvalidStateError) {
      return NextResponse.redirect(
        new URL(
          `/login?oauthError=${encodeURIComponent('Invalid State. Please try again.')}`,
          request.url
        )
      );
    }
    if (err instanceof InvalidUserError) {
      return NextResponse.redirect(
        new URL(
          `/login?oauthError=${encodeURIComponent('Invalid User. Please try again.')}`,
          request.url
        )
      );
    }
    if (err instanceof MissingEmailError) {
      return NextResponse.redirect(
        new URL(
          `/login?oauthError=${encodeURIComponent('Email permission are required. Please try again.')}`,
          request.url
        )
      );
    }

    console.error('OAuth handler error:', err);

    return NextResponse.redirect(
      new URL(
        `/login?oauthError=${encodeURIComponent('Unexpected error. Please try again')}`,
        request.url
      )
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
