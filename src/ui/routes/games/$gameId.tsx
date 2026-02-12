import { GameCover } from '@/components/game-cover';
import { LoadingSpinner } from '@/components/loading-spinner';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { fetchGames, fetchPresetsForGame } from '@/ipc';
import { cn } from '@/lib/utils';
import { activeGameState, gamesState, presetsState } from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { ChevronRightIcon } from 'lucide-react';

export const Route = createFileRoute('/games/$gameId')({
  component: RouteComponent,
  pendingComponent: LoadingSpinner,
  beforeLoad: async () => {
    const games = getDefaultStore().get(gamesState);

    if (!games) {
      await fetchGames();
    }
  },
  loader: async ({ params }) => {
    const store = getDefaultStore();
    const games = store.get(gamesState);

    store.set(
      activeGameState,
      games?.find((game) => game.id === params.gameId) ?? null
    );

    await fetchPresetsForGame(params.gameId);
  },
});

function RouteComponent() {
  const game = useAtomValue(activeGameState);
  const presets = useAtomValue(presetsState);

  if (!game || !presets) {
    return null;
  }

  return (
    <div className="flex h-full flex-auto gap-2 p-2">
      <div className="flex flex-none flex-col">
        <GameCover name={game.name} image={game.cover} />
        {game.cover && (
          <p className="text-center text-lg font-semibold">{game.name}</p>
        )}
      </div>
      <ItemGroup className="flex-auto overflow-auto">
        {presets?.map((preset) => (
          <Link to="/layouts/$layoutId" params={{ layoutId: preset.id }}>
            <Item
              key={preset.id}
              className={cn(
                'border border-neutral-400 dark:border-inherit',
                'hover:cursor-pointer hover:bg-blue-300 dark:hover:bg-blue-800'
              )}
              variant="outline"
            >
              <ItemContent>
                <ItemTitle className="text-lg font-bold">
                  {preset.name}
                </ItemTitle>
                <ItemDescription>{preset.description}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Item>
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}
