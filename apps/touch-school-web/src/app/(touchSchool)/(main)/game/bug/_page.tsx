'use client';

import { User } from '@/_apis/user/type';
import BugKillGame from '../_components/bug-kill-game';
import { TreeInfo } from '../../home/_type';

interface BugKillGamePageProps {
  user: User;
  userTree: TreeInfo;
}

export default function BugKillGamePage({ user, userTree }: BugKillGamePageProps) {
  return <BugKillGame user={user} userTree={userTree} />;
}
