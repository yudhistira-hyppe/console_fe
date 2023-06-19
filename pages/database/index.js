import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const DatabasePage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authUser) {
        const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

        if (access.map((item) => item?.nameModule).includes('database_account')) {
          router.replace('/database/account');
        } else if (access.map((item) => item?.nameModule).includes('database_content')) {
          router.replace('/database/content');
        } else if (access.map((item) => item?.nameModule).includes('database_music')) {
          router.replace('/database/music');
        } else {
          router.replace('/');
        }
      } else {
        router.replace('/signin');
      }
    }
  }, [isLoading]);

  return (
    <SecureConsolePage>
      <PageLoader />
    </SecureConsolePage>
  );
};

export default DatabasePage;
