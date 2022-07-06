import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const LinkVerification = dynamic(() => import('../modules/Pages/link-verification'), {
  loading: () => <PageLoader />,
});

const LinkVerificationPage = () => (
  <SecurePage>
    <LinkVerification />
  </SecurePage>
);

export default LinkVerificationPage;
