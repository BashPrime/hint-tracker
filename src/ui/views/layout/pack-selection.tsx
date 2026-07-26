import { GameCover } from '@/components/game-cover';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { User } from 'lucide-react';

export function PackSelection() {
  // !STATE
  const packs = useAtomValue(packsState);

  if (!(packs && packs.length)) {
    return (
      <div data-name="pack-selection-no-packs">
        <div className="flex flex-col items-center">
          <p className="p-2 text-center text-4xl font-bold uppercase">
            No Packs Installed!
          </p>
          <p className="text-center text-2xl">
            Packs can be installed from the menu by going to:
          </p>
          <p className="font-mono text-2xl font-bold">
            {'File > Install Pack'}
          </p>
        </div>
      </div>
    );
  }

  const sortedPacks = packs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="flex flex-col items-center select-none"
      data-name="pack-selection"
    >
      <div
        className="flex w-full flex-col items-center gap-1"
        data-name="selection-header"
      >
        <p className="p-2 text-center text-4xl font-bold uppercase">
          Select a Pack
        </p>
        <div className="bg-bashprime-yellow h-1.5 w-3/5 min-w-72" />
        <div className="bg-bashprime-red h-1.5 w-3/5 min-w-72" />
      </div>
      <div className={cn('flex flex-wrap justify-center gap-6 p-4')}>
        {sortedPacks.map((pack, idx) => (
          <Link
            to="/packs/$packId"
            params={{ packId: pack.id }}
            key={idx}
            className="group flex w-max break-inside-avoid flex-col gap-1"
          >
            <GameCover
              name={pack.cover?.name ?? ''}
              image={pack.cover ?? undefined}
              className={cn(
                'h-56 sm:h-88 object-contain object-left',
                'group-hover:outline-bashprime-red group-hover:outline group-hover:brightness-125',
                'dark:group-hover:outline-bashprime-yellow',
                'shadow-foreground group-hover:shadow-md/25'
              )}
            />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <p
                className={cn(
                  'text-md font-semibold sm:text-lg',
                  'group-hover:text-bashprime-red',
                  'dark:group-hover:text-bashprime-yellow',
                  'text-shadow-muted-foreground group-hover:text-shadow-sm/10'
                )}
              >
                {pack.name}
              </p>
              <p
                className={cn(
                  'text-muted-foreground text-sm',
                  'group-hover:text-bashprime-red',
                  'dark:group-hover:text-bashprime-yellow dark:group-hover:brightness-80'
                )}
              >
                v{pack.version}
              </p>
            </div>
            <div
              className={cn(
                'text-muted-foreground flex flex-row gap-1',
                'group-hover:text-bashprime-red',
                'dark:group-hover:text-bashprime-yellow dark:group-hover:brightness-80'
              )}
            >
              <User className="size-4 sm:size-5" />
              <p className="sm:text-md text-sm">{pack.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
