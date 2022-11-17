import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailRekeningBank = dynamic(() => import('modules/Pages/console/help-center/rekening-bank/Detail'), {
  loading: () => <PageLoader />,
});

const DetailRekeningBankPage = () => (
  <SecureConsolePage>
    <DetailRekeningBank />
  </SecureConsolePage>
);

export default DetailRekeningBankPage;
