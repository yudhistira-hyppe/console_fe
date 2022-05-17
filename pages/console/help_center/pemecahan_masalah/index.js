//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsolePemecahanMasalahComponent = dynamic(() => import('modules/Pages/console/help_center/pemecahan_masalah'), {
  loading: () => <PageLoader />,
});

const ConsolePemecahanMasalahPage = () => (
  <SecurePage>
    <ConsolePemecahanMasalahComponent />
  </SecurePage>
);

export default ConsolePemecahanMasalahPage;
