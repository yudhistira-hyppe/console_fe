import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailPelaporanIklan = dynamic(() => import('modules/Pages/console/help-center/pelaporan-iklan/Detail'), {
  loading: () => <PageLoader />,
});

const DetailPelaporanIklanPage = () => (
  <SecureConsolePage>
    <DetailPelaporanIklan />
  </SecureConsolePage>
);

export default DetailPelaporanIklanPage;
