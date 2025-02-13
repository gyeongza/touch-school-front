import { getAccessTokenFromCookies } from '../_actions/cookies';
import Fetchios from '../_lib/fetchios';

export const serverApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  withCredentials: true,
  interceptors: {
    request: async (requestArgs) => {
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
    },
  },
});
