import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const moduleAPI = createApi({
  reducerPath: 'moduleApi',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['modules'],
  endpoints: (build) => ({
    getModule: build.query({
      query: () => ({
        url: `/module/all`,
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
      invalidatesTags: ['modules'],
    }),
  }),
});

export const { useGetModuleQuery, useCreateModuleMutation, useUpdateModuleMutation } = moduleAPI;
