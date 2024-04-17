import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailPermohonanPremium = dynamic(() => import('modules/Pages/console/help-center/permohonan-premium/detail'), {
  loading: () => <PageLoader />,
});

const DetailPermohonanPremiumPage = () => (
  <SecureConsolePage>
    <DetailPermohonanPremium />
  </SecureConsolePage>
);

export default DetailPermohonanPremiumPage;
