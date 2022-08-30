//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const SignIn = dynamic(() => import('../modules/Pages/sign-in/Default'), {
  loading: () => <PageLoader />,
});

const SignInPage = () => (
  <AuthPage>
    <SignIn variant="bgColor" wrapperVariant="bgColor" />
  </AuthPage>
);

export default SignInPage;
