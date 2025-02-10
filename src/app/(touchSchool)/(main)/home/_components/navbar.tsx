'use client';

import { AttendanceMenu } from './attendance-menu';
import { NutrientMenu } from './nutrient-menu';
import { SchoolInfoButton } from './school-info-menu';
import { User } from '@/app/_apis/user/type';

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      <AttendanceMenu />
      <NutrientMenu />
      <SchoolInfoButton user={user} />
    </div>
  );
}
