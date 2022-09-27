import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';

const ConsoleKelolaVoucherComponent = dynamic(() => import('modules/Pages/console/monetize/Voucher/Kelola-Voucher'), {
  loading: () => <PageLoader />,
});

const ConsoleKelolaVoucherPage = () => (
  <SecureConsolePage>
    <ConsoleKelolaVoucherComponent />
  </SecureConsolePage>
);

export default ConsoleKelolaVoucherPage;
