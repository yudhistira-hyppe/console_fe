import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const EditMemberModule = dynamic(() => import('modules/Pages/console/anggota/member/edit'), {
  loading: () => <PageLoader />,
});

const EditMemberPage = () => {
  return (
    <SecureConsolePage>
      <EditMemberModule />
    </SecureConsolePage>
  );
};

export default EditMemberPage;
