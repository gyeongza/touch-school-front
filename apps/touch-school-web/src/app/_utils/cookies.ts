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
    // 프로덕션 환경에서만 쿠키를 설정 (http에서도 쿠키를 읽을 수 있도록)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });
};
