import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleHelpCenterComponent = dynamic(() => import('modules/Pages/console/help-center'), {
  loading: () => <PageLoader />,
});

const ConsoleHelpCenterPage = () => (
  <SecureConsolePage>
    <ConsoleHelpCenterComponent />
  </SecureConsolePage>
);

export default ConsoleHelpCenterPage;
