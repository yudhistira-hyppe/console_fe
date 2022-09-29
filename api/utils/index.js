import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const utilsApi = createApi({
  reducerPath: 'utils',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getAllInterest: build.query({
      query: (params) => ({
        url: `/utils/interest`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetAllInterestQuery } = utilsApi;
