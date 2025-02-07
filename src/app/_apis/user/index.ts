import { userFetchTags } from '@/app/_utils/fetch-tags';
import { api } from '..';
import type { GetAttendanceResponse, GetUserResponse } from './type';

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
};

export default UserApi;
