import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const SecurePage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    if (!authUser && !isLoading) {
      if (router.pathname !== '/') {
        router.push({ pathname: '/signin', query: { redirect: router.pathname } });
      } else {
        router.push('/signin');
      }
    }
  }, [authUser, isLoading]);

  return authUser && !isLoading && children;
};

export default SecurePage;
