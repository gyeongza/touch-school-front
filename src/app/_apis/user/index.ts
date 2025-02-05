import { api } from '..';
import type { GetUserResponse } from './type';

const UserApi = {
  getUser: async (): Promise<GetUserResponse> => {
    const res = await api.get<GetUserResponse>('/api/v1/user');
    return res.body;
  },
};

export default UserApi;
