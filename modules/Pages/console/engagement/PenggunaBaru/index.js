import React, { useEffect, useState } from 'react';

import PenggunaBaruCard from './PenggunaCard';
import PenggunaBaruGraph from './PenggunaGraph';
import moment from 'moment';
import { CircularProgress, Stack } from '@mui/material';
import { useGetNewUserQuery } from 'api/console/engagement';

const PenggunaBaru = ({ pengguna, setPengguna }) => {
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const { data: newUser, isFetching: loadingUser } = useGetNewUserQuery(payload);

  useEffect(() => {
    if (!loadingUser) {
      setPengguna({
        ...pengguna,
        date: pengguna?.date === '' ? moment().subtract(6, 'day').format('YYYY-MM-DD') : pengguna?.date,
        total: newUser?.data?.map((item) => item?.count * 9).reduce((a, b) => a + b) || 0,
      });
    }
  }, [loadingUser]);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
    setPengguna({ ...pengguna, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalUser = () => {
    return newUser?.data?.map((item) => item?.count * 9).reduce((a, b) => a + b) || 0;
  };

  return (
    <PenggunaBaruCard title="Pengguna Baru" amount={totalUser()} handlePayload={handlePayload}>
      {loadingUser ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={130} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <PenggunaBaruGraph
          data={newUser?.data?.map((item) => {
            return {
              date: item?.date,
              count: item?.count * 9,
            };
          })}
        />
      )}
    </PenggunaBaruCard>
  );
};

export default PenggunaBaru;
