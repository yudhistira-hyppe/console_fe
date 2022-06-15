import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const insightAPI = createApi({
  reducerPath: 'insight',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userGetInsight: build.query({
      query: (email) => ({
        url: `/getinsight`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const { useUserGetInsightQuery } = insightAPI;
