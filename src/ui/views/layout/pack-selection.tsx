import { GameCover } from '@/components/game-cover';
import { Button } from '@/components/ui/button';
import { installPack } from '@/ipc';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { User } from 'lucide-react';
import { ReactNode } from 'react';

type InstallPackButtonProps = {
  children: ReactNode;
  className?: string;
};
function InstallPackButton({ children, className }: InstallPackButtonProps) {
  return (
    <Button
      variant="default"
      onClick={installPack}
      className={cn(
        'hover:brightness-125',
        'bg-bashprime-red hover:bg-bashprime-red',
        'dark:bg-bashprime-yellow dark:hover:bg-bashprime-yellow',
        'cursor-pointer p-10 text-2xl sm:w-100',
        className
      )}
    >
      {children}
    </Button>
  );
}

export function PackSelection() {
  // !STATE
  const packs = useAtomValue(packsState);

  if (!(packs && packs.length)) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2',
          'h-full'
        )}
        data-name="pack-selection-no-packs"
      >
        <p className="p-2 text-4xl font-bold uppercase">No Packs Installed!</p>
        <InstallPackButton className="text-4xl p-12">Install Pack</InstallPackButton>
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
                'h-56 object-contain object-left sm:h-88',
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
