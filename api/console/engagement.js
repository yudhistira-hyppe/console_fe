import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const engagementApi = createApi({
  reducerPath: 'console/engagement',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getNewUser: build.query({
      query: (data) => ({
        url: '/userbasics/newuser',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetNewUserQuery } = engagementApi;
