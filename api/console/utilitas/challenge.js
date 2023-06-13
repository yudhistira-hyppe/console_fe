import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const challengeUtilityApi = createApi({
  reducerPath: 'utilitas/challenge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getJenisChallenge: build.query({
      query: (data) => ({
        url: '/jenischallenge/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    createJenisChallenge: build.mutation({
      query: (data) => ({
        url: '/jenischallenge',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
    updateJenisChallenge: build.mutation({
      query: ({ id, formData }) => ({
        url: `/jenischallenge/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const { useGetJenisChallengeQuery, useCreateJenisChallengeMutation, useUpdateJenisChallengeMutation } =
  challengeUtilityApi;
