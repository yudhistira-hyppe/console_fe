import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const getUserHyppe = createApi({
  reducerPath: 'getUserHyppe',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['userHyppe', 'userDivisi', 'detailUser'],
  endpoints: (build) => ({
    getAnggota: build.query({
      query: (payload) => ({
        url: `/getuserhyppe?skip=${payload.skip}&limit=${payload.limit}&search=${
          payload?.search ? payload.search : ''
        }&searchemail=${payload.searchemail ? payload.searchemail : ''}`,
        method: 'GET',
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
        url: `/getuserhyppe?skip=${skip}&limit=${limit}&groupId=${groupId}`,
        method: 'GET',
      }),
    }),
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile`,
        method: 'POST',
        body: {
          email,
        },
      }),
      providesTags: ['detailUser'],
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
  useDeleteAnggotaMutation,
  useUpdateStatusGroupUserMutation,
  useUpdateGroupUserMutation,
} = getUserHyppe;
