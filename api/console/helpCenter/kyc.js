import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const kycApi = createApi({
  reducerPath: 'helpCenter/permohonan-premium',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['KYC', 'Detail'],
  endpoints: (build) => ({
    getListKYC: build.query({
      query: (data) => ({
        url: '/mediaproofpicts/listkyc/v2',
        method: 'POST',
        body: data,
      }),
      providesTags: ['KYC'],
    }),
    getDetailKYC: build.query({
      query: (data) => ({
        url: '/mediaproofpicts/detailkyc/v2',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Detail'],
    }),
    approveKYC: build.mutation({
      query: (data) => ({
        url: '/mediaproofpicts/approve/v2',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['KYC', 'Detail'],
    }),
  }),
});

export const { useGetListKYCQuery, useGetDetailKYCQuery, useApproveKYCMutation } = kycApi;
