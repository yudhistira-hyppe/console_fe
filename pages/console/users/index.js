import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePenggunaComponent = dynamic(() => import('modules/Pages/console/users'), {
  loading: () => <PageLoader />,
});

const ConsolePenggunaPage = () => (
  <SecurePage>
    <ConsolePenggunaComponent />
  </SecurePage>
);

export default ConsolePenggunaPage;
