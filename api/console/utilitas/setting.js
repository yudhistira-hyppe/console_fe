import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const settingApi = createApi({
  reducerPath: 'utilitas/setting',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListSettings: build.query({
      query: (data) => ({
        url: '/settings/list',
        method: 'POST',
        body: data,
      }),
      providesTags: ['list'],
    }),
    updateSetting: build.mutation({
      query: ({ id, formData }) => ({
        url: `/settings2/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['list'],
    }),
    createSetting: build.mutation({
      query: (data) => ({
        url: `/settings2`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const { useGetListSettingsQuery, useUpdateSettingMutation, useCreateSettingMutation } = settingApi;
