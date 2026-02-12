import { LoadingSpinner } from '@/components/loading-spinner';
import { fetchGames, fetchPresetsForGame } from '@/ipc';
import { activeGameState, gamesState, presetsState } from '@/states/App.states';
import { createFileRoute } from '@tanstack/react-router';
import { getDefaultStore, useAtomValue } from 'jotai';

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
      <div data-name="presets-container">
        {presets.map((preset) => (
          <p>{preset.name}</p>
        ))}
      </div>
    </div>
  );
}
