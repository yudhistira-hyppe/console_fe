import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducers from '../reducers';
import { authApi, userApi } from 'api/user';
import { dashboardApi, engagementApi, faqAndInfoApi } from 'api/console';
import { contentAPI } from 'api/user/content';
import { notificationAPI } from 'api/user/notification';
import { commentAPI } from 'api/user/comment';
import { insightAPI } from 'api/user/insight';
import { contentManagementAPI } from 'api/user/content/management';
import { accountBalancesAPI } from 'api/user/accountBalances';
import { userFriendAPI } from 'api/user/friend';

const initStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        dashboardApi.middleware,
        engagementApi.middleware,
        faqAndInfoApi.middleware,
        contentAPI.middleware,
        notificationAPI.middleware,
        commentAPI.middleware,
        insightAPI.middleware,
        contentManagementAPI.middleware,
        accountBalancesAPI.middleware,
        userFriendAPI.middleware,
      ]),
  });
  return store;
};

export const wrapper = createWrapper(initStore);
