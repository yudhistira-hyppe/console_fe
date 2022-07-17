import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleUserEngagementComponent = dynamic(() => import('modules/Pages/console/engagement'), {
  loading: () => <PageLoader />,
});

const ConsoleUserEngagementPage = () => (
  <SecureConsolePage>
    <ConsoleUserEngagementComponent />
  </SecureConsolePage>
);

export default ConsoleUserEngagementPage;
