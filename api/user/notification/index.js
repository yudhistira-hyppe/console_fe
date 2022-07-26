import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const notificationAPI = createApi({
  reducerPath: 'notifications',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    latestNotification: build.query({
      query: (payload) => ({
        url: `/notifications/latest`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLatestNotificationQuery } = notificationAPI;
