import Fetchios from '../_lib/fetchios';

export const serverApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_TSCHOOL_API_URL,
  withCredentials: true,
});
