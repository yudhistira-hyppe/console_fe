import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const adAPI = createApi({
  reducerPath: 'console/ad',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userAdList: build.query({
      query: (payload) => ({
        url: `/ads/listadsuser`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useUserAdListQuery, useLazyUserAdListQuery } = adAPI;
