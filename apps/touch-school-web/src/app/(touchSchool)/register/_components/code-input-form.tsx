'use client';

import { Input } from '@/_components/common/Input';
import { useRegisterState } from '../_store';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RegisterApi } from '../_api';
import { useRouter } from 'next/navigation';
import { Text } from '@/_components/common/Text';
import { Button } from '@repo/ui/button';

export default function CodeInputForm() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isExpired, setIsExpired] = useState(false);

  const { userInfo } = useRegisterState();

  useEffect(() => {
    if (!userInfo.phoneNumber) {
      router.push('/register/phone');
    }
  }, [userInfo.phoneNumber, router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsExpired(true);
      setMessage('인증 시간이 만료되었습니다. 재전송을 눌러주세요.');
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const { mutate: resendCode } = useMutation({
    mutationFn: () => RegisterApi.getVerifyCode(userInfo.phoneNumber),
    onSuccess: () => {
      setTimeLeft(180);
      setIsExpired(false);
      setMessage('');
      setCode('');
    },
    onError: () => {
      setMessage('인증번호 재전송에 실패했습니다.');
    },
  });

  const { mutate: verifyCode, isPending: isVerifyCodePending } = useMutation({
    mutationFn: () => RegisterApi.verifyCode(userInfo.phoneNumber, code),
    onSuccess: async (res) => {
      if (res.isExistingUser) {
        router.push('/');
      } else {
        router.push('/register/user-info');
      }
    },
    onError: () => {
      setMessage('인증번호가 일치하지 않습니다.');
    },
  });

  return (
    <>
      <div className="relative flex h-full grow flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">문자로 전송된 인증번호 6자리를 입력해주세요.</Text>
          <div className="relative">
            <Input
              className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
              type="text"
              placeholder="인증번호 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isExpired}
            />
            <span className="absolute right-0 top-2 text-gray-500">{formatTime(timeLeft)}</span>
          </div>
          {message && <div className="text-red-500">{message}</div>}
          <Button variant="outline" onClick={() => resendCode()}>
            인증번호 재전송
          </Button>
        </div>
      </div>
      <Button className="sticky bottom-0" onClick={() => verifyCode()} disabled={isExpired || isVerifyCodePending}>
        인증하기
      </Button>
    </>
  );
}
