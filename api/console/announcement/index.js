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
  }),
});

export const { useGetListNotificationQuery } = announcementApi;
