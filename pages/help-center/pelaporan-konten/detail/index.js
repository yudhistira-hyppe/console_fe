import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailPelaporanKonten = dynamic(() => import('modules/Pages/console/help-center/pelaporan-konten/Detail'), {
  loading: () => <PageLoader />,
});

const DetailPelaporanKontenPage = () => (
  <SecureConsolePage>
    <DetailPelaporanKonten />
  </SecureConsolePage>
);

export default DetailPelaporanKontenPage;
