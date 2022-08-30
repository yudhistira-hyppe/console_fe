import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const ProfilePremium = dynamic(() => import('../modules/Pages/profile-premium'), {
  loading: () => <PageLoader />,
});

const ModuleProfilePremium = () => (
  <SecurePage>
    <ProfilePremium />
  </SecurePage>
);

export default ModuleProfilePremium;
