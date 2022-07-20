import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const contentManagementAPI = createApi({
  reducerPath: 'contents-management',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['monetizeContent'],
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
    // here
    userContentMonetize: build.query({
      query: (params) => ({
        url: `/getusercontents/management/monetize`,
        method: 'POST',
        body: params,
      }),
      providesTags: ['monetizeContent'],
    }),
    // why the path folder is messed up? because i need this endpoint at the same reducert path to refetch data
    postUpdatePrice: build.mutation({
      query: ({ postID, ...patch }) => ({
        url: `/posts/update/${postID}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['monetizeContent'],
    }),
  }),
});

export const {
  useUserContentsManagementQuery,
  useUserContentsGroupQuery,
  useUserContentsAnalyticQuery,
  useUserContentsFollowerQuery,
  useUserContentMonetizeQuery,
  usePostUpdatePriceMutation,
} = contentManagementAPI;
