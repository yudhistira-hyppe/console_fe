import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleFaqComponent = dynamic(() => import('modules/Pages/console/help-center/faq'), {
  loading: () => <PageLoader />,
});

const ConsoleFaqPage = () => (
  <SecureConsolePage>
    <ConsoleFaqComponent />
  </SecureConsolePage>
);

export default ConsoleFaqPage;
