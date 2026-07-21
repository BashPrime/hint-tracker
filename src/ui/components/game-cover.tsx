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
        <img
          src={`data:image/${image.type};base64,${image.data}`}
          alt={name}
          className={className}
        />
      )}
      {!image && (
        <div
          className={cn(
            'flex items-center justify-center',
            'aspect-2/3',
            'bg-zinc-800 dark:bg-zinc-700',
            className
          )}
          data-name="game-without-cover"
        >
          <CircleQuestionMark className="h-3/4 w-auto max-w-3/4 text-zinc-50" />
        </div>
      )}
    </>
  );
}
