import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const accountBalancesAPI = createApi({
  reducerPath: 'accontBalances',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    accountBalance: build.query({
      query: (email) => ({
        url: `/accountbalances`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const { useAccountBalanceQuery } = accountBalancesAPI;
