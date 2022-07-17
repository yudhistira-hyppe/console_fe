import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePengumumanPenggunaComponent = dynamic(
  () => import('modules/Pages/console/help-center/pengumuman/pilih-pengguna'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsolePengumumanPenggunaPage = () => (
  <SecureConsolePage>
    <ConsolePengumumanPenggunaComponent />
  </SecureConsolePage>
);

export default ConsolePengumumanPenggunaPage;
