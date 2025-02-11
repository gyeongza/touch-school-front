import { LuSchool } from 'react-icons/lu';
import { Text } from '@/_components/common/Text';
import { User } from '@/_apis/user/type';
import SchoolInfoDialog from './school-info-dialog';

interface SchoolInfoButtonProps {
  user: User;
}

export function SchoolInfoButton({ user }: SchoolInfoButtonProps) {
  return (
    <SchoolInfoDialog user={user}>
      <div className="relative flex cursor-pointer flex-col items-center gap-1">
        <LuSchool className="size-6" />
        <Text typography="small" className="truncate">
          우리학교 정보
        </Text>
      </div>
    </SchoolInfoDialog>
  );
}
