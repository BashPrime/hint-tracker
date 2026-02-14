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
import {
  createNewLayoutForGame,
  fetchCovers,
  fetchGames,
  fetchPresetsForGame,
} from '@/ipc';
import { cn } from '@/lib/utils';
import {
  activeGameState,
  coversState,
  gamesState,
  presetsState,
} from '@/states/App.states';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';
import { ChevronRightIcon, Plus, Undo2 } from 'lucide-react';

export const Route = createFileRoute('/games/$gameId')({
  component: GameLayouts,
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

function GameLayouts() {
  // !STATE
  const game = useAtomValue(activeGameState);
  const presets = useAtomValue(presetsState);
  const covers = useAtomValue(coversState);

  // !HOOKS
  const router = useRouter();

  // !FUNCTIONS
  async function handleCreateNewPreset(gameId: string) {
    const res = await createNewLayoutForGame(gameId);
    if (res) {
      await router.invalidate({ sync: true });
    }
  }

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
              'mb-2 cursor-pointer font-bold',
              'border border-neutral-400 dark:border-neutral-700'
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
          Select Layout
        </p>
        <ItemGroup className="overflow-auto">
          {presets?.map((preset) => (
            <Link
              to="/layouts/$layoutId"
              params={{ layoutId: preset.id }}
              key={preset.id}
            >
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
          {!presets.length && (
            <p
              className={cn(
                'border border-neutral-400 text-center dark:border-inherit',
                'p-2'
              )}
            >
              No layouts were found for this game.
            </p>
          )}
        </ItemGroup>
        <Button
          onClick={async () => await handleCreateNewPreset(game.id)}
          className={cn(
            'cursor-pointer place-self-center uppercase',
            'bg-slate-700 dark:bg-slate-300',
            'border border-neutral-400 dark:border-neutral-700'
          )}
        >
          <Plus /> New Layout
        </Button>
      </div>
    </div>
  );
}
