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
import { CustomErrorResponse } from '@/app/_apis/type';
import { FetchError } from '@/app/_lib/extend-fetch';
import { useEffect, useState } from 'react';
import { Progress } from '@/shared/ui/progress';

interface MainPageProps {
  user: User;
  treeInfo: TreeInfo;
}

export default function MainPage({ user, treeInfo }: MainPageProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [localTreeInfo, setLocalTreeInfo] = useState(treeInfo);
  const [localWaterCount, setLocalWaterCount] = useState(user.waterCount);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(localTreeInfo.experience / localTreeInfo.level), 500);
    return () => clearTimeout(timer);
  }, [localTreeInfo.experience, localTreeInfo.level]);

  const { mutate: waterTree } = useMutation({
    mutationFn: () => HomeApi.waterTree(),
    onMutate: () => {
      // 옵티미스틱 업데이트
      setLocalWaterCount((prev) => Math.max(0, prev - 1));
      setLocalTreeInfo((prev) => ({
        ...prev,
        experience: prev.experience + 1,
        lastWateredAt: new Date().toISOString(),
      }));
    },
    onSuccess: () => {
      toast.success('나무에 물을 주었어요!');
      revalidateTreeInfo(user.id);
    },
    onError: (error: FetchError<CustomErrorResponse>) => {
      // 에러 시 원래 상태로 복구
      setLocalWaterCount(user.waterCount);
      setLocalTreeInfo(treeInfo);
      toast.error(error.response.body.message);
    },
  });

  const handleWaterTree = () => {
    waterTree();
  };

  return (
    <div className="flex grow flex-col justify-between gap-6">
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
        <Image src="/trees/tree-level-1.png" alt="tree-level-1" width={250} height={250} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Text typography="h4">
          {user.school.name}의 나무 (Lv.{localTreeInfo.level})
        </Text>
        <Text>경험치: {progress.toFixed(2)}%</Text>
        <Progress value={progress} />
        <Text typography="xsmall">마지막 물주기: {formatDateToKorean(localTreeInfo.lastWateredAt)}</Text>
      </div>
      <Button onClick={handleWaterTree} disabled={localWaterCount <= 0} className="w-full">
        <Text className="absolute">물주기</Text>
        <Text typography="xsmall" className="ml-auto">
          {localWaterCount}회 남음
        </Text>
      </Button>
    </div>
  );
}
