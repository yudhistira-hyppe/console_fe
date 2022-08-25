import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AddDivisi = dynamic(() => import('modules/Pages/console/anggota/addDivisi'), {
  loading: () => <PageLoader />,
});

const ConsoleEditDivisiPage = () => (
  <SecureConsolePage>
    <AddDivisi />
  </SecureConsolePage>
);

export default ConsoleEditDivisiPage;
