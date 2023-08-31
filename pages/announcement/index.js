import React, { useEffect } from 'react';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useAuth } from 'authentication';
import { useRouter } from 'next/router';

const AnnouncementPage = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authUser) {
        const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

        router.replace('/announcement/notification');
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

export default AnnouncementPage;
