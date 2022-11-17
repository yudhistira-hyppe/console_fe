import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailBandingIklanComponent = dynamic(() => import('modules/Pages/console/help-center/banding-iklan/Detail'), {
  loading: () => <PageLoader />,
});

const DetailBandingIklanPage = () => (
  <SecureConsolePage>
    <DetailBandingIklanComponent />
  </SecureConsolePage>
);

export default DetailBandingIklanPage;
