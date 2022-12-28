import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const group = createApi({
  reducerPath: 'group',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['group'],
  endpoints: (build) => ({
    getGroup: build.query({
      query: (payload) => ({
        url: `/group/all?skip=${payload.skip}&limit=${payload.limit}&search=${payload.search ? payload.search : ''}`,
        method: 'GET',
      }),
      providesTags: ['group'],
    }),
    getSingleGroup: build.query({
      query: (id) => ({
        url: `/group/${id}`,
        method: 'GET',
      }),
      providesTags: ['group'],
    }),
    updateModule: build.mutation({
      query: (data) => ({
        url: `/groupmodule/groupupdate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    createModule: build.mutation({
      query: (data) => ({
        url: `/groupmodule/groupcreate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['group'],
    }),
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/group/delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['group'],
    }),
  }),
});

export const {
  useGetGroupQuery,
  useGetSingleGroupQuery,
  useUpdateModuleMutation,
  useCreateModuleMutation,
  useDeleteGroupMutation,
} = group;
