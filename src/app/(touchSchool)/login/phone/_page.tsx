'use client';

import { toast } from 'sonner';
import PhoneInputForm from '../_components/phone-input-form';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PhoneInputPage() {
  const searchParams = useSearchParams();
  const needLogin = searchParams.get('needLogin');

  useEffect(() => {
    if (needLogin === '1') {
      toast.error('로그인이 필요한 서비스입니다.');
    }
  }, [needLogin]);

  return <PhoneInputForm />;
}
