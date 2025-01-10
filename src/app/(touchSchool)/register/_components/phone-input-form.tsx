'use client';

import { Input } from '@/shared/components/common/Input';
import { useState } from 'react';
import { RegisterApi } from '../_api';
import { useMutation } from '@tanstack/react-query';
import { useRegisterActions, useUserState } from '../_store';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/components/common/Text';

export default function PhoneInputForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const { ...userState } = useUserState();
  const { setUser } = useRegisterActions();

  const { mutate: sendVerifyCode } = useMutation({
    mutationFn: () => RegisterApi.getVerifyCode(userState.phoneNumber),
    onSuccess: () => {
      router.push('/register/verify');
    },
    onError: () => {
      setMessage('인증번호 전송에 실패했습니다.');
    },
  });

  return (
    <>
      <div className="relative flex h-full grow flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">휴대폰 번호를 입력해주세요.</Text>
          <Input
            className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
            type="text"
            placeholder="휴대폰 번호"
            value={userState.phoneNumber}
            onChange={(e) => setUser({ ...userState, phoneNumber: e.target.value })}
          />
          {message && <div className="text-red-500">{message}</div>}
        </div>
      </div>
      <Button className="sticky bottom-0" onClick={() => sendVerifyCode()}>
        인증번호 받기
      </Button>
    </>
  );
}
