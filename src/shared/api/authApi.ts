import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { authActions } from 'entities/Auth/Auth.slice';
import { type LoginParams, type LoginResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api` }),
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
      onQueryStarted(authData, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(authActions.setUserInfo(authData.login));
          dispatch(authActions.setAccessToken(data.accessToken));
          dispatch(authActions.setRefreshToken(data.refreshToken));
          localStorage.setItem(LsKeys.ACCESS_TOKEN_EXPIRED, data.accessTokenExpiry);
        });
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }),
      onQueryStarted(_authData, { dispatch }) {
        setTimeout(() => {
          dispatch(authActions.clear());
          authApi.util.resetApiState();
        });
      },
    }),
  }),
});
