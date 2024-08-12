import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { authReducer } from 'entities/Auth/Auth.slice';
import { api, authApi } from 'shared/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware, authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type StoreSchema = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
