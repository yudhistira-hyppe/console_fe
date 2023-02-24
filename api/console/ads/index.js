import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const adsApi = createApi({
  reducerPath: 'ads-center',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['ads'],
  endpoints: (build) => ({
    getPerformanceAds: build.query({
      query: (data) => ({
        url: '/ads/console/adscenter/performaadschart',
        method: 'POST',
        body: data,
      }),
    }),
    getDemographicAds: build.query({
      query: (data) => ({
        url: '/ads/console/adscenter/demographchart',
        method: 'POST',
        body: data,
      }),
    }),
    getListAds: build.query({
      query: (data) => ({
        url: '/ads/console/adscenter/listads',
        method: 'POST',
        body: data,
      }),
      providesTags: ['ads'],
    }),
    getDetailAds: build.query({
      query: (data) => ({
        url: '/ads/management/adscenter/details',
        method: 'POST',
        body: data,
      }),
    }),
    getVideoFromApsara: build.query({
      query: (data) => ({
        url: '/posts/getvideo',
        method: 'POST',
        body: data,
      }),
    }),
    approveAds: build.mutation({
      query: (data) => ({
        url: '/ads/approve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ads'],
    }),
  }),
});

export const {
  useGetPerformanceAdsQuery,
  useGetDemographicAdsQuery,
  useGetListAdsQuery,
  useGetDetailAdsQuery,
  useGetVideoFromApsaraQuery,
  useApproveAdsMutation,
} = adsApi;
