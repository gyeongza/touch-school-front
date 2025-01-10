'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface School {
  id: number;
  name: string;
  createdAt: string;
}

export default function Page() {
  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [keyword, setKeyword] = useState('');

  const debouncedSearch = useDebounce(async (searchKeyword: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/school/schools/search?keyword=${searchKeyword}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const data = await res.json();
      setSchoolList(data);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  // 초기 학교 목록 로딩
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/school/schools`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
        const data = await res.json();
        setSchoolList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="학교 이름을 검색하세요"
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        {schoolList.length > 0 ? (
          schoolList.map((school) => (
            <div key={school.id} className="py-2">
              {school.name}
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
