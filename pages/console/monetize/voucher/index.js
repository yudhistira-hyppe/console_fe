//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleVoucherComponent = dynamic(() => import('modules/Pages/console/monetize/voucher'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherPage = () => (
  <SecurePage>
    <ConsoleVoucherComponent />
  </SecurePage>
);

export default ConsoleVoucherPage;
