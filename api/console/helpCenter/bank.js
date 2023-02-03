import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const bankApi = createApi({
  reducerPath: 'helpCenter/rekening-bank',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['bank'],
  endpoints: (build) => ({
    getListBank: build.query({
      query: (data) => ({
        url: '/userbankaccounts/getAccountList',
        method: 'POST',
        body: data,
      }),
      providesTags: ['bank'],
    }),
  }),
});

export const { useGetListBankQuery } = bankApi;
