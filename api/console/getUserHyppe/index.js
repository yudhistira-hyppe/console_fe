import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const getUserHyppe = createApi({
  reducerPath: 'getUserHyppe',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['userHyppe', 'userDivisi', 'detailUser'],
  endpoints: (build) => ({
    getAnggota: build.query({
      query: (data) => ({
        url: `/getuserhyppe/v2`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['userHyppe'],
    }),
    getUserDivisi: build.query({
      query: (data) => ({
        url: '/groupmodule/detail',
        method: 'POST',
        body: data,
      }),
      providesTags: ['userDivisi'],
    }),
    getDetailAnggota: build.query({
      query: ({ skip, limit, groupId }) => ({
        url: `/getuserhyppe/v2?skip=${skip}&limit=${limit}&groupId=${groupId}`,
        method: 'GET',
      }),
    }),
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile/v2`,
        method: 'POST',
        body: { email },
      }),
      providesTags: ['detailUser'],
    }),
    getProfileByUserEmail2: build.mutation({
      query: (email) => ({
        url: `/profile/v2`,
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: [],
    }),
    deleteAnggota: build.mutation({
      query: (email) => ({
        url: `/group/user?email=${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['userHyppe', 'userDivisi'],
    }),
    updateStatusGroupUser: build.mutation({
      query: (payload) => ({
        url: `/group/statususer`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['userHyppe', 'userDivisi'],
    }),
    updateGroupUser: build.mutation({
      query: (payload) => ({
        url: `/group/user`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['userHyppe', 'detailUser', 'userDivisi'],
    }),
  }),
});

export const {
  useGetAnggotaQuery,
  useGetUserDivisiQuery,
  useGetDetailAnggotaQuery,
  useGetProfileByUserEmailQuery,
  useGetProfileByUserEmail2Mutation,
  useDeleteAnggotaMutation,
  useUpdateStatusGroupUserMutation,
  useUpdateGroupUserMutation,
} = getUserHyppe;
