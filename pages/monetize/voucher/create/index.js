import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleVoucherCreateComponent = dynamic(() => import('modules/Pages/console/monetize/voucher/detail'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherCreatePage = () => (
  <SecureConsolePage>
    <ConsoleVoucherCreateComponent />
  </SecureConsolePage>
);

export default ConsoleVoucherCreatePage;
