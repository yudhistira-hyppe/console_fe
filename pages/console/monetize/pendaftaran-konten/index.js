import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleMonetizeContentRegisteredComponent = dynamic(
  () => import('modules/Pages/console/monetize/pendaftaran-content'),
  {
    loading: () => <PageLoader />,
  },
);

const ConsoleMonetizeContentRegisteredPage = () => (
  <SecureConsolePage>
    <ConsoleMonetizeContentRegisteredComponent />
  </SecureConsolePage>
);

export default ConsoleMonetizeContentRegisteredPage;
