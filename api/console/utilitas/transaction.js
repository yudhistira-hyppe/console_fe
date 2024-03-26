import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const transactionUtilityApi = createApi({
  reducerPath: 'utilitas/transaction',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listCategory', 'detailCategory', 'listCOA', 'detailCOA'],
  endpoints: (build) => ({
    // Category
    getListCategory: build.query({
      query: (params) => ({
        url: `/transactions/v2/categorys${params || ''}`,
        method: 'GET',
      }),
      providesTags: ['listCategory'],
    }),
    getDetailCategory: build.query({
      query: (id) => ({
        url: `/transactions/v2/categorys/${id}`,
        method: 'GET',
      }),
      providesTags: ['detailCategory'],
    }),
    createCategory: build.mutation({
      query: (data) => ({
        url: '/transactions/v2/categorys/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listCategory'],
    }),
    updateCategory: build.mutation({
      query: (data) => ({
        url: '/transactions/v2/categorys/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listCategory', 'detailCategory'],
    }),
    deleteCategory: build.mutation({
      query: (data) => ({
        url: '/transactions/v2/categorys/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listCategory', 'detailCategory'],
    }),

    // COA
    getListCOA: build.query({
      query: (params) => ({
        url: `/transactions/v2/coa${params || ''}`,
        method: 'GET',
      }),
      providesTags: ['listCOA'],
    }),
  }),
});

export const {
  // Category
  useGetListCategoryQuery,
  useGetDetailCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // COA
  useGetListCOAQuery,
} = transactionUtilityApi;
