import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/dialog';
import { useQuery, useQueries } from '@tanstack/react-query';
import { HomeApi } from '../_api';
import { User } from '@/_apis/user/type';
import { Text } from '@/_components/common/Text';
import { useState } from 'react';
import { ScrollArea } from '@repo/ui/scroll-area';
import UserApi from '@/_apis/user';

interface SchoolRankDialogProps {
  user: User;
  children: React.ReactNode;
}

export default function SchoolRankDialog({ user, children }: SchoolRankDialogProps) {
  const [open, setOpen] = useState(false);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['userInfo'],
        queryFn: () => UserApi.getUserInfo(),
        enabled: open,
      },
      {
        queryKey: ['schoolRank'],
        queryFn: () => HomeApi.getSchoolRankInfo(),
        enabled: open,
      },
    ],
  });

  const [userInfo, schoolRank] = queries;

  if (!userInfo && !schoolRank) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-6">학교 랭킹</DialogTitle>
          <DialogDescription>
            <div className="flex w-full flex-col gap-4">
              {/* 테이블 헤더 */}
              <div className="flex items-center justify-between gap-2 border-b pb-2">
                <Text className="flex-1 text-center">순위</Text>
                <Text className="flex-1 text-center">학교명</Text>
                <Text className="flex-1 text-center">나무 레벨</Text>
                <Text className="flex-1 text-center">참여 인원</Text>
              </div>

              {/* 현재 사용자 */}
              <div className="flex items-center justify-between gap-2">
                <Text className="flex-1 text-center">{schoolRank.data?.userSchoolRank}위</Text>
                <Text className="flex-1 text-center">{userInfo.data?.school.name} (나)</Text>
                <Text className="flex-1 text-center">{userInfo.data?.tree.level}</Text>
                <Text className="flex-1 text-center">{userInfo.data?.school.totalUser}</Text>
              </div>

              {/* 다른 사용자들 */}
              <ScrollArea className="h-96">
                {schoolRank.data?.schools.map((school) => (
                  <div key={school.school.id} className="flex items-center justify-between gap-2">
                    <Text className="flex-1 text-center">{school.school.rank}위</Text>
                    <Text className="flex-1 text-center">{school.school.name}</Text>
                    <Text className="flex-1 text-center">{school.tree.level}</Text>
                    <Text className="flex-1 text-center">{school.school.totalUser}</Text>
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
