'use client';

import { toast } from 'sonner';
import PhoneInputForm from '../_components/phone-input-form';
import { Suspense, useEffect } from 'react';

export default function PhoneInputPage({ searchParams }: { searchParams?: { needLogin: string } }) {
  useEffect(() => {
    if (searchParams?.needLogin === '1') {
      toast.error('로그인이 필요한 서비스입니다.');
    }
  }, [searchParams?.needLogin]);

  return (
    <Suspense>
      <PhoneInputForm />
    </Suspense>
  );
}
