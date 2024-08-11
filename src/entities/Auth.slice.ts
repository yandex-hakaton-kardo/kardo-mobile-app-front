import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LsKeys } from '@shared/constants';

export interface UserSchema {
  userName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserSchema = {
  userName: localStorage.getItem(LsKeys.USERNAME),
  accessToken: localStorage.getItem(LsKeys.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(LsKeys.REFRESH_TOKEN),
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<string>) {
      state.userName = payload;
      localStorage.setItem(LsKeys.USERNAME, payload);
    },
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload;
      localStorage.setItem(LsKeys.ACCESS_TOKEN, payload);
    },
    setRefreshToken(state, { payload }: PayloadAction<string>) {
      state.refreshToken = payload;
      localStorage.setItem(LsKeys.REFRESH_TOKEN, payload);
    },
    clear() {
      localStorage.removeItem(LsKeys.USERNAME);
      localStorage.removeItem(LsKeys.REFRESH_TOKEN);
      localStorage.removeItem(LsKeys.ACCESS_TOKEN);
      localStorage.removeItem(LsKeys.ACCESS_TOKEN_EXPIRED);

      return {
        userName: null,
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
