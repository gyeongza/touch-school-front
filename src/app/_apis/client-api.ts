import { saveAccessTokenInCookies } from '../_actions/cookies';
import { ResponseInterceptor } from '../_lib/extend-fetch';
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
      const {
        body: { accessToken, accessTokenExpiryTime },
      } = res.body as { body: AuthData };
      await saveAccessToken({ accessToken, accessTokenExpiryTime });

      const newRes = await clientApi.request(requestArgs[0], {
        ...requestArgs[1],
        headers: {
          ...requestArgs[1]?.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return newRes;
    } catch (error) {
      console.error(error);
      return res;
    }
  };
}
