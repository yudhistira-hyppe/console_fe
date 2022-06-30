import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const faqAndInfoApi = createApi({
  reducerPath: 'console/helpCenter/faqAndInfo',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['FaqAndInfo'],
  endpoints: (build) => ({
    getListFaqOrInfoByType: build.query({
      query: (type) => ({
        url: `/faqs/allfaqs`,
        method: 'POST',
        body: {
          tipe: type,
        },
      }),
      providesTags: ['FaqAndInfo'],
    }),
    createFaqAndInfo: build.mutation({
      query: (data) => ({
        url: `/faqs/createfaq`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
    createDetailForFaqAndInfo: build.mutation({
      query: (data) => ({
        url: `/faqs/detail`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
    updateFaqAndInfo: build.mutation({
      query: ({ id, body }) => ({
        url: `/faqs/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
    deleteFaqAndInfo: build.mutation({
      query: (id) => ({
        url: `/faqs/delete/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
    updateDetailForFaqAndInfo: build.mutation({
      query: ({ id, body }) => ({
        url: `/faqs/detail/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
    deleteDetailForFaqAndInfo: build.mutation({
      query: (id) => ({
        url: `/faqs/detail/delete/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['FaqAndInfo'],
    }),
  }),
});

export const {
  useGetListFaqOrInfoByTypeQuery,
  useCreateFaqAndInfoMutation,
  useCreateDetailForFaqAndInfoMutation,
  useUpdateFaqAndInfoMutation,
  useDeleteFaqAndInfoMutation,
  useUpdateDetailForFaqAndInfoMutation,
  useDeleteDetailForFaqAndInfoMutation,
} = faqAndInfoApi;
