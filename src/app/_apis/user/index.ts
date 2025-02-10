import { userFetchTags } from '@/app/_utils/fetch-tags';
import { api } from '..';
import type { GetAttendanceResponse, GetUserResponse } from './type';
import { deleteAccessTokenFromCookies } from '@/app/_actions/cookies';

const UserApi = {
  getUser: async (): Promise<GetUserResponse> => {
    const res = await api.get<GetUserResponse>('/api/v1/user', {
      next: {
        tags: [userFetchTags.user()],
      },
    });
    return res.body;
  },

  postAttendance: async (): Promise<void> => {
    await api.post('/api/v1/attendance');
  },

  getAttendance: async (): Promise<GetAttendanceResponse> => {
    const res = await api.get<GetAttendanceResponse>('/api/v1/attendance');
    return res.body;
  },

  logout: async (): Promise<void> => {
    await api.post('/api/v1/login/logout');
    await deleteAccessTokenFromCookies();
  },
};

export default UserApi;
