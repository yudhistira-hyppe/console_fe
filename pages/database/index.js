import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const DatabasePage = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

      if (access.map((item) => item?.nameModule).includes('database_account')) {
        router.replace('/database/account');
      } else if (access.map((item) => item?.nameModule).includes('database_content')) {
        router.replace('/database/content');
      } else if (access.map((item) => item?.nameModule).includes('database_music')) {
        router.replace('/database/media');
      } else {
        router.replace('/');
      }
    } else {
      router.replace('/signin');
    }
  }, []);

  return null;
};

export default DatabasePage;
