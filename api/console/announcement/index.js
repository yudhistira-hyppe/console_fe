import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const announcementApi = createApi({
  reducerPath: 'console/announcement',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listNotif', 'listBanner'],
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
    updateStatusBannerSearch: build.mutation({
      query: (data) => ({
        url: '/banner/update/statustayang',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listBanner'],
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
  useUpdateStatusBannerSearchMutation
} = announcementApi;
