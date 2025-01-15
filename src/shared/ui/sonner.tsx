'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      duration={2000}
      position="top-center"
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-secondary group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-secondary',
          actionButton: 'group-[.toast]:bg-primary-default group-[.toast]:text-inverse',
          cancelButton: 'group-[.toast]:bg-primary-default group-[.toast]:text-inverse',
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
