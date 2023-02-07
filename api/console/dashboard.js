import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const dashboardApi = createApi({
  reducerPath: 'console/dashboard',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getUserActive: build.query({
      query: (data) => ({
        url: '/userauths/useractivebychart',
        method: 'POST',
        body: data,
      }),
    }),
    getUserTotalPost: build.query({
      query: (data) => ({
        url: '/posts/postbychart',
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
        url: '/posts/analityc',
        method: 'POST',
        body: data,
      }),
    }),
    getOwnershipChart: build.query({
      query: () => ({
        url: '/posts/showsertifikasistatbychart',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserActiveQuery,
  useGetUserTotalPostQuery,
  useGetAdminBalancesQuery,
  useGetVoucherIncomeQuery,
  useGetPostAnalyticQuery,
  useGetOwnershipChartQuery,
} = dashboardApi;
