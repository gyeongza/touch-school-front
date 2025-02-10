import { Text } from '@/shared/components/common/Text';
import { useRegisterActions, useRegisterState } from '../../_store';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/ui/button';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MAX_NAME_LENGTH = 8;

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
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setName(value);
      setMessage('');
    }
  };

  const handleNext = () => {
    if (!userInfo.name) {
      setMessage('이름을 입력해주세요.');
      return;
    }
    if (userInfo.name.length > MAX_NAME_LENGTH) {
      setMessage(`이름은 ${MAX_NAME_LENGTH}자 이하로 입력해주세요.`);
      return;
    }
    goNext();
  };

  return (
    <Suspense>
      <div className="relative flex h-full grow flex-col gap-6">
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">이름을 입력해주세요.</Text>
          <Input
            className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
            type="text"
            placeholder={`이름 (최대 ${MAX_NAME_LENGTH}자)`}
            maxLength={MAX_NAME_LENGTH}
            value={userInfo.name}
            onChange={handleNameChange}
          />
          {message && <div className="text-red-500">{message}</div>}
        </div>
      </div>
      <Button className="sticky bottom-0" disabled={!userInfo.name} onClick={handleNext}>
        다음
      </Button>
    </Suspense>
  );
}
