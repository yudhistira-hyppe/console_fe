import React, { useState } from 'react';

import PendapatanCard from './PendapatanCard';
import PendapatanGraph from './PendapataGraph';
import { useGetAdminBalancesQuery } from 'api/console/dashboard';
import moment from 'moment';
import { useAuth } from 'authentication';
import { CircularProgress, Stack } from '@mui/material';

const Pendapatan = () => {
  const { authUser } = useAuth();
  const [payload, setPayload] = useState({
    iduser: authUser?.user?.id,
    date: moment().subtract(6, 'day').format('YYYY-MM-DD'),
  });
  const { data: adminBalance, isFetching: loadingBalance } = useGetAdminBalancesQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalBalance = () => {
    return adminBalance?.data?.data?.map((item) => item.totalpendapatanperhari).reduce((a, b) => a + b) || 0;
  };

  return (
    <PendapatanCard
      title="Total Pendapatan"
      secondaryTitle="Bulan ini"
      amount={totalBalance()}
      handlePayload={handlePayload}>
      {loadingBalance ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={112} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <PendapatanGraph data={adminBalance?.data?.data} />
      )}
    </PendapatanCard>
  );
};

export default Pendapatan;
