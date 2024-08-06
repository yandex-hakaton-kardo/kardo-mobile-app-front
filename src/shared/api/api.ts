import { type BaseQueryApi, type FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { type StoreSchema } from 'app/store';
import { authActions } from 'entities/Auth.slice';
import { type LoginResponse } from './types';

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

const baseQueryWithRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>,
) => {
  const tokenDiedDate = localStorage.getItem(LsKeys.ACCESS_TOKEN_EXPIRED);
  const tokenIsDied = !tokenDiedDate || new Date(tokenDiedDate) <= new Date();

  if (tokenIsDied) {
    const credentials = localStorage.getItem(LsKeys.CREDS);

    if (credentials) {
      const data = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then<LoginResponse>(res => res.json());

      if (data.accessToken) {
        api.dispatch(authActions.setAccessToken(data.accessToken));
        localStorage.setItem(LsKeys.ACCESS_TOKEN_EXPIRED, data.accessTokenExpiry);

        return baseQuery(args, api, extraOptions);
      }
    }
  }

  return baseQuery(args, api, extraOptions);
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh as typeof baseQuery,
  endpoints: () => ({}),
});
