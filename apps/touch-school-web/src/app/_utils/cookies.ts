import type { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const COOKIES = {
  ACCESS_TOKEN: 'access-token',
} as const;

export const setAccessTokenCookie = (
  cookies: ResponseCookies | ReadonlyRequestCookies,
  accessToken: string,
  accessTokenExpiryTime: string,
) => {
  cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    expires: new Date(accessTokenExpiryTime),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
};
