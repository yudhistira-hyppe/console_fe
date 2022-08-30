import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ProfileConsole = dynamic(() => import('modules/Pages/console/profile-console'), {
  loading: () => <PageLoader />,
});

const SignInPage = () => (
  <SecureConsolePage>
    <ProfileConsole />
  </SecureConsolePage>
);

export default SignInPage;
