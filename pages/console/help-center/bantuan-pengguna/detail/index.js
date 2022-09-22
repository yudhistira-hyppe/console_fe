import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleDetailBantuanPenggunaComponent = dynamic(
  () => import('modules/Pages/console/help-center/bantuan-pengguna/Detail'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsoleDetailBantuanPenggunaPage = () => (
  <SecureConsolePage>
    <ConsoleDetailBantuanPenggunaComponent />
  </SecureConsolePage>
);

export default ConsoleDetailBantuanPenggunaPage;
