import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const CreateAnnouncementComponent = dynamic(() => import('modules/Pages/console/announcement/create'), {
  loading: () => <PageLoader />,
});

const CreateAnnouncementPage = () => (
  <SecureConsolePage>
    <CreateAnnouncementComponent />
  </SecureConsolePage>
);

export default CreateAnnouncementPage;
