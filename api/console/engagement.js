import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'api';

export const engagementApi = createApi({
  reducerPath: 'console/engagement',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getLogActivitiesByYear: build.query({
      query: (year) => ({
        url: `/activityevents/logsctivitas`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
    getEngagementInsightByYear: build.query({
      query: (year) => ({
        url: `/insights/engagement`,
        method: 'POST',
        body: {
          year,
        },
      }),
    }),
  }),
});

export const { useGetLogActivitiesByYearQuery, useGetEngagementInsightByYearQuery } = engagementApi;
