'use client';

import { LuCalendarCheck } from 'react-icons/lu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import UserApi from '@/_apis/user';
import { revalidateUser } from '@/_actions/revalidate';
import { CustomErrorResponse } from '@/_apis/type';
import { FetchError } from '@/_lib/extend-fetch';
import { Text } from '@/_components/common/Text';
import { useEffect, useState } from 'react';
import { formatCountdown } from '@/_utils/date';

export function AttendanceMenu() {
  const queryClient = useQueryClient();
  const [countDown, setCountDown] = useState<number | null>(null);

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

  const getCountDown = () => {
    if (!attendance?.attendances) return null;

    const now = new Date();
    const lastAttendanceDate = new Date(attendance.attendances[0].createdAt);
    const nextAttendanceTime = new Date(lastAttendanceDate.getTime() + 24 * 60 * 60 * 1000);
    const diff = nextAttendanceTime.getTime() - now.getTime();
    return diff > 0 ? diff : null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(getCountDown());
    }, 1000);

    return () => clearInterval(interval);
  }, [attendance]);

  return (
    <div className="relative flex cursor-pointer flex-col items-center gap-1" onClick={() => postAttendance()}>
      {countDown ? (
        <div className="flex h-12 w-[60px] flex-col items-center gap-1">
          <LuCalendarCheck className="size-6" />
          <Text typography="small" className="text-gray-500">
            {formatCountdown(countDown)}
          </Text>
        </div>
      ) : (
        <div className="flex h-12 w-[60px] flex-col items-center gap-1">
          <LuCalendarCheck className="size-6" />
          <Text typography="small" className="truncate">
            출석체크
          </Text>
        </div>
      )}
      {attendance?.canAttendance && <div className="absolute right-0 top-0 size-1 rounded-full bg-red-500" />}
    </div>
  );
}
