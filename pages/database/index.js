import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DatabasePage = () => {
  const router = useRouter();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  useEffect(() => {
    if (access.map((item) => item?.nameModule).includes('database_account')) {
      router.replace('/database/account');
    } else if (access.map((item) => item?.nameModule).includes('database_content')) {
      router.replace('/database/content');
    } else if (access.map((item) => item?.nameModule).includes('database_media')) {
      router.replace('/database/media');
    } else {
      router.replace('/');
    }
  }, []);

  return null;
};

export default DatabasePage;
