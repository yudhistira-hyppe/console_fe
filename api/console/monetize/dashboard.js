import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const dashboardMonetizeAPI = createApi({
  reducerPath: 'monetize/dashboard',
  tagTypes: ['listTopup'],
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getTotalSemuaPendapatan: build.query({
      query: (data) => ({
        url: '/accountbalances/totalincomedata',
        method: 'POST',
        body: data,
      }),
    }),
    getPendapatanJualBeli: build.query({
      query: (data) => ({
        url: '/accountbalances/totalallincomebychart',
        method: 'POST',
        body: data,
      }),
    }),
    getListTopup: build.query({
      query: (data) => ({
        url: '/topups/list',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listTopup'],
    }),
  }),
});

export const { useGetTotalSemuaPendapatanQuery, useGetPendapatanJualBeliQuery, useGetListTopupQuery } = dashboardMonetizeAPI;
