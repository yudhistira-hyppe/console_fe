import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleDetailKeluhanPenggunaComponent = dynamic(
  () => import('modules/Pages/console/help-center/keluhan-pengguna/Detail'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsoleDetailKeluhanPenggunaPage = () => (
  <SecureConsolePage>
    <ConsoleDetailKeluhanPenggunaComponent />
  </SecureConsolePage>
);

export default ConsoleDetailKeluhanPenggunaPage;
