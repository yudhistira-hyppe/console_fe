import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const mediaApi = createApi({
  reducerPath: 'database/media',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Media', 'Detail', 'Util', 'Chart'],
  endpoints: (build) => ({
    getGenreMusic: build.query({
      query: () => ({
        url: '/genre',
        method: 'GET',
      }),
      providesTags: ['Util'],
    }),
    getThemeMusic: build.query({
      query: () => ({
        url: '/theme',
        method: 'GET',
      }),
      providesTags: ['Util'],
    }),
    getMoodMusic: build.query({
      query: () => ({
        url: '/mood',
        method: 'GET',
      }),
      providesTags: ['Util'],
    }),
    getListMusic: build.query({
      query: (data) => ({
        url: `/allmusic?${data}`,
        method: 'GET',
      }),
      providesTags: ['Media'],
    }),
    getDetailMusic: build.query({
      query: (id) => ({
        url: `/music/${id}`,
        method: 'GET',
      }),
      providesTags: ['Detail'],
    }),
    getMediaChart: build.query({
      query: () => ({
        url: '/musiccard',
        method: 'GET',
      }),
      providesTags: ['Chart'],
    }),
    updateStatusMusic: build.mutation({
      query: (data) => ({
        url: '/music/active',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media', 'Detail'],
    }),
    updateMusic: build.mutation({
      query: (data) => ({
        url: '/music/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Detail', 'Media'],
    }),
  }),
});

export const {
  useGetGenreMusicQuery,
  useGetMoodMusicQuery,
  useGetThemeMusicQuery,
  useGetListMusicQuery,
  useGetDetailMusicQuery,
  useGetMediaChartQuery,
  useUpdateStatusMusicMutation,
  useUpdateMusicMutation,
} = mediaApi;
