import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import { useGetVoucherByIDQuery } from 'api/console/monetize/voucher';
import { useRouter } from 'next/router';

const ConsoleVoucherDetailComponent = dynamic(() => import('modules/Pages/console/monetize/Voucher/Detail'), {
  loading: () => <PageLoader />,
});

const ConsoleVoucherDetailPage = () => {
  const router = useRouter();
  const { data: detailVoucher, isLoading } = useGetVoucherByIDQuery(router.query?.id);

  return (
    <SecureConsolePage>
      {isLoading ? <PageLoader /> : <ConsoleVoucherDetailComponent data={detailVoucher} />}
    </SecureConsolePage>
  );
};

export default ConsoleVoucherDetailPage;
