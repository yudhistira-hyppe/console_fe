import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const moduleAPI = createApi({
  reducerPath: 'moduleApi',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['modules', 'group'],
  endpoints: (build) => ({
    getModule: build.query({
      query: () => ({
        url: `/module/all?skip=0&limit=300`,
        method: 'GET',
      }),
      providesTags: ['modules'],
    }),
    createModule: build.mutation({
      query: (data) => ({
        url: `/groupmodule/groupcreate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['modules'],
    }),
    updateModule: build.mutation({
      query: (data) => ({
        url: `/groupmodule/groupupdate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['modules', 'group'],
    }),
    getSingleGroup: build.query({
      query: (id) => ({
        url: `/group/${id}`,
        method: 'GET',
      }),
      providesTags: ['group'],
    }),
  }),
});

export const { useGetModuleQuery, useCreateModuleMutation, useUpdateModuleMutation, useGetSingleGroupQuery } = moduleAPI;
