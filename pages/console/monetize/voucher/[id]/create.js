import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleVoucherCreateComponent = dynamic(() => import('modules/Pages/console/monetize/voucher/create'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherCreatePage = () => (
  <SecurePage>
    <ConsoleVoucherCreateComponent />
  </SecurePage>
);

export default ConsoleVoucherCreatePage;
