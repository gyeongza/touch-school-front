import getUser from '@/app/_utils/get-user';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect(`/login/phone?needLogin=1`);
  }

  return <div>Touch School Home</div>;
}
