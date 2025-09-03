import { logout } from '@/_actions/auth/authActions';

type AccountPageProps = {
  params: Promise<{ userId: string }>;
};

const AccountPage: React.FC<AccountPageProps> = async ({ params }) => {
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
};

export default AccountPage;
