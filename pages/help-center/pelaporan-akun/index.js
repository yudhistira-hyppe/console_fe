import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePelaporanAkunComponent = dynamic(() => import('modules/Pages/console/help-center/pelaporan-akun'), {
  loading: () => <PageLoader />,
});

const ConsolePelaporanAkunPage = () => (
  <SecureConsolePage>
    <ConsolePelaporanAkunComponent />
  </SecureConsolePage>
);

export default ConsolePelaporanAkunPage;
