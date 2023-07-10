import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { useAuth } from 'authentication';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AdsCenterPage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authUser) {
        router.replace('/ads-center/setting');
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

export default AdsCenterPage;
