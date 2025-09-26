import { getCurrentUser } from '@/auth/session.server';

export default async function OrdersPage() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: true
  });

  return (
    <>
      <p>ORDER HISTORY: {user.role}</p>
    </>
  );
}
