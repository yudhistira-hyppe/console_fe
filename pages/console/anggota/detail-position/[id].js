import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailJabatan = dynamic(() => import('modules/Pages/console/anggota/detailJabatan'), {
  loading: () => <PageLoader />,
});

const DetailJabatanPage = () => (
  <SecureConsolePage>
    <DetailJabatan />
  </SecureConsolePage>
);

export default DetailJabatanPage;
