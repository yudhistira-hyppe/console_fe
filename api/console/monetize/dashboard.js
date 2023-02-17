import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const dashboardMonetizeAPI = createApi({
  reducerPath: 'monetize/dashboard',
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
  }),
});

export const { useGetTotalSemuaPendapatanQuery, useGetPendapatanJualBeliQuery } = dashboardMonetizeAPI;
