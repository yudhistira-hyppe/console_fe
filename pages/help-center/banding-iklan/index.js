import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const BandingIklanComponent = dynamic(() => import('modules/Pages/console/help-center/banding-iklan'), {
  loading: () => <PageLoader />,
});

const BandingIklanPage = () => (
  <SecureConsolePage>
    <BandingIklanComponent />
  </SecureConsolePage>
);

export default BandingIklanPage;
