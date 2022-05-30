import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducers from '../reducers';
import { authApi, userApi } from 'api/user';
import { dashboardApi, engagementApi } from 'api/console';

const initStore = () => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        userApi.middleware,
        dashboardApi.middleware,
        engagementApi.middleware,
      ]),
  });
  return store;
};

export const wrapper = createWrapper(initStore);
