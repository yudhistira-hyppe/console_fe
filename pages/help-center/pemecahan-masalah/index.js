import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePemecahanMasalahComponent = dynamic(() => import('modules/Pages/console/help-center/pemecahan-masalah'), {
  loading: () => <PageLoader />,
});

const ConsolePemecahanMasalahPage = () => (
  <SecureConsolePage>
    <ConsolePemecahanMasalahComponent />
  </SecureConsolePage>
);

export default ConsolePemecahanMasalahPage;
