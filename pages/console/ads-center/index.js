import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleAdsCenterComponent = dynamic(() => import('modules/Pages/console/ads-center'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterPage = () => (
  <SecureConsolePage>
    <ConsoleAdsCenterComponent />
  </SecureConsolePage>
);

export default ConsoleAdsCenterPage;
