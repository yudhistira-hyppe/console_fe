import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const AuthPage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    if (authUser && !isLoading) {
      if (router.query && router.query.redirect) {
        router.push(router.query.redirect);
      } else {
        router.push('/');
      }
    }
  }, [authUser, isLoading]);

  return !authUser && !isLoading && children;
};

export default AuthPage;
