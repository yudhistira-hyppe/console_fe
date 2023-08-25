import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const announcementApi = createApi({
  reducerPath: 'console/announcement',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listNotif'],
  endpoints: (build) => ({
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
  }),
});

export const { useGetListNotificationQuery, useGetDetailNotificationQuery, usePublishNotificationMutation } =
  announcementApi;
