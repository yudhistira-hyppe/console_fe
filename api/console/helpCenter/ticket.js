import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const ticketApi = createApi({
  reducerPath: 'helpCenter/ticket',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['TicketList', 'TicketDetail'],
  endpoints: (build) => ({
    getListTicketByFilters: build.query({
      query: (data) => ({
        url: data.status ? '/usertickets/list' : '/usertickets/allticket',
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['TicketList'],
    }),
    getTicketById: build.query({
      query: (id) => ({
        url: '/usertickets/retrieveticket',
        method: 'POST',
        body: { id },
      }),
      keepUnusedDataFor: 0,
      providesTags: ['TicketDetail'],
    }),
    createReplyTicket: build.mutation({
      query: (data) => ({
        url: '/usertickets/reply',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TicketList', 'TicketDetail'],
    }),
    deleteTicket: build.mutation({
      query: (id) => ({
        url: `/usertickets/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['TicketList'],
    }),
  }),
});

export const {
  useGetListTicketByFiltersQuery,
  useGetTicketByIdQuery,
  useCreateReplyTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;
