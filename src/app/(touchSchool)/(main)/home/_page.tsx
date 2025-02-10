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
import { toast } from 'sonner';
import { revalidateTreeInfo } from '@/app/_actions/revalidate';
import { CustomErrorResponse } from '@/app/_apis/type';
import { FetchError } from '@/app/_lib/extend-fetch';
import { useEffect, useState } from 'react';
import { Progress } from '@/shared/ui/progress';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Lottie from 'react-lottie-player';
import completed from '@/public/completed.json';
import UserApi from '@/app/_apis/user';
import { LuLogOut } from 'react-icons/lu';
import LogoutDialog from './_components/logout-dialog';

interface MainPageProps {
  user: User;
  treeInfo: TreeInfo;
}

const WATER_TREE_COUNT = 15;

export default function MainPage({ user, treeInfo }: MainPageProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [localTreeInfo, setLocalTreeInfo] = useState(treeInfo);
  const [localWaterCount, setLocalWaterCount] = useState(user.waterCount);
  const [wateringCount, setWateringCount] = useState(0);
  const [showSuccessLottie, setShowSuccessLottie] = useState(false);

  useEffect(() => {
    setLocalTreeInfo(treeInfo);
  }, [treeInfo]);

  useEffect(() => {
    setLocalWaterCount(user.waterCount);
  }, [user.waterCount]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(localTreeInfo.experience / localTreeInfo.level), 500);
    return () => clearTimeout(timer);
  }, [localTreeInfo.experience, localTreeInfo.level]);

  const { mutate: waterTree } = useMutation({
    mutationFn: (count: number) => HomeApi.waterTree({ count }),
    onMutate: (count: number) => {
      setLocalWaterCount((prev) => Math.max(0, prev - count));
      setLocalTreeInfo((prev) => ({
        ...prev,
        experience: prev.experience + WATER_TREE_COUNT * count,
        lastWateredAt: new Date().toISOString(),
      }));
    },
    onSuccess: () => {
      toast.success('나무에 물을 주었어요!');
      setShowSuccessLottie(true);
      setTimeout(() => setShowSuccessLottie(false), 2000);
      revalidateTreeInfo(user.id);
      router.refresh();
    },
    onError: (error: FetchError<CustomErrorResponse>) => {
      setLocalWaterCount(user.waterCount);
      setLocalTreeInfo(treeInfo);
      setWateringCount(0);
      toast.error(error.response.body.message);
    },
  });

  const debouncedWaterTree = useDebounce((count: number) => {
    if (count > 0) {
      waterTree(count);
      setWateringCount(0);
    }
  }, 800);

  const handleWaterClick = () => {
    if (localWaterCount <= 0 || wateringCount + 1 > localWaterCount) return;

    setWateringCount((prev) => prev + 1);
    debouncedWaterTree(wateringCount + 1);
  };

  const { mutate: requestSignOut, isPending: isLogoutPending } = useMutation({
    mutationFn: UserApi.logout,
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error('로그아웃에 실패했어요.');
    },
  });

  const handleLogout = async () => {
    if (!isLogoutPending) {
      requestSignOut();
    }
  };

  return (
    <div className="relative flex grow flex-col justify-between gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 truncate pb-2 pt-4">
          <Text typography="h4">운동장</Text>
          <div className="flex items-center gap-1 truncate">
            <Text>{user.school.name}</Text>
            <Text>{user.grade}학년</Text>
            <Text>{user.class}반</Text>
            <Text>{user.name}</Text>
            <LogoutDialog>
              <LuLogOut className="ml-2 size-4" />
            </LogoutDialog>
          </div>
        </div>
        <Navbar user={user} />
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
      <Button onClick={handleWaterClick} disabled={localWaterCount <= 0} className="w-full">
        <Text className="absolute">물주기</Text>
        <Text typography="xsmall" className="ml-auto">
          {localWaterCount}회 남음
        </Text>
      </Button>
      {wateringCount > 0 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/50 px-4 py-2">
          <Text typography="h3" className="text-white">
            {wateringCount}
          </Text>
        </div>
      )}
      {showSuccessLottie && (
        <Lottie
          loop
          animationData={completed}
          play
          className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
