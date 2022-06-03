import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const engagementApi = createApi({
  reducerPath: 'console/engagement',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getLogActivityByYear: build.query({
      query: (year) => ({
        url: `/activityevents/logsctivitas`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
    getUserEventActivityByYear: build.query({
      query: (year) => ({
        url: `/contentevents/useractivitysizeYear`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
    getUserActivityByYear: build.query({
      query: (year) => ({
        url: `/contentevents/useractivityyear`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
  }),
});

export const { useGetLogActivityByYearQuery, useGetUserEventActivityByYearQuery, useGetUserActivityByYearQuery } =
  engagementApi;
