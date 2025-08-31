'use client';

import { login, signup } from '@/_actions/authActions';
import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type CustomerAuthProps = {
  onClose: () => void;
};

const CustomerAuth: React.FC<CustomerAuthProps> = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  const [signupState, signupAction, isSignupPending] = useActionState(
    signup,
    null
  );
  const [loginState, loginAction, isLoginPending] = useActionState(login, null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleFormSwitch = () => setIsSignUp(!isSignUp);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2
          id="signup-modal-title"
          className="mb-4 font-sans text-xl text-primary"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </h2>

        <form
          className="flex flex-col gap-4"
          action={isSignUp ? signupAction : loginAction}
        >
          <label htmlFor="email" className="font-sans text-primary-light">
            <span className="text-error">*</span>Email:{' '}
          </label>
          <input
            id="email"
            type="email"
            placeholder="youremail@example.com"
            className="rounded border p-2 text-primary-light"
            name="email"
          />
          <ul className="h-5">
            {!signupState?.success &&
              signupState?.errors?.email?.map((err: string, idx: number) => (
                <li key={idx} className="text-sm text-error">
                  {err}
                </li>
              ))}
          </ul>

          <label htmlFor="password" className="font-sans text-primary-light">
            <span className="text-error">*</span>Password:{' '}
          </label>
          <input
            id="password"
            type="password"
            className="rounded border p-2 text-primary-light"
            name="password"
          />

          <ul className="h-14">
            {signupState?.message ? (
              <li className="text-sm text-success">{signupState.message}</li>
            ) : loginState?.message ? (
              <li className="text-sm text-success">{loginState.message}</li>
            ) : null}

            {!signupState?.success &&
              signupState?.errors.password.map(err => (
                <li key={err} className="text-sm text-error">
                  {err}
                </li>
              ))}

            {!loginState?.success &&
              loginState?.errors.login.map((err: string) => (
                <li key={err} className="text-sm text-error">
                  {err}
                </li>
              ))}
          </ul>

          <button
            type="submit"
            className="border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white"
          >
            {isSignupPending || isLoginPending ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            className="text-primary-light underline"
            onClick={handleFormSwitch}
          >
            {isSignUp
              ? 'Already have an account? Click here to log in.'
              : "Don't have an account? Click here to sign in"}
          </button>
        </form>

        <button
          type="button"
          className="mt-4 text-sm text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CustomerAuth;
