import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleEditFaqComponent = dynamic(() => import('modules/Pages/console/help_center/faq/form'), {
  loading: () => <PageLoader />,
});

const ConsoleEditFaqPage = () => (
  <SecurePage>
    <ConsoleEditFaqComponent />
  </SecurePage>
);

export default ConsoleEditFaqPage;
