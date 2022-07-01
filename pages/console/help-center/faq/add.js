import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleAddFaqComponent = dynamic(() => import('modules/Pages/console/help-center/faq/form'), {
  loading: () => <PageLoader />,
});

const ConsoleAddFaqPage = () => (
  <SecurePage>
    <ConsoleAddFaqComponent />
  </SecurePage>
);

export default ConsoleAddFaqPage;
