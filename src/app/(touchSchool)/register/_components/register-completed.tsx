'use client';

import type { User } from '@/app/_apis/user/type';
import { Text } from '@/shared/components/common/Text';
import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie-player';
import completed from '@/public/completed.json';
interface RegisterCompletedProps {
  user: User;
}

export default function RegisterCompleted({ user }: RegisterCompletedProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex h-full grow flex-col items-center justify-center">
        <div className="relative flex flex-col items-center gap-6 text-center">
          <Lottie loop animationData={completed} play className="absolute -top-48 size-96" />
          <Text typography="h3">회원가입이 완료되었어요!</Text>
          <div className="flex flex-col gap-2">
            <Text typography="p" className="font-bold">
              {user.school.name} {user.grade}학년 {user.class}반 {user.name}님
            </Text>
            <Text typography="p">터치스쿨에 오신 것을 환영합니다.</Text>
          </div>
        </div>
      </div>
      <Button className="sticky bottom-0" onClick={() => router.push('/')}>
        터치스쿨 시작하기
      </Button>
    </>
  );
}
