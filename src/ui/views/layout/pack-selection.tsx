import { GameCover } from '@/components/game-cover';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { packsState } from '@/states/App.states';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

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
          <p className="text-2xl">
            Packs can be installed from the menu by going to:
          </p>
          <p className="font-mono text-2xl font-bold">
            {'File > Install Pack'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-name="pack-selection">
      <div
        className="flex flex-col items-center gap-1"
        data-name="selection-header"
      >
        <p className="p-2 text-center text-4xl font-bold uppercase">
          Select a Pack
        </p>
        <div className="h-1.5 w-3/5 min-w-72 bg-[#f4B938]" />
        <div className="h-1.5 w-3/5 min-w-72 bg-[#ab4d1b]" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-2">
        <ItemGroup>
          {packs.map((pack) => {
            return (
              <Link
                to="/packs/$packId"
                params={{ packId: pack.id }}
                key={pack.id}
                className={cn(
                  'flex flex-col',
                  'relative'
                  // 'after:absolute after:inset-0 hover:after:bg-blue-400/50'
                )}
              >
                <Item
                  variant="outline"
                  className={cn(
                    'rounded-none border-zinc-300 dark:border-zinc-900',
                    'bg-zinc-100 dark:bg-zinc-800',
                    'hover:bg-zinc-300 hover:dark:bg-zinc-700',
                    'active:bg-zinc-600 active:dark:bg-zinc-900'
                  )}
                >
                  <ItemMedia>
                    <GameCover
                      name={pack.cover?.name ?? ''}
                      image={pack.cover ?? undefined}
                      className="h-48"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-2xl">{pack.name}</ItemTitle>
                    <ItemDescription className="text-base">
                      {pack.author} · v{pack.version}
                    </ItemDescription>
                    <ItemDescription className="mt-4 text-lg">
                      {pack.description}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className="size-4" />
                  </ItemActions>
                </Item>
              </Link>
            );
          })}
        </ItemGroup>
      </div>
    </div>
  );
}
