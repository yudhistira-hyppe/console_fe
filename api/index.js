import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { authApi } from './user';

const mutex = new Mutex();

export const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.token && endpoint !== 'login') {
      headers.set('Authorization', user.token);
    }

    return headers;
  },
});

export const customBaseQueryWithHandleReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const user = JSON.parse(localStorage.getItem('user'));
  let result = await customBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await api.dispatch(
          authApi.endpoints.refreshToken.initiate({
            email: user.email,
            refreshToken: user.refreshToken,
          }),
        );

        if (refreshResult.data) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...user,
              token: refreshResult.data.data.token,
              refreshToken: refreshResult.data.data.refreshToken,
            }),
          );

          result = await customBaseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('user');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await customBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
