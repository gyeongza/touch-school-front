import getUser from '@/app/_utils/get-user';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <div>Touch School Home</div>;
}
