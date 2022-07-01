import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleHelpCenterComponent = dynamic(() => import('modules/Pages/console/help-center'), {
  loading: () => <PageLoader />,
});

const ConsoleHelpCenterPage = () => (
  <SecurePage>
    <ConsoleHelpCenterComponent />
  </SecurePage>
);

export default ConsoleHelpCenterPage;
