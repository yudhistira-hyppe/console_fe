import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { useAuth } from 'authentication';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ChallengePage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading]);

  return (
    <SecureConsolePage>
      <PageLoader />
    </SecureConsolePage>
  );
};

export default ChallengePage;
