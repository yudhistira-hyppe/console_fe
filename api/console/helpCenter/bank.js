import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const bankApi = createApi({
  reducerPath: 'helpCenter/rekening-bank',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['bank'],
  endpoints: (build) => ({
    getListBank: build.query({
      query: (data) => ({
        url: '/userbankaccounts/getAccountList/v2',
        method: 'POST',
        body: data,
      }),
      providesTags: ['bank'],
    }),
    getDetailBank: build.query({
      query: (id) => ({
        url: `/userbankaccounts/getAccountList/v2/${id}`,
        method: 'GET',
      }),
      providesTags: ['bank'],
    }),
    updateStatusBank: build.mutation({
      query: (data) => ({
        url: '/userbankaccounts/approval',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bank'],
    }),
  }),
});

export const { useGetListBankQuery, useGetDetailBankQuery, useUpdateStatusBankMutation } = bankApi;
