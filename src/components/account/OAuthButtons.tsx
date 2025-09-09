'use client';

import { oAuthLogin } from '@/_actions/auth/authActions';
import Button from '@/components/common/Button';

const OAuthButtons = () => {
  return (
    <>
      <Button
        ariaLabel="Sign up with your Discord account"
        onClick={async () => oAuthLogin('discord')}
      >
        Discord
      </Button>
      <Button
        ariaLabel="Sign up with you Google account"
        onClick={async () => oAuthLogin('google')}
      >
        Google
      </Button>
    </>
  );
};

export default OAuthButtons;
