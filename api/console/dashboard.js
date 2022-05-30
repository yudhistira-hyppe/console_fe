import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'api';

export const dashboardApi = createApi({
  reducerPath: 'console/dashboard',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getUserActiveByYear: build.query({
      query: (year) => ({
        url: `/userbasics/useractiveyear`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
    getUserActiveBeforeToday: build.query({
      query: (day) => ({
        url: `/userbasics/useractivebeforetoday`,
        method: 'POST',
        body: {
          day,
        },
      }),
    }),
    getMonetizeByYear: build.query({
      query: (year) => ({
        url: `/posts/monetizebyyear`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
  }),
});

export const { useGetUserActiveByYearQuery, useGetUserActiveBeforeTodayQuery, useGetMonetizeByYearQuery } = dashboardApi;
