import { cn } from '@/lib/utils';
import { Cover } from 'src/shared/types/cover.types';

type Props = {
  name: string;
  image?: Cover;
};

export function GameCover({ name, image }: Props) {
  return (
    <div
      className={cn(
        'h-[300px] select-none',
        !image && 'flex w-[200px] items-center justify-center bg-neutral-900'
      )}
      data-name="game-cover"
    >
      {image && (
        <img
          src={`data:image/${image.type};base64,${image.data}`}
          alt={name}
          className={cn('h-full')}
        />
      )}
      {!image && (
        <p className="text-center text-xl font-bold text-neutral-50">{name}</p>
      )}
    </div>
  );
}
