import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { LsKeys } from '@shared/constants';
import { authActions } from 'entities/Auth.slice';
import { type GetRecommendationsApiArg, type GetRecommendationsApiResponse, type PostDto } from './__generated__';
import type { AppDispatch } from 'app/store';

export const requestWithAuth = (url: string, props: RequestInit = {}) =>
  fetch(url, {
    ...props,
    headers: {
      ...props.headers,
      Authorization: `Bearer ${localStorage.getItem(LsKeys.ACCESS_TOKEN)}`,
    },
  });

let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

export const requestWithReAuth = async <T>(dispatch: AppDispatch, requestFn: () => Promise<T>) => {
  const tokenExpirationDate = localStorage.getItem(LsKeys.ACCESS_TOKEN_EXPIRED);
  if (!tokenExpirationDate || new Date(tokenExpirationDate) > new Date()) {
    return requestFn();
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
        dispatch(authActions.clear());
      });
  }

  await refreshPromise;
  return requestFn();
};

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

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => requestWithReAuth(api.dispatch, async () => baseQueryWithAuth(args, api, extraOptions));

export const api = createApi({
  tagTypes: ['POSTS'],
  baseQuery: baseQueryWithReAuth,
  endpoints: build => ({
    getFeed: build.query<PostDto[], { page: number; size: number; searchFilter: string }>({
      query: ({ page = 0, size = 10, searchFilter = '' }) => ({
        url: `/posts/search`,
        params: { page, size, title: searchFilter },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}?${queryArgs.searchFilter}`,
      merge: (currentCache, newItems) => [
        ...currentCache.filter(existingItem => !newItems.some(newItem => newItem.id === existingItem.id)),
        ...newItems,
      ],
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['POSTS'],
    }),
    getRecommendations: build.query<GetRecommendationsApiResponse, GetRecommendationsApiArg>({
      query: queryArg => ({
        url: `/posts/recommendations`,
        params: { page: queryArg.page, size: queryArg.size, sort: queryArg.sort },
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => [
        ...currentCache.filter(existingItem => !newItems.some(newItem => newItem.id === existingItem.id)),
        ...newItems,
      ],
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['POSTS'],
    }),
  }),
});
