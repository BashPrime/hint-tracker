import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

type Props = {
  text?: string;
};

export function LoadingSpinner({ text }: Props) {
  return (
    <div className={cn('flex justify-center')} data-name="loading-spinner">
      <div className="flex flex-col items-center">
        <Spinner className="size-32" />
        <p className={cn('text-4xl')}>{text ? text : 'Loading...'}</p>
      </div>
    </div>
  );
}
