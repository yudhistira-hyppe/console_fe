import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePengumumanEditComponent = dynamic(() => import('modules/Pages/console/help-center/pengumuman/edit'), {
  loading: () => <PageLoader />,
});

const ConsolePengumumanEditPage = () => (
  <SecurePage>
    <ConsolePengumumanEditComponent />
  </SecurePage>
);

export default ConsolePengumumanEditPage;
