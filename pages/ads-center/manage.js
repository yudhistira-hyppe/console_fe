import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ManageAdsCenter = dynamic(() => import('modules/Pages/console/ads-center/manage'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterPage = () => (
  <SecureConsolePage>
    <ManageAdsCenter />
  </SecureConsolePage>
);

export default ConsoleAdsCenterPage;
