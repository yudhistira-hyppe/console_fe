import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleAdsCenterDetailComponent = dynamic(() => import('modules/Pages/console/ads-center/AdsDetail'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterDetailPage = () => (
  <SecureConsolePage>
    <ConsoleAdsCenterDetailComponent />
  </SecureConsolePage>
);

export default ConsoleAdsCenterDetailPage;
