import { Text } from '@/shared/components/common/Text';
import { useRegisterActions, useRegisterState } from '../../_store';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/ui/button';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NameForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState('');

  const { userInfo } = useRegisterState();
  const { setPhoneNumber, setName, goNext } = useRegisterActions();

  useEffect(() => {
    const phoneNumber = searchParams.get('phoneNumber');

    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }

    if (!userInfo.phoneNumber && !phoneNumber) {
      router.push('/register/verify');
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNext = () => {
    if (!userInfo.name) {
      setMessage('이름을 입력해주세요.');
      return;
    }
    goNext();
  };

  return (
    <>
      <div className="relative flex h-full grow flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">이름을 입력해주세요.</Text>
          <Input
            className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
            type="text"
            placeholder="이름"
            value={userInfo.name}
            onChange={handleNameChange}
          />
          {message && <div className="text-red-500">{message}</div>}
        </div>
      </div>
      <Button className="sticky bottom-0" disabled={!userInfo.name} onClick={handleNext}>
        다음
      </Button>
    </>
  );
}
