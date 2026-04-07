'use server';

import 'server-only';
import { hash, verify } from 'argon2';
import { db } from '@/db/db';
import { usersTable } from '@/db/schemas';
import {
  type UserLogin,
  type UserSignup,
  loginFormSchema,
  signupFormSchema
} from '@/lib/zod/userZod';
import zodValidate from '@/lib/utils/zodValidate';
import { removeSessionUser } from '@/_actions/auth/session.edge';
import { createUserSession } from '@/_actions/auth/session.server';
import { redirect } from 'next/navigation';
import { getOAuthClient } from '@/auth/oAuth/oAuthBase';
import type {
  InsertUser,
  OAuthProvider
} from '@/db/schemas/tables/usersTables';
import type { ActionState } from '@/types/actions';
import { getUserByEmail } from '@/db/_getters/userGetters';
import { sessionSchema } from '@/lib/zod/oAuthZod';

const signup = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<UserSignup>> => {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const parsed = zodValidate(raw, signupFormSchema);

  if (!parsed.success) return parsed;

  const { email, password }: UserSignup = parsed.data;
  const pwHash = await hash(password!);

  const newUser: InsertUser = {
    email,
    password: pwHash
  };

  try {
    const [user] = await db.insert(usersTable).values(newUser).returning({
      id: usersTable.id,
      role: usersTable.role
    });

    await createUserSession(user);

    return {
      success: true,
      message: 'Account successfully created',
      userId: user.id
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error('Insert failed:', err);

      const cause = err.cause as { constraint?: string };
      if (cause?.constraint === 'users_email_unique') {
        return {
          success: false,
          errors: {
            email: ['An account already exists with this email.']
          }
        };
      }
    }
    throw err;
  }
};

const login = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<UserLogin>> => {
  const raw = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString()
  };

  const parsed = zodValidate(raw, loginFormSchema);

  if (!parsed.success) return parsed;

  const { email, password }: UserLogin = parsed.data;

  const existingUser = await getUserByEmail({
    email,
    columns: {
      id: true,
      email: true,
      password: true,
      role: true
    }
  });

  if (!existingUser) {
    return {
      success: false,
      errors: {
        login: ['Invalid email or password']
      },
      data: raw
    };
  }

  if (!existingUser.password) {
    return {
      success: false,
      errors: {
        login: [
          'No password set for this user.',
          'This usually means you signed up using one of the social login options.',
          'Please try logging in with that method.'
        ]
      },
      data: raw
    };
  }

  const sessionParsed = sessionSchema.safeParse(existingUser);

  if (!sessionParsed.success) {
    return {
      success: false,
      errors: {
        sessionIdentifiers: ['User record is missing session identifiers']
      },
      data: raw
    };
  }

  try {
    const isVerified = await verify(existingUser.password!, password);

    if (isVerified) {
      await createUserSession(sessionParsed.data);

      return {
        success: true,
        message: 'Login successful',
        userId: existingUser.id
      };
    } else {
      return {
        success: false,
        errors: {
          login: ['Incorrect email and/or password']
        },
        data: raw
      };
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        errors: {
          login: [err.message]
        },
        data: raw
      };
    }

    throw err;
  }
};

const logout = async () => {
  await removeSessionUser();
  redirect('/');
};

const oAuthLogin = async (provider: OAuthProvider) => {
  const oAuthClient = getOAuthClient(provider);

  const url = await oAuthClient.createAuthUrl();
  redirect(url);
};

// Unified auth action
type AuthActionState = ActionState<UserSignup> | ActionState<UserLogin>;

export type AuthMode = 'signup' | 'login';

const authAction = async (
  prevState: unknown,
  formData: FormData
): Promise<AuthActionState> => {
  const mode = formData.get('mode') as AuthMode;

  switch (mode) {
    case 'signup':
      return await signup(prevState, formData);
    case 'login':
      return await login(prevState, formData);
    default:
      return {
        success: false,
        errors: { general: ['Unknown action'] }
      };
  }
};

export { authAction, logout, oAuthLogin };
