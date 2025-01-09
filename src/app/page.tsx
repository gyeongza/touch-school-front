'use client';

import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/v1';

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1000), 1000);
    }

    return () => clearTimeout(timer);
  }, [timer]);

  const handleVerify = async () => {
    try {
      const req = await fetch(`${API_URL}/verify/phone`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
        method: 'POST',
      });

      const res = await req.json();
      if (res.error) {
        setMessage(res.error);
      } else {
        setMessage(res.message);
        setTimer(60 * 1000 * 3);
      }
    } catch (error) {
      setMessage('인증번호 전송에 실패했습니다.');
    }
  };

  const handleConfirm = async () => {
    try {
      const req = await fetch(`${API_URL}/verify/confirm`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, code: inputCode }),
        method: 'POST',
      });

      const res = await req.json();
      setMessage(res.message);
    } catch (error) {
      setMessage('인증 확인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <span className="text-2xl font-bold">Touch School</span>
      <input type="text" placeholder="전화번호" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={handleVerify}>인증번호 받기</button>

      <input type="text" placeholder="인증번호 입력" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
      <button onClick={handleConfirm}>인증하기</button>
      {timer > 0 && <span>남은 시간: {timer / 1000}초</span>}

      {message && <div className="text-red-500">{message}</div>}
    </div>
  );
}
