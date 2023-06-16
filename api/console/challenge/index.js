import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const challengeApi = createApi({
  reducerPath: 'console/challenge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'detail'],
  endpoints: (build) => ({
    getListChallenge: build.query({
      query: (data) => ({
        url: '/challenge/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    getDetailChallenge: build.query({
      query: (id) => ({
        url: `/challenge/${id}`,
        method: 'GET',
      }),
      providesTags: ['detail'],
    }),
    duplicateChallenge: build.mutation({
      query: (id) => ({
        url: `/challenge/duplicate/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['list'],
    }),
    updateChallenge: build.mutation({
      query: ({ id, formData }) => ({
        url: `/challenge/update/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
    createChallenge: build.mutation({
      query: (data) => ({
        url: '/challenge',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const {
  useGetListChallengeQuery,
  useGetDetailChallengeQuery,
  useDuplicateChallengeMutation,
  useUpdateChallengeMutation,
  useCreateChallengeMutation,
} = challengeApi;
