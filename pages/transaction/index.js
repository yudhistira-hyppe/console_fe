import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const WalletModule = dynamic(() => import('../../modules/Pages/wallet'), {
  loading: () => <PageLoader />,
});

const WalletsPage = () => (
  <SecurePage>
    <WalletModule />
  </SecurePage>
);

export default WalletsPage;
