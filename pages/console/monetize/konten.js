//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleMonetizeContentComponent = dynamic(() => import('modules/Pages/console/monetize/content'), {
  loading: () => <PageLoader />,
});

const ConsoleMonetizeContentPage = () => (
  <SecurePage>
    <ConsoleMonetizeContentComponent />
  </SecurePage>
);

export default ConsoleMonetizeContentPage;
