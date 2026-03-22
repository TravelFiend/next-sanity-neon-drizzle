'use client';

import cn from '@/lib/utils/conditionalClasses';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef } from 'react';
import { useState } from 'react';

type TurnstileModalProps = {
  setVerified: (isVerified: boolean) => void;
};

// TODO: add production domain to cloudflare turnstile hostnames when we have it live

const TurnstileModal = ({ setVerified }: TurnstileModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<TurnstileInstance | null>(null);

  const sitekey =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      : process.env.NEXT_PUBLIC_TURNSTILE_TEST_SITE_KEY_PASS;

  const handleUnsupported = () => {
    // eslint-disable-next-line no-alert
    alert(
      'Unsupported browser, please open a different browser (i.e. Chrome) and try again.'
    );
  };

  const handleSuccess = async (token: string) => {
    setIsOpen(false);
    if (!token) {
      widgetRef.current?.reset();
      return console.error('no token retrieved from turnstile');
    }
    const res = await fetch('/api/verifyTurnstile', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'content-type': 'application/json'
      }
    });

    const data = await res.json();
    data.success ? setVerified(true) : widgetRef.current?.reset();
  };

  if (!sitekey) {
    console.error('TURNSTILE_SITE_KEY not found in env vars');
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 items-center justify-center bg-black/20 backdrop-blur transition-opacity duration-300',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div className="absolute top-60 pb-20 text-3xl sm:text-5xl">
        <p>Verifying you&apos;re human...</p>
      </div>

      <Turnstile
        className="scale-120"
        siteKey={sitekey}
        ref={widgetRef}
        onWidgetLoad={() => setIsOpen(true)}
        scriptOptions={{
          defer: true,
          async: true
        }}
        options={{
          theme: 'light',
          appearance:
            process.env.NODE_ENV === 'production'
              ? 'interaction-only'
              : 'always',
          retryInterval: 5000
        }}
        onUnsupported={handleUnsupported}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default TurnstileModal;
