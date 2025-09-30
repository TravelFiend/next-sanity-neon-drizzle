'use client';

import { type AuthMode, authAction } from '@/_actions/auth/authActions';
import { redirect, useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import FormSubmitButton from '../common/FormSubmitButton';
import FormField from '../common/FormField';

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
        timeout = setTimeout(() => router.push('/account'), 2000);
      } else {
        timeout = setTimeout(() => router.push('/'), 2000);
      }

      return () => clearTimeout(timeout);
    }
  }, [authState, mode, router]);

  const handleSwitch = () => {
    return mode === 'signup' ? redirect('/login') : redirect('/signup');
  };

  return (
    <form
      className="mx-6 flex min-w-[340px] flex-col gap-4"
      action={authActionFn}
    >
      <input type="hidden" name="mode" value={mode} />

      {/* Email */}
      <FormField
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

      {/* Password */}
      <FormField
        forIdName="password"
        labelText="Password"
        inputType="password"
        placeholder="youremail@example.com"
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

      {/* Submit */}
      <FormSubmitButton isPending={isPending} />

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
