import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@repo/ui/alert-dialog';

interface AlertProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export default function Alert({ title, description, actionText, onAction }: AlertProps) {
  return (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {actionText && onAction && <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
