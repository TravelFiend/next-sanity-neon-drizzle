'use client';

import { oAuthLogin } from '@/_actions/auth/authActions';
import Button from '@/components/common/Button';

const OAuthButtons = () => {
  return (
    <>
      <Button
        ariaLabel="Sign up with your Discord account"
        onClick={async () => oAuthLogin('discord')}
        className="w-full"
      >
        Discord
      </Button>
      <Button
        ariaLabel="Sign up with you Google account"
        onClick={async () => oAuthLogin('github')}
        className="w-full"
      >
        Github
      </Button>
      <Button
        ariaLabel="Sign up with you Google account"
        onClick={async () => oAuthLogin('google')}
        className="w-full"
      >
        Google
      </Button>
      <Button
        ariaLabel="Sign up with you Facebook account"
        onClick={async () => oAuthLogin('facebook')}
        className="w-full"
      >
        Facebook
      </Button>
    </>
  );
};

export default OAuthButtons;
