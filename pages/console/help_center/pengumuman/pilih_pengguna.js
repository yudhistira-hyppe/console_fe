//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePengumumanPenggunaComponent = dynamic(() => import('modules/Pages/console/help_center/pengumuman/pilih_pengguna'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanPenggunaPage = () => (
  <SecurePage>
    <ConsolePengumumanPenggunaComponent />
  </SecurePage>
);

export default ConsolePengumumanPenggunaPage;
