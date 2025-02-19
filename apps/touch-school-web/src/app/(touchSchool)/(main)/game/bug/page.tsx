import getUser from '@/_utils/get-user';
import { notFound, redirect } from 'next/navigation';
import BugKillGamePage from './_page';
import { TreeInfo } from '../../home/_type';
import { HomeApi } from '../../home/_api';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect(`/login/phone?needLogin=1`);
  }

  let userTree: TreeInfo;
  try {
    userTree = await HomeApi.getTreeInfo(user.id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  return <BugKillGamePage user={user} userTree={userTree} />;
}
