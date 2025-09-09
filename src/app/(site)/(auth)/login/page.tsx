import ContentWrapper from '@/components/common/ContentWrapper';
import AuthForm from '@/components/account/AuthForm';
import { getCurrentUser } from '@/auth/session.server';
import { redirect } from 'next/navigation';
import OAuthButtons from '../../../../components/account/OAuthButtons';

export default async function LogInPage({
  searchParams
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false
  });
  if (user) redirect(`/account/${user.id}`);

  const { oauthError } = await searchParams;

  return (
    <ContentWrapper>
      <section className="mt-16 flex w-full flex-col justify-between sm:mt-32 sm:w-11/12 sm:flex-row xl:w-2/3">
        <div className="mx-4 flex flex-col items-center justify-around">
          <h2 className="text-3xl">Account Login</h2>

          <p className="max-w-96 text-center">
            Log in using your email/password, or if you prefer, log in with one
            of the following providers:
          </p>

          <OAuthButtons />

          {oauthError ? <p>{oauthError}</p> : null}
        </div>

        <div className="w-0.5 border border-slate-400" />

        <AuthForm mode="login" />
      </section>
    </ContentWrapper>
  );
}
