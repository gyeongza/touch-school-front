import getUser from '../_utils/get-user';

export default async function Page() {
  const user = await getUser();

  if (user) {
    return <div>로그인 완료</div>;
  }
  return <div>Touch School</div>;
}
