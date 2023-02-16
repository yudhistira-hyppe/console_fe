import React, { useState } from 'react';
import { useGetVoucherIncomeQuery } from 'api/console/dashboard';

import VoucherCard from './VoucherCard';
import VoucherGraph from './VoucherGraph';
import moment from 'moment';
import { useAuth } from 'authentication';
import { CircularProgress, Stack } from '@mui/material';

const UserACtiveGraphhh = () => {
  const { authUser } = useAuth();
  const [payload, setPayload] = useState({
    idusersell: authUser?.user?.id,
    date: moment().subtract(6, 'day').format('YYYY-MM-DD'),
  });
  const { data: voucherIncome, isFetching: loadingIncome } = useGetVoucherIncomeQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  return (
    <VoucherCard
      title="Pendapatan Voucher"
      secondaryTitle="Bulan ini"
      amount={voucherIncome?.data?.total || 0}
      handlePayload={handlePayload}>
      {loadingIncome ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={112} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <VoucherGraph data={voucherIncome?.data?.data} />
      )}
    </VoucherCard>
  );
};

export default UserACtiveGraphhh;
