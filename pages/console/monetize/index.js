import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleMonetizeComponent = dynamic(() => import('modules/Pages/console/monetize'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizePage = () => (
  <SecurePage>
    <ConsoleMonetizeComponent />
  </SecurePage>
);

export default ConsoleMonetizePage;
