import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { authActions } from 'entities/Auth.slice';

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `/api`,
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem(LsKeys.ACCESS_TOKEN);

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    headers.set('Accept', 'application/json');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const tokenExpirationDate = localStorage.getItem(LsKeys.ACCESS_TOKEN_EXPIRED);
  if (!tokenExpirationDate || new Date(tokenExpirationDate) > new Date()) {
    return baseQueryWithAuth(args, api, extraOptions);
  }
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch('/api/users/tokens/refresh', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LsKeys.REFRESH_TOKEN)}`,
      },
    })
      .then(res => res.json())
      .then(refreshResult => {
        if (refreshResult) {
          const refreshTokenResult = refreshResult as { accessToken: string; accessTokenExpiry: string };

          localStorage.setItem(LsKeys.ACCESS_TOKEN, refreshTokenResult.accessToken);
          localStorage.setItem(LsKeys.ACCESS_TOKEN_EXPIRED, refreshTokenResult.accessTokenExpiry);
          isRefreshing = false;

          return refreshTokenResult;
        }
        isRefreshing = false;

        return null;
      })
      .catch(() => {
        isRefreshing = false;
        api.dispatch(authActions.clear());
      });
  }

  await refreshPromise;
  return baseQueryWithAuth(args, api, extraOptions);
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
