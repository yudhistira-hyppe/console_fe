//MODIFIED HYPPE
import SignInPage from './signin';
import { useAuth } from '../authentication';
import PremiumDashboard from './dashboard/premium';

const HomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <PremiumDashboard /> : <SignInPage />;
};

export default HomePage;
