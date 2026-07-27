import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

type Props = {
  text?: string;
};

export function LoadingSpinner({ text }: Props) {
  return (
    <div className="flex h-full justify-center bg-zinc-50 dark:bg-background" data-name="loading-spinner">
      <div className="flex flex-col items-center justify-center">
        <Spinner className="size-32" />
        <p className={cn('text-4xl')}>{text ? text : 'Loading...'}</p>
      </div>
    </div>
  );
}
