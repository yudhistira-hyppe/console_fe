import { CircularProgress, Stack } from '@mui/material';
import { useGetUserActiveQuery } from 'api/console/dashboard';
import moment from 'moment';
import React, { useState } from 'react';

import UserActiveCard from './userActiveCard';
import UserActiveGraph from './userActiveGraph';

const UserActive = () => {
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const { data: userActive, isFetching: loadingActive } = useGetUserActiveQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalActive = () => {
    return userActive?.data?.map((item) => item.count).reduce((a, b) => a + b) || 0;
  };

  return (
    <UserActiveCard title="Pengguna Aktif" secondaryTitle="Bulan ini" amount={totalActive()} handlePayload={handlePayload}>
      {loadingActive ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={112} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <UserActiveGraph
          data={userActive?.data?.map((item) => {
            return {
              date: item?.date,
              count: item?.count,
            };
          })}
        />
      )}
    </UserActiveCard>
  );
};

export default UserActive;
