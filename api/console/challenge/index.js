import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const challengeApi = createApi({
  reducerPath: 'console/challenge',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListChallenge: build.query({
      query: (data) => ({
        url: '/challenge/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
  }),
});

export const { useGetListChallengeQuery } = challengeApi;
