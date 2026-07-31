import { GameCover } from '@/components/game-cover';
import { Button } from '@/components/ui/button';
import { installPack, openExternalLink } from '@/ipc';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { Plus, User } from 'lucide-react';
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
        'cursor-pointer',
        className
      )}
      data-name="install-pack-button"
    >
      {children}
    </Button>
  );
}

type ExternalLinkProps = {
  className?: string;
};
function PacksExternalLink({ className }: ExternalLinkProps) {
  return (
    <Button
      variant="link"
      className={cn(
        'text-bashprime-red brightness-80',
        'dark:text-bashprime-yellow dark:brightness-100',
        'cursor-pointer p-0 text-xl font-normal',
        className
      )}
      onClick={() =>
        openExternalLink('https://bashprime.github.io/hint-tracker')
      }
    >
      Looking for Packs?
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
          'dark:bg-background h-full bg-zinc-50'
        )}
        data-name="pack-selection-no-packs"
      >
        <p className="p-2 text-4xl font-bold uppercase">No Packs Installed!</p>
        <InstallPackButton className="p-10 p-12 text-2xl text-4xl sm:w-100">
          Install Pack
        </InstallPackButton>
        <PacksExternalLink className="mt-2" />
      </div>
    );
  }

  const sortedPacks = packs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className={cn(
        'flex flex-col items-center select-none',
        'dark:bg-background h-full bg-zinc-50'
      )}
      data-name="pack-selection"
    >
      <div
        className="flex w-full flex-col items-center gap-2"
        data-name="selection-header"
      >
        <div
          className="mt-4 flex w-auto flex-row items-center justify-center gap-6"
          data-name="header-text-and-button"
        >
          <p className="text-4xl font-bold uppercase">Select a Pack </p>
          <InstallPackButton className="px-4 py-5">
            <Plus className="size-8" />
          </InstallPackButton>
        </div>
        <div className="bg-bashprime-yellow h-1.5 w-4/5" />
        <div className="bg-bashprime-red h-1.5 w-4/5" />
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
      <PacksExternalLink />
    </div>
  );
}
