import { cn } from '@/shared/lib/utils';
import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputWrapperProps, leftElement, rightElement, ...props }, ref) => {
    const { className: inputWrapperClassName, ...restInputWrapperProps } = inputWrapperProps ?? {};
    return (
      <div className={cn('relative flex w-full', inputWrapperClassName)} {...restInputWrapperProps}>
        {leftElement ? <span className="absolute inset-y-0 left-0 flex items-center pl-3">{leftElement}</span> : null}
        <input
          className={cn(
            'h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {rightElement ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
