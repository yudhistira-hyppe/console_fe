import SignInPage from './signin';
import { useAuth } from 'authentication';
import ConsoleDashboard from './dashboard';

const ConsoleHomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <ConsoleDashboard /> : <SignInPage />;
};

export default ConsoleHomePage;
