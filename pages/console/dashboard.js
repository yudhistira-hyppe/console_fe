import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleDashboardComponent = dynamic(() => import('modules/Pages/console/dashboards'), {
  loading: () => <PageLoader />,
});

const ConsoleDashboardPage = () => (
  <SecureConsolePage>
    <ConsoleDashboardComponent />
  </SecureConsolePage>
);

export default ConsoleDashboardPage;
