import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailAnnouncementComponent = dynamic(() => import('modules/Pages/console/announcement/detail'), {
  loading: () => <PageLoader />,
});

const AnnouncementPage = () => (
  <SecureConsolePage>
    <DetailAnnouncementComponent />
  </SecureConsolePage>
);

export default AnnouncementPage;
