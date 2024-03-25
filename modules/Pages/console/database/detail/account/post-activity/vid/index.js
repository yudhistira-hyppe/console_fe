import { CircularProgress, Stack } from '@mui/material';
import { useGetUserActiveQuery } from 'api/console/dashboard';
import moment from 'moment';
import React, { useState } from 'react';

import ActivityPostVidCard from './card';
import ActivityPostVidGraph from './graph';
import dayjs from 'dayjs';

const ActivityPostVid = () => {
  return (
    <ActivityPostVidCard title="Hyppevid" amount={0}>
      {typeof window === 'undefined' ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={120} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <ActivityPostVidGraph
          data={[...new Array(7)]?.map((item, key) => {
            return {
              date: dayjs()
                .subtract(-key + 6, 'day')
                .format('YYYY-MM-DD'),
              views: 0,
              likes: 0,
            };
          })}
        />
      )}
    </ActivityPostVidCard>
  );
};

export default ActivityPostVid;
