import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const boostAPI = createApi({
  reducerPath: 'console/boost',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListBoostPost: build.query({
      query: (data) => ({
        url: '/getusercontents/boostconsole/list/v2',
        method: 'POST',
        body: data,
      }),
    }),
    getListSessionBoost: build.query({
      query: () => ({
        url: '/boostsession',
        method: 'GET',
      }),
    }),
    getAnalyticBoost: build.query({
      query: () => ({
        url: '/getusercontents/boostconsole/v2',
        method: 'POST',
      }),
    }),
    getDetailBoostPost: build.query({
      query: (data) => ({
        url: '/getusercontents/boostconsole/list/details/v2',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetListBoostPostQuery,
  useGetListSessionBoostQuery,
  useGetAnalyticBoostQuery,
  useGetDetailBoostPostQuery,
} = boostAPI;
