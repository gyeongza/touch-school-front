'use client';

import { User } from '@/_apis/user/type';
import { AttendanceMenu } from './attendance-menu';
import { NutrientMenu } from './nutrient-menu';
import { SchoolInfoButton } from './school-info-menu';

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
