import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const divisiAPI = createApi({
  reducerPath: 'divisiAPI',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['group'],
  endpoints: (build) => ({
    getDivisi: build.query({
      query: (payload) => ({
        url: `/division/all?skip=${payload.skip}&limit=${payload.limit}&search=${payload.search ? payload.search : ''}`,
        method: 'GET',
      }),
      providesTags: ['divisi'],
    }),

    deleteDivisi: build.mutation({
      query: (id) => ({
        url: `/division/delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['divisi'],
    }),
    createDivisi: build.mutation({
      query: (payload) => ({
        url: `/division/create`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['divisi'],
    }),
    getSingleDivisi: build.query({
      query: (id) => ({
        url: `/division/${id}`,
        method: 'GET',
      }),
      invalidatesTags: ['divisi'],
    }),
    updateDivisi: build.mutation({
      query: (payload) => ({
        url: `/division/update`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetDivisiQuery,
  useDeleteDivisiMutation,
  useCreateDivisiMutation,
  useGetSingleDivisiQuery,
  useUpdateDivisiMutation,
} = divisiAPI;
