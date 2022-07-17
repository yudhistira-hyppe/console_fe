import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsolePengumumanCreateComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman/create'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanCreatePage = () => (
  <SecureConsolePage>
    <ConsolePengumumanCreateComponent />
  </SecureConsolePage>
);

export default ConsolePengumumanCreatePage;
