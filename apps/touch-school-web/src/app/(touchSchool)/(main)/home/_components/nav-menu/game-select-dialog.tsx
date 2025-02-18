import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/dialog';
import { User } from '@/_apis/user/type';
import { Text } from '@/_components/common/Text';
import { useState } from 'react';
import { Button } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage } from '@repo/ui/avatar';

interface GameSelectDialogProps {
  user: User;
  children: React.ReactNode;
}

export default function GameSelectDialog({ user, children }: GameSelectDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-6">게임 선택</DialogTitle>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="size-10 bg-gray-100">
                  <AvatarImage src="/game-assets/bug.png" />
                </Avatar>
                <div className="flex flex-col items-start">
                  <Text>해충 퇴치하고 양분 받기</Text>
                  <Text typography="xsmall" className="text-gray-500">
                    클리어 시 물주기 횟수 10회
                  </Text>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => {
                  router.push('/game/bug');
                }}
              >
                <Text typography="small">시작하기</Text>
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
