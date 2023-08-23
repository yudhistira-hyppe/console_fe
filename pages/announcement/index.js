import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AnnouncementComponent = dynamic(() => import('modules/Pages/console/announcement'), {
  loading: () => <PageLoader />,
});

const AnnouncementPage = () => (
  <SecureConsolePage>
    <AnnouncementComponent />
  </SecureConsolePage>
);

export default AnnouncementPage;
