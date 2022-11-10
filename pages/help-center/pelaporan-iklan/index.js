import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePelaporanIklanComponent = dynamic(() => import('modules/Pages/console/help-center/pelaporan-iklan'), {
  loading: () => <PageLoader />,
});

const ConsolePelaporanIklanPage = () => (
  <SecureConsolePage>
    <ConsolePelaporanIklanComponent />
  </SecureConsolePage>
);

export default ConsolePelaporanIklanPage;
