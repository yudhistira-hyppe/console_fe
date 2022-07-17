import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const SignIn = dynamic(() => import('modules/Pages/console/signin'), {
  loading: () => <PageLoader />,
});

const SignInPage = () => (
  <SecureConsolePage>
    <SignIn />
  </SecureConsolePage>
);

export default SignInPage;
