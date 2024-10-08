import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const dashboardApi = createApi({
  reducerPath: 'console/dashboard',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getUserActive: build.query({
      query: (data) => ({
        url: '/activityevents/logactivitas/sesi',
        method: 'POST',
        body: data,
      }),
    }),
    getGuestActive: build.query({
      query: (data) => ({
        url: '/activityevents/logactivitas/guest',
        method: 'POST',
        body: data,
      }),
    }),
    getTotalGuest: build.query({
      query: () => ({
        url: '/newuserbasics/guestchart',
        method: 'GET',
      }),
    }),
    getUserTotalPost: build.query({
      query: (data) => ({
        url: '/posts/postbychart/v2',
        method: 'POSt',
        body: data,
      }),
    }),
    getAdminBalances: build.query({
      query: (data) => ({
        url: '/accountbalances/incomebychart',
        method: 'POST',
        body: data,
      }),
    }),
    getVoucherIncome: build.query({
      query: (data) => ({
        url: '/transactions/vouchersellchart',
        method: 'POST',
        body: data,
      }),
    }),
    getPostAnalytic: build.query({
      query: (data) => ({
        url: '/posts/analityc/v2',
        method: 'POST',
        body: data,
      }),
    }),
    getOwnershipChart: build.query({
      query: () => ({
        url: '/posts/showsertifikasistatbychart/v2',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserActiveQuery,
  useGetGuestActiveQuery,
  useGetTotalGuestQuery,
  useGetUserTotalPostQuery,
  useGetAdminBalancesQuery,
  useGetVoucherIncomeQuery,
  useGetPostAnalyticQuery,
  useGetOwnershipChartQuery,
} = dashboardApi;
