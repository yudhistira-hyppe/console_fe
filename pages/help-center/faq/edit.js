import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleEditFaqComponent = dynamic(() => import('modules/Pages/console/help-center/faq/form'), {
  loading: () => <PageLoader />,
});

const ConsoleEditFaqPage = () => (
  <SecureConsolePage>
    <ConsoleEditFaqComponent />
  </SecureConsolePage>
);

export default ConsoleEditFaqPage;
