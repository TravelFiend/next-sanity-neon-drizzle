import { logout } from '@/_actions/auth/authActions';
import { UserSession } from '@/auth/session.edge';

type LogoutProps = {
  user: UserSession;
  logoutFunc: () => void;
};

const Logout: React.FC<LogoutProps> = ({ user, logoutFunc }) => {
  const handleLogout = () => {
    logoutFunc();
    logout();
  };

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
        onClick={handleLogout}
      >
        Log Out
      </button>
    </>
  );
};

export default Logout;
