import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleMonetizeComponent = dynamic(() => import('modules/Pages/console/monetize'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizePage = () => (
  <SecureConsolePage>
    <ConsoleMonetizeComponent />
  </SecureConsolePage>
);

export default ConsoleMonetizePage;
