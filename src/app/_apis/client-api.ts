import Fetchios from '../_lib/fetchios';

export const clientApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  useDefaultOptions: true,
  withCredentials: true,
});
