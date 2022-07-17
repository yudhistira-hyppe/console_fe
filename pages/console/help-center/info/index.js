import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleInfoComponent = dynamic(() => import('modules/Pages/console/help-center/info'), {
  loading: () => <PageLoader />,
});

const ConsoleInfoPage = () => (
  <SecureConsolePage>
    <ConsoleInfoComponent />
  </SecureConsolePage>
);

export default ConsoleInfoPage;
