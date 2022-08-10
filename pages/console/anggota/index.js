import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AnggotaModule = dynamic(() => import('modules/Pages/console/anggota'), {
  loading: () => <PageLoader />,
});

const ConsoleAnggotaPage = () => (
  <SecureConsolePage>
    <AnggotaModule />
  </SecureConsolePage>
);

export default ConsoleAnggotaPage;
