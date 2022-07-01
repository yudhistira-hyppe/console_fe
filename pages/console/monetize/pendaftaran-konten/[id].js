import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleMonetizeContentRegisteredDetailComponent = dynamic(() => import('modules/Pages/console/monetize/detail'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizeContentRegisteredDetailPage = () => (
  <SecurePage>
    <ConsoleMonetizeContentRegisteredDetailComponent />
  </SecurePage>
);

export default ConsoleMonetizeContentRegisteredDetailPage;
