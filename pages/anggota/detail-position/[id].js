import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailPosition = dynamic(() => import('modules/Pages/console/anggota/detail-position'), {
  loading: () => <PageLoader />,
});

const DetailPositionPage = () => (
  <SecureConsolePage>
    <DetailPosition />
  </SecureConsolePage>
);

export default DetailPositionPage;
