'use client';

import { type AuthMode, authAction } from '@/_actions/auth/authActions';
import { redirect, useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import SubmitButton from '../form/SubmitButton';
import InputWLabel from '../form/InputWLabel';
import TurnstileModal from '../form/TurnstileModal';

type AuthFormProps = {
  mode: AuthMode;
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [authState, authActionFn, isPending] = useActionState(authAction, null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isTurnstileVerified, setIsTurnstileVerified] =
    useState<boolean>(false);

  useEffect(() => {
    if (authState?.success) {
      let timeout;

      if (mode === 'signup') {
        timeout = setTimeout(() => router.push('/account'), 2000);
      } else {
        timeout = setTimeout(() => router.push('/'), 2000);
      }

      return () => clearTimeout(timeout);
    }
  }, [authState, mode, router]);

  useEffect(() => {
    if (turnstileToken) {
      (async () => {
        const res = await fetch('/api/verifyTurnstile', {
          method: 'POST',
          body: JSON.stringify({ token: turnstileToken }),
          headers: {
            'content-type': 'application/json'
          }
        });

        const data = await res.json();
        if (data.success) {
          setIsTurnstileVerified(true);
        }
      })();
    }
  }, [turnstileToken]);

  const handleSwitch = () => {
    return mode === 'signup' ? redirect('/login') : redirect('/signup');
  };

  return (
    <>
      <form className="mx-6 flex min-w-85 flex-col gap-4" action={authActionFn}>
        <input type="hidden" name="mode" value={mode} />

        <InputWLabel
          forIdName="email"
          labelText="Email"
          inputType="email"
          placeholder="youremail@example.com"
          defaultValue={authState?.data?.email}
        />

        <ul className="h-5">
          {!authState?.success &&
            authState?.errors?.email?.map((err: string, idx: number) => (
              <li key={`email-${idx}`} className="text-sm text-error">
                {err}
              </li>
            ))}
        </ul>

        <InputWLabel
          forIdName="password"
          labelText="Password"
          inputType="password"
          placeholder="youremail@example.com"
          defaultValue={
            mode === 'signup'
              ? (authState?.data?.password ?? undefined)
              : undefined
          }
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

        <ul className="h-14">
          {authState?.message ? (
            <li className="text-sm text-success">{authState.message}</li>
          ) : null}

          {/* General / login-wide errors */}
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

        <SubmitButton
          isPending={isPending}
          disabled={!isTurnstileVerified || isPending}
        />

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

      <TurnstileModal setToken={setTurnstileToken} />
    </>
  );
};

export default AuthForm;
