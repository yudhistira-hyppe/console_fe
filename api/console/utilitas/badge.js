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

export const { useGetListBadgeQuery, useCreateBadgeChallengeMutation, useUpdateBadgeChallengeMutation } = masterBadgeApi;
