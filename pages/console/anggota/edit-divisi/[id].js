import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const EditDivisiModule = dynamic(() => import('modules/Pages/console/anggota/editDivisi'), {
  loading: () => <PageLoader />,
});

const ConsoleEditDivisiPage = () => (
  <SecureConsolePage>
    <EditDivisiModule />
  </SecureConsolePage>
);

export default ConsoleEditDivisiPage;
