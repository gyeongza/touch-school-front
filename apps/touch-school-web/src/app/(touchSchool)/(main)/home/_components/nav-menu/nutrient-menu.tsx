import { Text } from '@/_components/common/Text';
import { LuGamepad2 } from 'react-icons/lu';
import GameSelectDialog from './game-select-dialog';
import { User } from '@/_apis/user/type';

interface NutrientMenuProps {
  user: User;
}

export function NutrientMenu({ user }: NutrientMenuProps) {
  return (
    <GameSelectDialog user={user}>
      <div className="relative flex cursor-pointer flex-col items-center gap-1">
        <LuGamepad2 className="size-6" />
        <Text typography="small" className="truncate">
          양분 받기
        </Text>
      </div>
    </GameSelectDialog>
  );
}
