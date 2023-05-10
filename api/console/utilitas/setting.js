import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQueryWithHandleReauth } from 'api';

export const settingApi = createApi({
  reducerPath: 'utilitas/setting',
  baseQuery: customBaseQueryWithHandleReauth,
  tagTypes: ['list'],
  endpoints: (build) => ({
    getListSettings: build.query({
      query: () => ({
        url: '/settings',
        method: 'GET',
      }),
      providesTags: ['list'],
    }),
    updateSetting: build.mutation({
      query: ({ id, formData }) => ({
        url: `/settings/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['list'],
    }),
    createSetting: build.mutation({
      query: (data) => ({
        url: '/settings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const { useGetListSettingsQuery, useUpdateSettingMutation, useCreateSettingMutation } = settingApi;
