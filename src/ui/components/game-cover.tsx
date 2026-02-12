import { cn } from '@/lib/utils';
import { GameCover as GameCoverType } from '../../shared/types/game.types';

type Props = {
  name: string;
  image?: GameCoverType;
};

export function GameCover({ name, image }: Props) {
  return (
    <div
      className={cn(
        'h-[300px]',
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
