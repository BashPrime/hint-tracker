import { cn } from '@/lib/utils';
import { CircleQuestionMark } from 'lucide-react';
import { Cover } from 'src/shared/types/cover.types';

type Props = {
  name: string;
  image?: Cover;
  className?: string;
};

export function GameCover({ name, image, className }: Props) {
  return (
    <div
      className={cn(
        'select-none',
        !image &&
          `flex aspect-2/3 h-fit items-center justify-center bg-slate-800 dark:bg-slate-700 ${className}`
      )}
      data-name="game-cover"
    >
      {image && (
        <img
          src={`data:image/${image.type};base64,${image.data}`}
          alt={name}
          className={className}
        />
      )}
      {!image && (
        <CircleQuestionMark className="h-auto w-3/5 text-neutral-50" />
      )}
    </div>
  );
}
