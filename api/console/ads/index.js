import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const adsApi = createApi({
  reducerPath: 'ads-center',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['ads', 'detail', 'notif-ads', 'btn-ads', 'setting-ads'],
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
        url: '/userads/console/adscenter/demographchart',
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
      providesTags: ['detail'],
    }),
    getLogDetailAds: build.query({
      query: (id) => ({
        url: `/ads/console/adscenter/historydetail/${id}`,
        method: 'GET',
      }),
      providesTags: ['detail'],
    }),
    getVideoFromApsara: build.query({
      query: (data) => ({
        url: '/posts/getvideo',
        method: 'POST',
        body: data,
      }),
    }),
    getViewerAds: build.query({
      query: (data) => ({
        url: '/userads/console/adscenter/listpenonton',
        method: 'POST',
        body: data,
      }),
      providesTags: ['ads'],
    }),
    approveAds: build.mutation({
      query: (data) => ({
        url: '/ads/approve',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ads', 'detail'],
    }),

    //Ads V2
    getDashboardAdsSetting: build.query({
      query: (data) => ({
        url: '/adsv2/ads/dashboard',
        method: 'POST',
        body: data,
      }),
    }),
    getNotificationAds: build.query({
      query: () => ({
        url: '/adsv2/setting/notification',
        method: 'GET',
      }),
      providesTags: ['notif-ads'],
    }),
    getButtonCTAAds: build.query({
      query: () => ({
        url: '/adsv2/setting/cta',
        method: 'GET',
      }),
      providesTags: ['btn-ads'],
    }),
    updateAdsNotificationPush: build.mutation({
      query: (data) => ({
        url: '/adsv2/setting/notification/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['notif-ads'],
    }),
    updateAdsButton: build.mutation({
      query: (data) => ({
        url: '/adsv2/setting/cta/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['btn-ads'],
    }),
    getListAdsSetting: build.query({
      query: () => ({
        url: '/adsv2/setting',
        method: 'GET',
      }),
      providesTags: ['setting-ads'],
    }),
    updateAdsSetting: build.mutation({
      query: (data) => ({
        url: '/adsv2/setting/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['setting-ads'],
    }),
    getDashboardAdsManage: build.query({
      query: (data) => ({
        url: '/adsv2/ads/campaign/dashboard',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPerformanceAdsQuery,
  useGetDemographicAdsQuery,
  useGetListAdsQuery,
  useGetDetailAdsQuery,
  useGetLogDetailAdsQuery,
  useGetVideoFromApsaraQuery,
  useGetViewerAdsQuery,
  useApproveAdsMutation,

  // Ads V2
  useGetDashboardAdsSettingQuery,
  useGetNotificationAdsQuery,
  useGetButtonCTAAdsQuery,
  useUpdateAdsNotificationPushMutation,
  useUpdateAdsButtonMutation,
  useGetListAdsSettingQuery,
  useUpdateAdsSettingMutation,
  useGetDashboardAdsManageQuery,
} = adsApi;
