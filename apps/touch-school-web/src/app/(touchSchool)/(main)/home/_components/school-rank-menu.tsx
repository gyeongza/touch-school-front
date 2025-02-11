import { LuListOrdered } from 'react-icons/lu';
import { Text } from '@/_components/common/Text';
import { User } from '@/_apis/user/type';
import SchoolRankDialog from './school-rank-dialog';

interface SchoolRankMenuProps {
  user: User;
}

export function SchoolRankMenu({ user }: SchoolRankMenuProps) {
  return (
    <SchoolRankDialog user={user}>
      <div className="relative flex cursor-pointer flex-col items-center gap-1">
        <LuListOrdered className="size-6" />
        <Text typography="small" className="truncate">
          학교 랭킹
        </Text>
      </div>
    </SchoolRankDialog>
  );
}
