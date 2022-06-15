import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducers from '../reducers';
import { authApi, userApi } from 'api/user';
import { dashboardApi, engagementApi } from 'api/console';
import { contentAPI } from 'api/user/content';
import { notificationAPI } from 'api/user/notification';
import { commentAPI } from 'api/user/comment';
import { insightAPI } from 'api/user/insight';

const initStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        dashboardApi.middleware,
        engagementApi.middleware,
        contentAPI.middleware,
        notificationAPI.middleware,
        commentAPI.middleware,
        insightAPI.middleware,
      ]),
  });
  return store;
};

export const wrapper = createWrapper(initStore);
