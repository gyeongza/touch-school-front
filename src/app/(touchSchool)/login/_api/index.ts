import { api } from '@/app/_apis';
import { VerifyCodeResponse } from '../../register/_type';

export const LoginApi = {
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
};
