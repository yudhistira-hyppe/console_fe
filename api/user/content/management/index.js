import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const contentManagementAPI = createApi({
  reducerPath: 'contents-management',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userContentsManagement: build.query({
      query: (email) => ({
        url: `/getusercontents/management/grouping`,
        method: 'POST',
        body: {
          email
        },
      }),
    }),
  }),
});

export const {
  useUserContentsManagementQuery,
} = contentManagementAPI;
