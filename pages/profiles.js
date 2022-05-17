import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const Profiles = dynamic(() => import('../modules/Pages/profiles'), {
  loading: () => <PageLoader />,
});

const ModuleProfiles = () => (
  <SecurePage>
    <Profiles />
  </SecurePage>
);

export default ModuleProfiles;
