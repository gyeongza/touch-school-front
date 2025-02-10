import { api } from '@/_apis';
import { GetSchoolListResponse, PostRegisterRequest, School, VerifyCodeResponse } from '../_type';

export const RegisterApi = {
  getVerifyCode: async (phoneNumber: string): Promise<void> => {
    await api.post(`/api/v1/verify/phone`, {
      phoneNumber: phoneNumber,
    });
  },

  verifyCode: async (phoneNumber: string, code: string): Promise<VerifyCodeResponse> => {
    const res = await api.post<VerifyCodeResponse>(`/api/v1/verify/confirm`, {
      phoneNumber: phoneNumber,
      code: code,
    });
    return res.body;
  },

  getSchoolList: async (keyword: string): Promise<GetSchoolListResponse> => {
    const res = await api.get<GetSchoolListResponse>(`/api/v1/school/schools/search?keyword=${keyword}`);
    return res.body;
  },

  postRegister: async (userInfo: PostRegisterRequest): Promise<void> => {
    await api.post<PostRegisterRequest>(`/api/v1/verify/register`, userInfo);
  },
};
