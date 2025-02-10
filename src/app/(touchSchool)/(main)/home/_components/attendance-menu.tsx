'use client';

import { revalidateUser } from '@/app/_actions/revalidate';
import { CustomErrorResponse } from '@/app/_apis/type';
import UserApi from '@/app/_apis/user';
import { FetchError } from '@/app/_lib/extend-fetch';
import { LuCalendarCheck } from 'react-icons/lu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Text } from '@/shared/components/common/Text';

export function AttendanceMenu() {
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

  return (
    <div className="relative flex cursor-pointer flex-col items-center gap-1" onClick={() => postAttendance()}>
      <LuCalendarCheck className="size-6" />
      <Text typography="small" className="truncate">
        출석체크
      </Text>
      {attendance?.canAttendance && <div className="absolute right-0 top-0 size-1 rounded-full bg-red-500" />}
    </div>
  );
}
