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
          email,
        },
      }),
    }),
    userContentsGroup: build.query({
      query: (params) => ({
        url: `/getusercontents/management/konten/group`,
        method: 'POST',
        body: params,
      }),
    }),
    userContentsAnalytic: build.query({
      query: (email) => ({
        url: `/getusercontents/management/analitic`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    userContentsFollower: build.query({
      query: (params) => ({
        url: `/getusercontents/management/analitic/follower`,
        method: 'POST',
        body: params,
      }),
    }),
    userContentMonetize: build.query({
      query: (params) => ({
        url: `/getusercontents/management/monetize`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useUserContentsManagementQuery,
  useUserContentsGroupQuery,
  useUserContentsAnalyticQuery,
  useUserContentsFollowerQuery,
  useUserContentMonetizeQuery,
} = contentManagementAPI;
