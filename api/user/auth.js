import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from 'api';

export const authApi = createApi({
  reducerPath: 'user/auth',
  baseQuery: customBaseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `/user/login`,
        method: 'POST',
        body: data,
      }),
    }),
    loginWithSocmed: build.mutation({
      query: (data) => ({
        url: `/sign/socmed`,
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: build.mutation({
      query: (data) => ({
        url: `/user/refreshtoken`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: (data) => ({
        url: `/user/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    upgradeUser: build.mutation({
      query: ({ email, ...patch }) => ({
        url: `/userauths/${email}`,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginWithSocmedMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useUpgradeUserMutation,
} = authApi;
