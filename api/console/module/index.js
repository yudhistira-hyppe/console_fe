import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const moduleAPI = createApi({
  reducerPath: 'moduleApi',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getModule: build.query({
      query: () => ({
        url: `/module/all`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetModuleQuery } = moduleAPI;
