import { type BaseQueryApi, type FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { type StoreSchema } from 'app/store';
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
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem(LsKeys.REFRESH_TOKEN);

    if (refreshToken) {
      const { data } = await baseQuery(
        {
          url: '/users/tokens/refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          credentials: 'include',
        },
        api,
        extraOptions,
      );

      if (data) {
        api.dispatch(authActions.setAccessToken((data as { accessToken: string }).accessToken));

        return baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithRefresh as typeof baseQuery,
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: authData => {
        const credentials = btoa(`${authData.login}:${authData.password}`);

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
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      onQueryStarted(_authData, { dispatch }) {
        dispatch(authActions.clear());
        dispatch(api.util.resetApiState());
      },
    }),
  }),
});
