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
  }),
});

export const { useGetListCommunityQuery } = communityUtilityApi;
