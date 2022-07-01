import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleInfoComponent = dynamic(() => import('modules/Pages/console/help-center/info'), {
  loading: () => <PageLoader />,
});

const ConsoleInfoPage = () => (
  <SecurePage>
    <ConsoleInfoComponent />
  </SecurePage>
);

export default ConsoleInfoPage;
