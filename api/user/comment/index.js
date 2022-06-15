import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const commentAPI = createApi({
  reducerPath: 'comments',
  baseQuery: customBaseQueryWithHandleReauth,
  endpoints: (build) => ({
    userGetNewComment: build.query({
      query: (email) => ({
        url: `/getnewcomment`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    userUpdateComment: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/disquslogs/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
  }),
});

export const { useUserGetNewCommentQuery, useUserUpdateCommentMutation } = commentAPI;
