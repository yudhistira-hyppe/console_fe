import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const SecureConsolePage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();
  const [isRenderChildren, setIsRenderChildren] = useState(false);

  useEffect(() => {
    getAuthUser();
  }, [router]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (!authUser && !router.asPath.includes('/signin') && router.asPath === '/') {
          router.push('/signin');
          return;
        }
        if (!authUser && !router.asPath.includes('/signin') && router.asPath !== '/' && !router.asPath.includes('[')) {
          router.push({ pathname: '/signin', query: { redirect: router.asPath } });
          return;
        }
        if (
          authUser &&
          authUser.user.roles.includes('ROLE_ADMIN') &&
          router.asPath.includes('/signin') &&
          router.query.redirect
        ) {
          router.push(router.query.redirect);
          return;
        }
        if (
          authUser &&
          authUser.user.roles.includes('ROLE_ADMIN') &&
          router.asPath.includes('/signin') &&
          !router.query.redirect
        ) {
          router.push('/');
          return;
        }
        setIsRenderChildren(true);
      }, 500);
    } else {
      setIsRenderChildren(false);
    }
  }, [isLoading, authUser]);

  return isRenderChildren && children;
};

export default SecureConsolePage;
