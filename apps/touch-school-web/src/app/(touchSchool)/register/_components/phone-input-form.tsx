'use client';

import { Input } from '@/_components/common/Input';
import { useState } from 'react';
import { RegisterApi } from '../_api';
import { useMutation } from '@tanstack/react-query';
import { useRegisterActions, useRegisterState } from '../_store';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import { Text } from '@/_components/common/Text';

export default function PhoneInputForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const { userInfo } = useRegisterState();
  const { setPhoneNumber } = useRegisterActions();

  const { mutate: sendVerifyCode, isPending: isSendVerifyCodePending } = useMutation({
    mutationFn: () => RegisterApi.getVerifyCode(userInfo.phoneNumber),
    onSuccess: () => {
      router.push('/register/verify');
    },
    onError: () => {
      setMessage('인증번호 전송에 실패했습니다.');
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 11) {
      setPhoneNumber(value);
      setMessage('');
    }
  };

  const handleSubmit = () => {
    if (userInfo.phoneNumber.length !== 11) {
      setMessage('올바른 휴대폰 번호를 입력해주세요.');
      return;
    }
    sendVerifyCode();
  };

  return (
    <>
      <div className="relative flex h-full grow flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">휴대폰 번호를 입력해주세요.</Text>
          <Input
            className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            placeholder="휴대폰 번호"
            value={userInfo.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {message && <div className="text-red-500">{message}</div>}
        </div>
      </div>
      <Button className="sticky bottom-0" onClick={handleSubmit} disabled={isSendVerifyCodePending}>
        인증번호 받기
      </Button>
    </>
  );
}
