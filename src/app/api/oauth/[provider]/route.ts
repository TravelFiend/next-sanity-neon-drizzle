import { oAuthProvidersZodEnum } from '@/_zodSchemas/authZod';
import OAuthClient from '@/auth/oAuthBase';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) => {
  const { provider: rawProvider } = await params;

  const code = request.nextUrl.searchParams.get('code');
  const provider = oAuthProvidersZodEnum.parse(rawProvider);
  console.warn(provider);

  if (typeof code !== 'string') {
    redirect(
      `/login?oauthError=${encodeURIComponent('Failed to connect. Please try again')}`
    );
  }

  const user = await new OAuthClient().fetchUser(code);
  console.warn({ user });
};

export { GET };
