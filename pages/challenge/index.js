import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const ChallengePage = () => {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

      router.replace('/challenge/huehue');

      // if (access.map((item) => item?.nameModule)) {
      //   router.replace('/challenge/main');
      // } else if (access.map((item) => item?.nameModule)) {
      //   router.replace('/challenge/competition');
      // } else if (access.map((item) => item?.nameModule)) {
      //   router.replace('/challenge/draft');
      // } else {
      //   router.replace('/');
      // }
    } else {
      router.replace('/signin');
    }
  }, []);

  return <PageLoader />;
};

export default ChallengePage;
