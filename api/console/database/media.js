import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const mediaApi = createApi({
  reducerPath: 'database/media',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Media', 'Detail', 'Util'],
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
  }),
});

export const { useGetGenreMusicQuery, useGetMoodMusicQuery, useGetThemeMusicQuery } = mediaApi;
