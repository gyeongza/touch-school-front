'use client';

import { User } from '@/app/_apis/user/type';
import { Text } from '@/shared/components/common/Text';
import Navbar from './_components/navbar';
import Image from 'next/image';
import { TreeInfo } from './_type';
import { formatDateToKorean } from '@/app/_utils/date';
import { Button } from '@/shared/ui/button';
import { useMutation } from '@tanstack/react-query';
import { HomeApi } from './_api';
import { revalidatePath, revalidateTag } from 'next/cache';
import { treeFetchTags } from '@/app/_utils/fetch-tags';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { revalidateTreeInfo } from '@/app/_actions/revalidate';

interface MainPageProps {
  user: User;
  treeInfo: TreeInfo;
}

export default function MainPage({ user, treeInfo }: MainPageProps) {
  const router = useRouter();

  const { mutate: waterTree } = useMutation({
    mutationFn: () => HomeApi.waterTree(),
    onSuccess: () => {
      toast.success('나무에 물을 주었습니다.');
      revalidateTreeInfo(user.id);
      router.refresh();
    },
    onError: () => {
      toast.error('나무에 물을 주는데 실패했습니다.');
    },
  });

  const handleWaterTree = () => {
    waterTree();
  };

  console.log(treeInfo);

  return (
    <div className="flex flex-col gap-8">
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

      <div className="flex justify-center">
        <Image src="/trees/tree-level-1.png" alt="tree-level-1" width={300} height={300} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Text typography="h4">
          {user.school.name}의 나무 (Lv.{treeInfo.level})
        </Text>
        <Text>
          경험치: {treeInfo.experience} / {treeInfo.level * 100}
        </Text>
        <Text typography="xsmall">마지막 물주기: {formatDateToKorean(treeInfo.lastWateredAt)}</Text>
        <Button onClick={handleWaterTree}>물주기</Button>
      </div>
    </div>
  );
}
