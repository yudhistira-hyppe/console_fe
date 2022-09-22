import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePenggunaDetailComponent = dynamic(() => import('modules/Pages/console/users/DetailPengguna'), {
  loading: () => <PageLoader />,
});

const ConsolePenggunaDetailPage = () => (
  <SecureConsolePage>
    <ConsolePenggunaDetailComponent />
  </SecureConsolePage>
);

export default ConsolePenggunaDetailPage;
