import UserApi from '@/app/_apis/user';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function LogoutDialog({ children }: { children: React.ReactNode }) {
  const { mutate: requestSignOut, isPending: isLogoutPending } = useMutation({
    mutationFn: UserApi.logout,
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error('로그아웃에 실패했어요.');
    },
  });

  const handleLogout = () => {
    if (!isLogoutPending) {
      requestSignOut();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>로그아웃</DialogTitle>
        <DialogDescription>정말 로그아웃 하시겠습니까?</DialogDescription>
        <DialogFooter className="gap-2">
          <Button onClick={handleLogout} disabled={isLogoutPending}>
            로그아웃
          </Button>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
