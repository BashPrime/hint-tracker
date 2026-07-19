import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export function Header({ children }: Props) {
  return (
    <p
      className={cn(
        'dark:text-foreground bg-neutral-700 text-neutral-50 dark:bg-neutral-900',
        'px-2 py-1',
        'text-base font-bold uppercase select-none'
      )}
      data-name="header"
    >
      {children}
    </p>
  );
}
