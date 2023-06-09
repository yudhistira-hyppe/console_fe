import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const masterBadgeApi = createApi({
  reducerPath: 'utilitas/badge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListBadge: build.query({
      query: (data) => ({
        url: '/badge/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
  }),
});

export const { useGetListBadgeQuery } = masterBadgeApi;
