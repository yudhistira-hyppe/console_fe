//MODIFIED HYPPE
import SignInPage from './signin';
import { useAuth } from '../authentication';
import PremiumDashboard from './premium';

const HomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <PremiumDashboard /> : <SignInPage />;
};

export default HomePage;
