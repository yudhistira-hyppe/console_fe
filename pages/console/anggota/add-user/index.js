import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AddAnggotaModule = dynamic(() => import('modules/Pages/console/anggota/addUser'), {
  loading: () => <PageLoader />,
});

const ConsoleAddAnggotaPage = () => (
  <SecureConsolePage>
    <AddAnggotaModule />
  </SecureConsolePage>
);

export default ConsoleAddAnggotaPage;
