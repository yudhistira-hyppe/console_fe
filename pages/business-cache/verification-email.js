import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const VerificationEmail = dynamic(() => import('../modules/Pages/verification-email'), {
  loading: () => <PageLoader />,
});

const VerificationEmailPage = () => (
  <SecurePage>
    <VerificationEmail />
  </SecurePage>
);

export default VerificationEmailPage;
