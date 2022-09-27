import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const bantuanPenggunaApi = createApi({
  reducerPath: 'console/helpCenter/bantuan-pengguna',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['TicketList'],
  endpoints: (build) => ({
    getListTickets: build.query({
      query: (params) => ({
        url: '/usertickets/filter',
        method: 'POST',
        body: params,
      }),
    }),
    getSumberTickets: build.query({
      query: () => ({
        url: '/sourcetickets/all',
        method: 'GET',
      }),
    }),
    getCategoryTickets: build.query({
      query: () => ({
        url: '/categorytickets/all',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetListTicketsQuery, useGetSumberTicketsQuery, useGetCategoryTicketsQuery } = bantuanPenggunaApi;
