import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const SettingAdsCenter = dynamic(() => import('modules/Pages/console/ads-center/setting'), {
  loading: () => <PageLoader />,
});

const ConsoleAdsCenterPage = () => (
  <SecureConsolePage>
    <SettingAdsCenter />
  </SecureConsolePage>
);

export default ConsoleAdsCenterPage;
