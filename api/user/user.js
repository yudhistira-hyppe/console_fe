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
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useGetProfileByUserEmailQuery } = userApi;
