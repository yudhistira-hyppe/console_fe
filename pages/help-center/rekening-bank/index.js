import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const RekeningBank = dynamic(() => import('modules/Pages/console/help-center/rekening-bank'), {
  loading: () => <PageLoader />,
});

const RekeningBankPage = () => (
  <SecureConsolePage>
    <RekeningBank />
  </SecureConsolePage>
);

export default RekeningBankPage;
