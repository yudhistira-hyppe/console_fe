import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const accountBalancesAPI = createApi({
  reducerPath: 'balances',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    accountBalance: build.query({
      query: (payload) => ({
        url: `/accountbalances/wallet`,
        method: 'POST',
        body: payload,
      }),
    }),
    balanceHistory: build.query({
      query: (payload) => ({
        url: `/accountbalances/history`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useAccountBalanceQuery, useBalanceHistoryQuery } = accountBalancesAPI;
