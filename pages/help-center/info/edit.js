import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleEditInfoComponent = dynamic(() => import('modules/Pages/console/help-center/info/form'), {
  loading: () => <PageLoader />,
});

const ConsoleEditInfoPage = () => (
  <SecureConsolePage>
    <ConsoleEditInfoComponent />
  </SecureConsolePage>
);

export default ConsoleEditInfoPage;
