//MODIFIED HYPPE
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const PremiumConfirm = dynamic(() => import('../modules/Pages/premium-confirm/Default'), {
  loading: () => <PageLoader />,
});

const PremiumConfirmPage = () => {
  const router = useRouter();
  return (
      <PremiumConfirm variant="standard" wrapperVariant="bgColor" queryParams={router.query} />
  );
};

export default PremiumConfirmPage;
