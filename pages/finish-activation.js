import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const FinishActivation = dynamic(() => import('../modules/Pages/finish-activation'), {
  loading: () => <PageLoader />,
});

const FinishActivationPage = () => (
  <SecurePage>
    <FinishActivation variant="standard" wrapperVariant="bgColor" />
  </SecurePage>
);

export default FinishActivationPage;
