import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'api';

export const userApi = createApi({
  reducerPath: 'user/user',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: `/userbasics`,
        method: 'GET',
      }),
    }),
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile`,
        method: 'GET',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useGetProfileByUserEmailQuery } = userApi;
