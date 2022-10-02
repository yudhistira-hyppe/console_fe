import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DatabasePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname: '/database/account' });
  }, []);

  return null;
};

export default DatabasePage;
