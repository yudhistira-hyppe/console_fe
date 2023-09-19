import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const databaseApi = createApi({
  reducerPath: 'console/database',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['Konten', 'Detail-Konten', 'Util', 'Media', 'Detail-Media', 'Sticker', 'Detail-Sticker'],
  endpoints: (build) => ({
    //Account
    getAllUser: build.query({
      query: (data) => ({
        url: `/getuserprofiles`,
        method: 'POST',
        body: data,
      }),
    }),
    getuserDatabaseDetail: build.query({
      query: (id) => ({
        url: `user/userdetail/${id}`,
        method: 'GET',
      }),
    }),
    getUserBasics: build.query({
      query: (email) => ({
        url: `/userbasics/${email}`,
        method: 'GET',
      }),
    }),
    getProfileByUserEmail: build.query({
      query: (email) => ({
        url: `/profile`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    getAccountBalance: build.query({
      query: (data) => ({
        url: `/accountbalances`,
        method: 'POST',
        body: data,
      }),
    }),
    getBankAccountByUserEmail: build.query({
      query: (email) => ({
        url: `/userbankaccounts/byuser`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),

    //Content
    getListContent: build.query({
      query: (data) => ({
        url: '/getusercontents/database',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Konten'],
    }),
    getInterestContent: build.query({
      query: () => ({
        url: '/interestsrepo',
        method: 'GET',
      }),
      providesTags: ['Util'],
    }),
    getDetailContent: build.query({
      query: (data) => ({
        url: '/getusercontents/database/details',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Detail-Konten'],
    }),

    //Media
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
      providesTags: ['Detail-Media'],
    }),
    getDetailGeographicMusic: build.query({
      query: (id) => ({
        url: `/music/used/${id}`,
        method: 'GET',
      }),
      providesTags: ['Detail-Media'],
    }),
    getMediaChart: build.query({
      query: () => ({
        url: '/musiccard',
        method: 'GET',
      }),
    }),
    updateStatusMusic: build.mutation({
      query: (data) => ({
        url: '/music/active',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media', 'Detail-Media'],
    }),
    updateMusic: build.mutation({
      query: (data) => ({
        url: '/music/update',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media', 'Detail-Media'],
    }),
    createMusic: build.mutation({
      query: (data) => ({
        url: '/music/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media'],
    }),
    deleteMusic: build.mutation({
      query: (data) => ({
        url: '/music/delete',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media'],
    }),

    //Sticker
    getStickerTrend: build.query({
      query: () => ({
        url: '/mediastiker/trend',
        method: 'GET',
      }),
    }),
    getStickerCategory: build.query({
      query: (data) => ({
        url: '/stickercategory/listing',
        method: 'POST',
        body: data,
      }),
    }),
    getListSticker: build.query({
      query: (data) => ({
        url: '/mediastiker/listing',
        method: 'POST',
        body: data,
      }),
      providesTags: ['Sticker'],
    }),
    updateStickerStatus: build.mutation({
      query: (data) => ({
        url: '/mediastiker/update/list',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sticker', 'Detail-Sticker'],
    }),
    getDetailSticker: build.query({
      query: (id) => ({
        url: `/mediastiker/${id}`,
        method: 'GET',
      }),
      providesTags: ['Detail-Sticker'],
    }),
    getStickerChart: build.query({
      query: (id) => ({
        url: `/mediastiker/${id}/chart`,
        method: 'GET',
      }),
    }),
    updateSticker: build.mutation({
      query: (data) => ({
        url: '/mediastiker/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Sticker', 'Detail-Sticker'],
    }),
    createSticker: build.mutation({
      query: (data) => ({
        url: '/mediastiker/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sticker'],
    }),
  }),
});

export const {
  //Account
  useGetAllUserQuery,
  useGetuserDatabaseDetailQuery,
  useGetUserBasicsQuery,
  useGetProfileByUserEmailQuery,
  useGetAccountBalanceQuery,
  useGetBankAccountByUserEmailQuery,

  //Content
  useGetListContentQuery,
  useGetInterestContentQuery,
  useGetDetailContentQuery,

  //Media
  useGetGenreMusicQuery,
  useGetMoodMusicQuery,
  useGetThemeMusicQuery,
  useGetListMusicQuery,
  useGetDetailMusicQuery,
  useGetDetailGeographicMusicQuery,
  useGetMediaChartQuery,
  useUpdateStatusMusicMutation,
  useUpdateMusicMutation,
  useCreateMusicMutation,
  useDeleteMusicMutation,

  //Sticker
  useGetStickerTrendQuery,
  useGetStickerCategoryQuery,
  useGetListStickerQuery,
  useUpdateStickerStatusMutation,
  useGetDetailStickerQuery,
  useGetStickerChartQuery,
  useUpdateStickerMutation,
  useCreateStickerMutation,
} = databaseApi;
