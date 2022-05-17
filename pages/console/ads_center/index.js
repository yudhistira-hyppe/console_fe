//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleAdsCenterComponent = dynamic(() => import('modules/Pages/console/ads_center'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterPage = () => (
  <SecurePage>
    <ConsoleAdsCenterComponent />
  </SecurePage>
);

export default ConsoleAdsCenterPage;
