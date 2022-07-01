import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePenggunaDetailComponent = dynamic(() => import('modules/Pages/console/users/DetailPengguna'), {
  loading: () => <PageLoader />,
});

const ConsolePenggunaDetailPage = () => (
  <SecurePage>
    <ConsolePenggunaDetailComponent />
  </SecurePage>
);

export default ConsolePenggunaDetailPage;
