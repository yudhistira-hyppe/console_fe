import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailAds = dynamic(() => import('modules/Pages/console/ads-center/manage/tab/iklan/detail'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterDetailPage = () => (
  <SecureConsolePage>
    <DetailAds />
  </SecureConsolePage>
);

export default ConsoleAdsCenterDetailPage;
