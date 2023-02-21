import React, { useState } from 'react';

import PenggunaBaruCard from './PenggunaCard';
import PenggunaBaruGraph from './PenggunaGraph';
import moment from 'moment';
import { CircularProgress, Stack } from '@mui/material';
import { useGetNewUserQuery } from 'api/console/engagement';

const PenggunaBaru = () => {
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const { data: newUser, isFetching: loadingUser } = useGetNewUserQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalUser = () => {
    return newUser?.data?.map((item) => item.count).reduce((a, b) => a + b) || 0;
  };

  return (
    <PenggunaBaruCard title="Pengguna Baru" amount={totalUser()} handlePayload={handlePayload}>
      {loadingUser ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={130} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <PenggunaBaruGraph data={newUser?.data} />
      )}
    </PenggunaBaruCard>
  );
};

export default PenggunaBaru;
