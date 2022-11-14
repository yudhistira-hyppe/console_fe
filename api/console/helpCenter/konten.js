import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const kontenApi = createApi({
  reducerPath: 'help-center/konten',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Konten', 'Detail', 'Util'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (data) => ({
        url: 'reportuser/listreport',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Konten'],
    }),
    getDetailTicket: build.query({
      query: (data) => ({
        url: '/reportuser/listdetail',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Detail'],
    }),
    getReportUserDetailTicket: build.query({
      query: (data) => ({
        url: '/reportuser/listuserreport',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Util'],
    }),
  }),
});

export const { useGetListTicketsQuery, useGetDetailTicketQuery, useGetReportUserDetailTicketQuery } = kontenApi;
