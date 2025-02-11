'use client';

import { User } from '@/_apis/user/type';
import { AttendanceMenu } from './nav-menu/attendance-menu';
import { NutrientMenu } from './nav-menu/nutrient-menu';
import { SchoolInfoButton } from './nav-menu/school-info-menu';
import { SchoolRankMenu } from './nav-menu/school-rank-menu';
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@repo/ui/alert-dialog';
interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      <AttendanceMenu />
      <AlertDialog>
        <AlertDialogTrigger>
          <NutrientMenu />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>준비 중인 기능이에요 🥲</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SchoolRankMenu user={user} />
      <SchoolInfoButton user={user} />
    </div>
  );
}
