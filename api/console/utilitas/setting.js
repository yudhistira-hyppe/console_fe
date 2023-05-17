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
        url: formData?.typedata === 'number' ? `/settings/${id}` : `/settings2/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['list'],
    }),
    createSetting: build.mutation({
      query: (data) => ({
        url: data?.typedata === 'number' ? '/settings' : `/settings2`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['list'],
    }),
  }),
});

export const { useGetListSettingsQuery, useUpdateSettingMutation, useCreateSettingMutation } = settingApi;
