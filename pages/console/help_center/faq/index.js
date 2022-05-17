//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleFaqComponent = dynamic(() => import('modules/Pages/console/help_center/faq'), {
  loading: () => <PageLoader />,
});

const ConsoleFaqPage = () => (
  <SecurePage>
    <ConsoleFaqComponent />
  </SecurePage>
);

export default ConsoleFaqPage;
