import { api } from '@/app/_apis';

export const RegisterApi = {
  getVerifyCode: async (phoneNumber: string): Promise<void> => {
    await api.post(`/api/v1/verify/phone`, {
      phoneNumber: phoneNumber,
    });
  },

  verifyCode: async (phoneNumber: string, code: string): Promise<void> => {
    await api.post(`/api/v1/verify/confirm`, {
      phoneNumber: phoneNumber,
      code: code,
    });
  },
};
