import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const boostAPI = createApi({
  reducerPath: 'console/boost',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListBoostPost: build.query({
      query: (data) => ({
        url: '/getusercontents/boostconsole/list',
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
  }),
});

export const { useGetListBoostPostQuery, useGetListSessionBoostQuery } = boostAPI;
