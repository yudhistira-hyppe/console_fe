import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const userApi = createApi({
  reducerPath: 'user/user',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getAllUser: build.query({
      query: (data) => ({
        url: `/getuserprofiles`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserBasics: build.query({
      query: (email) => ({
        url: `/userbasics/${email}`,
        method: 'GET',
      }),
    }),
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    getAccountBalance: build.query({
      query: (data) => ({
        url: `/accountbalances`,
        method: 'POST',
        body: data,
      }),
    }),
    getBankAccountByUserEmail: build.query({
      query: (email) => ({
        url: `/userbankaccounts/byuser`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserBasicsQuery,
  useGetProfileByUserEmailQuery,
  useGetAccountBalanceQuery,
  useGetBankAccountByUserEmailQuery,
} = userApi;
