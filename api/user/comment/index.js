import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const commentAPI = createApi({
  reducerPath: 'commentsAPI',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes:["comment"],
  endpoints: (build) => ({
    userGetNewComment: build.query({
      query: (email) => ({
        url: `/getnewcomment`,
        method: 'POST',
        body: {
          email,
        },
      }),
      providesTags: ['comment']
    }),
    userUpdateComment: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/disquslogs/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags:["comment"]
    }),
  }),
});

export const { useUserGetNewCommentQuery, useUserUpdateCommentMutation } = commentAPI;
