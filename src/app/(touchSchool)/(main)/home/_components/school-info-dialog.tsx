import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { HomeApi } from '../_api';
import { User } from '@/app/_apis/user/type';
import { Text } from '@/shared/components/common/Text';
import { formatDateToKorean } from '@/app/_utils/date';

interface SchoolInfoDialogProps {
  user: User;
  children: React.ReactNode;
}

export default function SchoolInfoDialog({ user, children }: SchoolInfoDialogProps) {
  const { data: schoolInfo } = useQuery({
    queryKey: ['schoolInfo', user.school.id],
    queryFn: () => HomeApi.getSchoolInfo(user.school.id),
  });

  if (!schoolInfo) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-2">우리학교 정보</DialogTitle>
          <DialogDescription>
            <div className="flex w-full flex-col gap-4">
              {/* 테이블 헤더 */}
              <div className="flex items-center justify-between gap-2 border-b pb-2">
                <Text className="flex-1 text-center">이름</Text>
                <Text className="flex-1 text-center">학년</Text>
                <Text className="flex-1 text-center">학반</Text>
                <Text className="flex-1 text-center">물주기 횟수</Text>
              </div>

              {/* 현재 사용자 */}
              <div className="flex items-center justify-between gap-2">
                <Text className="flex-1 text-center">{schoolInfo.currentUser.name}</Text>
                <Text className="flex-1 text-center">{schoolInfo.currentUser.grade}학년</Text>
                <Text className="flex-1 text-center">{schoolInfo.currentUser.class}반</Text>
                <Text className="flex-1 text-center">{schoolInfo.currentUser.wateringCount}번</Text>
              </div>

              {/* 다른 사용자들 */}
              {schoolInfo.users.map((user) => (
                <div key={user.name} className="flex items-center justify-between gap-2">
                  <Text className="flex-1 text-center">{user.name}</Text>
                  <Text className="flex-1 text-center">{user.grade}학년</Text>
                  <Text className="flex-1 text-center">{user.class}반</Text>
                  <Text className="flex-1 text-center">{user.wateringCount}번</Text>
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
