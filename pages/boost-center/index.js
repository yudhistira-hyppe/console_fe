import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const BoostCenterComponent = dynamic(() => import('modules/Pages/console/boost-center'), {
  loading: () => <PageLoader />,
});

const BoostCenterPage = () => (
  <SecureConsolePage>
    <BoostCenterComponent />
  </SecureConsolePage>
);

export default BoostCenterPage;
