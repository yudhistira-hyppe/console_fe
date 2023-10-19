import Router from 'next/router';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { authApi } from 'api/user';
import { createCookies, deleteAllCookies, getAllCookies } from 'helpers/cookiesHelper';

const mutex = new Mutex();

export const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const cookies = getAllCookies();

    if (cookies && cookies.token && endpoint !== 'login') {
      headers.set('x-auth-token', cookies?.token);
      headers.set('x-auth-user', cookies?.user.email);
    }

    return headers;
  },
});

export const customBaseQueryWithHandleReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const cookies = getAllCookies();
  let result = await customBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await api.dispatch(
          authApi.endpoints.refreshToken.initiate({
            email: cookies?.user.email,
            refreshToken: cookies?.refreshToken,
          }),
        );

        if (refreshResult.data) {
          const keyAndValueCookies = {
            token: { value: refreshResult.data.token, expirationHour: 144 },
            refreshToken: { value: refreshResult.data.refreshToken, expirationHour: 144 },
            user: {
              value: cookies?.user,
              expirationHour: 144,
            },
          };
          createCookies(keyAndValueCookies);

          result = await customBaseQuery(args, api, extraOptions);
        } else {
          Router.push('/signin');
          deleteAllCookies();
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
