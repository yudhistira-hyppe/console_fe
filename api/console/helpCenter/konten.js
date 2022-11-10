import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const kontenApi = createApi({
  reducerPath: 'help-center/konten',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Konten'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (data) => ({
        url: 'reportuser/listreport',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Konten'],
    }),
  }),
});

export const { useGetListTicketsQuery } = kontenApi;
