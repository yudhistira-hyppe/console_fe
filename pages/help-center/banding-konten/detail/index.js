import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const DetailBandingKontenComponent = dynamic(() => import('modules/Pages/console/help-center/banding-konten/Detail'), {
  loading: () => <PageLoader />,
});

const DetailBandingKontenPage = () => (
  <SecureConsolePage>
    <DetailBandingKontenComponent />
  </SecureConsolePage>
);

export default DetailBandingKontenPage;
