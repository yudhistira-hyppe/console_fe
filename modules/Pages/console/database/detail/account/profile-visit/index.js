import { CircularProgress, Stack } from '@mui/material';
import { useGetUserActiveQuery } from 'api/console/dashboard';
import moment from 'moment';
import React, { useState } from 'react';

import ProfileVisitCard from './card';
import ProfileVisitGraph from './graph';
import dayjs from 'dayjs';

const ProfileVisit = () => {
  return (
    <ProfileVisitCard title="Total Kunjungan" amount={0}>
      {typeof window === 'undefined' ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={120} spacing={2}>
          <CircularProgress color="secondary" size={24} />
        </Stack>
      ) : (
        <ProfileVisitGraph
          data={[...new Array(7)]?.map((item, key) => {
            return {
              date: dayjs()
                .subtract(-key + 6, 'day')
                .format('YYYY-MM-DD'),
              count: 0,
            };
          })}
        />
      )}
    </ProfileVisitCard>
  );
};

export default ProfileVisit;
