import { Text } from '@/shared/components/common/Text';
import { LuCalendarCheck, LuGamepad2, LuSchool } from 'react-icons/lu';

export default function Navbar() {
  const menuItems: { icon: React.ElementType; label: string }[] = [
    { icon: LuCalendarCheck, label: '출석체크' },
    { icon: LuGamepad2, label: '양분 받기' },
    { icon: LuSchool, label: '우리학교 정보' },
  ];

  return (
    <>
      {menuItems.map(({ icon: Icon, label }, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <Icon className="size-6" />
          <Text typography="small" className="truncate">
            {label}
          </Text>
        </div>
      ))}
    </>
  );
}
