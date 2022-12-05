import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const kontenApi = createApi({
  reducerPath: 'helpCenter/konten',
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
    getReportReason: build.query({
      query: (data) => ({
        url: '/reportreasons/all',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Util'],
    }),
    updateDetailTicket: build.mutation({
      query: (data) => ({
        url: '/reportuser/approval',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Konten', 'Detail'],
    }),
    updateFlagingTicket: build.mutation({
      query: (data) => ({
        url: '/reportuser/flaging',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Konten', 'Detail'],
    }),
    deleteTicket: build.mutation({
      query: (data) => ({
        url: '/reportuser/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Konten', 'Detail'],
    }),
  }),
});

export const {
  useGetListTicketsQuery,
  useGetDetailTicketQuery,
  useGetReportUserDetailTicketQuery,
  useGetReportReasonQuery,
  useUpdateDetailTicketMutation,
  useUpdateFlagingTicketMutation,
  useDeleteTicketMutation,
} = kontenApi;
