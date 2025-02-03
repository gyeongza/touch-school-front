import getUser from '@/app/_utils/get-user';
import { notFound, redirect } from 'next/navigation';
import MainPage from './_page';
import { TreeInfo } from './_type';
import { HomeApi } from './_api';

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect(`/login/phone?needLogin=1`);
  }

  let treeInfo: TreeInfo;
  try {
    treeInfo = await HomeApi.getTreeInfo(user.id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  return <MainPage user={user} treeInfo={treeInfo} />;
}
