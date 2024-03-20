import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const transactionUtilityApi = createApi({
  reducerPath: 'utilitas/transaction',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'detail'],
  endpoints: (build) => ({
    getListCategory: build.query({
      query: (params) => ({
        url: `/transactions/v2/categorys${params || ''}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetListCategoryQuery } = transactionUtilityApi;
