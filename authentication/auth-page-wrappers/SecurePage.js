import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

// const PREMIUM_ROUTES = ['/ads', '/adsGuideline', '/aboutAds', '/ads/details', '/ads/create', '/voucher/buy', '/transaction'];

const SecurePage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();
  const [isRenderChildren, setIsRenderChildren] = useState(false);

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!authUser && router.pathname !== '/') {
        router.push({ pathname: '/home', query: { redirect: router.pathname } });
        return;
      }
      if (!authUser && router.pathname === '/') {
        router.push('/home');
        return;
      }
      // if (authUser && !authUser.user.roles.includes('ROLE_PREMIUM') && PREMIUM_ROUTES.includes(router.pathname)) {
      //   router.push('/premium-activation');
      //   return;
      // }
      setIsRenderChildren(true);
    }
  }, [authUser, isLoading]);

  return isRenderChildren && children;
};

export default SecurePage;
