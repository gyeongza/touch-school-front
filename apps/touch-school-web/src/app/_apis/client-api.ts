import { saveAccessTokenInCookies } from '@/_actions/cookies';
import { ResponseGenericBody, ResponseInterceptor } from '../_lib/extend-fetch';
import Fetchios from '../_lib/fetchios';
import { AuthData } from './type';

const accessTokenResponseInterceptor = createAccessTokenResponseInterceptor();

export const clientApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  useDefaultOptions: true,
  withCredentials: true,
  interceptors: {
    response: async (response, requestArgs) => {
      let res = response;

      res = await accessTokenResponseInterceptor(res, requestArgs);
      return res;
    },
  },
});

export const setAuthorizationHeader = (accessToken: string) => {
  clientApi.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

export const saveAccessToken = async (token: AuthData) => {
  setAuthorizationHeader(token.accessToken);
  await saveAccessTokenInCookies(token.accessToken, token.accessTokenExpiryTime);
};

function createAccessTokenResponseInterceptor(): ResponseInterceptor {
  return async (res, requestArgs) => {
    try {
      const responseBody = res.body as { body?: AuthData };
      if (!responseBody?.body?.accessToken) {
        return res;
      }

      const {
        body: { accessToken, accessTokenExpiryTime },
      } = res.body as { body: AuthData };
      await saveAccessToken({ accessToken, accessTokenExpiryTime });

      return res;
    } catch (error) {
      console.error(error);
      return res;
    }
  };
}
