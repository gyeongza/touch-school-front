import { LuGamepad2 } from 'react-icons/lu';
import { Text } from '@/shared/components/common/Text';

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
