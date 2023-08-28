import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const announcementApi = createApi({
  reducerPath: 'console/announcement',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listNotif', 'listBanner', 'detailBanner'],
  endpoints: (build) => ({
    // Push Notif
    getListNotification: build.query({
      query: (data) => ({
        url: '/templates/listing/push_notification',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listNotif'],
    }),
    getDetailNotification: build.query({
      query: (id) => ({
        url: `/templates/${id}`,
        method: 'GET',
      }),
    }),
    publishNotification: build.mutation({
      query: (data) => ({
        url: '/utils/pushnotification',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listNotif'],
    }),

    // Banner Search
    getListBannerSearch: build.query({
      query: (data) => ({
        url: '/banner/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listBanner'],
    }),
    getDetailBannerSearch: build.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'GET',
      }),
      providesTags: ['detailBanner'],
    }),
    updateStatusBannerSearch: build.mutation({
      query: (data) => ({
        url: '/banner/update/statustayang',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listBanner'],
    }),
    createBannerSearch: build.mutation({
      query: (data) => ({
        url: '/banner/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listBanner'],
    }),
    updateBannerSearch: build.mutation({
      query: (data) => ({
        url: '/banner/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['listBanner', 'detailBanner'],
    }),
  }),
});

export const {
  // Pust Notif
  useGetListNotificationQuery,
  useGetDetailNotificationQuery,
  usePublishNotificationMutation,

  // Banner Search
  useGetListBannerSearchQuery,
  useGetDetailBannerSearchQuery,
  useUpdateStatusBannerSearchMutation,
  useCreateBannerSearchMutation,
  useUpdateBannerSearchMutation,
} = announcementApi;
