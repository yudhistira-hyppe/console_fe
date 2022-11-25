import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const kycApi = createApi({
  reducerPath: 'helpCenter/permohonan-premium',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['KYC'],
  endpoints: (build) => ({
    getListKYC: build.query({
      query: (data) => ({
        url: '/mediaproofpicts/listkyc',
        method: 'POST',
        body: data,
      }),
      providesTags: ['KYC'],
    }),
  }),
});

export const { useGetListKYCQuery } = kycApi;
