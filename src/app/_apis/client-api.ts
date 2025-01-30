import { saveAccessTokenInCookies } from '../_actions/cookies';
import Fetchios from '../_lib/fetchios';
import { AuthData } from './type';

export const clientApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  useDefaultOptions: true,
  withCredentials: true,
});

export const setAuthorizationHeader = (accessToken: string) => {
  clientApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

export const saveAccessToken = async (token: AuthData) => {
  setAuthorizationHeader(token.accessToken);
  await saveAccessTokenInCookies(token.accessToken, token.accessTokenExpiryTime);
};
