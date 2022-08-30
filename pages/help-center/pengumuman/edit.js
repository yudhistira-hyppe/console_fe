import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePengumumanEditComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman/edit'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanEditPage = () => (
  <SecureConsolePage>
    <ConsolePengumumanEditComponent />
  </SecureConsolePage>
);

export default ConsolePengumumanEditPage;
