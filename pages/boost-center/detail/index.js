import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailBoostCenterComponent = dynamic(() => import('modules/Pages/console/boost-center/Detail'), {
  loading: () => <PageLoader />,
});

const DetailBoostCenterPage = () => (
  <SecureConsolePage>
    <DetailBoostCenterComponent />
  </SecureConsolePage>
);

export default DetailBoostCenterPage;
