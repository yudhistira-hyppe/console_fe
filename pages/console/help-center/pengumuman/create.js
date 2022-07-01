import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePengumumanCreateComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman/create'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanCreatePage = () => (
  <SecurePage>
    <ConsolePengumumanCreateComponent />
  </SecurePage>
);

export default ConsolePengumumanCreatePage;
