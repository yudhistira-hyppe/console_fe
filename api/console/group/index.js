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
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/group/delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['group'],
    }),
    updateGroupUser: build.mutation({
      query: (payload) => ({
        url: `/group/user`,
        method: 'POST',
        body: payload,
      }),
      // for refetch
      // invalidatesTags: ['group'],
    }),
    getSingleGroup: build.query({
      query: (id) => ({
        url: `/group/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGroupQuery, useDeleteGroupMutation, useUpdateGroupUserMutation, useGetSingleGroupQuery } = group;
