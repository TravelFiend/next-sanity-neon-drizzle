import ContentWrapper from '@/components/common/ContentWrapper';
import AuthForm from '@/components/account/AuthForm';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/auth/session.server';
import OAuthButtons from '../../../../components/account/OAuthButtons';

export default async function SignUpPage() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false
  });
  if (user) redirect('/account');

  return (
    <ContentWrapper>
      <section className="mt-16 flex w-full flex-col justify-between sm:mt-32 sm:w-11/12 md:flex-row xl:w-2/3">
        <div className="mx-4 flex flex-col items-center justify-around">
          <h2 className="text-3xl">Create an account</h2>

          <p className="max-w-96 text-center">
            Sign up using your email/password, or if you prefer, sign up with
            one of the following providers:
          </p>

          <OAuthButtons />
        </div>

        <div className="hidden w-0.5 border border-slate-400 md:block" />

        <AuthForm mode="signup" />
      </section>
    </ContentWrapper>
  );
}
