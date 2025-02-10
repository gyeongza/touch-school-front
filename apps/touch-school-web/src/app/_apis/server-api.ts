import { getAccessTokenFromCookies } from '../_actions/cookies';
import { RequestInterceptor } from '../_lib/extend-fetch';
import Fetchios from '../_lib/fetchios';

const authorizationRequestInterceptor: RequestInterceptor = async (requestArgs) => {
  const accessToken = await getAccessTokenFromCookies();
  const headers = new Headers(requestArgs[1]?.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return [
    requestArgs[0],
    {
      ...requestArgs[1],
      headers,
    },
  ];
};

export const serverApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  withCredentials: true,
  interceptors: {
    request: async (requestArgs) => {
      let args = requestArgs;
      args = await authorizationRequestInterceptor(args);
      return args;
    },
  },
});
