import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.token) {
      headers.set('authorization', 'Bearer TOKEN');
    }

    return headers;
  },
});
