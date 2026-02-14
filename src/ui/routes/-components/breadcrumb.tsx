import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ReactNode } from 'react';

type Props = {
  to: string;
  params?: object;
  className?: string;
  children?: ReactNode;
};

export function Breadcrumb({ to, params, className, children }: Props) {
  return (
    <Link
      to={to}
      params={params}
      className={cn('hover:text-blue-500 dark:hover:text-blue-400', className)}
    >
      {children}
    </Link>
  );
}
