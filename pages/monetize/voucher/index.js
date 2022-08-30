import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleVoucherComponent = dynamic(() => import('modules/Pages/console/monetize/voucher'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherPage = () => (
  <SecureConsolePage>
    <ConsoleVoucherComponent />
  </SecureConsolePage>
);

export default ConsoleVoucherPage;
