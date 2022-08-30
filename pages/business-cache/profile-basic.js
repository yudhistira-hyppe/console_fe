import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const ProfileBasic = dynamic(() => import('../modules/Pages/profile-basic'), {
  loading: () => <PageLoader />,
});

const ModuleProfileBasic = () => (
  <SecurePage>
    <ProfileBasic />
  </SecurePage>
);

export default ModuleProfileBasic;
