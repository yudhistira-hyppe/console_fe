import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleBantuanPenggunaComponent = dynamic(() => import('modules/Pages/console/help-center/bantuan-pengguna'), {
  loading: () => <PageLoader />,
});

const ConsoleBantuanPenggunaPage = () => (
  <SecureConsolePage>
    <ConsoleBantuanPenggunaComponent />
  </SecureConsolePage>
);

export default ConsoleBantuanPenggunaPage;
