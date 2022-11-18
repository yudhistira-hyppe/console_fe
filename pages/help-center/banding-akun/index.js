import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const BandingAkun = dynamic(() => import('modules/Pages/console/help-center/banding-akun'), {
  loading: () => <PageLoader />,
});

const BandingAkunPage = () => (
  <SecureConsolePage>
    <BandingAkun />
  </SecureConsolePage>
);

export default BandingAkunPage;
