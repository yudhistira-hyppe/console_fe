import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const BandingKonten = dynamic(() => import('modules/Pages/console/help-center/banding-konten'), {
  loading: () => <PageLoader />,
});

const ConsoleBantuanPenggunaPage = () => (
  <SecureConsolePage>
    <BandingKonten />
  </SecureConsolePage>
);

export default ConsoleBantuanPenggunaPage;
