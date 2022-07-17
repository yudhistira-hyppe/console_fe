import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleMonetizeContentComponent = dynamic(() => import('modules/Pages/console/monetize/content'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizeContentPage = () => (
  <SecureConsolePage>
    <ConsoleMonetizeContentComponent />
  </SecureConsolePage>
);

export default ConsoleMonetizeContentPage;
