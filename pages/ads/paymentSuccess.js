import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const PaymentSuccessful = dynamic(() => import('../../modules/Pages/ads/CreateCampaign/PaymentSuccessful'), {
  loading: () => <PageLoader />,
});

const PaymentSuccessfulPage = () => (
  <SecurePage>
    <PaymentSuccessful />
  </SecurePage>
);

export default PaymentSuccessfulPage;
