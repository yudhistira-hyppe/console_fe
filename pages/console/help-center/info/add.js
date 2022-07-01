import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleAddInfoComponent = dynamic(() => import('modules/Pages/console/help-center/info/form'), {
  loading: () => <PageLoader />,
});

const ConsoleAddInfoPage = () => (
  <SecurePage>
    <ConsoleAddInfoComponent />
  </SecurePage>
);

export default ConsoleAddInfoPage;
