import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const interestApi = createApi({
  reducerPath: 'utilitas/interest',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListInterest: build.query({
      query: (data) => ({
        url: '/interestsrepo',
        method: 'GET',
        // body: data,
      }),
      providesTags: ['list'],
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

export const { useGetListInterestQuery, useDeleteInterestMutation } = interestApi;
