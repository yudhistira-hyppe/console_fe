import React, { useState } from 'react';
import JualBeliCard from './JualBeliCard';
import JualBeliGraph from './JualBeliGraph';
import moment from 'moment';
import { useAuth } from 'authentication';
import { CircularProgress, Stack } from '@mui/material';
import { useGetPendapatanJualBeliQuery } from 'api/console/monetize/dashboard';

const JualBeli = () => {
  const { authUser } = useAuth();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const { data: jualBeli, isFetching: loadingIncome } = useGetPendapatanJualBeliQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  return (
    <JualBeliCard
      title="Pendapatan Voucher"
      secondaryTitle="Bulan ini"
      amount={jualBeli?.data?.total || 0}
      handlePayload={handlePayload}>
      {loadingIncome ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={112} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <JualBeliGraph data={jualBeli?.data?.array} />
      )}
    </JualBeliCard>
  );
};

export default JualBeli;
