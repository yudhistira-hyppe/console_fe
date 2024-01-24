import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const engagementApi = createApi({
  reducerPath: 'console/engagement',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getNewUser: build.query({
      query: (data) => ({
        url: '/userbasics/newuser/v2',
        method: 'POST',
        body: data,
      }),
    }),
    getDemographyUser: build.query({
      query: (data) => ({
        url: '/userbasics/demografis/v2',
        method: 'POST',
        body: data,
      }),
    }),
    getSesiUser: build.query({
      query: (data) => ({
        url: '/activityevents/logactivitas/sesi',
        method: 'POST',
        body: data,
      }),
    }),
    getActivityUser: build.query({
      query: (data) => ({
        url: '/posts/interaksi/v2',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetNewUserQuery, useGetDemographyUserQuery, useGetSesiUserQuery, useGetActivityUserQuery } = engagementApi;
