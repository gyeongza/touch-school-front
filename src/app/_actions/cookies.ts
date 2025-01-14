'use server';

import { cookies } from 'next/headers';
import { COOKIES, setAccessTokenCookie } from '../_utils/cookies';

export const saveAccessTokenInCookies = async (accessToken: string, accessTokenExpiryTime: string) => {
  setAccessTokenCookie(cookies(), accessToken, accessTokenExpiryTime);
};

export const deleteAccessTokenFromCookies = async () => {
  cookies().delete(COOKIES.ACCESS_TOKEN);
};

export const getAccessTokenFromCookies = async () => {
  return cookies().get(COOKIES.ACCESS_TOKEN)?.value;
};
