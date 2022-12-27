import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const AddMemberModule = dynamic(() => import('modules/Pages/console/anggota/member/add'), {
  loading: () => <PageLoader />,
});

const AddMemberPage = () => (
  <SecureConsolePage>
    <AddMemberModule />
  </SecureConsolePage>
);

export default AddMemberPage;
