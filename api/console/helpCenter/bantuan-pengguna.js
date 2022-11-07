import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const bantuanPenggunaApi = createApi({
  reducerPath: 'console/helpCenter/bantuan-pengguna',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['TicketList', 'Divisi'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (params) => ({
        url: '/usertickets/filter',
        method: 'POST',
        body: params,
      }),
      providesTags: ['TicketList'],
    }),
    getSumberTickets: build.query({
      query: () => ({
        url: '/sourcetickets/all',
        method: 'GET',
      }),
      providesTags: ['TicketList'],
    }),
    getCategoryTickets: build.query({
      query: () => ({
        url: '/categorytickets/all',
        method: 'GET',
      }),
      providesTags: ['TicketList'],
    }),
    getLevelTickets: build.query({
      query: () => ({
        url: '/leveltickets/all',
        method: 'GET',
      }),
      providesTags: ['TicketList'],
    }),
    getDetailTicket: build.query({
      query: (params) => ({
        url: '/usertickets/comment',
        method: 'POST',
        body: params,
      }),
      providesTags: ['TicketList'],
    }),
    updateDetailTicket: build.mutation({
      query: ({ id, data }) => ({
        url: `/usertickets/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TicketList'],
    }),
    replyTicket: build.mutation({
      query: (data) => ({
        url: '/usertickets/reply',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TicketList'],
    }),
    getLogHistoryDetailTicket: build.query({
      query: (data) => ({
        url: '/logtickets/history',
        method: 'POST',
        body: data,
      }),
      providesTags: ['TicketList'],
    }),
    getUserDivisi: build.query({
      query: (data) => ({
        url: '/groupmodule/detail',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Divisi'],
    }),
  }),
});

export const {
  useGetListTicketsQuery,
  useGetSumberTicketsQuery,
  useGetCategoryTicketsQuery,
  useGetLevelTicketsQuery,
  useGetDetailTicketQuery,
  useUpdateDetailTicketMutation,
  useReplyTicketMutation,
  useGetLogHistoryDetailTicketQuery,
  useGetUserDivisiQuery,
} = bantuanPenggunaApi;
