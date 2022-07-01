import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePengumumanComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanPage = () => (
  <SecurePage>
    <ConsolePengumumanComponent />
  </SecurePage>
);

export default ConsolePengumumanPage;
