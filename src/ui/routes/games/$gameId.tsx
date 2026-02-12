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
    <div>
      <p className="text-2xl">{game.name}</p>
      <div>
        <p className="p-2 text-center text-lg">Select a Layout:</p>
        <ItemGroup>
          {presets?.map((preset) => (
            <Link to="/layouts/$layoutId" params={{ layoutId: preset.id }}>
              <Item
                key={preset.id}
                className="hover:cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-800"
                variant="outline"
              >
                <ItemContent>
                  <ItemTitle>{preset.name}</ItemTitle>
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
