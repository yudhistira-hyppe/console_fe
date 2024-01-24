import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const jualBeliAPI = createApi({
  reducerPath: 'monetize/jualbeli',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getListJualBeliContent: build.query({
      query: (data) => ({
        url: '/transactions/list/content/v2',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetListJualBeliContentQuery } = jualBeliAPI;
