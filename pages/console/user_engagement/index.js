//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleUserEngagementComponent = dynamic(() => import('modules/Pages/console/engagement'), {
  loading: () => <PageLoader />,
  //ssr: false
});

const ConsoleUserEngagementPage = () => (
  <SecurePage>
    <ConsoleUserEngagementComponent />
  </SecurePage>
);

export default ConsoleUserEngagementPage;
