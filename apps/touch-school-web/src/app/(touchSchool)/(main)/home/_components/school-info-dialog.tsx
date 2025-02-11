import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { HomeApi } from '../_api';
import { User } from '@/_apis/user/type';
import { Text } from '@/_components/common/Text';
import { useState } from 'react';
import { ScrollArea } from '@repo/ui/scroll-area';

interface SchoolInfoDialogProps {
  user: User;
  children: React.ReactNode;
}

export default function SchoolInfoDialog({ user, children }: SchoolInfoDialogProps) {
  const [open, setOpen] = useState(false);

  const { data: schoolInfo } = useQuery({
    queryKey: ['schoolInfo', user.school.id],
    queryFn: () => HomeApi.getSchoolInfo(user.school.id),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-6">우리학교 정보</DialogTitle>
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
                <Text className="flex-1 text-center">{schoolInfo?.currentUser.name} (나)</Text>
                <Text className="flex-1 text-center">{schoolInfo?.currentUser.grade}학년</Text>
                <Text className="flex-1 text-center">{schoolInfo?.currentUser.class}반</Text>
                <Text className="flex-1 text-center">{schoolInfo?.currentUser.wateringCount}번</Text>
              </div>

              {/* 다른 사용자들 */}
              <ScrollArea className="h-96">
                {schoolInfo?.users.map((user) => (
                  <div key={user.name} className="mb-2 flex items-center justify-between gap-2">
                    <Text className="flex-1 text-center">{user.name}</Text>
                    <Text className="flex-1 text-center">{user.grade}학년</Text>
                    <Text className="flex-1 text-center">{user.class}반</Text>
                    <Text className="flex-1 text-center">{user.wateringCount}번</Text>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
