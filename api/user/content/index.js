import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const contentAPI = createApi({
  reducerPath: 'contents',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userContentsAll: build.query({
      query: (payload) => ({
        url: `/getusercontents/all`,
        method: 'POST',
        body: payload,
      }),
    }),
    userContentsLatest: build.query({
      query: (payload) => ({
        url: `/getusercontents/latest`,
        method: 'POST',
        body: payload,
      }),
    }),
    userContentsPopular: build.query({
      query: (payload) => ({
        url: `/getusercontents/popular`,
        method: 'POST',
        body: payload,
      }),
    }),
    userContentsMonetize: build.query({
      query: (payload) => ({
        url: `/getusercontents/monetize`,
        method: 'POST',
        body: payload,
      }),
    }),

  }),
});

export const {
  useUserContentsAllQuery,
  useUserContentsLatestQuery,
  useUserContentsPopularQuery,
  useUserContentsMonetizeQuery,
} = contentAPI;
