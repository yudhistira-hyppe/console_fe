import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const ContentsModule = dynamic(() => import('../../modules/Pages/content-management'), {
  loading: () => <PageLoader />,
});

const ContensPage = () => (
  <SecurePage>
    <ContentsModule />
  </SecurePage>
);

export default ContensPage;
