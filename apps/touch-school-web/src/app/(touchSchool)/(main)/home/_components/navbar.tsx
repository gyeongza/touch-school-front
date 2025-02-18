'use client';

import { User } from '@/_apis/user/type';
import { AttendanceMenu } from './nav-menu/attendance-menu';
import { NutrientMenu } from './nav-menu/nutrient-menu';
import { SchoolInfoButton } from './nav-menu/school-info-menu';
import { SchoolRankMenu } from './nav-menu/school-rank-menu';

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="flex h-full gap-4 overflow-x-auto">
      <AttendanceMenu />
      <NutrientMenu user={user} />
      <SchoolRankMenu user={user} />
      <SchoolInfoButton user={user} />
    </div>
  );
}
