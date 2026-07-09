import { cn } from '@/lib/utils';
import { CircleQuestionMark } from 'lucide-react';
import { Image } from 'src/shared/types/image.types';

type Props = {
  name: string;
  image?: Image;
  className?: string;
};

export function GameCover({ name, image, className }: Props) {
  return (
    <>
      {image && (
        <div className={cn(className)} data-name="game-cover">
          <img
            src={`data:image/${image.type};base64,${image.data}`}
            alt={name}
            className="h-full w-auto"
          />
        </div>
      )}
      {!image && (
        <div
          className={cn(
            'flex items-center justify-center',
            'aspect-2/3',
            'bg-slate-800 dark:bg-slate-700',
            className
          )}
          data-name="game-without-cover"
        >
          <CircleQuestionMark className="h-auto w-3/5 text-neutral-50" />
        </div>
      )}
    </>
  );
}
