import { Text } from '@/_components/common/Text';
import { LuGamepad2 } from 'react-icons/lu';

export function NutrientMenu() {
  return (
    <div className="relative flex cursor-pointer flex-col items-center gap-1">
      <LuGamepad2 className="size-6" />
      <Text typography="small" className="truncate">
        양분 받기
      </Text>
    </div>
  );
}
