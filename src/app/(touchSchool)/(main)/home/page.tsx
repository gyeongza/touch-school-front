import getUser from '@/app/_utils/get-user';
import { redirect } from 'next/navigation';

export default function Page() {
  const user = getUser();

  if (!user) {
    redirect('/login');
  }

  return <div>Touch School Home</div>;
}
