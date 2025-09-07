import { logout } from '@/_actions/auth/authActions';

type AccountPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function AccountPage({ params }: AccountPageProps) {
  const { userId } = await params;

  return (
    <>
      <p>{userId}</p>

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
