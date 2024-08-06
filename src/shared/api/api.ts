import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type StoreSchema } from 'app/store';

const baseQuery = fetchBaseQuery({
  baseUrl: `/api`,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as StoreSchema).auth;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
  credentials: 'include',
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});
