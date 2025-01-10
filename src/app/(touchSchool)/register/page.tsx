'use client';

import { useState } from 'react';
import { RegisterApi } from './_api';
import useFunnel from '@/shared/hooks/useFunnel';

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);

  const handleVerify = async () => {
    try {
      await RegisterApi.getVerifyCode(phoneNumber);
      setTimer(60 * 1000 * 3);
      setMessage('');
    } catch (error: any) {
      if (error.code === 409) {
        setMessage(error.message);
      } else {
        setMessage('인증번호 전송에 실패했습니다.');
      }
    }
  };

  const handleConfirm = async () => {
    try {
      await RegisterApi.verifyCode(phoneNumber, inputCode);
      setMessage('인증 확인에 성공했습니다.');
    } catch (error: any) {
      setMessage('인증 확인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <span className="text-2xl font-bold">Touch School</span>
    </div>
  );
}
