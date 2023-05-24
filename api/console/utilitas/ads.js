import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const adsUtilityApi = createApi({
  reducerPath: 'utilitas/ads',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getAdsPlaceList: build.query({
      query: () => ({
        url: '/adsplaces',
        method: 'GET',
      }),
    }),
    getAdsTypeList: build.query({
      query: () => ({
        url: '/adstypes',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAdsPlaceListQuery, useGetAdsTypeListQuery } = adsUtilityApi;
