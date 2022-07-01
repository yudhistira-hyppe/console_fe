import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleMonetizeContentRegisteredComponent = dynamic(
  () => import('modules/Pages/console/monetize/pendaftaran-content'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsoleMonetizeContentRegisteredPage = () => (
  <SecurePage>
    <ConsoleMonetizeContentRegisteredComponent />
  </SecurePage>
);

export default ConsoleMonetizeContentRegisteredPage;
