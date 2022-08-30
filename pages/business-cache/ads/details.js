import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const CampaignDetail = dynamic(() => import('../../modules/Pages/ads/CampaignDetail'), {
  loading: () => <PageLoader />,
});

const CreateCampaign = () => (
  <SecurePage>
    <CampaignDetail />
  </SecurePage>
);

export default CreateCampaign;
