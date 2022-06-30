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
    userGetInsightView: build.query({
      query: (payload) => ({
        url: `/getinsight/view`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useUserGetInsightQuery, useUserGetInsightViewQuery } = insightAPI;
