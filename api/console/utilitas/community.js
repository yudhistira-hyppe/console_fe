import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const communityUtilityApi = createApi({
  reducerPath: 'utilitas/community',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list', 'detail'],
  endpoints: (build) => ({
    getListCommunity: build.query({
      query: (body) => ({
        url: '/guidelines/list',
        method: 'POST',
        body: body,
      }),
      providesTags: ['list'],
    }),
    createCommunity: build.mutation({
      query: (body) => ({
        url: '/guidelines',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['list'],
    }),
    getDetailCommunity: build.query({
      query: (id) => ({
        url: `/guidelines/${id}`,
        method: 'GET',
      }),
      providesTags: ['detail'],
    }),
    updateCommunity: build.mutation({
      query: (body) => ({
        url: '/guidelines/update',
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
    ApproveCommunity: build.mutation({
      query: (body) => ({
        url: '/guidelines/approve',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
    rejectCommunity: build.mutation({
      query: (body) => ({
        url: '/guidelines/reject',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['list', 'detail'],
    }),
  }),
});

export const {
  useGetListCommunityQuery,
  useCreateCommunityMutation,
  useGetDetailCommunityQuery,
  useUpdateCommunityMutation,
  useApproveCommunityMutation,
  useRejectCommunityMutation,
} = communityUtilityApi;
