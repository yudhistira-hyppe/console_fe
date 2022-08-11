import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const getUserHyppe = createApi({
  reducerPath: 'getUserHyppe',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    getAnggota: build.query({
      query: (payload) => ({
        url: `/getuserhyppe?skip=${payload.skip}&limit=${payload.limit}&search=${payload?.search ? payload.search : ''}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAnggotaQuery } = getUserHyppe;
