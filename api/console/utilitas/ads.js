import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const adsUtilityApi = createApi({
  reducerPath: 'utilitas/ads',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listType', 'listPlace'],
  endpoints: (build) => ({
    getAdsPlaceList: build.query({
      query: (data) => ({
        url: '/adsplaces/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listPlace'],
    }),
    getAdsTypeList: build.query({
      query: (data) => ({
        url: '/adstypes/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listType'],
    }),
    createAdsType: build.mutation({
      query: (data) => ({
        url: '/adstypes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listType'],
    }),
    updateAdsType: build.mutation({
      query: ({ id, data }) => ({
        url: `/adstypes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['listType'],
    }),
    createAdsPlace: build.mutation({
      query: (data) => ({
        url: '/adsplaces',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listPlace'],
    }),
    updateAdsPlace: build.mutation({
      query: ({ id, data }) => ({
        url: `/adsplaces/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['listPlace'],
    }),
  }),
});

export const {
  useGetAdsPlaceListQuery,
  useGetAdsTypeListQuery,
  useCreateAdsTypeMutation,
  useUpdateAdsTypeMutation,
  useCreateAdsPlaceMutation,
  useUpdateAdsPlaceMutation,
} = adsUtilityApi;
