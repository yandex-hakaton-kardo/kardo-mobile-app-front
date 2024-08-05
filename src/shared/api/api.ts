import { type BaseQueryApi, type FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { type AppDispatch, type StoreSchema } from 'app/store';
import { authActions } from 'entities/Auth.slice';
import { type LoginParams, type LoginResponse } from './types';

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

      clearStore(api.dispatch);
    }
  }

  return baseQuery(args, api, extraOptions);
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh as typeof baseQuery,
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: authData => {
        const credentials = btoa(`${authData.login}:${authData.password}`);
        localStorage.setItem(LsKeys.CREDS, credentials);

        return {
          url: 'users/login',
          method: 'POST',
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        };
      },
      async onQueryStarted(_authData, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(authActions.setAccessToken(data.accessToken));
        dispatch(authActions.setRefreshToken(data.refreshToken));
        localStorage.setItem(LsKeys.ACCESS_TOKEN_EXPIRED, data.accessTokenExpiry);
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      onQueryStarted(_authData, { dispatch }) {
        clearStore(dispatch);
      },
    }),
  }),
});

function clearStore(dispatch: AppDispatch) {
  dispatch(authActions.clear());
  dispatch(api.util.resetApiState());
}
