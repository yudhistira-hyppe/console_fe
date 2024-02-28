import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducers from '../reducers';
import { authApi, userFriendAPI, insightAPI } from 'api/user';
import {
  dashboardApi,
  engagementApi,
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
  kycApi,
  bankApi,
  boostAPI,
  adsApi,
  dashboardMonetizeAPI,
  jualBeliAPI,
  interestApi,
  settingApi,
  masterBankApi,
  adsUtilityApi,
  challengeApi,
  masterBadgeApi,
  challengeUtilityApi,
  databaseApi,
  announcementApi,
  communityUtilityApi,
} from 'api/console';

const initStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([
        authApi.middleware,
        dashboardApi.middleware,
        engagementApi.middleware,
        ticketApi.middleware,
        bantuanPenggunaApi.middleware,
        insightAPI.middleware,
        // userFriendAPI.middleware,
        getUserHyppe.middleware,
        group.middleware,
        moduleAPI.middleware,
        divisiAPI.middleware,
        voucherApi.middleware,
        adAPI.middleware,
        transactionAPI.middleware,
        kontenApi.middleware,
        iklanApi.middleware,
        databaseApi.middleware,
        kycApi.middleware,
        bankApi.middleware,
        boostAPI.middleware,
        adsApi.middleware,
        dashboardMonetizeAPI.middleware,
        jualBeliAPI.middleware,
        interestApi.middleware,
        settingApi.middleware,
        masterBankApi.middleware,
        adsUtilityApi.middleware,
        challengeApi.middleware,
        masterBadgeApi.middleware,
        challengeUtilityApi.middleware,
        announcementApi.middleware,
        communityUtilityApi.middleware,
      ]),
  });
  return store;
};

export const wrapper = createWrapper(initStore);
