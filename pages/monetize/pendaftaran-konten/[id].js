import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleMonetizeContentRegisteredDetailComponent = dynamic(() => import('modules/Pages/console/monetize/detail'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizeContentRegisteredDetailPage = () => (
  <SecureConsolePage>
    <ConsoleMonetizeContentRegisteredDetailComponent />
  </SecureConsolePage>
);

export default ConsoleMonetizeContentRegisteredDetailPage;
