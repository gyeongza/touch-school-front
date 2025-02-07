'use client';

import { revalidateUser } from '@/app/_actions/revalidate';
import { CustomErrorResponse } from '@/app/_apis/type';
import UserApi from '@/app/_apis/user';
import { FetchError } from '@/app/_lib/extend-fetch';
import { Text } from '@/shared/components/common/Text';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LuCalendarCheck, LuGamepad2, LuSchool } from 'react-icons/lu';
import { toast } from 'sonner';

export default function Navbar() {
  const queryClient = useQueryClient();

  const { mutate: postAttendance } = useMutation({
    mutationFn: () => UserApi.postAttendance(),
    onSuccess: () => {
      toast.success('출석체크 완료! 물주기 기회를 얻었어요!');
      revalidateUser();
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
    onError: (error: FetchError<CustomErrorResponse>) => {
      toast.error(error.response.body.message);
    },
  });

  const { data: attendance } = useQuery({
    queryKey: ['attendance'],
    queryFn: () => UserApi.getAttendance(),
  });

  const handleAttendanceClick = () => {
    postAttendance();
  };

  const menuItems: {
    icon: React.ElementType;
    label: string;
    isNew?: boolean;
    onClick?: () => void;
  }[] = [
    {
      icon: LuCalendarCheck,
      label: '출석체크',
      onClick: handleAttendanceClick,
      isNew: attendance?.canAttendance,
    },
    { icon: LuGamepad2, label: '양분 받기' },
    { icon: LuSchool, label: '우리학교 정보' },
  ];

  return (
    <>
      {menuItems.map(({ icon: Icon, label, isNew, onClick }, index) => (
        <div key={index} className="relative flex cursor-pointer flex-col items-center gap-1" onClick={onClick}>
          <Icon className="size-6" />
          <Text typography="small" className="truncate">
            {label}
          </Text>
          {isNew && <div className="absolute right-0 top-0 size-1 rounded-full bg-red-500" />}
        </div>
      ))}
    </>
  );
}
