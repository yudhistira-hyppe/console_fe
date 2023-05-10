import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const interestApi = createApi({
  reducerPath: 'utilitas/interest',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListInterest: build.query({
      query: (data) => ({
        url: '/interestsrepo/list',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    createInterest: build.mutation({
      query: (data) => ({
        url: '/interestsrepo',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
    updateInterest: build.mutation({
      query: (data) => ({
        url: '/interestsrepo/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
    deleteInterest: build.mutation({
      query: (id) => ({
        url: `/interestsrepo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const { useGetListInterestQuery, useCreateInterestMutation, useUpdateInterestMutation, useDeleteInterestMutation } =
  interestApi;
