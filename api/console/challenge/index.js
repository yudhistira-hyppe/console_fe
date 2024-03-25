import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const challengeApi = createApi({
  reducerPath: 'console/challenge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'detail', 'listUser'],
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
    getListUserChallenge: build.query({
      query: (data) => ({
        url: `/challenge/listing/userchallenge/v2`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['listUser'],
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
        url: `/challenge/update/${id}/v2`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
    publishChallenge: build.mutation({
      query: ({ id, formData }) => ({
        url: `/challenge/setstatuschallenge/${id}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
    deleteChallenge: build.mutation({
      query: ({ id, formData }) => ({
        url: `/challenge/setstatuschallenge/${id}`,
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
    kickUserChallengen: build.mutation({
      query: (data) => ({
        url: '/challenge/user/delete/v2',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listUser'],
    }),
    getAreaUserChallenge: build.query({
      query: (id) => ({
        url: `/challenge/listuserwilayah/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetListChallengeQuery,
  useGetDetailChallengeQuery,
  useGetListUserChallengeQuery,
  useDuplicateChallengeMutation,
  useUpdateChallengeMutation,
  usePublishChallengeMutation,
  useDeleteChallengeMutation,
  useCreateChallengeMutation,
  useKickUserChallengenMutation,
  useGetAreaUserChallengeQuery,
} = challengeApi;
