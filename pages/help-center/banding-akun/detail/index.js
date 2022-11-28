import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailBandingAkun = dynamic(() => import('modules/Pages/console/help-center/banding-akun/Detail'), {
  loading: () => <PageLoader />,
});

const DetailBandingAkunPage = () => (
  <SecureConsolePage>
    <DetailBandingAkun />
  </SecureConsolePage>
);

export default DetailBandingAkunPage;
