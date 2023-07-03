import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const masterBadgeApi = createApi({
  reducerPath: 'utilitas/badge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'listType'],
  endpoints: (build) => ({
    getListBadge: build.query({
      query: (data) => ({
        url: '/badge/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    getListBadgeByType: build.query({
      query: (data) => ({
        url: '/badge/findall',
        method: 'POST',
        body: data,
      }),
      providesTags: ['listType'],
    }),
    createBadgeChallenge: build.mutation({
      query: (data) => ({
        url: '/badge',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
    updateBadgeChallenge: build.mutation({
      query: ({ id, formData }) => ({
        url: `/badge/update/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const {
  useGetListBadgeQuery,
  useGetListBadgeByTypeQuery,
  useCreateBadgeChallengeMutation,
  useUpdateBadgeChallengeMutation,
} = masterBadgeApi;
