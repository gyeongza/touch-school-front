import UserApi from '../_apis/user';
import { getAccessTokenFromCookies } from '../_actions/cookies';
import type { User } from '../_apis/user/type';

const getUser = async (): Promise<User | undefined> => {
  try {
    const accessToken = await getAccessTokenFromCookies();
    if (!accessToken) {
      console.log('Skipping getUser because no access token found.');
      return undefined;
    }

    const user = await UserApi.getUser();

    return user;
  } catch (e) {
    return undefined;
  }
};

export default getUser;
