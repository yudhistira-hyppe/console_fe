//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecurePage from 'authentication/auth-page-wrappers/SecurePage';

const ConsoleVoucherDetailComponent = dynamic(() => import('modules/Pages/console/monetize/voucher/detail'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherDetailPage = () => (
  <SecurePage>
    <ConsoleVoucherDetailComponent />
  </SecurePage>
);

export default ConsoleVoucherDetailPage;
