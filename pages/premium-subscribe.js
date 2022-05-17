//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import AuthPage from '../authentication/auth-page-wrappers/AuthPage';

const PremiumSubscribe = dynamic(() => import('../modules/Pages/premium-subscribe/Default'), {
  loading: () => <PageLoader />,
});

const PremiumSubscribePage = () => (
  <AuthPage>
    <PremiumSubscribe variant="standard" wrapperVariant="bgColor" />
  </AuthPage>
);

export default PremiumSubscribePage;
