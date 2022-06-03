import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const dashboardApi = createApi({
  reducerPath: 'console/dashboard',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getUserActivityByDate: build.query({
      query: (date) => ({
        url: `/contentevents/useractivitynow`,
        method: 'POST',
        body: {
          date,
        },
      }),
    }),
    getUserActivityBeforeToday: build.query({
      query: (day) => ({
        url: `/contentevents/useractivitybeforetoday`,
        method: 'POST',
        body: {
          day,
        },
      }),
    }),
    getUserEventActivityBeforeToday: build.query({
      query: (day) => ({
        url: `/contentevents/useractivitysize`,
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

export const {
  useGetUserActivityByDateQuery,
  useGetUserActivityBeforeTodayQuery,
  useGetUserEventActivityBeforeTodayQuery,
  useGetMonetizeByYearQuery,
} = dashboardApi;
