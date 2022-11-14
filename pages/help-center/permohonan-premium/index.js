import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const PermohonanPremium = dynamic(() => import('modules/Pages/console/help-center/permohonan-premium'), {
  loading: () => <PageLoader />,
});

const ConsoleBantuanPenggunaPage = () => (
  <SecureConsolePage>
    <PermohonanPremium />
  </SecureConsolePage>
);

export default ConsoleBantuanPenggunaPage;
