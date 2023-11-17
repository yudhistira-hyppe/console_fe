import React, { useState } from 'react';

import { useGetUserTotalPostQuery } from 'api/console/dashboard';
import UnggahanCard from './unggahanCard';
import UnggahanGraph from './unggahanGraph';
import moment from 'moment';
import { CircularProgress, Stack } from '@mui/material';

const Unggahan = () => {
  const [payload, setPayload] = useState({ date: moment().subtract(6, 'day').format('YYYY-MM-DD') });
  const { data: userPost, isFetching: loadingPost } = useGetUserTotalPostQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalPost = () => {
    return userPost?.data?.data?.map((item) => item.totaldata * 19).reduce((a, b) => a + b) || 0;
  };

  return (
    <UnggahanCard title="Total Post" secondaryTitle="Bulan ini" amount={totalPost()} handlePayload={handlePayload}>
      {loadingPost ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={112} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <UnggahanGraph
          data={userPost?.data?.data?.map((item) => {
            return {
              _id: item?._id,
              totaldata: item?.totaldata * 19,
            };
          })}
        />
      )}
    </UnggahanCard>
  );
};

export default Unggahan;
