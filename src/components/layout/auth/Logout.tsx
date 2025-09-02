import { logout } from '@/_actions/auth/authActions';
import { UserSession } from '@/auth/session';

type LogoutProps = {
  user: UserSession;
};

const Logout: React.FC<LogoutProps> = ({ user }) => {
  return (
    <>
      <h2
        id="signup-modal-title"
        className="mb-4 font-sans text-xl text-primary"
      >
        Logged in as {user.email}
      </h2>

      <button
        type="submit"
        className="rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white"
        onClick={logout}
      >
        Log Out
      </button>
    </>
  );
};

export default Logout;
