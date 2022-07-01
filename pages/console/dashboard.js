import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleDashboardComponent = dynamic(() => import('modules/Pages/console/dashboards'), {
  loading: () => <PageLoader />,
});

const ConsoleDashboardPage = () => (
  <SecurePage>
    <ConsoleDashboardComponent />
  </SecurePage>
);

export default ConsoleDashboardPage;
