import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePengumumanComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanPage = () => (
  <SecureConsolePage>
    <ConsolePengumumanComponent />
  </SecureConsolePage>
);

export default ConsolePengumumanPage;
