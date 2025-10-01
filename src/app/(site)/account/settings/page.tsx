import { getCurrentUser } from '@/auth/session.server';

export default async function AccountSettingsPage() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true
  });

  return (
    <>
      <p>ACCOUNT SETTINGS (update info, change password, etc)</p>
      <p>{`${user.id} - ${user.role}`}</p>
    </>
  );
}
