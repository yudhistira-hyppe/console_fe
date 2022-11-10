import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleDetailPelaporanAkunComponent = dynamic(
  () => import('modules/Pages/console/help-center/pelaporan-akun/Detail'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsoleDetailPelaporanAkunPage = () => (
  <SecureConsolePage>
    <ConsoleDetailPelaporanAkunComponent />
  </SecureConsolePage>
);

export default ConsoleDetailPelaporanAkunPage;
