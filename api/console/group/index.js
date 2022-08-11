import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const group = createApi({
  reducerPath: 'group',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getGroup: build.query({
      query: (payload) => ({
        url: `/group/all?skip=${payload.skip}&limit=${payload.limit}&search=${payload.search ? payload.search : ''}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGroupQuery } = group;
