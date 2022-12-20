import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const getUserHyppe = createApi({
  reducerPath: 'getUserHyppe',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['userHyppe'],
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
    getDetailAnggota: build.query({
      query: ({ skip, limit, groupId }) => ({
        url: `/getuserhyppe?skip=${skip}&limit=${limit}&groupId=${groupId}`,
        method: 'GET',
      }),
    }),
    deleteAnggota: build.mutation({
      query: (email) => ({
        url: `/group/user?email=${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['userHyppe'],
    }),
    updateStatusGroupUser: build.mutation({
      query: (payload) => ({
        url: `/group/statususer`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['userHyppe'],
    }),
    updateGroupUser: build.mutation({
      query: (payload) => ({
        url: `/group/user`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['userHyppe'],
    }),
  }),
});

export const {
  useGetAnggotaQuery,
  useGetDetailAnggotaQuery,
  useDeleteAnggotaMutation,
  useUpdateStatusGroupUserMutation,
  useUpdateGroupUserMutation,
} = getUserHyppe;
