import getUser from '@/app/_utils/get-user';
import { redirect } from 'next/navigation';
import MainPage from './_page';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect(`/login/phone?needLogin=1`);
  }

  return <MainPage user={user} />;
}
