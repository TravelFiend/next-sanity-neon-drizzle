'use client';

import { type AuthMode, authAction } from '@/_actions/auth/authActions';
import { redirect, useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [authState, authActionFn, isPending] = useActionState(authAction, null);

  useEffect(() => {
    if (authState?.success) {
      let timeout;

      if (mode === 'signup') {
        timeout = setTimeout(
          () => router.push(`/account/${authState.userId}`),
          2000
        );
      } else {
        timeout = setTimeout(() => router.push('/'), 2000);
      }

      return () => clearTimeout(timeout);
    }
  }, [authState, mode, router]);

  const handleSwitch = () => {
    return mode === 'signup'
      ? redirect('/account/login')
      : redirect('/account/signup');
  };

  return (
    <form
      className="mx-6 flex min-w-[340px] flex-col gap-4"
      action={authActionFn}
    >
      <input type="hidden" name="mode" value={mode} />

      {/* Email */}
      <label htmlFor="email" className="font-sans text-primary-light">
        <span className="pr-2 text-error">*</span>Email:{' '}
      </label>
      <input
        id="email"
        type="email"
        placeholder="youremail@example.com"
        className="rounded border p-2 text-primary-light"
        name="email"
        required
      />
      <ul className="h-5">
        {!authState?.success &&
          authState?.errors?.email?.map((err: string, idx: number) => (
            <li key={`email-${idx}`} className="text-sm text-error">
              {err}
            </li>
          ))}
      </ul>

      {/* Password */}
      <label htmlFor="password" className="font-sans text-primary-light">
        <span className="pr-2 text-error">*</span>Password:{' '}
      </label>
      <input
        id="password"
        type="password"
        className="rounded border p-2 text-primary-light"
        name="password"
        required
      />
      <ul className="h-5">
        {!authState?.success &&
          authState?.errors?.password?.map((err: string, idx: number) => (
            <li key={`password-${idx}`} className="text-sm text-error">
              {idx === 0 ? 'Password: ' : ''}
              {err}
            </li>
          ))}
      </ul>

      {/* General / login-wide errors */}
      <ul className="h-14">
        {authState?.message ? (
          <li className="text-sm text-success">{authState.message}</li>
        ) : null}

        {!authState?.success && authState?.errors
          ? Object.entries(authState.errors).map(([key, value]) => {
              return key !== 'email' && key !== 'password'
                ? value.map((err, idx) => (
                    <li key={`${key}-${idx}`} className="text-sm text-error">
                      {err}
                    </li>
                  ))
                : null;
            })
          : null}
      </ul>

      {/* Submit */}
      <button
        type="submit"
        className="rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white"
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </button>

      {/* Switch link */}
      <button
        type="button"
        className="cursor-pointer text-primary-light underline"
        onClick={handleSwitch}
      >
        {mode === 'signup'
          ? 'Already have an account? Click here to log in.'
          : "Don't have an account? Click here to sign up"}
      </button>
    </form>
  );
};

export default AuthForm;
