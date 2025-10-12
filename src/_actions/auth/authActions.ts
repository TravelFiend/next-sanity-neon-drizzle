'use server';

import { eq } from 'drizzle-orm';
import { hash, verify } from 'argon2';
import { db } from '@/_drizzle/db';
import { usersTable } from '@/_drizzle/schemas';
import {
  type UserLogin,
  type UserSignup,
  loginFormSchema,
  signupFormSchema
} from '@/_zodSchemas/userZod';
import zodValidate from '@/lib/utils/zodValidate';
import { removeSessionUser } from '@/_actions/auth/session.edge';
import { createUserSession } from '@/_actions/auth/session.server';
import { redirect } from 'next/navigation';
import { getOAuthClient } from '@/auth/oAuth/oAuthBase';
import type {
  InsertUser,
  OAuthProvider
} from '@/_drizzle/schemas/usersDrizzle';

export type ActionState<T> =
  | {
      success: false;
      errors: Record<string, string[]>;
      data?: Partial<T>;
      message?: string;
    }
  | {
      success: true;
      data?: T;
      message?: string;
      userId: string;
    };

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

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
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

  try {
    const isVerified = await verify(existingUser.password!, password);

    if (isVerified) {
      await createUserSession(existingUser);

      return {
        success: true,
        message: 'Login successful',
        userId: existingUser.id
      };
    } else {
      throw new Error('Incorrect email and/or password');
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
