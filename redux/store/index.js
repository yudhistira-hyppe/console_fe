import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducers from '../reducers';
import {
  authApi,
  userApi,
  accountBalancesAPI,
  commentAPI,
  userFriendAPI,
  contentAPI,
  insightAPI,
  notificationAPI,
  contentManagementAPI,
} from 'api/user';
import {
  dashboardApi,
  engagementApi,
  faqAndInfoApi,
  announcementApi,
  ticketApi,
  bantuanPenggunaApi,
  getUserHyppe,
  group,
  moduleAPI,
  divisiAPI,
  voucherApi,
  adAPI,
  transactionAPI,
  kontenApi,
  iklanApi,
  mediaApi,
  contentApi,
  kycApi,
  bankApi,
} from 'api/console';
import { utilsApi } from 'api/utils';

const initStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        utilsApi.middleware,
        authApi.middleware,
        userApi.middleware,
        dashboardApi.middleware,
        engagementApi.middleware,
        faqAndInfoApi.middleware,
        announcementApi.middleware,
        ticketApi.middleware,
        bantuanPenggunaApi.middleware,
        contentAPI.middleware,
        notificationAPI.middleware,
        commentAPI.middleware,
        insightAPI.middleware,
        contentManagementAPI.middleware,
        accountBalancesAPI.middleware,
        userFriendAPI.middleware,
        getUserHyppe.middleware,
        group.middleware,
        moduleAPI.middleware,
        divisiAPI.middleware,
        voucherApi.middleware,
        adAPI.middleware,
        transactionAPI.middleware,
        kontenApi.middleware,
        iklanApi.middleware,
        mediaApi.middleware,
        contentApi.middleware,
        kycApi.middleware,
        bankApi.middleware,
      ]),
  });
  return store;
};

export const wrapper = createWrapper(initStore);
