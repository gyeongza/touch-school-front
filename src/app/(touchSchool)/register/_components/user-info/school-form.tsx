import { Input } from '@/shared/components/common/Input';
import { Text } from '@/shared/components/common/Text';
import { Button } from '@/shared/ui/button';
import { useRegisterActions } from '../../_store';
import { useEffect, useState } from 'react';
import { useRegisterState } from '../../_store';
import { RegisterApi } from '../../_api';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { School } from '../../_type';
import { LuArrowLeft, LuCircleCheck } from 'react-icons/lu';

export default function SchoolForm() {
  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');

  const { userInfo } = useRegisterState();
  const { setSchoolInfo, goNext, goBack } = useRegisterActions();

  useEffect(() => {
    const fetchInitialSchools = async () => {
      try {
        const res = await RegisterApi.getSchoolList('');
        setSchoolList(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialSchools();
  }, []);

  const debouncedSearch = useDebounce(async (searchKeyword: string) => {
    try {
      const res = await RegisterApi.getSchoolList(searchKeyword);
      setSchoolList(res);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    debouncedSearch(newKeyword);
    setKeyword(newKeyword);
    setSchoolInfo({ school: { id: undefined, name: '' }, grade: '', class: '' });
  };

  const handleSchoolClick = (school: School) => {
    if (school.id === userInfo.school.id) {
      setSchoolInfo({ school: { id: undefined, name: '' }, grade: '', class: '' });
    } else {
      setSchoolInfo({ school: { id: school.id, name: school.name }, grade: '', class: '' });
    }
  };

  const handleNext = () => {
    if (!userInfo.school) {
      setMessage('학교를 선택해주세요.');
      return;
    }
    goNext();
  };

  const handleBack = () => {
    goBack();
  };

  return (
    <>
      <div className="scrollbar-hide relative flex h-full grow flex-col gap-6 overflow-hidden">
        <LuArrowLeft onClick={handleBack} className="absolute left-0 top-0 cursor-pointer" />
        <div className="flex flex-col gap-6 pb-5 pt-10">
          <Text typography="h3">학교를 입력해주세요.</Text>
          <Input
            className="rounded-none border-x-0 border-y-0 border-b-2 border-t-0 border-black p-0 text-xl"
            type="text"
            placeholder="학교 이름을 검색해보세요"
            value={keyword}
            onChange={handleSchoolChange}
          />
          {message && <div className="text-red-500">{message}</div>}
        </div>
        <div className="overflow-y-auto">
          {schoolList.length > 0 ? (
            schoolList.map((school) => (
              <div
                key={school.id}
                className={`rounded-lg p-2 ${userInfo.school.id && school.id === userInfo.school.id ? 'bg-gray-100' : ''}`}
                onClick={() => handleSchoolClick(school)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <Text typography="h4">{school.name}</Text>
                    <Text typography="small" className="text-gray-500">
                      {school.address}
                    </Text>
                  </div>
                  {userInfo.school.id && school.id === userInfo.school.id && <LuCircleCheck className="size-4" />}
                </div>
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
      <Button className="sticky bottom-0" disabled={!userInfo.school} onClick={handleNext}>
        다음
      </Button>
    </>
  );
}
