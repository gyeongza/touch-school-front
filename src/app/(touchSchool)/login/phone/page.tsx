import getUser from '@/app/_utils/get-user';
import PhoneInputPage from './_page';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: { needLogin: string } }) {
  const user = await getUser();

  if (user) {
    redirect(`/home`);
  }

  return <PhoneInputPage searchParams={searchParams} />;
}
