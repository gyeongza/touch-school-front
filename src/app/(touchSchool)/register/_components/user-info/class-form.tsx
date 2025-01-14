import { Text } from '@/shared/components/common/Text';
import { Button } from '@/shared/ui/button';
import { useRegisterActions, useRegisterState } from '../../_store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useState } from 'react';
import { RegisterApi } from '../../_api';
import { LuArrowLeft } from 'react-icons/lu';

export default function ClassForm() {
  const [message, setMessage] = useState('');

  const { userInfo } = useRegisterState();
  const { setSchoolInfo, goBack } = useRegisterActions();

  const handleBack = () => {
    goBack();
  };

  const handleGradeChange = (value: string) => {
    setSchoolInfo({ grade: value });
  };

  const handleClassChange = (value: string) => {
    setSchoolInfo({ class: value });
  };

  const handleComplete = async () => {
    if (!userInfo.school.id || !userInfo.grade || !userInfo.class) {
      setMessage('학년 학반을 선택해주세요.');
      return;
    }

    try {
      await RegisterApi.postRegister({
        phoneNumber: userInfo.phoneNumber,
        name: userInfo.name,
        schoolId: userInfo.school.id,
        grade: userInfo.grade,
        class: userInfo.class,
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userInfo);

  return (
    <>
      <div className="relative flex h-full grow flex-col gap-6">
        <LuArrowLeft onClick={handleBack} className="absolute left-0 top-0 cursor-pointer" />
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">학년 학반을 선택해주세요.</Text>
          <div className="flex flex-col gap-2">
            <Text typography="p" className="text-gray-500">
              학년
            </Text>
            <Select onValueChange={handleGradeChange}>
              <SelectTrigger>
                <SelectValue placeholder="학년을 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 3 }, (_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}학년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Text typography="p" className="text-gray-500">
              학반
            </Text>
            <Select onValueChange={handleClassChange}>
              <SelectTrigger>
                <SelectValue placeholder="학반을 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}반
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Text typography="h4">
            {userInfo.school.name} {userInfo.grade ? `${userInfo.grade}학년` : ''}{' '}
            {userInfo.class ? `${userInfo.class}반` : ''} {userInfo.name}
          </Text>
          {message && <div className="text-red-500">{message}</div>}
        </div>
      </div>
      <Button
        className="sticky bottom-0"
        disabled={!userInfo.school || !userInfo.grade || !userInfo.class}
        onClick={handleComplete}
      >
        완료
      </Button>
    </>
  );
}
