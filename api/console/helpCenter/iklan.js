import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const iklanApi = createApi({
  reducerPath: 'help-center/iklan',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Iklan'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (data) => ({
        url: 'reportuser/listreport',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Iklan'],
    }),
  }),
});

export const { useGetListTicketsQuery } = iklanApi;
