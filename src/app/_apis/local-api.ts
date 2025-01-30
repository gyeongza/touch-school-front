import Fetchios from '../_lib/fetchios';

export const localApi = Fetchios.create({
  baseUrl: process.env.NEXT_PUBLIC_LOCAL_API_URL,
  useDefaultOptions: true,
});
