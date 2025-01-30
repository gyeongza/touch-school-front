import { User } from '@/app/_apis/user/type';
import { Text } from '@/shared/components/common/Text';
import Navbar from './_components/navbar';

interface MainPageProps {
  user: User;
}

export default async function MainPage({ user }: MainPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 truncate pb-2 pt-4">
        <Text typography="h4">운동장</Text>
        <div className="flex gap-1 truncate">
          <Text>{user.school.name}</Text>
          <Text>{user.grade}학년</Text>
          <Text>{user.class}반</Text>
          <Text>{user.name}</Text>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        <Navbar />
      </div>
    </div>
  );
}
