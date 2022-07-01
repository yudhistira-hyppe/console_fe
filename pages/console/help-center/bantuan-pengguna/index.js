import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleBantuanPenggunaComponent = dynamic(() => import('modules/Pages/console/help-center/bantuan-pengguna'), {
  loading: () => <PageLoader />,
});

const ConsoleBantuanPenggunaPage = () => (
  <SecurePage>
    <ConsoleBantuanPenggunaComponent />
  </SecurePage>
);

export default ConsoleBantuanPenggunaPage;
