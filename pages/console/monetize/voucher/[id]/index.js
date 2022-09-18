import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleVoucherDetailComponent = dynamic(() => import('modules/Pages/console/monetize/Voucher/Detail'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherDetailPage = () => (
  <SecureConsolePage>
    <ConsoleVoucherDetailComponent />
  </SecureConsolePage>
);

export default ConsoleVoucherDetailPage;
