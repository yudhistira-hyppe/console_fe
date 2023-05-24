import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const masterBankApi = createApi({
  reducerPath: 'utilitas/master-bank',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'detail'],
  endpoints: (build) => ({
    getListMasterBank: build.query({
      query: (data) => ({
        url: '/banks/list/all',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    getDetailMasterBank: build.query({
      query: (data) => ({
        url: '/banks/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['detail'],
    }),
    createMasterBank: build.mutation({
      query: (data) => ({
        url: '/banks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
    updateMasterBank: build.mutation({
      query: ({ id, formData }) => ({
        url: `/banks/update/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
  }),
});

export const {
  useGetListMasterBankQuery,
  useGetDetailMasterBankQuery,
  useCreateMasterBankMutation,
  useUpdateMasterBankMutation,
} = masterBankApi;
