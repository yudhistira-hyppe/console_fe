import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const iklanApi = createApi({
  reducerPath: 'help-center/iklan',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Iklan', 'Detail', 'Util'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (data) => ({
        url: '/reportuser/listreport/v2',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Iklan'],
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
      invalidatesTags: ['Iklan', 'Detail'],
    }),
    updateFlagingTicket: build.mutation({
      query: (data) => ({
        url: '/reportuser/flaging',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Iklan', 'Detail'],
    }),
    deleteTicket: build.mutation({
      query: (data) => ({
        url: '/reportuser/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Iklan', 'Detail'],
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
} = iklanApi;
