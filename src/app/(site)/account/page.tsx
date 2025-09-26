import { logout } from '@/_actions/auth/authActions';
import { getCurrentUser } from '@/auth/session.server';

export default async function AccountPage() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: true
  });

  return (
    <>
      <p>{user.id}</p>

      <form action={logout}>
        <button
          type="submit"
          className="cursor-pointer rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white"
        >
          Log Out
        </button>
      </form>
    </>
  );
}
