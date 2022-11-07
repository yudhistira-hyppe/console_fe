import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const announcementApi = createApi({
  reducerPath: 'helpCenter/announcement',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Announcement'],
  endpoints: (build) => ({
    getListAnnouncementByStatus: build.query({
      query: (data) => ({
        url: `/announcements/bystatus`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 300,
      providesTags: ['Announcement'],
    }),
    getListAnnouncementByUserEmail: build.query({
      query: (userEmail) => ({
        url: `/announcements/bystatus`,
        method: 'POST',
        body: {
          email: userEmail,
        },
      }),
      providesTags: ['Announcement'],
    }),
    createAnnouncementToAllUsers: build.mutation({
      query: (data) => ({
        url: `/announcements/createall`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Announcement'],
    }),
    createAnnouncementToSomeUsers: build.mutation({
      query: (data) => ({
        url: `/announcements/createbyuser`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Announcement'],
    }),
    updateAnnouncement: build.mutation({
      query: ({ id, body }) => ({
        url: `/announcements/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Announcement'],
    }),
    deleteAnnouncement: build.mutation({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Announcement'],
    }),
  }),
});

export const {
  useGetListAnnouncementByStatusQuery,
  useGetListAnnouncementByUserEmailQuery,
  useCreateAnnouncementToAllUsersMutation,
  useCreateAnnouncementToSomeUsersMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
