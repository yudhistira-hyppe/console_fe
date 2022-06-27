import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const faqAndInfoApi = createApi({
  reducerPath: 'console/helpCenter/faqAndInfo',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['FaqAndInfo'],
  endpoints: (build) => ({
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
  }),
});

export const { useCreateFaqAndInfoMutation, useCreateDetailForFaqAndInfoMutation, useGetListFaqOrInfoByTypeQuery } =
  faqAndInfoApi;
