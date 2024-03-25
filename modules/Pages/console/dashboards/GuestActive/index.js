import { CircularProgress, Stack } from '@mui/material';
import { useGetGuestActiveQuery } from 'api/console/dashboard';
import moment from 'moment';
import React, { useState } from 'react';

import GuestActiveCard from './guestActiveCard';
import GuestActiveGraph from './guestActiveGraph';

const GuestActive = () => {
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const { data: guestActive, isFetching: loadingActive } = useGetGuestActiveQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalActive = () => {
    return guestActive?.data?.map((item) => item.count).reduce((a, b) => a + b) || 0;
  };

  return (
    <GuestActiveCard title="Guest Aktif" secondaryTitle="Bulan ini" amount={totalActive()} handlePayload={handlePayload}>
      {loadingActive ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={130} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <GuestActiveGraph
          data={guestActive?.data?.map((item) => {
            return {
              date: item?.date,
              count: item?.count,
            };
          })}
        />
      )}
    </GuestActiveCard>
  );
};

export default GuestActive;
