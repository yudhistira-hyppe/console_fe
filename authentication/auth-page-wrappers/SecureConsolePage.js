import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const SecureConsolePage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();
  const [isRenderChildren, setIsRenderChildren] = useState(false);

  useEffect(() => {
    getAuthUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!authUser && !router.pathname.includes('/signin') && router.pathname !== '/') {
        // router.push({ pathname: '/console/signin', query: { redirect: router.pathname } });
        router.push({ pathname: '/signin', query: { redirect: router.pathname } });
        return;
      }
      if (!authUser && !router.pathname.includes('/signin') && router.pathname === '/') {
        // router.push('/console/signin');
        router.push('/signin');
        return;
      }
      if (
        authUser &&
        authUser.user.roles.includes('ROLE_SYSADMIN') &&
        router.pathname.includes('/signin') &&
        router.query.redirect &&
        // router.query.redirect.includes('/console')
        router.query.redirect.includes('/')
      ) {
        router.push(router.query.redirect);
        return;
      }
      if (
        authUser &&
        authUser.user.roles.includes('ROLE_SYSADMIN') &&
        router.pathname.includes('/signin') &&
        !router.query.redirect
      ) {
        // router.push('/console');
        router.push('/');
        return;
      }
      setIsRenderChildren(true);
    } else {
      setIsRenderChildren(false);
    }
  }, [isLoading, authUser]);

  return isRenderChildren && children;
};

export default SecureConsolePage;
