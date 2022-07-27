import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const NotificationModule = dynamic(() => import('../../modules/Pages/notification'), {
  loading: () => <PageLoader />,
});

const TranscationPage = () => (
  <SecurePage>
    <NotificationModule />
  </SecurePage>
);

export default TranscationPage;
