import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const transactionUtilityApi = createApi({
  reducerPath: 'utilitas/transaction',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['listCategory', 'detailCategory', 'listCOA', 'detailCOA'],
  endpoints: (build) => ({
    getListCategory: build.query({
      query: (params) => ({
        url: `/transactions/v2/categorys${params || ''}`,
        method: 'GET',
      }),
      providesTags: ['listCategory'],
    }),
    getListCOA: build.query({
      query: (params) => ({
        url: `/transactions/v2/coa${params || ''}`,
        method: 'GET',
      }),
      providesTags: ['listCOA'],
    }),
    deleteCategory: build.mutation({
      query: (data) => ({
        url: '/transactions/v2/categorys/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['listCategory'],
    }),
  }),
});

export const { useGetListCategoryQuery, useGetListCOAQuery, useDeleteCategoryMutation } = transactionUtilityApi;
