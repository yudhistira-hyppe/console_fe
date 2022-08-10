import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AddPositionAnggotaModule = dynamic(() => import('modules/Pages/console/anggota/addPosition'), {
  loading: () => <PageLoader />,
});

const ConsoleAddAnggotaPage = () => (
  <SecureConsolePage>
    <AddPositionAnggotaModule />
  </SecureConsolePage>
);

export default ConsoleAddAnggotaPage;
