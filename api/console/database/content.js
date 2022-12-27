import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const contentApi = createApi({
  reducerPath: 'database/content',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Konten', 'Util'],
  endpoints: (build) => ({
    getListContent: build.query({
      query: (data) => ({
        url: '/getusercontents/database',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Konten'],
    }),
    getInterestContent: build.query({
      query: () => ({
        url: '/interestsrepo',
        method: 'GET',
      }),
      providesTags: ['Util'],
    }),
  }),
});

export const { useGetListContentQuery, useGetInterestContentQuery } = contentApi;
