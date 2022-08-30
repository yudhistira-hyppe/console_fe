//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Premium = dynamic(() => import('../../modules/Pages/dashboards'), {
  loading: () => <PageLoader />,
});

const PremiumDashboard = () => (
  <SecurePage>
    <Premium />
  </SecurePage>
);

export default PremiumDashboard;
