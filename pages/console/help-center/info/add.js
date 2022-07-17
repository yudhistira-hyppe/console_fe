import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleAddInfoComponent = dynamic(() => import('modules/Pages/console/help-center/info/form'), {
  loading: () => <PageLoader />,
});

const ConsoleAddInfoPage = () => (
  <SecureConsolePage>
    <ConsoleAddInfoComponent />
  </SecureConsolePage>
);

export default ConsoleAddInfoPage;
