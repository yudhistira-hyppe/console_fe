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
    deleteTopup: build.mutation({
      query: (data) => ({
        url: '/topups/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listTopup'],
    }),
    approveTopup: build.mutation({
      query: (data) => ({
        url: '/topups/approve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listTopup'],
    }),
    createTopup: build.mutation({
      query: (data) => ({
        url: '/topups/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listTopup'],
    }),
  }),
});

export const {
  useGetTotalSemuaPendapatanQuery,
  useGetPendapatanJualBeliQuery,
  useGetListTopupQuery,
  useDeleteTopupMutation,
  useApproveTopupMutation,
  useCreateTopupMutation,
} = dashboardMonetizeAPI;
