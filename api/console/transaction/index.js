import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const transactionAPI = createApi({
  reducerPath: 'console/transaction',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    allTransaction: build.query({
      query: (payload) => ({
        url: `/transactions/list/v2`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useAllTransactionQuery, useLazyAllTransactionQuery } = transactionAPI;
