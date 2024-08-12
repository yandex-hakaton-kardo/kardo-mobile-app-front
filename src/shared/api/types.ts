export interface LoginResponse {
  accessToken: string;
  /** @example "2024-08-02T06:56:48.294988200Z" */
  accessTokenExpiry: string;
  refreshToken: string;
  /** @example "2024-08-02T06:56:48.294988200Z" */
  refreshTokenExpiry: string;
}

export interface LoginParams {
  login: string;
  password: string;
}

export type CompetitionType = 'PREMIUM' | 'VIDEO_CONTEST' | 'PROJECT' | 'CHILDREN';
