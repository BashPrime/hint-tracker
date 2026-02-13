import { GameCover } from '@/components/game-cover';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { fetchCovers, fetchGames, fetchPresetsForGame } from '@/ipc';
import { cn } from '@/lib/utils';
import {
  activeGameState,
  coversState,
  gamesState,
  presetsState,
} from '@/states/App.states';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { ChevronRightIcon, Undo2 } from 'lucide-react';

export const Route = createFileRoute('/games/$gameId')({
  component: RouteComponent,
  pendingComponent: LoadingSpinner,
  beforeLoad: async () => {
    const store = getDefaultStore();
    const games = store.get(gamesState);
    const covers = store.get(coversState);

    if (!games) {
      await fetchGames();
    }

    if (!covers) {
      await fetchCovers();
    }
  },
  loader: ({ params }) => {
    const store = getDefaultStore();
    const games = store.get(gamesState);

    store.set(
      activeGameState,
      games?.find((game) => game.id === params.gameId) ?? null
    );

    fetchPresetsForGame(params.gameId);
  },
});

function RouteComponent() {
  // !STATE
  const game = useAtomValue(activeGameState);
  const presets = useAtomValue(presetsState);
  const covers = useAtomValue(coversState);

  if (!game || !presets) {
    return null;
  }

  const coverMatch = covers?.find((cover) => cover.name === game.coverImg);

  return (
    <div className="flex h-full flex-auto gap-2 p-2">
      <div className="flex w-48 flex-none flex-col gap-1">
        <Link to="/">
          <Button
            variant="secondary"
            className={cn(
              'mb-2 cursor-pointer border border-neutral-300 font-bold dark:border-neutral-700'
            )}
          >
            <Undo2 />
            Back to Games
          </Button>
        </Link>
        <GameCover name={game.name} image={coverMatch} />
        <p className="text-center text-lg font-semibold">{game.name}</p>
      </div>
      <div className="flex flex-auto flex-col gap-2">
        <p className="text-center text-2xl font-bold uppercase">
          Select a Layout
        </p>
        <ItemGroup className="overflow-auto">
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
    </div>
  );
}
