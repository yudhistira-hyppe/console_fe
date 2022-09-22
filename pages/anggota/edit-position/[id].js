import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const EditPositionAnggotaModule = dynamic(() => import('modules/Pages/console/anggota/position/edit'), {
  loading: () => <PageLoader />,
});

const ConsoleEditAnggotaPage = () => (
  <SecureConsolePage>
    <EditPositionAnggotaModule />
  </SecureConsolePage>
);

export default ConsoleEditAnggotaPage;
