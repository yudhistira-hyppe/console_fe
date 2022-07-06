import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const TranscationModule = dynamic(() => import('../../modules/Pages/transaction'), {
  loading: () => <PageLoader />,
});

const TranscationPage = () => (
  <SecurePage>
    <TranscationModule />
  </SecurePage>
);

export default TranscationPage;
