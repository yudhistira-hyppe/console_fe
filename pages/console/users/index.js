import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePenggunaComponent = dynamic(() => import('modules/Pages/console/users'), {
  loading: () => <PageLoader />,
});

const ConsolePenggunaPage = () => (
  <SecureConsolePage>
    <ConsolePenggunaComponent />
  </SecureConsolePage>
);

export default ConsolePenggunaPage;
