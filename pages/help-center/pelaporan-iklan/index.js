import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const PelaporanIklan = dynamic(() => import('modules/Pages/console/help-center/pelaporan-iklan'), {
  loading: () => <PageLoader />,
});

const PelaporanIklanPage = () => (
  <SecureConsolePage>
    <PelaporanIklan />
  </SecureConsolePage>
);

export default PelaporanIklanPage;
