import getUser from '@/_utils/get-user';
import RegisterCompleted from '../_components/register-completed';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <RegisterCompleted user={user} />;
}
