import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const voucherApi = createApi({
  reducerPath: 'console/monetize/voucher',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Voucher'],
  endpoints: (build) => ({
    getVouchers: build.query({
      query: (params) => ({
        url: `/vouchers/list`,
        method: 'POST',
        body: params,
      }),
      providesTags: ['Voucher'],
    }),
    getVoucherByID: build.query({
      query: (id) => ({
        url: `/vouchers/${id}`,
        method: 'GET',
      }),
      providesTags: ['Voucher'],
    }),
    getTransactionVouchers: build.query({
      query: (params) => ({
        url: '/transactions/historys/voucher/v2',
        method: 'POST',
        body: params,
      }),
      providesTags: ['Voucher'],
    }),
    getDetailTransactionVouchers: build.query({
      query: (data) => ({
        url: '/transactions/historys/voucher/detail/v2',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Voucher'],
    }),
    createVoucher: build.mutation({
      query: (data) => ({
        url: `/vouchers`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Voucher'],
    }),
    updateVoucher: build.mutation({
      query: ({ id, data }) => ({
        url: `/vouchers/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Voucher'],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherByIDQuery,
  useGetTransactionVouchersQuery,
  useGetDetailTransactionVouchersQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
} = voucherApi;
