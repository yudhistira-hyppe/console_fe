import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const PelaporanKonten = dynamic(() => import('modules/Pages/console/help-center/pelaporan-konten'), {
  loading: () => <PageLoader />,
});

const PelaporanKontenPage = () => (
  <SecureConsolePage>
    <PelaporanKonten />
  </SecureConsolePage>
);

export default PelaporanKontenPage;
