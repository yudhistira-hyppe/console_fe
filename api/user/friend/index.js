import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const userFriendAPI = createApi({
  reducerPath: 'friends',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userListFriend: build.query({
      query: (email) => ({
        url: `/friend/${email}`,
        method: 'GET',
        // body: {},
      }),
    }),
  }),
});

export const { useUserListFriendQuery } = userFriendAPI;
