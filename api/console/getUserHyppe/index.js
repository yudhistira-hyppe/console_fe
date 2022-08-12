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
    deleteAnggota: build.mutation({
      query: (email) => ({
        url: `/group/user?email=${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['userHyppe'],
    }),
  }),
});

export const { useGetAnggotaQuery, useDeleteAnggotaMutation } = getUserHyppe;
