import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const PremiumActivation = dynamic(() => import('../modules/Pages/premium-activation'), {
  loading: () => <PageLoader />,
});

const PremiumActivationPage = () => (
  <SecurePage>
    <PremiumActivation />
  </SecurePage>
);

export default PremiumActivationPage;
