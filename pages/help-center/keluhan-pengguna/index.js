import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleKeluhanPenggunaComponent = dynamic(() => import('modules/Pages/console/help-center/keluhan-pengguna'), {
  loading: () => <PageLoader />,
});

const ConsoleKeluhanPenggunaPage = () => (
  <SecureConsolePage>
    <ConsoleKeluhanPenggunaComponent />
  </SecureConsolePage>
);

export default ConsoleKeluhanPenggunaPage;
